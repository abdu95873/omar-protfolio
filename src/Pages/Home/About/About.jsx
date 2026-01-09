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
        axios.get('http://localhost:5000/about')
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
            <div className='grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-10 pb-10 md:pb-20 gap-4 md:gap-10'>
                <div>
                    <h3 className='text-xl md:text-2xl font-bold text-orange-400'>CINESTER STUDIO</h3>
                    <p className='text-3xl md:text-6xl' style={{ fontFamily: '"Times New Roman", Times, serif' }}>HAVE IDEA FOR YOUR PROJECT ?</p>
                </div>
                <div>
                    <p>Proin et magna blandit arcu pellentesque scelerisque sit amet a sapien. Aenean purus nunc, cursus in ante in, vehicula facilisis dui. Integer consequat consectetur est id blandit. Duis fermentum nulla non mi tempor elementum. Donec efficitur ac eros quis porta.</p>
                </div>
            </div>

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
                    <h1 className='text-2xl font-bold'>{subTitleData}</h1>
                    <br />
                    <p>{detailsData}</p>

                    <div ref={statsRef} className='flex justify-around py-20'>
                        <div>
                            <p className='flex justify-center text-7xl font-bold py-5 text-orange-400'>
                                {isInView && <CountUp start={0} end={50} duration={3} />}+
                            </p>
                            <p>MOVIE PRODUCTION</p>
                        </div>
                        <div>
                            <p className='flex justify-center text-7xl font-bold mx-auto py-5 text-orange-400'>
                                {isInView && <CountUp start={0} end={28} duration={3} />}+
                            </p>
                            <p>MUSIC VIDEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
