import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
    const [loadData, setLoadData] = useState([]);
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://omar-server-side.vercel.app/blogSection');
                const data = await response.json();
                setLoadData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();

        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine the number of posts to display based on screen size
    const postsToShow = screenSize >= 768 ? 3 : 1;

    return (
        <div className='py-20 m-20'>
            <div className="">
                <div className='grid grid-cols-1 md:grid-cols-2 mx-4 pb-10 gap-4 md:gap-10'>
                    <div className='bg-black text-slate-50 py-20 mx-10'>
                        <div>
                            <h3 className='text-2xl font-bold text-orange-400'>BLOG</h3>
                            <p className='text-6xl' style={{ fontFamily: '"Times New Roman", Times, serif' }}>FEATURED PROJECT</p>
                        </div>
                    </div>
                    <div className="hidden md:block text-slate-50 pt-10">
                        <p>Proin et magna blandit arcu pellentesque scelerisque sit amet a sapien. Aenean purus nunc, cursus in ante in, vehicula facilisis dui. Integer consequat consectetur est id blandit. Duis fermentum nulla non mi tempor elementum. Donec efficitur ac eros quis porta.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {loadData.slice(0, postsToShow).map(data => (
                        <div key={data._id} className="card card-compact bg-black shadow-xl rounded-none border p-1 border-slate-400" style={{ height: '40rem' }}>
                            <figure>
                                <img className=""
                                    src={data.image}
                                    alt="Image" />
                            </figure>

                            <div className="card-body">
                                <Link to={`/singleBlog/${data._id}`}>
                                    <h2 className="card-title text-orange-400 text-xl md:text-3xl w-full hover:underline">{data.title}</h2>
                                </Link>
                                <br />
                                <p className="text-slate-50 text-xl line-clamp-2 w-full">{data.details}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link className="text-slate-300 flex justify-center mt-20" to="/allBlogs">
                    <button className="text-lg hover:underline">See More</button>
                </Link>
            </div>
        </div>
    );
};

export default Blog;
