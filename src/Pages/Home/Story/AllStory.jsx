import { useEffect, useState } from "react";

const AllStory = () => {
    const [loadData, setLoadData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/storySection');
                const data = await response.json();
                setLoadData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mx-10 md:mx-72'>
            {loadData.map((data, index) => (
                <div
                    key={data._id}
                    className='grid grid-cols-1 md:grid-cols-2 gap-16 my-24 items-center shadow-xl'
                >
                    <div className={`flex justify-center order-first ${index % 2 === 0 ? 'md:order-last' : 'md:order-first'}`}>
                        <img src={data.image} alt="img" className='w-auto max-h-40vh' style={{ maxHeight: '5in', objectFit: 'cover' }} />
                    </div>
                    <div className={`bg-custom-black text-slate-50 md:py-20 order-last ${index % 2 === 0 ? 'md:order-first' : 'md:order-last'}`}>
                        <div className='md:pt-20'>
                            {data.textOne}
                            <br /><br />
                            {data.textTwo}
                            <br /><br />
                            <p className='text-xl text-orange-400'>{data.name}</p>
                            <p className='text-xl'>{data.designation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllStory;
