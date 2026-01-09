import React, { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import downArrow from '../assets/44969.png';

const StorySection = () => {
    const initialLoadInfos = useLoaderData() || [];
    const [loadInfos, setLoadInfos] = useState(initialLoadInfos);
    const [previewUrl, setPreviewUrl] = useState('');

    // Preview selected image
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Add new story
    const handleAddStory = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const imageFile = form.get("image");
        const textOne = form.get("textOne");
        const textTwo = form.get("textTwo");
        const name = form.get("name");
        const designation = form.get("designation");

        if (!imageFile) return alert("Please select an image!");

        try {
            // Upload image to imgbb
            const imgData = new FormData();
            imgData.append("image", imageFile);

            const imgbbRes = await fetch(
                "https://api.imgbb.com/1/upload?key=61de5a036f67062c4cecfd859d1bbacc",
                { method: "POST", body: imgData }
            );
            const imgJson = await imgbbRes.json();

            if (!imgJson.success) throw new Error("Image upload failed");

            const imageUrl = imgJson.data.url;

            // Save story to backend
            const backendRes = await fetch("http://localhost:5000/storySection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ textOne, textTwo, image: imageUrl, name, designation }),
            });

            if (!backendRes.ok) throw new Error("Failed to add story");

            const newStory = await backendRes.json();

            // Update local state
            setLoadInfos(prev => [
                ...prev,
                {
                    ...newStory,
                    _id: newStory.insertedId || newStory._id,
                    textOne,
                    textTwo,
                    name,
                    designation,
                    image: imageUrl
                }
            ]);

            event.target.reset();
            setPreviewUrl('');
            Swal.fire("Success", "Story added successfully!", "success");
        } catch (error) {
            console.error("Error adding story:", error);
            Swal.fire("Error", error.message || "Failed to add story", "error");
        }
    };

    // Delete story
    const handleDeleteStory = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This story will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/storySection/${id}`, {
                    method: "DELETE",
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to delete story");

                setLoadInfos(prev => prev.filter(story => story._id !== id));
                Swal.fire('Deleted!', data.message, 'success');
            } catch (error) {
                console.error("Error deleting story:", error);
                Swal.fire('Error!', error.message, 'error');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Add New Story Form */}
            <div className="max-w-lg mx-auto mb-10">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <form onSubmit={handleAddStory} className="flex flex-col gap-4">
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full max-h-96 object-contain rounded-lg border"
                            />
                        )}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input file-input-bordered file-input-primary w-full"
                        />
                        <textarea
                            name="textOne"
                            placeholder="Details (Part 1)"
                            className="input input-bordered h-24"
                        />
                        <textarea
                            name="textTwo"
                            placeholder="Details (Part 2)"
                            className="input input-bordered h-24"
                        />
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" />
                        <input type="text" name="designation" placeholder="Designation" className="input input-bordered" />
                        <button type="submit" className="btn btn-primary mt-2">Add Story</button>
                    </form>
                </div>
            </div>

            {/* Story Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadInfos.map(loadInfo => (
                    <div
                        key={loadInfo._id}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                    >
                        <div className="w-full flex justify-center items-center bg-gray-100">
                            <img
                                className="w-full h-auto max-h-96 object-contain"
                                src={loadInfo.image}
                                alt={loadInfo.textOne}
                            />
                        </div>

                        <div className="p-4 flex flex-col gap-2 flex-grow">
                            <h2 className="py-5 text-lg font-bold text-gray-800">{loadInfo.textOne}</h2>
                            <p className="pb-5 text-gray-700">{loadInfo.textTwo}</p>
                            <p className="text-2xl text-orange-400 font-semibold">{loadInfo.name}</p>
                            <p className="text-gray-600">{loadInfo.designation}</p>
                        </div>

                        {/* Update & Delete Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link to={`/dashboard/storySectionUpdate/${loadInfo._id}`}>
                                <button className="btn btn-sm btn-outline btn-primary">Update</button>
                            </Link>
                            <button
                                onClick={() => handleDeleteStory(loadInfo._id)}
                                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white h-8 w-8 flex items-center justify-center p-0"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Down Arrow */}
            <img
                className="fixed bottom-4 right-4 w-16 h-16 cursor-pointer"
                src={downArrow}
                alt="Down Arrow"
            />
        </div>
    );
};

export default StorySection;
