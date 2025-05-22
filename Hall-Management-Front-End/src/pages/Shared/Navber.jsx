

import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { ThemeContext } from "../../context/ThemeContext";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navItems = [
        { path: "/", label: "HOME" },
        { path: "/about", label: "ABOUT" },
        { path: "/administration", label: "ADMINISTRATION" },
        { path: "/alumni", label: "ALUMNI" },
        { path: "/notice", label: "NOTICE" },
        { path: "/contact", label: "CONTACT" },
        { path: "/dashboard", label: "DASHBOARD" },
    ];

    const navLink = navItems.map(({ path, label }) => (
        <li key={path}>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition duration-200 ease-in-out 
                    ${isActive ? "text-yellow-400 font-bold" : "text-white hover:text-cyan-300 hover:bg-white/10"}`
                }
                onClick={() => setMenuOpen(false)}
            >
                {label}
            </NavLink>
        </li>
    ));

    const handleLogOut = () => {
        logOut()
            .then(() => console.log("User logged out successfully"))
            .catch(error => console.error(error));
    };

    return (
        <div className="w-full bg-gradient-to-r from-blue-900 to-purple-900 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto navbar p-4 text-white">
                {/* Left Section - Logo */}
                <div className="navbar-start flex items-center gap-2">
                    <div className="lg:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <NavLink to="/" className="flex items-center gap-2">
                        <img src="/MBSTU_Logo.png" alt="Logo" className="h-10 w-auto" />
                        <span className="font-semibold text-lg">Hall Management</span>
                    </NavLink>
                </div>

                {/* Center Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-1">
                        {navLink}
                        <button onClick={toggleTheme} className="ml-3 text-xl" aria-label="Toggle Theme">
                            {theme === "light" ? <FaMoon /> : <LuSun />}
                        </button>
                    </ul>
                </div>

                {/* Right Section - User */}
                <div className="navbar-end flex items-center gap-3">
                    {user ? (
                        <>
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="User" className="h-10 w-10 rounded-full border-2 border-white" />
                            ) : (
                                <span className="text-sm">{user.email}</span>
                            )}
                            <button onClick={handleLogOut} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none">
                            Log In
                        </NavLink>
                    )}
                </div>
            </div>

            {/* Mobile Menu (Drawer) */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
                    <div className="absolute left-0 top-0 w-64 h-full bg-base-100 shadow-md p-5 text-black">
                        <button className="btn btn-ghost mb-5" onClick={() => setMenuOpen(false)}>✖</button>
                        <ul className="menu">{navLink}</ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
