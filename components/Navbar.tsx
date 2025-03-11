import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="hidden lg:flex items-center gap-8 text-sm text-black">
   
      <Link href="/">Find Jobs</Link>
      <Link href="#">Blog</Link>
    </nav>
  );
};

export default Navbar;
