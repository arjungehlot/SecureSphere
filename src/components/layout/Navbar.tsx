import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Menu, X, UserCircle, ChevronDown } from "lucide-react";
import { Transition } from "@headlessui/react";
import secureSphereLogo from "../../assets/SecureSphere No BG.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const navigate = useNavigate();

  // Check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // Clear any pending timeout when manually toggling
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const startDropdownCloseTimer = () => {
    // Clear any existing timeout
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    // Set new timeout
    setDropdownTimeout(
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300) // 300ms delay before closing
    );
  };

  const cancelDropdownCloseTimer = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-secureSphere-gray-900/90 border-b border-secureSphere-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <div className="h-10 w-12 flex items-center justify-center">
            <img src={secureSphereLogo} alt="SecureSphere Logo" />
          </div>
          <span className="text-xl font-bold text-white text-transparent bg-clip-text">
            SecureSphere
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Visible Post link */}
            <Link 
              to="/post" 
              className="text-white hover:text-secureSphere-purple-light transition-colors duration-200 ease-in-out font-medium"
            >
              Post
            </Link>

            {/* Dropdown for other links */}
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                onMouseEnter={() => {
                  cancelDropdownCloseTimer();
                  setIsDropdownOpen(true);
                }}
                onMouseLeave={startDropdownCloseTimer}
                className="text-white hover:text-secureSphere-purple-light transition-colors duration-200 ease-in-out font-medium flex items-center"
              >
                More <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown menu */}
              <div 
                onMouseEnter={cancelDropdownCloseTimer}
                onMouseLeave={startDropdownCloseTimer}
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ${isDropdownOpen ? 'block' : 'hidden'}`}
              >
                {[
                  { to: "/check-url", label: "CheckURL" },
                  { to: "/check-email", label: "CheckEmail" },
                  { to: "/check-domain", label: "CheckDomain" },
                  { to: "/heatmap", label: "ScamHeatmap" },
                  { to: "/about", label: "About" },
                  { to: "/resources", label: "Resouces" },
                  { to: "/contact", label: "Contact" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-secureSphere-purple-light hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Auth buttons */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-1 text-white hover:text-secureSphere-purple-light transition">
                <UserCircle className="w-5 h-5" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white px-4 py-2 rounded-md transition-colors duration-200 ease-in-out font-semibold"
            >
              Login
            </Link>
          )}

          {/* Hamburger for mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle menu" 
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <Transition
        show={isMenuOpen}
        enter="transition ease-out duration-300"
        enterFrom="transform -translate-y-4 opacity-0"
        enterTo="transform translate-y-0 opacity-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform translate-y-0 opacity-100"
        leaveTo="transform -translate-y-4 opacity-0"
      >
        <div className="md:hidden">
          <nav className="bg-secureSphere-gray-900/95 border-t border-secureSphere-gray-800 rounded-b-md shadow-lg">
            <ul className="flex flex-col space-y-4 px-6 py-5">
              {[
                { to: "/post", label: "Post" }, 
                { to: "/check-url", label: "CheckURL" }, 
                { to: "/check-email", label: "CheckEmail" }, 
                { to: "/check-domain", label: "CheckDomain" },
                { to: "/heatmap", label: "ScamHeatmap" },
                { to: "/about", label: "About" },
                { to: "/resources", label: "Resouces" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white text-lg font-medium rounded-md px-4 py-2 hover:text-secureSphere-purple-light hover:bg-secureSphere-gray-800 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white text-lg font-semibold px-4 py-2 hover:text-secureSphere-purple-light hover:bg-secureSphere-gray-800 transition"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold w-full text-left transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white px-5 py-2 rounded-md text-center font-semibold transition"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Transition>
    </header>
  );
};

export default Navbar;