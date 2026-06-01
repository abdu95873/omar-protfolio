import { Link, useLoaderData } from "react-router-dom";

const PortfolioSection = () => {
  const loadImageUrls = useLoaderData();

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-4xl font-bold text-center mb-10 text-orange-500">
        Portfolio
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loadImageUrls.map((item) => (
          <div
            key={item._id}
            className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
              <img
                src={item.image}
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex justify-center">
              <Link to={`/dashboard/PortfolioSectionUpdate/${item._id}`} className="w-full">
                <button className="btn btn-primary w-full md:w-2/3 lg:w-full">
                  Update
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
