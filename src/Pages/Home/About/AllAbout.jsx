import axios from 'axios';
import { useEffect, useState } from 'react';

const AllAbout = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/about')
      .then((response) => {
        setAboutData(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="my-10 text-center text-gray-500">
        Loading videos...
      </div>
    );
  }

  return (
    <div className="my-10 px-4 md:px-10 space-y-14">
      {aboutData.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-20 rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-4 bg-white"
        >
          {/* Video Section */}
          <div
            className="relative col-span-1 md:col-span-3 shadow-lg rounded-xl overflow-hidden"
            style={{ paddingTop: '56.25%' }} // 16:9 ratio
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={item.url}
              title={item.subtitle}
              allowFullScreen
            />
          </div>

          {/* Text Section */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {item.subtitle}
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {item.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllAbout;
