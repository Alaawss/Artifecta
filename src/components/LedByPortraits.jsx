import { motion } from "framer-motion";

const cardLefts = [0, 40, 80];
const cardRotations = [-10, 5, -5];

export default function LedByPortraits({ members }) {
  return (
    <motion.span
      className="relative inline-block align-middle"
      style={{
        width: "140px",
        height: "56px",
        margin: "0 8px",
        top: "-0.1em",
        verticalAlign: "middle",
      }}
      initial="hidden"
      animate="visible"
    >
      {members.slice(0, 3).map((member, index) => (
        <motion.div
          key={member.name}
          className="absolute flex items-center justify-center overflow-hidden"
          style={{
            left: `${cardLefts[index]}px`,
            top: 0,
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            border: "1px solid rgba(20,38,56,0.10)",
            boxShadow: "0 4px 12px rgba(20,38,56,0.10)",
            background: "#d7e3ee",
            color: "#142638",
            zIndex: index + 1,
            rotate: `${cardRotations[index]}deg`,
          }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: index * 0.12, duration: 0.35, ease: "easeOut" }}
          whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
        >
          <span
            className="font-mono text-[10px] font-semibold tracking-tight"
            style={{ opacity: 0.75 }}
          >
            {member.initials}
          </span>
        </motion.div>
      ))}
    </motion.span>
  );
}
