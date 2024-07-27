import React from 'react';
import { useLoaderData } from 'react-router-dom';

const singleBlog = () => {
    const loadData = useLoaderData();

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold ">{loadData.title}</h1>
                    <p className="py-6">
                        {loadData.details}
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <img src={loadData.image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default singleBlog;