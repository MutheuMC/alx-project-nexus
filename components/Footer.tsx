import React from "react";

const Footer = () => {
    return (
        <footer className="w-full py-4 text-sm text-gray-500 flex justify-between items-center px-8 border-t bg-black">
            <div className="flex space-x-4">
                <span>&copy; {new Date().getFullYear()} Job Markets</span>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Cookies</a>
            </div>
            <div className="flex space-x-4">
                <a href="#" className="hover:underline">Jobs</a>
                <a href="#" className="hover:underline">Designers</a>
                <a href="#" className="hover:underline">Freelancers</a>
                <a href="#" className="hover:underline">Tags</a>
                <a href="#" className="hover:underline">Places</a>
                <a href="#" className="hover:underline">Resources</a>
            </div>
        </footer>
    );
};

export default Footer;
