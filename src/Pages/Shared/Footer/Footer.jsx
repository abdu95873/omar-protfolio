import { motion } from "framer-motion";
import logo from '../../../assets/logo.png';
import omar from '../../../assets/omar.png';
import SectionReveal from '../../../components/motion/SectionReveal';

const Footer = () => {
  return (
    <SectionReveal as="footer">
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-10 sm:py-12 lg:py-16">
          <motion.div
            className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 sm:gap-10 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <a href="/" className="flex items-center group justify-center md:justify-start">
              <img src={logo} className="h-12 sm:h-14 md:h-16 mr-2 sm:mr-3" alt="Omar Logo" />
              <img src={omar} className="h-8 sm:h-10 md:h-12" alt="Omar Text Logo" />
            </a>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
              <div className="col-span-2 sm:col-span-1">
                <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase text-orange-400 tracking-wider">Others</h2>
                <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                  <li><a href="/contact" className="hover:text-orange-400 transition-colors">Contact</a></li>
                  <li><a href="/gallery" className="hover:text-orange-400 transition-colors">Gallery</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase text-orange-400 tracking-wider">Follow Us</h2>
                <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                  <li><a href="https://www.facebook.com/mohammad.omar.602590" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Facebook</a></li>
                  <li><a href="https://www.instagram.com/explorewith0mar?igsh=c3RjeGV4a3NoN25o" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                  <li><a href="https://www.youtube.com/@explorewithomar" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">YouTube</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase text-orange-400 tracking-wider">Legal</h2>
                <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </motion.div>

          <hr className="border-gray-800 my-5 sm:my-6" />

          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left leading-relaxed">
            OMAR © 2024 — Developed by{' '}
            <a href="https://www.linkedin.com/in/abdullah958/" className="text-orange-400/90 hover:text-orange-400 transition-colors">
              ABDULLAH
            </a>
          </p>
        </div>
      </footer>
    </SectionReveal>
  );
};

export default Footer;
