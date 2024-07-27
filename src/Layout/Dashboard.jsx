import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-slate-300">
                <Outlet />
              
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-3">
                    {/* Sidebar content here */}
                    <button onClick={handleLogOut} className="btn btn-error">Logout</button>
                    <li>
                        <NavLink
                            to="/dashboard/aboutSection"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            About Section
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/bannerSection"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            Banner Section
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/blogSection"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            Blog Section
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            Customer Query
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/gallerySection"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            Gallery
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/portfolioSection"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            Portfolio Section
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/reviewsSection"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            Reviews Section
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/storySection"
                            className={({ isActive }) => isActive ? 'text-lg active' : 'text-lg'}
                            end
                        >
                            Story Section
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
