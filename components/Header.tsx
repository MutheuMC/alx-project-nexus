"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Search, Home, Briefcase, Bell, Settings, LogOut } from "lucide-react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, fetchWithAuth } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (user) { // Only make the API request if the user is logged in
        try {
          await fetchWithAuth("https://michaelmwanza.site/api/auth/profile/");
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    checkAuth();
  }, [user, fetchWithAuth]); // Re-run if `user` changes

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (open) {
      const handleClickOutside = (e:  MouseEvent) => {
        // Skip this check if clicking on the menu button itself
        const target = e.target as HTMLElement;
        if (target.closest('.menu-button')) {
          return;
        }
        
        if (!target.closest('.mobile-menu')) {
          setOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  const toggleMenu = (e:  React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setOpen(!open);
  };

  return (
    <header className="w-full fixed bg-white z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Section: Logo & Search */}
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-2xl font-bold">
            Job Markets
          </Link>

          <div className="hidden lg:block">
            <SearchBar />
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex gap-6 items-center">
          <Navbar />
          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <User size={18} />
                <span>{user.username}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/signup" className="text-sm">
                Sign up
              </Link>
              <Link href="/login" className="bg-black text-white px-4 py-2 rounded-full">
                Log in
              </Link>
            </div>
          )}
        </div>

        {/* Fixed Mobile Menu Button */}
        <button 
          className="lg:hidden z-50 menu-button p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Improved Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-md p-6 mobile-menu absolute w-full">
          {/* User Profile Section for Mobile */}
          {user ? (
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-200 p-3 rounded-full">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">View your profile</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 mb-4">
              <Link href="/login" className="bg-black text-white px-4 py-3 rounded-lg text-center font-medium">
                Log in
              </Link>
              <Link href="/signup" className="border border-gray-300 px-4 py-3 rounded-lg text-center font-medium">
                Sign up
              </Link>
            </div>
          )}
          
          {/* Navigation Links with Icons */}
          <nav className="space-y-1">
            <Link href="/" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg" onClick={() => setOpen(false)}>
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link href="/jobs" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg" onClick={() => setOpen(false)}>
              <Briefcase size={20} />
              <span>Browse Jobs</span>
            </Link>
            
            <Link href="/notifications" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg" onClick={() => setOpen(false)}>
              <Bell size={20} />
              <span>Notifications</span>
            </Link>
            
            {user && (
              <>
                <Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg" onClick={() => setOpen(false)}>
                  <Settings size={20} />
                  <span>Account Settings</span>
                </Link>
                
                <button 
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }} 
                  className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
          
          {/* Footer Links */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
              <Link href="/help" onClick={() => setOpen(false)}>Help Center</Link>
              <Link href="/privacy" onClick={() => setOpen(false)}>Privacy</Link>
              <Link href="/terms" onClick={() => setOpen(false)}>Terms</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
