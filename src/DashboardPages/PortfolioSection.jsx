import { Link, useLoaderData } from "react-router-dom";

const PortfolioSection = () => {
  const loadImageUrls = useLoaderData();

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {loadImageUrls.map((loadImageUrl) => (
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg" key={loadImageUrl._id}>
            <div className="w-full" style={{ height: '500px', overflow: 'hidden', marginBottom: '1rem' }}>
              <img
                className="w-full h-full object-cover"
                src={loadImageUrl.image}
                alt=""
              />
            </div>
            <Link to={`/dashboard/PortfolioSectionUpdate/${loadImageUrl._id}`}>
              <button className="btn btn-outline btn-primary w-full max-w-xs">
                Update
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
