import { useContext, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FiImage,
  FiLayers,
  FiLogOut,
  FiMail,
  FiMenu,
  FiMessageSquare,
  FiStar,
  FiVideo,
  FiX,
} from "react-icons/fi";
import { useScrollToTop } from "../hooks/useSmoothScroll";
import { AuthContext } from "../Providers/AuthProvider";
import logo from "../assets/logo.png";

const navItems = [
  { to: "/dashboard", label: "Customer queries", icon: FiMail, end: true },
  { to: "/dashboard/bannerSection", label: "Banner", icon: FiImage },
  { to: "/dashboard/aboutSection", label: "Videos / About", icon: FiVideo },
  { to: "/dashboard/portfolioSection", label: "Portfolio", icon: FiLayers },
  { to: "/dashboard/gallerySection", label: "Gallery", icon: FiImage },
  { to: "/dashboard/storySection", label: "Stories", icon: FiMessageSquare },
  { to: "/dashboard/reviewsSection", label: "Reviews", icon: FiStar },
  { to: "/dashboard/blogSection", label: "Blog", icon: FiMessageSquare },
];

function SidebarContent({ user, onNavigate, onLogOut }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-neutral-200/80 px-5 py-5">
        <img src={logo} alt="" className="h-10 w-10 rounded-lg object-contain" />
        <div className="min-w-0">
          <p className="font-quick text-sm font-semibold tracking-[0.12em] text-neutral-900">
            OMAR
          </p>
          <p className="text-xs text-neutral-500">Admin dashboard</p>
        </div>
      </div>

      {user?.email && (
        <p className="mx-5 mt-4 truncate rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
          {user.email}
        </p>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `dashboard-nav-link ${isActive ? "dashboard-nav-link-active" : ""}`
            }
          >
            <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-neutral-200/80 p-4">
        <button
          type="button"
          onClick={onLogOut}
          className="dashboard-nav-link w-full text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <FiLogOut className="h-4 w-4" aria-hidden />
          Log out
        </button>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const { pathname } = useLocation();
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useScrollToTop(pathname);

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogOut = () => {
    logOut().catch(() => {});
    closeSidebar();
  };

  return (
    <div className="flex min-h-dvh bg-neutral-100">
      {/* Mobile drawer */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-neutral-900/40 lg:hidden"
          aria-label="Close menu"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[min(100vw-3rem,18rem)] border-r border-neutral-200/80 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          className="absolute right-3 top-4 rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          <FiX className="h-5 w-5" />
        </button>
        <SidebarContent user={user} onNavigate={closeSidebar} onLogOut={handleLogOut} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 border-r border-neutral-200/80 bg-white lg:block">
        <SidebarContent user={user} onNavigate={() => {}} onLogOut={handleLogOut} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-neutral-200/80 bg-white/95 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-neutral-800">Dashboard</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
