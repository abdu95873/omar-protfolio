import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AllStory = () => {
  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://omar-server-side.vercel.app/storySection");
        const data = await response.json();
        setLoadData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-20 px-10 md:px-20 lg:px-40 space-y-24 bg-gray-50">
      {loadData.map((data, index) => (
        <motion.div
          key={data._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`relative flex flex-col lg:flex-row items-center lg:items-stretch rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500 ${
            index % 2 === 0 ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image */}
          <div className="lg:w-1/2 w-full max-h-[40rem] flex justify-center items-center relative">
            <img
              src={data.image}
              alt={data.name}
              className="object-cover w-full h-full rounded-3xl transition-transform duration-500 hover:scale-105"
            />
            {/* Optional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
          </div>

          {/* Glass-like Text Block */}
          <div className="lg:w-1/2 w-full p-10 flex flex-col justify-center rounded-b-3xl lg:rounded-r-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-inner transition-transform duration-500 hover:scale-105">
            <p className="text-lg mb-2 italic text-white lg:text-black">
              {data.textOne}
            </p>
            <p className="text-base mb-4 text-white/80 lg:text-gray-700">
              {data.textTwo}
            </p>
            <p className="text-3xl font-extrabold text-orange-400">
              {data.name}
            </p>
            <p className="text-lg font-semibold text-white lg:text-gray-600">
              {data.designation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AllStory;
