import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../Pages/Shared/Nav/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import BrandLoader from "../Pages/Shared/Nav/BrandLoader";
import { useSmoothScroll, useScrollToTop } from "../hooks/useSmoothScroll";

const Main = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login";

  const [loading, setLoading] = useState(() => {
    return !hideNavbarFooter && !sessionStorage.getItem("brandLoaded");
  });

  const finishLoading = () => {
    sessionStorage.setItem("brandLoaded", "true");
    setLoading(false);
  };

  const showChrome = !hideNavbarFooter && !loading;

  useSmoothScroll(!loading);
  useScrollToTop(location.pathname);

  return (
    <div className="min-h-dvh flex flex-col bg-[#fafafa] relative w-full overflow-x-clip">
      {!hideNavbarFooter && loading && (
        <BrandLoader onFinish={finishLoading} />
      )}

      {showChrome && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={
            showChrome
              ? "page-main"
              : "flex-1 flex flex-col w-full min-h-dvh"
          }
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {showChrome && (
        <div className="shrink-0">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
