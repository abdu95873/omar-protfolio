import React from 'react';
import logo from '../../../assets/logo.png';
import omar from '../../../assets/omar.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-16 lg:px-32 py-10 lg:py-16">
        {/* Logo Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <a href="/" className="flex items-center mb-6 md:mb-0">
            <img src={logo} className="h-14 md:h-16 mr-3" alt="Omar Logo" />
            <img src={omar} className="h-10 md:h-12" alt="Omar Text Logo" />
          </a>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {/* Others */}
            <div>
              <h2 className="mb-4 text-lg font-semibold uppercase text-orange-400 font-poppins">Others</h2>
              <ul className="text-xl space-y-2 text-gray-400 font-roboto">
                <li>
                  <a href="/contact" className="hover:text-orange-400 transition-colors">Contact</a>
                </li>
                <li>
                  <a href="/gallery" className="hover:text-orange-400 transition-colors">Gallery</a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h2 className="mb-4 text-lg font-semibold uppercase text-orange-400 font-poppins">Follow Us</h2>
              <ul className="text-xl space-y-2 text-gray-400 font-roboto">
                <li><a href="https://www.facebook.com/mohammad.omar.602590" className="hover:text-orange-400 transition-colors">Facebook</a></li>
                <li><a href="https://www.instagram.com/explorewith0mar?igsh=c3RjeGV4a3NoN25o" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                {/* <li><a href="#" className="hover:text-orange-400 transition-colors">TikTok</a></li> */}
                <li><a href="https://www.youtube.com/@explorewithomar" className="hover:text-orange-400 transition-colors">YouTube</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-4 text-lg font-semibold uppercase text-orange-400 font-poppins">Legal</h2>
              <ul className="text-xl space-y-2 text-gray-400 font-roboto">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>


        <hr className="border-gray-700 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span className="text-sm sm:text-left text-gray-400 font-roboto">
  OMAR © 2024 - Developed & Maintained by&nbsp;
  <a
    href="https://www.linkedin.com/in/abdullah958/"
    className="hover:text-orange-400 transition-colors"
  >
    ABDULLAH
  </a>
</span>


          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
