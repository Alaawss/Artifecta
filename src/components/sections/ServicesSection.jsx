import { motion } from "framer-motion";

const roadmapPoints = [
  { x: 720, y: 200, anchor: "start", delay: 0.6, title: "Brand Identity", lines: ["Crafting unique visual identities that", "define and elevate your brand."] },
  { x: 280, y: 480, anchor: "start", delay: 1.1, title: "UI/UX Design", lines: ["Designing intuitive and engaging user", "experiences across digital products."] },
  { x: 1160, y: 720, anchor: "end", delay: 1.6, title: "Web Design", lines: ["Creating modern, responsive, and", "visually compelling websites."] },
  { x: 260, y: 970, anchor: "start", delay: 2.1, title: "Web Development", lines: ["Building fast, scalable, and reliable", "web applications."] },
  { x: 1140, y: 1220, anchor: "end", delay: 2.6, title: "AI Integration", lines: ["Integrating intelligent solutions to", "enhance digital experiences."] },
  { x: 460, y: 1460, anchor: "start", delay: 3.1, title: "Digital Product Development", lines: ["Transforming ideas into functional and", "scalable digital products."] },
];

function ServicesRoadmap() {
  return (
    <div className="w-full mt-10 overflow-hidden relative" style={{ minHeight: "600px" }}>
      <svg
        className="w-full h-auto block"
        viewBox="0 0 1440 1560"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: "800px", margin: "0 auto", maxWidth: "100%" }}
      >
        <defs>
          <filter id="glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softglow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <text
            x="720"
            y="80"
            fontFamily="'Unbounded', sans-serif"
            fontWeight="400"
            fontSize="16"
            fill="#A9C2D8"
            opacity="0.4"
            textAnchor="middle"
            letterSpacing="0.22em"
          >
            SERVICES
          </text>
        </motion.g>

        <motion.path
          fill="none"
          stroke="#A9C2D8"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.45"
          d="M 720 105 C 755 112, 820 125, 855 140 C 905 158, 868 172, 840 176 C 800 182, 755 186, 720 200 C 640 230, 420 340, 340 410 C 280 462, 274 474, 280 480 C 340 510, 740 580, 980 640 C 1110 676, 1168 714, 1160 720 C 1080 752, 660 800, 440 866 C 300 912, 252 962, 260 970 C 310 1005, 740 1070, 970 1148 C 1100 1192, 1152 1214, 1140 1220 C 1040 1268, 660 1320, 550 1392 C 480 1438, 456 1456, 460 1460"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: [0.4, 0, 0.15, 1], delay: 0.2 }}
        />

        <motion.circle
          cx="720"
          cy="200"
          r="12"
          fill="#ffffff"
          opacity="0.5"
          animate={{ r: [12, 34, 34], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2.8, ease: "easeOut", repeat: Infinity, delay: 1.0 }}
        />
        <circle cx="720" cy="200" r="10" fill="#ffffff" filter="url(#glow)" />

        {roadmapPoints.map((point) => {
          const textX = point.anchor === "end" ? point.x - 36 : point.x + 36;
          return (
            <motion.g
              key={point.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: point.delay,
              }}
            >
              {point.title === "Brand Identity" ? null : (
                <>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="9"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.3"
                    filter="url(#softglow)"
                  />
                  <circle cx={point.x} cy={point.y} r="3.5" fill="#ffffff" opacity="0.85" />
                </>
              )}
              <text
                x={textX}
                y={point.y - 10}
                fontFamily="'Unbounded', sans-serif"
                fontWeight="700"
                fontSize="22"
                fill="#ffffff"
                letterSpacing="-0.01em"
                textAnchor={point.anchor}
              >
                {point.title}
              </text>
              <text
                x={textX}
                y={point.y + 28}
                fontFamily="'Unbounded', sans-serif"
                fontWeight="300"
                fontSize="16"
                fill="#A9C2D8"
                opacity=".7"
                textAnchor={point.anchor}
              >
                {point.lines[0]}
              </text>
              <text
                x={textX}
                y={point.y + 52}
                fontFamily="'Unbounded', sans-serif"
                fontWeight="300"
                fontSize="16"
                fill="#A9C2D8"
                opacity=".7"
                textAnchor={point.anchor}
              >
                {point.lines[1]}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full px-8 py-24 overflow-hidden"
      style={{ background: "#4e6c80", minHeight: "520px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          className="font-unbounded font-bold mb-8 text-center"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: "#ffffff",
            lineHeight: 1.15,
          }}
        >
          Services that
          <br />
          are{" "}
          <span
            className="font-style-script"
            style={{ fontSize: "1.15em", color: "#a9c2d8", fontWeight: 400 }}
          >
            Tailored
          </span>
        </h2>

        <ServicesRoadmap />
      </div>
    </section>
  );
}
