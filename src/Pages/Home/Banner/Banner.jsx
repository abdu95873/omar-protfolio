import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        axios.get('https://omar-server-side.vercel.app/bannerImage')
            .then(response => {
                console.log('Response:', response.data);
                if (response.data.length > 0) {
                    setBannerData(response.data[0].image); // Assuming the response has an array with objects containing 'image' field
                } else {
                    console.error('No banner image found.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='relative'>
            <div className='relative'>
                <div className='absolute inset-0  bg-gradient-to-t from-black to-transparent'></div> {/* Gradient overlay */}
                {bannerData && <img className='h-screen w-full' src={bannerData} alt="banner" />}
                <div className='hidden sm:flex flex-col items-center justify-center text-center text-slate-50 absolute inset-0 z-20'>
                    <h3 className='text-9xl ' style={{ fontFamily: '"Times New Roman", Times, serif' }}>PHOTO & FILM</h3> 
                    <h3 className='text-9xl text-orange-400' style={{ fontFamily: '"Times New Roman", Times, serif' }}>PRODUCTION</h3>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                </div>
            </div>
        </div>
    );
};

export default Banner;
