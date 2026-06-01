import { motion } from "framer-motion";

const SectionHeading = ({ label, title, subtitle, align = "center", className = "" }) => {
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <motion.div
      className={`space-y-3 sm:space-y-4 mb-8 sm:mb-12 lg:mb-16 ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {label && (
        <p className="text-sm sm:text-base lg:text-lg font-semibold text-orange-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 leading-tight break-words">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
