import LedByPortraits from "../LedByPortraits";
import { teamMembers } from "../../constants/site";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full px-8 py-24"
      style={{ background: "#a9c2d8", minHeight: "520px" }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <h2
          className="font-unbounded font-bold text-center mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#142638" }}
        >
          About Us
        </h2>

        <div className="mx-auto">
          <p
            className="font-unbounded font-bold text-center mb-10"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 2.25rem)",
              color: "#142638",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
            }}
          >
            We are a <span className="text-outlined-lg">Creative</span> digital
            agency built on the synergy of design, technology and innovation.
          </p>

          <p
            className="font-unbounded font-bold text-center"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 2.25rem)",
              color: "#142638",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              maxWidth: "820px",
            }}
          >
            Led By <LedByPortraits members={teamMembers} />
            We craft digital <br className="hidden md:block" />
            experiences, turning ideas into <br className="hidden md:block" />
            meaningful digital products built <br className="hidden md:block" />
            with precision and purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
