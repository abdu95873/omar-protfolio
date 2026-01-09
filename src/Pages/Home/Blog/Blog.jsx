import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/blogSection");
        const data = await res.json();
        setLoadData(data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      <section className="relative min-h-[150vh] px-6">
        <div className="mx-auto max-w-7xl my-10">

          {loadData.map((blog, index) => (
         <div
  key={blog._id}
  className={`sticky h-[50vh] rounded-3xl bg-white
      flex items-center overflow-hidden transition-all duration-300 mt-20`}
  style={{
    top: 96 + index * 50,
    zIndex: index,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15), 0 15px 10px rgba(0,0,0,0.1)", // full 360 shadow
  }}
>

              {/* CARD CONTENT */}
              <div className="w-full h-full p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE — text */}
                <div className="space-y-6">
                  <p className="italic text-gray-500">BLOG</p>
                  <h2 className="text-4xl font-bold text-black">{blog.title}</h2>
                  <p className="text-gray-700 max-w-md line-clamp-4">{blog.details}</p>

                  <Link
                    to={`/singleBlog/${blog._id}`}
                    className="mt-4 inline-block text-orange-400 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>

                {/* RIGHT SIDE — image */}
                <div className="rounded-3xl p-8 flex justify-center bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="max-h-[40vh] object-contain rounded-2xl shadow-xl"
                  />
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Blog;
