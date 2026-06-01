import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionReveal from "../../../components/motion/SectionReveal";
import SectionHeading from "../../../components/ui/SectionHeading";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

const Blog = () => {
  const [loadData, setLoadData] = useState([]);
  const isMdUp = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://omar-server-side.vercel.app/blogSection");
        const data = await res.json();
        setLoadData(data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <SectionReveal className="section-shell !pt-6 sm:!pt-8">
      <SectionHeading label="BLOG" title="LATEST STORIES & INSIGHTS" />

      <section className="relative md:min-h-[100vh] lg:min-h-[120vh]">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 md:block">
          {loadData.map((blog, index) => (
            <motion.div
              key={blog._id}
              className={`
                rounded-2xl sm:rounded-3xl bg-white border border-gray-100 shadow-soft overflow-hidden
                h-auto py-6 sm:py-8
                ${isMdUp ? "sticky flex items-center h-[48vh] lg:h-[50vh] mt-16 lg:mt-20" : "relative mt-0"}
              `}
              style={{
                zIndex: index,
                ...(isMdUp ? { top: 80 + index * 36 } : {}),
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="w-full h-full px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="space-y-3 sm:space-y-4 order-2 md:order-1">
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-orange-400 font-medium">Blog</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 line-clamp-3">{blog.title}</h2>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-4 md:line-clamp-5">{blog.details}</p>
                  <Link
                    to={`/singleBlog/${blog._id}`}
                    className="inline-block text-orange-400 font-semibold text-sm sm:text-base hover:text-orange-500 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
                <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 flex justify-center bg-gray-50 order-1 md:order-2 min-h-[10rem] sm:min-h-[12rem]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full max-h-48 sm:max-h-56 md:max-h-[30vh] object-contain rounded-lg sm:rounded-xl shadow-md"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
};

export default Blog;
