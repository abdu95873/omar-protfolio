import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";

const StorySectionUpdate = () => {
    const loadedUrl = useLoaderData();
    const navigate = useNavigate(); // <-- useNavigate hook
    const [previewUrl, setPreviewUrl] = useState('');
    const [newImageSelected, setNewImageSelected] = useState(false);

    useEffect(() => {
        setPreviewUrl(loadedUrl.image);
    }, [loadedUrl.image]);

    // Update image
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
                if (!data.data) return console.error('Error uploading image:', data);

                const imageUrl = { image: data.data.url };
                return fetch(`http://localhost:5000/storySection/${loadedUrl._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(imageUrl),
                });
            })
            .then(res => res.json())
            .then(() => {
                setNewImageSelected(false);
                setPreviewUrl(loadedUrl.image);
                navigate("/dashboard/storySection"); // <-- Navigate instead of reload
            })
            .catch(error => console.error('Error updating story image:', error));
    };

    // Update text info
    const handleUpdateInfo = (event) => {
        event.preventDefault();
        const form = event.target;
        const body = {
            textOne: form.textOne.value,
            textTwo: form.textTwo.value,
            name: form.name.value,
            designation: form.designation.value
        };

        fetch(`http://localhost:5000/storySection/${loadedUrl._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(() => navigate("/dashboard/storySection")) // <-- Navigate instead of reload
            .catch(error => console.error('Error updating story info:', error));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setNewImageSelected(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto grid gap-10">
                {/* Image Update Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Update Story Image</h2>

                    <div className="w-full max-w-md mb-4">
                        <p className="text-gray-600 text-sm mb-2">Current Image</p>
                        <img
                            src={loadedUrl.image}
                            alt="Current Story"
                            className="w-full h-96 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {newImageSelected && (
                        <div className="w-full max-w-md mb-4">
                            <p className="text-gray-600 text-sm mb-2">New Preview</p>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-96 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    <form onSubmit={handleUpdateImg} className="flex flex-col items-center w-full max-w-md gap-4">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input file-input-bordered file-input-primary w-full"
                        />
                        <button type="submit" className="btn btn-primary w-full">Update Image</button>
                    </form>
                </div>

                {/* Text Update Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Update Story Info</h2>
                    <form onSubmit={handleUpdateInfo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2">Text (Part 1)</label>
                            <textarea
                                name="textOne"
                                defaultValue={loadedUrl.textOne}
                                className="input input-bordered h-48 p-2 resize-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2">Text (Part 2)</label>
                            <textarea
                                name="textTwo"
                                defaultValue={loadedUrl.textTwo}
                                className="input input-bordered h-48 p-2 resize-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={loadedUrl.name}
                                className="input input-bordered"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                defaultValue={loadedUrl.designation}
                                className="input input-bordered"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                            <button type="submit" className="btn btn-primary w-full max-w-md">Update Info</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StorySectionUpdate;
