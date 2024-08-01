import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Portfolio = () => {
    const [loadImages, setLoadImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://omar-server-side.vercel.app/portfolioImage');
                const data = await response.json();
                setLoadImages(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mx-10 my-10'>
           <div className="my-10">
           <h3 className='text-2xl font-bold text-orange-400'>PORTFOLIO</h3>
           <p className='text-6xl text-slate-50' style={{ fontFamily: '"Times New Roman", Times, serif' }}>WHAT THEY SAY ABOUT OUR STUDIO ? </p>
           </div>

            <Marquee className="text-slate-50">
                <div className="flex flex-row space-x-10 px-5"> {/* Added padding here */}
                    {loadImages.map(image => (
                        <div key={image._id} className="flex h-full">
                            <div className="card lg:card rounded-side bg-base-100 shadow-xl">
                                <figure className="relative w-[30rem] h-[42rem]">
                                    <img
                                        src={image.image}
                                        alt="Album"
                                        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                                    />
                                </figure>
                            </div>
                        </div>
                    ))}
                </div>
            </Marquee>


        </div>

    );
};

export default Portfolio;
