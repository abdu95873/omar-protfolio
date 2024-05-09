import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles.css'
import logo from "./../../../assets/logo.jpeg"



const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };



    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div id='nav' className="w-full navbar bg-black text-white px-20">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <img className='w-14 mx-5' src={logo} alt="logo" />
                        
                        <h4>OMAR</h4>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul id='nav-ul' className="menu menu-horizontal ">

                            <li><Link className='text-white' to="/">HOMEPAGE</Link></li>
                            <li><Link to="/about">ABOUT</Link></li>

                            {/* todo: add icon */}
                            <li
                                className="dropdown"
                                onBlur={closeDropdown}>
                                <Link
                                    tabIndex={0}
                                    role="button"
                                    onClick={toggleDropdown}
                                    to="/protfolio">
                                    PROTFOLIO <FaAngleDown />

                                </Link>

                                {isOpen && (<ul tabIndex={0} className="dropdown-content z-[1] menu mt-5 p-2 shadow bg-black w-32">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>)}

                            </li>
                            <li
                            
                                className="dropdown"
                                onBlur={closeDropdown}>
                                <Link
                                    tabIndex={0}
                                    role="button"
                                    onClick={toggleDropdown}
                                    to="/">
                                    PAGE <FaAngleDown />

                                </Link>

                                {isOpen && (<ul tabIndex={0} className="dropdown-content z-[1] menu mt-5 p-2 shadow bg-black w-32">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>)}

                            </li>
                            <li><Link to="/contact">CONTACT</Link></li>

                        </ul>
                    </div>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">

                    <li><Link to="/">HOMEPAGE</Link></li>
                    <li><Link to="/">ABOUT</Link></li>
                    <li
                        className="dropdown"
                        onBlur={closeDropdown}>
                        <Link
                            tabIndex={0}
                            role="button"
                            onClick={toggleDropdown}
                            to="/">
                            PROTFOLIO <FaAngleDown />

                        </Link>

                        {isOpen && (<ul tabIndex={0} className="dropdown-content z-[1] menu mt-5 p-2 shadow bg-black w-32">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>)}

                    </li>
                    <li
                        className="dropdown"
                        onBlur={closeDropdown}>
                        <Link
                            tabIndex={0}
                            role="button"
                            onClick={toggleDropdown}
                            to="/">
                            PAGE <FaAngleDown />

                        </Link>

                        {isOpen && (<ul tabIndex={0} className="dropdown-content z-[1] menu mt-5 p-2 shadow bg-black w-32">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>)}

                    </li>
                    <li><Link to="/">CONTACT</Link></li>

                </ul>
            </div>
        </div>
    );
};

export default Navbar;