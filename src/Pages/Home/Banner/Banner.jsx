import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    axios
      .get("https://omar-server-side.vercel.app/bannerImage")
      .then((response) => {
        if (response.data.length > 0) {
          setBannerData(response.data[0].image);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[88vh] lg:min-h-[92vh] h-[100svh] max-h-[1000px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />

      {bannerData ? (
        <motion.img
          key={bannerData}
          src={bannerData}
          alt="banner"
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <div className="h-full w-full bg-gray-200 animate-pulse" />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-5 sm:px-8">
        <motion.h3
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-serif leading-none max-w-[95vw]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          PHOTO & FILM
        </motion.h3>
        <motion.h3
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] text-orange-400 font-serif leading-none mt-2 sm:mt-3 max-w-[95vw]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          PRODUCTION
        </motion.h3>
        <motion.p
          className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-100 max-w-2xl lg:max-w-3xl mt-5 sm:mt-8 px-2 font-light leading-snug"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          We turn moments into powerful visuals that speak for your brand
        </motion.p>
        <motion.a
          href="/contact"
          className="btn-brand mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Your Project
        </motion.a>
      </div>

      <motion.div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-7 h-11 rounded-full border-2 border-white/50 justify-center pt-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="w-1.5 h-3 bg-white/80 rounded-full" />
      </motion.div>
    </div>
  );
};

export default Banner;
