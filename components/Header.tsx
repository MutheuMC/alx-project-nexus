'use client';

import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed bg-white z-50 position-sticky">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className='flex gap-4 items-center'>
          {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Job Markets
        </Link>

        {/* SearchBar */}
        <div className="hidden lg:block">
          <SearchBar />
        </div>
        </div>
    

        {/* Navbar */}
        <div className="hidden lg:flex gap-6 items-center">
          <Navbar />
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm">
              Sign up
            </Link>
            <button className="bg-black text-white px-4 py-2 rounded-full">
              Log in
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-md p-6">
          <SearchBar />
          <div className="flex flex-col gap-4 mt-4">
            <Navbar />
            <Link href="#" className="text-sm">
              Sign up
            </Link>
            <button className="bg-black text-white px-4 py-2 rounded-full">
              Log in
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
