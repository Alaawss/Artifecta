import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "contact-submissions.json");
const envFile = path.join(__dirname, ".env");
const port = Number(process.env.PORT || 8787);

async function loadEnvFile() {
  try {
    const content = await readFile(envFile, "utf8");
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (key && !(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return;
    }
    throw error;
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(payload));
}

function validateSubmission(body) {
  const errors = [];

  if (!body.name?.trim()) errors.push("Name is required.");
  if (!body.email?.trim()) errors.push("Email is required.");
  if (!body.projectType?.trim()) errors.push("Project type is required.");
  if (!body.message?.trim()) errors.push("Message is required.");

  return errors;
}

async function readSubmissions() {
  try {
    const content = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveSubmission(submission) {
  await mkdir(dataDir, { recursive: true });
  const submissions = await readSubmissions();
  submissions.push(submission);
  await writeFile(dataFile, JSON.stringify(submissions, null, 2));
}

async function sendContactEmail(submission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error(
      "Email is not configured yet. Add RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL in server/.env.",
    );
  }

  const html = `
    <h2>New contact submission</h2>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Project type:</strong> ${submission.projectType}</p>
    <p><strong>Message:</strong></p>
    <p>${submission.message.replace(/\n/g, "<br />")}</p>
    <hr />
    <p><strong>Received at:</strong> ${submission.createdAt}</p>
  `;

  const text = [
    "New contact submission",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Project type: ${submission.projectType}`,
    "Message:",
    submission.message,
    `Received at: ${submission.createdAt}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New contact form message from ${submission.name}`,
      html,
      text,
      reply_to: submission.email,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || payload.error || "Email sending failed.");
  }

  return payload;
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "POST" && request.url === "/api/contact") {
    let rawBody = "";

    request.on("data", (chunk) => {
      rawBody += chunk;
    });

    request.on("end", async () => {
      try {
        const body = JSON.parse(rawBody || "{}");
        const errors = validateSubmission(body);

        if (errors.length > 0) {
          sendJson(response, 400, { error: errors[0] });
          return;
        }

        const submission = {
          id: randomUUID(),
          name: body.name.trim(),
          email: body.email.trim(),
          projectType: body.projectType.trim(),
          message: body.message.trim(),
          createdAt: new Date().toISOString(),
        };

        await saveSubmission(submission);
        await sendContactEmail(submission);

        sendJson(response, 200, {
          message: "Thanks, your message has been sent.",
        });
      } catch (error) {
        sendJson(response, 500, {
          error:
            error instanceof Error
              ? error.message
              : "Something went wrong while sending your message.",
        });
      }
    });

    return;
  }

  sendJson(response, 404, { error: "Not found." });
});

await loadEnvFile();

server.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
