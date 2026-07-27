import { motion } from "framer-motion";

// Line-by-line masked reveal for headings
export function RevealLines({ lines = [], className = "", delay = 0 }) {
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="mask-line">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.12,
              ease: [0.2, 0.9, 0.2, 1],
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Word-by-word reveal (whileInView on outer container, staggered children)
export function RevealWords({ text, className = "", delay = 0, stagger = 0.03 }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.9, ease: [0.2, 0.9, 0.2, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 && <>&nbsp;</>}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Section container that fades upward on scroll
export function FadeUp({ children, delay = 0, y = 40, className = "", once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8%" }}
      transition={{ duration: 1, delay, ease: [0.2, 0.9, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
