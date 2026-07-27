import { Link, useLoaderData } from "react-router-dom";
import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";

const BannerSection = () => {
  const loadImageUrls = useLoaderData();

  return (
    <div>
      <DashboardPageHeader
        label="Content"
        title="Banner"
        subtitle="Manage the hero image shown on the home page."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {loadImageUrls.map((loadImageUrl) => (
          <article key={loadImageUrl._id} className="dashboard-panel overflow-hidden">
            <div className="aspect-[16/10] bg-neutral-100">
              <img
                src={loadImageUrl.image}
                alt="Banner"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-end border-t border-neutral-100 p-4">
              <Link to={`/dashboard/bannerSectionUpdate/${loadImageUrl._id}`}>
                <button type="button" className="btn btn-sm btn-outline border-orange-300 text-orange-600 hover:bg-orange-50">
                  Edit
                </button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
