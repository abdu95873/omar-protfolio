import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";
import omar from "../../../assets/omar.png";

const BrandLoader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600);
          return 100;
        }
        return p + 1;
      });
    }, 25);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white">
      
      {/* Brand */}
    {progress >= 20 && (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 2.4 }}   // ⬅️ START very big
    animate={
      progress < 100
        ? { opacity: 1, y: 0, scale: 2 }         // ⬅️ CENTER big size
        : { x: -220, y: -200, scale: 0.9 }       // ⬅️ NAVBAR size
    }
    transition={{ duration: 0.9, ease: "easeInOut" }}
    className="flex items-center gap-4"
  >
    <img src={logo} className="h-20" />   {/* bigger logo */}
    <img src={omar} className="h-20" />   {/* bigger text/logo */}
  </motion.div>
)}


      {/* Percentage */}
      <p className="mt-6 text-sm tracking-widest"></p>
    </div>
  );
};

export default BrandLoader;
