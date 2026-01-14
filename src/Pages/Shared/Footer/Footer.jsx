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
              <h2 className="mb-4 text-sm font-semibold uppercase text-orange-400 font-poppins">Others</h2>
              <ul className="space-y-2 text-gray-400 font-roboto">
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
              <h2 className="mb-4 text-sm font-semibold uppercase text-orange-400 font-poppins">Follow Us</h2>
              <ul className="space-y-2 text-gray-400 font-roboto">
                <li><a href="https://www.facebook.com/mohammad.omar.602590" className="hover:text-orange-400 transition-colors">Facebook</a></li>
                <li><a href="https://www.instagram.com/explorewith0mar?igsh=c3RjeGV4a3NoN25o" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                {/* <li><a href="#" className="hover:text-orange-400 transition-colors">TikTok</a></li> */}
                <li><a href="https://www.youtube.com/@explorewithomar" className="hover:text-orange-400 transition-colors">YouTube</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-orange-400 font-poppins">Legal</h2>
              <ul className="space-y-2 text-gray-400 font-roboto">
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


          <div className="flex mt-4 sm:mt-0 space-x-4">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 0H2C0.9 0 0 0.9 0 2v20c0 1.1 0.9 2 2 2h11v-9h-3v-4h3V8.5c0-3 1.8-4.5 4.4-4.5 1.3 0 2.6 0.1 3 0.1v3.5h-2c-1.6 0-2 0.8-2 2v2.5h4l-1 4h-3v9h5c1.1 0 2-0.9 2-2V2c0-1.1-0.9-2-2-2z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.584 0.012 4.85 0.07 1.17 0.055 1.963 0.24 2.42 0.402a4.92 4.92 0 0 1 1.78 1.045 4.92 4.92 0 0 1 1.045 1.78c0.162 0.457 0.347 1.25 0.402 2.42 0.058 1.266 0.07 1.65 0.07 4.85s-0.012 3.584-0.07 4.85c-0.055 1.17-0.24 1.963-0.402 2.42a4.92 4.92 0 0 1-1.045 1.78 4.92 4.92 0 0 1-1.78 1.045c-0.457 0.162-1.25 0.347-2.42 0.402-1.266 0.058-1.65 0.07-4.85 0.07s-3.584-0.012-4.85-0.07c-1.17-0.055-1.963-0.24-2.42-0.402a4.92 4.92 0 0 1-1.78-1.045 4.92 4.92 0 0 1-1.045-1.78c-0.162-0.457-0.347-1.25-0.402-2.42-0.058-1.266-0.07-1.65-0.07-4.85s0.012-3.584 0.07-4.85c0.055-1.17 0.24-1.963 0.402-2.42a4.92 4.92 0 0 1 1.045-1.78 4.92 4.92 0 0 1 1.78-1.045c0.457-0.162 1.25-0.347 2.42-0.402 1.266-0.058 1.65-0.07 4.85-0.07m0-2.2C8.74 0 8.332 0.013 7.052 0.072 5.773 0.13 4.827 0.313 4.042 0.568a7.137 7.137 0 0 0-2.59 1.492A7.137 7.137 0 0 0 .568 4.042C0.313 4.827 0.13 5.773 0.072 7.052 0.013 8.332 0 8.74 0 12s0.013 3.668 0.072 4.948c0.058 1.279 0.241 2.225 0.496 3.01a7.137 7.137 0 0 0 1.492 2.59 7.137 7.137 0 0 0 2.59 1.492c0.785 0.255 1.731 0.438 3.01 0.496C8.332 23.987 8.74 24 12 24s3.668-0.013 4.948-0.072c1.279-0.058 2.225-0.241 3.01-0.496a7.137 7.137 0 0 0 2.59-1.492 7.137 7.137 0 0 0 1.492-2.59c0.255-0.785 0.438-1.731 0.496-3.01C23.987 15.668 24 15.26 24 12s-0.013-3.668-0.072-4.948c-0.058-1.279-0.241-2.225-0.496-3.01a7.137 7.137 0 0 0-1.492-2.59 7.137 7.137 0 0 0-2.59-1.492c-0.785-0.255-1.731-0.438-3.01-0.496C15.668 0.013 15.26 0 12 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
