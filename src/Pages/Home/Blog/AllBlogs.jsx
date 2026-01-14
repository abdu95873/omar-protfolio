import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://omar-server-side.vercel.app/blogSection");
        const data = await response.json();
        setLoadData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-20 px-6 md:px-20 lg:px-80 space-y-10">
      {loadData.map((data) => (
        <div
          key={data._id}
          className=" shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="hero-content flex-col lg:flex-row gap-6">
            
            {/* Blog Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={data.image}
                alt={data.title}
                className="rounded-lg object-contain w-full h-full"
              />
            </div>

            {/* Blog Text */}
            <div className="w-full lg:w-1/2">
              <Link to={`/singleBlog/${data._id}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-orange-400 hover:underline mb-4">
                  {data.title}
                </h2>
              </Link>
              <p className="text-gray-700">{data.details}</p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBlogs;
