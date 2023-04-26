import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; 2023 Habitatsy Inc. All rights reserved.</p>
            <p className="text-sm mt-2">Made with ❤️ by the Habitatsy team</p>
          </div>
          <div className="flex items-center">
            <a href="#" className="mr-4 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
