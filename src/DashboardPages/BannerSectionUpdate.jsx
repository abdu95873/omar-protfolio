import React, { useState } from 'react';
import { useLoaderData } from "react-router-dom";

const BannerSectionUpdate = () => {
    const loadedUrl = useLoaderData();
    const [previewImage, setPreviewImage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage('');
        }
    };

    const handleUpdateImg = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = new FormData();
        data.append("image", image);

        fetch("https://api.imgbb.com/1/upload?key=61de5a036f67062c4cecfd859d1bbacc", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                const imageUrl = {
                    image: data.data.url,
                }

                fetch(`https://omar-server-side.vercel.app/bannerImage/${loadedUrl._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(imageUrl),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        event.target.reset();
                        window.location.reload();  // Reload the page
                    })
                    .catch(error => {
                        console.error('Error updating banner image:', error);
                    });
            });
    };

    return (
        <div className="hero bg-base-400 min-h-screen ">
            <div className="card w-full bg-slate-50 max-w-xl shrink-0 shadow-2xl p-10">
                <div className='w-80 m-2 mx-auto'>
                    <div className="mb-4">
                        <h2 className="text-center text-lg font-bold">Current Image</h2>
                        <img src={loadedUrl.image} alt="Current Banner" className="w-full" />
                    </div>
                    {previewImage && (
                        <div className="mb-4">
                            <h2 className="text-center text-lg font-bold">New Image Preview</h2>
                            <img src={previewImage} alt="New Banner Preview" className="w-full" />
                        </div>
                    )}
                </div>
                <div className="mx-auto">
                    <form onSubmit={handleUpdateImg}>
                        <input 
                            type="file" 
                            name="image" 
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs m-2" 
                            onChange={handleFileChange} 
                        />
                        <p className='text-red-600 text-sm text-center'>Note: Image Width x Height must be 2557 x 1024</p>
                        <button type="submit" className="btn btn-primary m-2 w-full max-w-xs">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BannerSectionUpdate;
