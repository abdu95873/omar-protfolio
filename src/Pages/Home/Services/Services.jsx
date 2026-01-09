import React from 'react';
// import './style.css'
import clapperboard from '../../../assets/Service/clapperboard.png'
import camera from '../../../assets/Service/photo.png'
import music from '../../../assets/Service/music-notes.png'
import film from '../../../assets/Service/film-reel.png'

const Services = () => {
    return (
        <div className='p-20 mx-auto my-20' id='body'>
            <div className='mx-10 my-10 text-center pt-14'>
                <h3 className='text-2xl font-bold text-orange-400'>SERVICES</h3>
                <p className='text-6xl ' style={{ fontFamily: '"Times New Roman", Times, serif' }}>WHAT THEY SAY ABOUT OUR STUDIO ? </p>
            </div>

            <div className='md:flex  gap-10 mx-10 my-10 pt-20 z-0'>

                <div className='flex items-center justify-center gap-5 mb-10'>
                <img className='w-24' src={clapperboard} alt="" />
                    <div className='ml-4'>
                        <h5>FILM PRODUCTION</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, veniam.</p>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-5 mb-10'>
                    <img className='w-24' src={camera} alt="" />
                    <div className='ml-4 mx-20'>
                        <h5>FILM PRODUCTION</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, veniam.</p>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-5 mb-10'>
                    <img className='w-24' src={music} alt="" />
                    <div className='ml-4'>
                        <h5>FILM PRODUCTION</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, veniam.</p>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-5 mb-10'>
                    <img className='w-24' src={film} alt="" />
                    <div className='ml-4'>
                        <h5>FILM PRODUCTION</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, veniam.</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Services;