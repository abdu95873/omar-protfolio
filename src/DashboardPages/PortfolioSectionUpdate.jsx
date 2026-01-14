import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";

const PortfolioSectionUpdate = () => {
    const loadedUrl = useLoaderData();
    const navigate = useNavigate(); // <-- useNavigate hook
    const [previewUrl, setPreviewUrl] = useState('');
    const [newImageSelected, setNewImageSelected] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setPreviewUrl(loadedUrl.image);
    }, [loadedUrl.image]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setNewImageSelected(true);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(loadedUrl.image);
            setNewImageSelected(false);
        }
    };

    const handleUpdateImg = async (event) => {
        event.preventDefault();
        const file = event.target.image.files[0];
        if (!file) return;

        setIsUpdating(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            // Upload to imgbb
            const imgbbKey = "61de5a036f67062c4cecfd859d1bbacc";
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
                method: "POST",
                body: formData
            });
            const imgData = await res.json();
            const imageUrl = { image: imgData.data.url };

            // Update backend
            await fetch(`https://omar-server-side.vercel.app/portfolioImage/${loadedUrl._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(imageUrl),
            });

            alert("Portfolio image updated successfully!");

            // Redirect to portfolio section
            navigate("/dashboard/portfolioSection");

        } catch (error) {
            console.error("Error updating portfolio image:", error);
            alert("Failed to update image.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className=" flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-3xl max-w-4xl w-full p-6">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
                    Update Portfolio Image
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Previous Image */}
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Previous Image:</p>
                        <img
                            src={loadedUrl.image}
                            alt="Previous"
                            className="w-full h-96 object-cover rounded-xl shadow-md"
                        />
                    </div>

                    {/* New Image Preview */}
                    {newImageSelected && (
                        <div>
                            <p className="text-gray-700 font-semibold mb-2">New Image Preview:</p>
                            <img
                                src={previewUrl}
                                alt="New Preview"
                                className="w-full h-96 object-cover rounded-xl shadow-md"
                            />
                        </div>
                    )}
                </div>

                {/* File Input & Update Button */}
                <form onSubmit={handleUpdateImg} className="flex flex-col md:flex-row md:items-center gap-4">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered file-input-primary w-full md:w-1/2"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-full md:w-1/4"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update"}
                    </button>
                </form>

                <p className="text-red-600 text-sm mt-2">
                    Note: Image Width x Height must be 1365 x 2048
                </p>
            </div>
        </div>
    );
};

export default PortfolioSectionUpdate;
