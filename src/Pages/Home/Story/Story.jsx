import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Story = () => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    axios.get('https://omar-server-side.vercel.app/storySection')
      .then(response => {
        if (response.data.length > 0) {
          setStoryData(response.data[0]);
        } else {
          console.error('No story data found.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!storyData) return <p className="text-center py-20">Loading...</p>;

  return (
  <div className='mx-10 pb-20 md:py-20 md:mx-72 '>      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6 md:space-y-10">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-orange-400 tracking-wide">STORY</h3>
            <p className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mt-2">
              FEATURED PROJECT
            </p>
          </div>
          <div className="space-y-4 text-gray-700 md:text-lg">
            <p>{storyData.textOne}</p>
            <p>{storyData.textTwo}</p>
            <div className="mt-4">
              <p className="text-xl font-semibold text-orange-400">{storyData.name}</p>
              <p className="text-lg">{storyData.designation}</p>
            </div>
          </div>
          <Link to="/allStory" className="inline-block mt-6">
            <button className="text-lg text-slate-300 hover:text-orange-400 transition-colors duration-300">
              See More
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl h-96 md:h-[50rem]">
            <img
              src={storyData.image}
              alt={storyData.name}
              className="w-full h-full object-cover rounded-tr-3xl rounded-bl-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
