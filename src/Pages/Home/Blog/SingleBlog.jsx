import { useLoaderData, Link } from 'react-router-dom';

const SingleBlog = () => {
    const loadData = useLoaderData();

    return (
        <div className="section-shell">
            <p className="text-sm font-semibold text-orange-400 tracking-[0.2em] uppercase mb-3">BLOG</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                {loadData.title}
            </h1>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-start p-0">
                <div className="w-full lg:w-1/2">
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                        {loadData.details}
                    </p>
                    <Link
                        to="/allBlogs"
                        className="inline-block mt-8 text-orange-500 font-semibold hover:text-orange-600"
                    >
                        ← Back to all blogs
                    </Link>
                </div>
                <div className="card bg-base-100 w-full lg:w-1/2 shrink-0 shadow-2xl rounded-2xl overflow-hidden">
                    <img src={loadData.image} alt={loadData.title} className="w-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;