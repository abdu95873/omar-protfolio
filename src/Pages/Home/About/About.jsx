import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import useInView from './useInView'; // Make sure the path is correct

const About = () => {
    const [urlData, setUrlData] = useState(null);
    const [subTitleData, setSubTitleData] = useState(null);
    const [detailsData, setDetailsData] = useState(null);
    const statsRef = useRef(null);
    const isInView = useInView(statsRef);

    useEffect(() => {
        axios.get('https://omar-server-side.vercel.app/about')
            .then(response => {
                console.log('Response:', response.data);
                if (response.data.length > 0) {
                    setUrlData(response.data[0].url);
                    setSubTitleData(response.data[0].subtitle);
                    setDetailsData(response.data[0].details);
                } else {
                    console.error('No youtube url found.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='  md:py-20 my-20 md:mx-72 shadow-xl'>
            <div className='grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-10 pb-10 md:pb-10 gap-4 md:gap-10'>
                <div>
                    <h3 className='text-xl md:text-2xl font-bold text-orange-400'>OMAR STUDIO</h3>
                    <p className='text-3xl md:text-6xl' style={{ fontFamily: '"Times New Roman", Times, serif' }}>HAVE IDEA FOR YOUR PROJECT ?</p>
                </div>
               
                     <div ref={statsRef} className='flex justify-around my-10 gap-4 '>
                        <div>
                            <p className='flex justify-center text-7xl font-bold text-orange-400'>
                                {isInView && <CountUp start={0} end={100} duration={3} />}+
                            </p>
                            <p className='text-center'>Frames & Stories</p>
                        </div>
                        <div>
                            <p className='flex justify-center text-7xl font-bold mx-auto  text-orange-400'>
                                {isInView && <CountUp start={0} end={58} duration={3} />}+
                            </p>
                            <p className='text-center'>Visuals I’ve Created</p>
                        </div>
                    </div>
                
            </div>
            <div className='mx-4 md:mx-10 mb-20'>   <p>I bring your ideas to life through cinematic visuals and compelling storytelling. From concept to final cut, I personally oversee each project, with the support of my talented team, ensuring your story connects, inspires, and leaves a lasting impact.</p></div>

            <div className='grid grid-cols-1 md:grid-cols-5 mx-10 gap-20 '>
                <div className="relative overflow-hidden col-span-3" style={{ paddingTop: "56.25%" }}> {/* 16:9 aspect ratio */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={urlData}
                        title="YouTube video player"
                        allowFullScreen
                    />
                </div>

                <div className='col-span-2 md:my-20'>
                    <h1 className='text-3xl font-bold'>{subTitleData}</h1>
                    <br />
                    <p>{detailsData}</p>

                    
                </div>
            </div>
        </div>
    );
};

export default About;
