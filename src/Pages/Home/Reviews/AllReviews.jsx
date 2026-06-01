import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import SectionHeading from "../../../components/ui/SectionHeading";

const AllReviews = () => {
  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://omar-server-side.vercel.app/reviewSection");
        const data = await response.json();
        setLoadData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section-shell">
      <SectionHeading label="TESTIMONIAL" title="ALL REVIEWS" />
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

export default AllReviews;
