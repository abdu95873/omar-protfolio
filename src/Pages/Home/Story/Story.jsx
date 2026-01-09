import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Story = () => {


    const [imageData, setImageData] = useState(null);
    const [textOneData, setTextOneData] = useState(null);
    const [textTwoData, setTextTwoData] = useState(null);
    const [nameData, setNameData] = useState(null);
    const [designationData, setDesignationData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/storySection')
            .then(response => {
                console.log('Response:', response.data);
                if (response.data.length > 0) {
                    setImageData(response.data[0].image);
                    setTextOneData(response.data[0].textOne);
                    setTextTwoData(response.data[0].textTwo);
                    setNameData(response.data[0].name);
                    setDesignationData(response.data[0].designation);
                } else {
                    console.error('No youtube url found.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='pb-24 md:py-24 my-24 md:mx-72'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16' >
                
                <div className=' pt-14 md:py-32 mx-10'>
                    <div >
                        <h3 className='text-2xl font-bold text-orange-400'>STORY</h3>
                        <p className='text-6xl' style={{ fontFamily: '"Times New Roman", Times, serif' }}>FEATURED PROJECT</p>
                    </div>
                    <br />
                    <div className='pt-20'>
                        {textOneData}
                        <br /><br />
                        {textTwoData}
                        <br /><br />
                        <p className='text-xl text-orange-400'>{nameData}</p>
                        <p className='text-xl'>{designationData}</p>
                    </div>
                </div>

                <div>
                   <div className="flex justify-center" style={{ height: '50rem' }}>
            <div className="flex justify-center" style={{ height: '50rem' }}>
  <img 
    src={imageData} 
    alt="img" 
    className="w-auto h-full rounded-tr-3xl rounded-bl-3xl shadow-lg object-cover"
  />
</div>
                </div>

                </div>
            </div>
            <Link className="text-slate-300 flex justify-end mt-20" to="/allStory">
                    <button className="text-lg hover:text-orange-400">See More</button>
                </Link>
        </div>
    );
};

export default Story;
