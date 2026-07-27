import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/logo.png";
import omar from "../../../assets/omar.png";

const BrandLoader = ({ onFinish }) => {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const holdTimer = setTimeout(() => setPhase("hold"), 900);
    const exitTimer = setTimeout(() => setPhase("exit"), 2200);
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = "";
      onFinish?.();
    }, 2900);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {/* Soft glow */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.18),transparent_55%)]"
            aria-hidden
          />

          <motion.div
            className="relative z-10 flex max-w-[min(90vw,28rem)] items-center justify-center gap-3 sm:gap-4 md:gap-5"
            initial={{ opacity: 0, y: 24, scale: 0.88 }}
            animate={
              phase === "exit"
                ? { opacity: 0, y: -12, scale: 0.92 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={logo}
              alt=""
              className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
            />
            <img
              src={omar}
              alt="Omar"
              className="h-10 w-auto max-w-[55vw] object-contain sm:h-14 md:h-16"
            />
          </motion.div>

          {/* Progress line */}
          <div className="absolute bottom-[18%] left-1/2 w-[min(70vw,14rem)] -translate-x-1/2">
            <div className="h-px w-full overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full origin-left bg-orange-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase === "exit" ? 1 : phase === "hold" ? 1 : 0.55 }}
                transition={{ duration: phase === "enter" ? 0.9 : 1.1, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandLoader;
