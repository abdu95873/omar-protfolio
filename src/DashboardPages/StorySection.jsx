import React, { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import downArrow from '../assets/44969.png';


const StorySection = () => {
    const [previewUrl, setPreviewUrl] = useState('');
    const loadInfos = useLoaderData();

    const handleAddReview = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        const data = new FormData();
        data.append("image", image);
        const textOne = form.get("textOne");
        const textTwo = form.get("textTwo");
        const name = form.get("name");
        const designation = form.get("designation");

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
                    textOne,
                    textTwo,
                    image: imageUrl,
                    name,
                    designation
                };

                return fetch(`http://localhost:5000/storySection`, {
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
                console.error('Error updating story:', error);
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
                                <span className="label-text">Details (Part 1)</span>
                            </label>
                            <textarea
                                name='textOne'
                                placeholder="details"
                                className="h-40 input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Details (Part 2)</span>
                            </label>
                            <textarea
                                name='textTwo'
                                placeholder="details"
                                className="h-40 input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name='name'
                                placeholder="name"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Designation</span>
                            </label>
                            <input
                                type="text"
                                name='designation'
                                placeholder="designation"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Add Story</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-4 m-5'>
                {loadInfos.map(loadInfo => (
                    <div key={loadInfo._id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                        <img
                            className="w-full h-96 object-cover"
                            src={loadInfo.image}
                            alt={loadInfo.textOne}
                        />
                        <div className="p-4 flex-grow">
                            <h1 className="text-xl font-bold mb-2">{loadInfo.textOne}</h1>
                            <br />
                            <h1 className="text-xl mb-2">{loadInfo.textTwo}</h1>
                            <br />
                            <p className="text-orange-400 mb-2">{loadInfo.name}</p>
                            <p className="text-slate-950 text-lg mb-4">{loadInfo.designation}</p>
                        </div>
                        <div className="p-4 card-footer">
                            <Link to={`/dashboard/storySectionUpdate/${loadInfo._id}`}>
                                <button className="btn btn-outline btn-primary">Update</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <img className="fixed bottom-4 right-4 w-16 h-16 cursor-pointer" src={downArrow} alt="Down Arrow" />

        </div>
    );
};

export default StorySection;
