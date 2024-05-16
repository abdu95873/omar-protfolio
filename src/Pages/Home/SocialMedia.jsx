import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";




const SocialMedia = () => {
    return (
        <div className='text-white pb-20 mx-10 my-20'>
            <div className='text-center'>
                <h1 className='text-5xl'>HAVE IDEA IN YOUR MIND ? LET'S START YOUR PROJECT WITH US</h1>
                <p className='text-lg text-orange-400'> CINESTAR STUDIO, +123-456-789 OR HELLO@AWESOMESITE.COM</p>
            </div>
            <div className='flex gap-5 justify-center py-5'>
                <FaFacebook className='w-16 h-16'
                 />
                <FaInstagram className='w-16 h-16'/>
                <FaTwitter className='w-16 h-16'/>
            </div>

        </div>
    );
};

export default SocialMedia;