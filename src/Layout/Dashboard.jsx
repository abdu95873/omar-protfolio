import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex-shrink-0 p-6 flex flex-col">
        {/* Logout Button */}
        <button
          onClick={handleLogOut}
          className="btn btn-error w-full mb-6"
        >
          Logout
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {[
            { to: "/dashboard/aboutSection", label: "About Section" },
            { to: "/dashboard/bannerSection", label: "Banner Section" },
            { to: "/dashboard/blogSection", label: "Blog Section" },
            { to: "/dashboard", label: "Customer Query" },
            { to: "/dashboard/gallerySection", label: "Gallery" },
            { to: "/dashboard/portfolioSection", label: "Portfolio Section" },
            { to: "/dashboard/reviewsSection", label: "Reviews Section" },
            { to: "/dashboard/storySection", label: "Story Section" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg p-2 rounded-md transition-colors duration-300 hover:bg-gray-200 ${
                  isActive ? "bg-gray-200 font-bold text-orange-500" : ""
                }`
              }
              end
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
