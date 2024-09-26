import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/bannerImage')
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
        <div className='relative h-screen md:h-[70vh] overflow-hidden'> {/* Adjust height for medium screens */}
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>

            {bannerData && (
                <img
                    className='h-full w-full object-cover'
                    src={bannerData}
                    alt="banner"
                />
            )}

            <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-slate-50 z-20'>
                <h3 className='text-6xl md:text-9xl' style={{ fontFamily: '"Times New Roman", Times, serif' }}>PHOTO & FILM</h3>
                <h3 className='text-6xl md:text-9xl text-orange-400' style={{ fontFamily: '"Times New Roman", Times, serif' }}>PRODUCTION</h3>
                <h4 className='text-lg md:text-2xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
            </div>
        </div>







    );
};



export default Banner;
