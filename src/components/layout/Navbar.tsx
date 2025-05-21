import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, LogIn, LogOut, User, Bell } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AuthModal from "../auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      },
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-secureSphere-gray-900/90 border-b border-secureSphere-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
              SecureSphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-secureSphere-purple-light transition-colors"
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="text-secureSphere-gray-300 hover:text-white transition-colors"
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="text-secureSphere-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-secureSphere-gray-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-secureSphere-gray-800 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5 text-secureSphere-gray-300" />
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-secureSphere-purple text-white text-xs">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 bg-secureSphere-gray-900 border border-secureSphere-gray-800 text-white"
                  >
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-secureSphere-gray-800" />
                    <div className="max-h-80 overflow-y-auto">
                      <DropdownMenuItem className="py-3 cursor-pointer hover:bg-secureSphere-gray-800">
                        <div>
                          <p className="font-medium">New security alert</p>
                          <p className="text-xs text-secureSphere-gray-400">
                            A new phishing campaign has been detected
                          </p>
                          <p className="text-xs text-secureSphere-gray-500 mt-1">
                            2 minutes ago
                          </p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="py-3 cursor-pointer hover:bg-secureSphere-gray-800">
                        <div>
                          <p className="font-medium">
                            Security report available
                          </p>
                          <p className="text-xs text-secureSphere-gray-400">
                            Your monthly security report is ready
                          </p>
                          <p className="text-xs text-secureSphere-gray-500 mt-1">
                            1 hour ago
                          </p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="py-3 cursor-pointer hover:bg-secureSphere-gray-800">
                        <div>
                          <p className="font-medium">System update</p>
                          <p className="text-xs text-secureSphere-gray-400">
                            SecureSphere has been updated to v2.1
                          </p>
                          <p className="text-xs text-secureSphere-gray-500 mt-1">
                            1 day ago
                          </p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative flex items-center gap-2 px-2 py-1 rounded-full bg-secureSphere-gray-800 hover:bg-secureSphere-gray-700"
                    >
                      <Avatar className="h-8 w-8 border-2 border-secureSphere-purple-light">
                        <AvatarImage
                          src={user.user_metadata?.avatar_url || ""}
                        />
                        <AvatarFallback className="bg-secureSphere-purple text-white">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-white">
                        {user.user_metadata?.full_name?.split(" ")[0] || "User"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-secureSphere-gray-900 border border-secureSphere-gray-800 text-white"
                  >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-secureSphere-gray-800" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-secureSphere-gray-800">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-secureSphere-gray-800">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Security Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-secureSphere-gray-800" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer hover:bg-secureSphere-gray-800"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={openAuthModal}
                className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {!loading && user && (
              <Avatar className="h-8 w-8 border-2 border-secureSphere-purple-light">
                <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                <AvatarFallback className="bg-secureSphere-purple text-white">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            )}
            <Button
              variant="ghost"
              onClick={toggleMenu}
              size="icon"
              className="text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secureSphere-gray-900 border-t border-secureSphere-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-secureSphere-purple-light transition-colors py-2"
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="text-secureSphere-gray-300 hover:text-white transition-colors py-2"
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="text-secureSphere-gray-300 hover:text-white transition-colors py-2"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-secureSphere-gray-300 hover:text-white transition-colors py-2"
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-secureSphere-gray-800">
              {loading ? (
                <div className="w-full h-10 rounded bg-secureSphere-gray-800 animate-pulse"></div>
              ) : user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 py-2">
                    <User className="h-4 w-4 text-secureSphere-gray-400" />
                    <span className="text-white">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-secureSphere-gray-700 text-white hover:bg-secureSphere-gray-800"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={openAuthModal}
                  className="w-full bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
};

export default Navbar;
