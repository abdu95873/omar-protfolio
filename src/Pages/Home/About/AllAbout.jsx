import axios from 'axios';
import { useEffect, useState } from 'react';


const AllAbout = () => {
    const [urlData, setUrlData] = useState(null);
    const [subTitleData, setSubTitleData] = useState(null); 
    const [detailsData, setDetailsData] = useState(null); 

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
        <div className='bg-black text-slate-50 my-10'>
            <div className='grid grid-cols-1 md:grid-cols-5 mx-10 gap-20'>
                <div className="relative overflow-hidden col-span-3 " style={{ paddingTop: "56.25%" }}> {/* 16:9 aspect ratio */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={urlData}
                        title="YouTube video player"
                        allowFullScreen
                    />
                </div>
                <div className='col-span-2 my-auto'>
                    <h1 className='text-2xl font-bold'>{subTitleData}</h1>
                    <br />
                    <p>{detailsData}</p>

                </div>
            </div>
        </div>
    );
};

export default AllAbout;