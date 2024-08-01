import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";

const StorySectionUpdate = () => {
    const loadedUrl = useLoaderData();
    const [previewUrl, setPreviewUrl] = useState('');
    const [newImageSelected, setNewImageSelected] = useState(false);

    useEffect(() => {
        // Set the preview URL to the current image URL from loaded data
        setPreviewUrl(loadedUrl.image);
    }, [loadedUrl.image]);

    const handleUpdateInfo = (event) => {
        event.preventDefault();
        const form = event.target;

        const textOne = form.textOne.value;
        const textTwo = form.textTwo.value;
        const name = form.name.value;
        const designation = form.designation.value;

        const body = {
            designation,
            name,
            textOne,
            textTwo
        };

        fetch(`https://omar-server-side.vercel.app/storySection/${loadedUrl._id}`, {
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
                console.error('Error updating story section:', error);
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

                return fetch(`https://omar-server-side.vercel.app/storySection/${loadedUrl._id}`, {
                    method: "PATCH",
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
                console.error('Error updating story image:', error);
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
        <div className="card m-10">
            <div className='grid grid-cols-1 mx-auto my-auto bg-slate-50 p-10'>
                <div className='w-80 m-2'>
                    {/* Show previous image with label */}
                    <div className="mb-4">
                        <p className='text-gray-700 text-sm mb-2'>Previous Image:</p>
                        <img src={loadedUrl.image} alt="Story Pic" className="w-full h-96 object-cover" />
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
                    <form onSubmit={handleUpdateImg} className="grid grid-cols-1">
                        <input 
                            type="file" 
                            name="image" 
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs m-2" 
                            onChange={handleFileChange}
                        />
                        <button type="submit" className="btn btn-primary m-2">Update Image</button>
                    </form>
                </div>
                <br />
                <div>
                    <form onSubmit={handleUpdateInfo} className="grid grid-cols-2 justify-between gap-5">
                        <div>
                            <label htmlFor="Text (1st part)" className="block text-lg font-medium text-gray-700 mx-3">Text (1st part)</label>
                            <textarea type="text" name="textOne" placeholder='text (1st part)' defaultValue={loadedUrl.textOne} className="file-input file-input-bordered file-input-primary w-full h-72 max-w-xs m-2 p-2" />
                        </div>

                        <div>
                            <label htmlFor="Text (2nd part)" className="block text-lg font-medium text-gray-700 mx-3">Text (2nd part)</label>
                            <textarea type="text" name="textTwo" placeholder='text (2nd part)' defaultValue={loadedUrl.textTwo} className="file-input file-input-bordered file-input-primary w-full h-72 max-w-xs m-2 p-2" />
                        </div>

                        <div>
                            <label htmlFor="Name" className="block text-lg font-medium text-gray-700 mx-3">Name</label>
                            <input type="text" name="name" placeholder='name' defaultValue={loadedUrl.name} className="file-input file-input-bordered file-input-primary w-full max-w-xs m-2 p-2" />
                        </div>

                        <div>
                            <label htmlFor="Designation" className="block text-lg font-medium text-gray-700 mx-3">Designation</label>
                            <input type="text" name="designation" placeholder='designation' defaultValue={loadedUrl.designation} className="file-input file-input-bordered file-input-primary w-full max-w-xs m-2 p-2" />
                        </div>

                        <br />
                        <button type="submit" className="btn btn-primary m-2 w-full col-span-2">Update Information</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StorySectionUpdate;
