import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Pages/Shared/Nav/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import BrandLoader from "../Pages/Shared/Nav/BrandLoader";

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

  return (
    <div
      className="min-h-screen bg-[#FBFBFB] relative"
      style={{
       backgroundImage: "radial-gradient(rgba(0,0,0,0.02) 2px, transparent 2px)",
backgroundSize: "25px 25px",
      }}
    >
      {/* Loader */}
      {!hideNavbarFooter && loading && (
        <BrandLoader onFinish={finishLoading} />
      )}

      {/* Navbar */}
      {!hideNavbarFooter && !loading && <Navbar />}

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      {!hideNavbarFooter && !loading && <Footer />}
    </div>
  );
};

export default Main;
