import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";

const PortfolioSectionUpdate = () => {
    const loadedUrl = useLoaderData();
    const [previewUrl, setPreviewUrl] = useState('');
    const [newImageSelected, setNewImageSelected] = useState(false);

    useEffect(() => {
        // Set the preview URL to the current image URL from loaded data
        setPreviewUrl(loadedUrl.image);
    }, [loadedUrl.image]);

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
            };

            return fetch(`https://omar-server-side.vercel.app/portfolioImage/${loadedUrl._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(imageUrl),
            });
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            event.target.reset();
            setPreviewUrl(loadedUrl.image); // Reset the preview URL to the latest image
            setNewImageSelected(false); // Reset new image selection state
            window.location.reload();  // Reload the page

        })
        .catch(error => {
            console.error('Error updating portfolio image:', error);
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result); // Set the preview URL for new image
                setNewImageSelected(true); // Mark that a new image is selected
            };
            reader.readAsDataURL(file);
        } else {
            // Clear the preview if no file is selected
            setPreviewUrl('');
            setNewImageSelected(false);
        }
    };

    return (
        <div className="hero bg-base-400 min-h-screen">
            <div className="card w-full bg-slate-50 max-w-xl shrink-0 shadow-2xl">
                <div className='w-80 m-2 mx-auto'>
                    <div className='grid grid-cols-1 mx-auto my-auto'>
                        <div className='w-80 m-2'>
                            {/* Show previous image with label */}
                            <div className="mb-4">
                                <p className='text-gray-700 text-sm mb-2'>Previous Image:</p>
                                <img src={loadedUrl.image} alt="Previous" className="w-full h-96 object-cover" />
                            </div>
                            {/* Show new image preview with label if a new image is selected */}
                            {newImageSelected && (
                                <div className="mb-4">
                                    <p className='text-gray-700 text-sm mb-2'>New Image Preview:</p>
                                    <img src={previewUrl} alt="New Preview" className="w-full h-96 object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <form onSubmit={handleUpdateImg}>
                                <input 
                                    type="file" 
                                    name="image" 
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs m-2" 
                                    onChange={handleFileChange}
                                />
                                <br />
                                <p className='text-red-600 text-sm'>Note: Image Width x Height must be 1365 x 2048</p>
                                <button type="submit" className="btn btn-primary m-2">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioSectionUpdate;
