import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Transition } from "@headlessui/react";
import secureSphereLogo from "../../assets/SecureSphere No BG.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-secureSphere-gray-900/90 border-b border-secureSphere-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <div className="h-10 w-12 flex items-center justify-center">
            <img src={secureSphereLogo} alt="My Logo" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
            SecureSphere
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { to: "/post", label: "Post" },
            { to: "/check-url", label: "CheckURL" },
            { to: "/check-email", label: "CheckEmail" },
            { to: "/check-domain", label: "CheckDomain" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-white hover:text-secureSphere-purple-light transition-colors duration-200 ease-in-out font-medium"
            >
              {label}
            </Link>
          ))}

          <Link
            to="/login"
            className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white px-4 py-2 rounded-md transition-colors duration-200 ease-in-out font-semibold"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
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
          <nav
            className="bg-secureSphere-gray-900/95 border-t border-secureSphere-gray-800 rounded-b-md shadow-lg"
            aria-label="Mobile Navigation Menu"
          >
            <ul className="flex flex-col space-y-4 px-6 py-5">
              {[
                { to: "/post", label: "Post" },
                { to: "/check-url", label: "CheckURL" },
                { to: "/check-email", label: "CheckEmail" },
                { to: "/check-domain", label: "CheckDomain" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white text-lg font-medium rounded-md px-4 py-2
                             hover:text-secureSphere-purple-light hover:bg-secureSphere-gray-800
                             transition-colors duration-200 ease-in-out"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light
                           hover:opacity-90 text-white px-5 py-2 rounded-md text-center font-semibold
                           transition duration-200 ease-in-out"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Transition>
    </header>
  );
};

export default Navbar;
