import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionReveal from '../../../components/motion/SectionReveal';

const socials = [
  { href: "https://www.facebook.com/mohammad.omar.602590", Icon: FaFacebook, hover: "hover:text-blue-600" },
  { href: "https://www.instagram.com/filmby0mar", Icon: FaInstagram, hover: "hover:text-pink-500" },
  { href: "https://www.youtube.com/@explorewithomar", Icon: FaYoutube, hover: "hover:text-red-600" },
];

const SocialMedia = () => {
  return (
    <SectionReveal className="section-shell pb-12 sm:pb-16">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 text-center">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.4),transparent_50%)]" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-snug sm:leading-tight px-2">
            HAVE AN IDEA IN YOUR MIND? START YOUR PROJECT WITH US
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-orange-400 break-words px-2">
            <a href="tel:+8801882270941" className="hover:underline">+357 96 630110</a>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline mt-1 sm:mt-0">
              <a href="mailto:mohammadomar2787@gmail.com" className="hover:underline text-sm sm:text-inherit">mohammadomar2787@gmail.com</a>
            </span>
          </p>
          <div className="flex gap-5 sm:gap-6 justify-center mt-8 sm:mt-10">
            {socials.map(({ href, Icon, hover }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/90 ${hover} transition-colors duration-300`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.12, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default SocialMedia;
