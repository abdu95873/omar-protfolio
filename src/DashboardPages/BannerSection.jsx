import { Link, useLoaderData } from "react-router-dom";

const BannerSection = () => {



    const loadImageUrls = useLoaderData();


    return (
        <div className="bg-slate-300">
            <div className="m-10 bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                {
                    loadImageUrls.map(loadImageUrl => <p className="m-5"
                        key={loadImageUrl._id}> <img src={loadImageUrl.image} alt="" />

                        <Link to={`/dashboard/bannerSectionUpdate/${loadImageUrl._id}`}

                        ><button className="btn btn-outline btn-primary m-5 px-5"
                        >Edit</button></Link>


                    </p>)
                }
            </div>
        </div>
    );
};

export default BannerSection;
