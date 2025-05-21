import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secureSphere-gray-900 border-t border-secureSphere-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                SecureSphere
              </span>
            </div>
            <p className="text-secureSphere-gray-400 text-sm">
              Protecting your digital identity through advanced scam detection
              and prevention tools.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  Link & Email Analyzer
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  Scam Reporting Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  Scam Heatmap
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
                >
                  AI Chatbot Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-secureSphere-gray-400 text-sm">
                <Mail className="h-4 w-4 text-secureSphere-purple-light" />
                <span>support@securesphere.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Subscribe to our newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-secureSphere-gray-800 border border-secureSphere-gray-700 rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-secureSphere-purple-light"
                />
                <button
                  type="submit"
                  className="bg-secureSphere-purple hover:bg-secureSphere-purple-light text-white rounded-md px-3 py-2 text-sm transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-secureSphere-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secureSphere-gray-400 text-sm">
            © {new Date().getFullYear()} SecureSphere. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-secureSphere-gray-400 hover:text-secureSphere-purple-light transition-colors text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
