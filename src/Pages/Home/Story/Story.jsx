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

  if (!storyData) return <p className="text-center py-20 text-gray-500">Loading...</p>;

  return (
    <div className="mx-6 md:mx-72 pb-20 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Left Content */}
        <div className="space-y-6 md:space-y-10">
          {/* Headings */}
          <div>
            <h3 className="text-sm md:text-base font-semibold text-orange-400 tracking-widest uppercase">
              STORY
            </h3>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mt-2 text-gray-900">
              FEATURED PROJECT
            </h2>
          </div>

          {/* Story Text */}
          <div className="space-y-6 text-gray-700 md:text-base">
            <p className="font-semibold text-xl md:text-2xl leading-relaxed">{storyData.textOne}</p>
            <p className="leading-relaxed text-xl">{storyData.textTwo}</p>

            {/* Author Info */}
            <div className="mt-6">
              <p className="text-lg md:text-xl font-semibold text-orange-400">{storyData.name}</p>
              <p className="text-sm md:text-base italic text-gray-600">{storyData.designation}</p>
            </div>
          </div>
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

      {/* See More Button */}
      <div className="flex justify-end mt-6">
        <Link to="/allStory">
          <button className="text-lg text-slate-400 hover:text-orange-400 transition-colors duration-300">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Story;
