import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const AllReviews = () => {
    const [loadData, setLoadData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://omar-server-side.vercel.app/reviewSection');
                const data = await response.json();
                setLoadData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='gap-10 grid grid-cols-3 p-10'>
                    {loadData.map(data => (
                        <div key={data._id} className="card bg-slate-700 text-slate-50 shadow-xl">
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
            </div>
    );
};

export default AllReviews;
