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

            <div className="md:flex flex-wrap gap-10 mx-10 my-10 pt-20 z-0 justify-center">

  <div className="flex items-start gap-5 mb-10 max-w-sm">
    <img className="w-24 my-auto" src={clapperboard} alt="Film Production" />
    <div>
      <h5 className="text-xl font-semibold mb-2">FILM PRODUCTION</h5>
      <p className="text-gray-600 text-xl">
        We produce high-quality films with attention to detail and creativity.
      </p>
    </div>
  </div>

  <div className="flex items-start gap-5 mb-10 max-w-sm">
    <img className="w-24 my-auto" src={camera} alt="Photography" />
    <div>
      <h5 className="text-xl font-semibold mb-2">PHOTOGRAPHY</h5>
      <p className="text-gray-600 text-xl">
        Capturing stunning moments with professional cameras and techniques.
      </p>
    </div>
  </div>

  <div className="flex items-start gap-5 mb-10 max-w-sm">
    <img className="w-24 my-auto" src={music} alt="Music Production" />
    <div>
      <h5 className="text-xl font-semibold mb-2">MUSIC PRODUCTION</h5>
      <p className="text-gray-600 text-xl">
        Composing and producing music tracks that leave a lasting impact.
      </p>
    </div>
  </div>

  <div className="flex items-start gap-5 mb-10 max-w-sm">
    <img className="w-24 my-auto" src={film} alt="Video Editing" />
    <div>
      <h5 className="text-xl font-semibold mb-2">VIDEO EDITING</h5>
      <p className="text-gray-600 text-xl">
        Editing videos with professional tools to create visually stunning results.
      </p>
    </div>
  </div>

</div>



        </div>
    );
};

export default Services;