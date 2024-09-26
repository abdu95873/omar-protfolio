import React, { useState } from 'react';
import { useLoaderData } from "react-router-dom";

const BlogSectionUpdate = () => {
    const loadedUrl = useLoaderData();
    const [previewUrl, setPreviewUrl] = useState('');

    const handleUpdateInfo = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const details = form.details.value;

        const body = {
            title,
            details
        };

        fetch(`http://localhost:5000/blogSection/${loadedUrl._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                event.target.reset();
                window.location.reload();  // Reload the page
            })
            .catch(error => {
                console.error('Error updating blog info:', error);
            });
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

                fetch(`http://localhost:5000/blogSection/${loadedUrl._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(imageUrl),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        event.target.reset();
                        setPreviewUrl('');  // Clear preview after submission
                        window.location.reload();  // Reload the page
                    })
                    .catch(error => {
                        console.error('Error updating banner image:', error);
                    });
            });
    }

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
            <div className='grid grid-cols-1 mx-auto my-auto'>
                <div className="card w-full bg-slate-50 max-w-xl shrink-0 shadow-2xl p-10 mt-10 mx-auto">
                    <div className=' m-2'>
                        <h2 className="text-lg font-bold">Current Image</h2>

                        <img src={loadedUrl.image} alt="Blog image" />
                        <p className='text-red-600 text-sm text-center'>Note: Image Width x Height must be 1365 x 2048 </p>
                    </div>

                    <div>
                        <form onSubmit={handleUpdateImg}>
                            {previewUrl && (
                                <div className="form-control mb-4">
                                    <h2 className="text-lg font-bold">New Image Preview</h2>
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
                            <button type="submit" className="btn btn-primary m-2">Update</button>
                        </form>
                    </div>
                </div>

                <br />
                <div className="card w-full bg-slate-50 mx-auto max-w-3xl shrink-0 shadow-2xl p-10">
                    <form onSubmit={handleUpdateInfo}>
                        <div className="flex justify-around mx-auto">
                            <div>
                                <label htmlFor="Title" className="block text-lg font-medium text-gray-700">Title</label>
                                <textarea type="text" name="details" placeholder='details' defaultValue={loadedUrl.details} className="file-input file-input-bordered file-input-accent w-72 h-96 max-w-xs m-2 px-4 py-2" />
                            </div>
                            <div>
                                <label htmlFor="Details" className="block text-lg font-medium text-gray-700">Details</label>
                                <textarea type="text" name="title" placeholder='title' defaultValue={loadedUrl.title} className="file-input file-input-bordered file-input-accent w-72 h-96 max-w-xs m-2 px-4 py-2" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary m-2">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogSectionUpdate;
