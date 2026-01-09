import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";

const AllReviews = () => {
  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviewSection");
        const data = await response.json();
        setLoadData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-20 px-6 md:px-20 lg:px-40 grid gap-10 md:grid-cols-3 bg-white">
      {loadData.map((data) => (
        <div
          key={data._id}
          className="mb-10 bg-white text-gray-800 shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300"
        >
          <div>
            <p className="text-lg md:text-xl text-gray-700 mb-6">{data.review}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-orange-500 font-bold text-lg md:text-xl">{data.name}</p>
              <p className="text-gray-500 text-sm md:text-base">{data.designation}</p>
            </div>
            <FaQuoteRight className="text-orange-400 text-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
