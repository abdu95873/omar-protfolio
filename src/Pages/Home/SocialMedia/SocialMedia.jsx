import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "./styles.css"




const SocialMedia = () => {
    return (
        <div className="bg-custom-black ">
            <div className="h-1 bg-slate-200 "></div>

            <div className='text-slate-50 w-full h-screen flex flex-col justify-center' id='bgImage'> {/* Set height to full screen */}
            <div className='text-center my-auto'> {/* Centered text */}
        <h1 className='text-3xl md:text-4xl lg:text-5xl' style={{ fontFamily: '"Times New Roman", Times, serif' }}>HAVE AN IDEA IN YOUR MIND? START YOUR PROJECT WITH US</h1>
        <p className='text-lg md:text-xl lg:text-2xl font-bold text-orange-400'>CINESTAR STUDIO, +123-456-789 OR HELLO@AWESOMESITE.COM</p>
        </div>
        <div className='flex gap-5 justify-center py-5'>
        <a href="https://www.facebook.com/panchphoronevents?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
            <FaFacebook className='w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16' />
        </a>
        <a href="https://www.instagram.com/explorewith0mar?igsh=c3RjeGV4a3NoN25o" target="_blank" rel="noopener noreferrer">
            <FaInstagram className='w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16' />
        </a>
        <a href="https://www.youtube.com/@explorewithomar" target="_blank" rel="noopener noreferrer">
            <FaYoutube className='w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16' />
        </a>
        </div>
    </div>

        </div> 

    );
};

export default SocialMedia;