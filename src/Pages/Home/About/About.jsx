import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import useInView from './useInView';
import SectionReveal from '../../../components/motion/SectionReveal';
import SectionHeading from '../../../components/ui/SectionHeading';

const About = () => {
    const [urlData, setUrlData] = useState(null);
    const [subTitleData, setSubTitleData] = useState(null);
    const [detailsData, setDetailsData] = useState(null);
    const statsRef = useRef(null);
    const isInView = useInView(statsRef);

    useEffect(() => {
        axios.get('https://omar-server-side.vercel.app/about')
            .then(response => {
                if (response.data.length > 0) {
                    setUrlData(response.data[0].url);
                    setSubTitleData(response.data[0].subtitle);
                    setDetailsData(response.data[0].details);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <SectionReveal className="section-shell">
            <div className="section-card">
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-12 pb-8 sm:pb-10">
                    <SectionHeading
                        align="left"
                        label="OMAR STUDIO"
                        title="HAVE IDEA FOR YOUR PROJECT?"
                        className="mb-0"
                    />
                    <motion.div
                        ref={statsRef}
                        className="grid grid-cols-2 gap-4 sm:flex sm:justify-around sm:gap-6"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {[
                            { end: 100, label: 'Frames & Stories' },
                            { end: 58, label: "Visuals I've Created" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="text-center rounded-xl bg-orange-50/50 sm:bg-transparent py-4 sm:py-0"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                            >
                                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-orange-400">
                                    {isInView && <CountUp start={0} end={stat.end} duration={2.5} />}+
                                </p>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2 px-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <p className="text-body mb-8 sm:mb-12 max-w-5xl">
                    I bring your ideas to life through cinematic visuals and compelling storytelling. From concept to final cut, I personally oversee each project, with the support of my talented team, ensuring your story connects, inspires, and leaves a lasting impact.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14">
                    <motion.div
                        className="relative overflow-hidden rounded-xl sm:rounded-2xl col-span-1 lg:col-span-3 shadow-soft w-full"
                        style={{ paddingTop: '56.25%' }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.4 }}
                    >
                        {urlData && (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={urlData}
                                title="YouTube video player"
                                allowFullScreen
                            />
                        )}
                    </motion.div>
                    <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">{subTitleData}</h3>
                        <p className="text-body">{detailsData}</p>
                    </div>
                </div>
            </div>
        </SectionReveal>
    );
};

export default About;
