import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBlog = () => {
    const loadData = useLoaderData();

    return (
        <div className="hero bg-base-200 py-20">
            <div className="hero-content flex-col lg:flex-row-reverse gap-32 min-h-screen items-start">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold my-12">{loadData.title}</h1>
                    <p className="py-6 text-2xl">
                        {loadData.details}
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-14">
                    <img src={loadData.image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;