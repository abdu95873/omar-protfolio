import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {

    const [loadData, setaLoadData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/blogSection');
                const data = await response.json();
                setaLoadData(data);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className='py-20 mx-10 md:mx-72'>
            <div className="">
                <div className='grid grid-cols-1 md:grid-cols-2 pb gap-4 md:gap-10'>
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {
                        loadData.map(data =>
                            <div key={data._id} className="card card-compact bg-custom-black shadow-xl rounded-none border p-1 border-white " style={{ height: '40rem' }}>
                                <figure>
                                    <img className=""
                                        src={data.image}
                                        alt="Image" />
                                </figure>
                                <div className="card-body">
                                    <Link to={`/singleBlog/${data._id}`}>
                                        <h2 className="card-title text-orange-400 text-xl md:text-3xl w-full hover:underline">{data.title}</h2></Link>
                                    <br />
                                    <p className="text-slate-50 text-xl line-clamp-2 w-full">{data.details}</p>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default AllBlogs;