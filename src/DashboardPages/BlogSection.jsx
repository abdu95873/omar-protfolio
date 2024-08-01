import React, { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import downArrow from '../assets/44969.png';


const BlogSection = () => {
    const [previewUrl, setPreviewUrl] = useState('');
    const loadInfos = useLoaderData();

    const handleAddReview = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = new FormData();
        data.append("image", image);
        const title = form.get("title");
        const details = form.get("details");

        fetch("https://api.imgbb.com/1/upload?key=61de5a036f67062c4cecfd859d1bbacc", {
            method: "POST",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if (!data.data) {
                console.error('Error uploading image:', data);
                return;
            }

            const imageUrl = data.data.url;

            const body = {
                title,
                details,
                image: imageUrl
            };

            return fetch(`https://omar-server-side.vercel.app/blogSection`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            event.target.reset();
            setPreviewUrl('');  // Clear preview after submission
            window.location.reload();  // Reload the page
        })
        .catch(error => {
            console.error('Error updating Blog:', error);
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="hero bg-base-400 min-h-screen">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form onSubmit={handleAddReview} className="card-body">
                        <div className="form-control">
                            {previewUrl && (
                                <div className="form-control mb-4">
                                    <img src={previewUrl} alt="Preview" className="w-full h-96 object-cover" />
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered file-input-primary w-full max-w-xs m-2"
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" name='title' placeholder="title" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <input type="text" name='details' placeholder="details" className="input input-bordered" required />
                        </div>
                        <p className='text-red-600 text-sm text-center'>Note: Image Width x Height must be 1365 x 2048 </p>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Add Blog</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-4 m-10'>
                {loadInfos.map(loadInfo => (
                    <div key={loadInfo._id} className="bg-slate-50 p-5 mt-5">
                        <img className="w-96 mt-16 " src={loadInfo.image} alt={loadInfo.title} />
                        <h1 className='card-title text-orange-400 text-xl md:text-3xl w-full'>{loadInfo.title}</h1>
                        <br />
                        <h1 className='text-xl line-clamp-2 w-full'>{loadInfo.details}</h1>
                        
                        <Link to={`/dashboard/blogSectionUpdate/${loadInfo._id}`}>
                            <button className="btn btn-outline btn-primary m-5">Update</button>
                        </Link>
                    </div>
                ))}
            </div>
            <img className="fixed bottom-4 right-4 w-16 h-16 cursor-pointer" src={downArrow} alt="Down Arrow" />

        </div>
    );
};

export default BlogSection;
