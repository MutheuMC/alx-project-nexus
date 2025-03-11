import React from "react";

const Footer = () => {
    return (
        
        <footer className="w-full py-4 text-sm text-black flex justify-center items-center p-20  bg-white">
            <div className="flex space-x-4">
                <span>&copy; {new Date().getFullYear()} Job Markets</span>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Cookies</a>
            </div>
            
        </footer>

    );
};

export default Footer;