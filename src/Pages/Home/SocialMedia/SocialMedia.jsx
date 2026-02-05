import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="py-20">
      <div className="h-1"></div>

      <div className="w-full flex flex-col justify-center" id="bgImage">
        <div className="text-center my-auto">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            HAVE AN IDEA IN YOUR MIND? START YOUR PROJECT WITH US
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-orange-400">
            +880 18822 70941 OR mohammadomar2787@gmail.com
          </p>
        </div>

        <div className="flex gap-5 justify-center  mt-10">
          <a
            href="https://www.facebook.com/mohammad.omar.602590"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            <FaFacebook className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
          </a>

          <a
            href="https://www.instagram.com/explorewith0mar?igsh=c3RjeGV4a3NoN25o"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-pink-500 transition-colors duration-300"
          >
            <FaInstagram className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
          </a>

          <a
            href="https://www.youtube.com/@explorewithomar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-red-600 transition-colors duration-300"
          >
            <FaYoutube className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
