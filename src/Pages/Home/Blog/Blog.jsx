import React from 'react';

const Blog = () => {
    return (
        <div className='text-white'>
            <div className='grid grid-cols-2 mx-10 pb-20'>
                <div>
                    <h3 className='text-xl text-orange-400'>Blogs</h3>
                    <p className='text-6xl'>OUR LATEST BLOG</p>
                </div>
                <div>
                    <p>Proin et magna blandit arcu pellentesque scelerisque sit amet a sapien. Aenean purus nunc, cursus in ante in, vehicula facilisis dui. Integer consequat consectetur est id blandit. Duis fermentum nulla non mi tempor elementum. Donec efficitur ac eros quis porta.</p>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-10 mx-10'>

                <div className="card bg-slate-400 shadow-xl">/
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                </div>
                <div className="card bg-slate-400 shadow-xl">/
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                </div>
                <div className="card bg-slate-400 shadow-xl">/
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                </div>
            </div>
        </div>
    );
};

export default Blog;