import React from 'react';
import banner from '../../../assets/banner.webp';

const Banner = () => {
    return (
        <div className='relative'>
            <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div> {/* Gradient overlay */}
            <img className='h-auto ' src={banner} alt="banner" />
        </div>
        <div className='hidden sm:block bg-orange-400 text-white w-96 px-16 py-10 mx-16 absolute bottom-0 right-0 '>
            <h3 className='font-bold'>WE ARE THE BEST STUDIO PRODUCTION</h3>
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
        </div>
        </div>
    );
};

export default Banner;
