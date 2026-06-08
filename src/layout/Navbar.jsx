import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { apiSlice } from "../features/api/apiSlice";
import { CiLogin } from "react-icons/ci";
import { FaAngleDown, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import STEMLogo from "../../public/assets/STEM168.png";

import {
  useGetTeacherInfoQuery,
  useGetUserInfoQuery,
} from "../features/users/userSlice";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [langDropdown, setLangDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const langDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const user = useSelector((state) => state.auth.user);

  const { data: userInfo, isLoading } =
    user?.role === "teacher"
      ? useGetTeacherInfoQuery(user?.id, {
          skip: !user?.id,
          refetchOnMountOrArgChange: true,
        })
      : useGetUserInfoQuery(user?.id, {
          skip: !user?.id,
          refetchOnMountOrArgChange: true,
        });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    return savedTheme || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: "/courses", label: t("courses") },
    { to: "/library", label: t("library") },
    { to: "/blogs", label: t("blog") },
    { to: "/about", label: t("about") },
    ...(user?.role === "teacher"
      ? [{ to: "/teacher-dashboard", label: t("dashboard") }]
      : []),
    ...(user?.role === "student"
      ? [{ to: "/my-learning", label: t("my-learning") }]
      : []),
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdown(false);
  };

  const handleLogout = () => {
    navigate("/login");
    setProfileDropdownOpen(false);
    dispatch(logout(user));
    dispatch(apiSlice.util.resetApiState());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdown(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-row items-center justify-center bg-white dark:border-b dark:border-darkborder dark:bg-darkbg p-2 px-5 shadow-md dark:shadow-none">
      <div className="container flex items-center mx-auto">
        <NavLink to="/">
          <img
            src={STEMLogo}
            alt="Logo"
            className="w-auto h-16 transition-transform hover:scale-[1.01]"
          />
        </NavLink>

        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFA500] font-bold border-b-2 border-[#FFA500] pb-1"
                  : "text-[#253C95] dark:text-darktext font-semibold hover:text-secondary dark:hover:text-primary transition-colors pb-1"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-4 ml-auto items-center">
          <button
            onClick={toggleDarkMode}
            className="text-secondary dark:text-darktext hover:text-[#FFA500] dark:hover:text-primary active:animate-spin ease-in-out p-2 rounded-full hidden md:block transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <FaMoon className="w-5 h-5" />
            ) : (
              <FaSun className="w-5 h-5" />
            )}
          </button>

          <div
            className="relative inline-block text-left"
            ref={langDropdownRef}
          >
            <button
              type="button"
              className="inline-flex justify-center items-center rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-darktext hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => setLangDropdown(!langDropdown)}
              aria-expanded={langDropdown}
              aria-haspopup="true"
            >
              {i18n.language === "en" ? (
                <img
                  src="https://pixelz.cc/wp-content/uploads/2018/11/united-kingdom-flag-uhd-4k-wallpaper.jpg"
                  alt="English Flag"
                  className="w-5 h-5 mr-2 rounded-sm object-cover"
                />
              ) : (
                <img
                  src="https://i.pinimg.com/736x/98/8c/ae/988caed466d13217bff155a101265d8d.jpg"
                  alt="Khmer Flag"
                  className="w-5 h-5 mr-2 rounded-sm object-cover"
                />
              )}
              <span className="hidden sm:inline">
                {i18n.language.toUpperCase()}
              </span>
              <FaAngleDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  langDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {langDropdown && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-32 rounded-lg shadow-xl bg-white dark:bg-gray-800 "
                role="menu"
                aria-orientation="vertical"
              >
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-darktext hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition"
                  role="menuitem"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("km")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-darktext hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition"
                  role="menuitem"
                >
                  ខ្មែរ (Khmer)
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div className="relative" ref={profileDropdownRef}>
              {isLoading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse " />
              ) : (
                <img
                  src={userInfo?.profile_url || "/default-avatar.png"}
                  alt={userInfo?.name || "Profile"}
                  className="rounded-full w-10 h-10 ring-2 ring-primary dark:ring-secondary cursor-pointer object-cover object-center transition-transform hover:scale-105"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
              )}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-2xl flex flex-col font-medium divide-y divide-gray-100 dark:divide-gray-800 transition-all duration-300">
                  <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 truncate">
                    {userInfo?.name || "User"}
                  </div>
                  <NavLink
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-100 flex items-center gap-3 transition"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <FaUserCircle className="w-5 h-5" />
                    {t("profile")}
                  </NavLink>
                  <button
                    className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 flex items-center gap-3 transition rounded-b-lg"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="w-5 h-5" />
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="hidden sm:flex gap-2 bg-gradient-to-r from-[#253C95] to-[#0055CD] font-semibold text-white p-2 px-4 rounded-lg items-center hover:opacity-90 transition focus:ring-offset-2  focus:ring-2 focus:ring-primary "
            >
              <CiLogin size={24} strokeWidth={1} /> {t("login")}
            </NavLink>
          )}

          <button
            className="lg:hidden text-[#253C95] dark:text-darktext text-2xl ml-2 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl flex flex-col items-start px-5 py-4 gap-3 transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
        ref={mobileMenuRef}
      >
        <div className="w-full flex flex-col gap-3 pb-3 border-b dark:border-gray-800">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 dark:text-darktext font-semibold">
              Theme
            </span>
            <button
              onClick={toggleDarkMode}
              className="text-secondary dark:text-darktext hover:text-[#FFA500] dark:hover:text-primary p-2 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FaMoon className="w-5 h-5" />
              ) : (
                <FaSun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? "text-[#FFA500] font-bold w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800"
                : "text-[#253C95] dark:text-darktext font-semibold hover:text-secondary dark:hover:text-primary transition-colors w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        {!user && (
          <NavLink
            to="/login"
            className="flex gap-2 bg-gradient-to-r from-[#253C95] to-[#0055CD] font-semibold text-white p-3 px-4 rounded-lg items-center hover:opacity-90 transition w-full justify-center mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <CiLogin size={24} strokeWidth={1} /> {t("login")}
          </NavLink>
        )}
      </div>
    </div>
  );
}
