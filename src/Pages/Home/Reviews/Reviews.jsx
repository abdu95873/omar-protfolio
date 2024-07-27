import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const Reviews = () => {
    const [loadData, setLoadData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/reviewSection');
                const data = await response.json();
                setLoadData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='pb-20 mx-10 my-20'>
            <div className='mx-10 my-10 text-center'>
                <h3 className='text-2xl font-bold text-orange-400'>TESTIMONIAL</h3>
                <p className='text-6xl text-slate-50' style={{ fontFamily: '"Times New Roman", Times, serif' }}>WHAT THEY SAY ABOUT OUR STUDIO?</p>
                <p className='text-slate-50'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>

                <Marquee gradient={false} speed={20} pauseOnHover direction="right" >
                    {loadData.map(data => (
                        <div key={data._id} className="card bg-slate-700 text-slate-50 shadow-xl mx-10">
                            <div className="card-body w-96">
                                <p className='text-2xl'>{data.review}</p>
                                <br /><br />
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-xl font-bold text-orange-400'>{data.name}</p>
                                        <p className='text-xl'>{data.designation}</p>
                                    </div>
                                    <div className='items-center'>
                                        <FaQuoteRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
    );
};

export default Reviews;
