import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import downArrow from '../assets/44969.png';

const GallerySection = () => {
    const loadedData = useLoaderData();
    const [previewUrls, setPreviewUrls] = useState(loadedData.images || []);
    const [newImages, setNewImages] = useState([]);
    const [newImageSelected, setNewImageSelected] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        if (loadedData.images) setPreviewUrls(loadedData.images);
    }, [loadedData.images]);

    useEffect(() => {
        axios.get('http://localhost:5000/gallerySection')
            .then(res => {
                if (Array.isArray(res.data)) setGallery(res.data);
            })
            .catch(err => console.error('Error fetching gallery:', err));
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setNewImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(previews);
        setNewImageSelected(true);
    };

    const handleCategoryChange = (event) => setSelectedCategory(event.target.value);

    const handleUpdateImg = async (event) => {
        event.preventDefault();

        if (!newImages.length) return setErrorMessage('No new images selected');
        if (!selectedCategory) return setErrorMessage('Please select a category');

        const imgbbKey = '61de5a036f67062c4cecfd859d1bbacc';
        const promises = newImages.map(img => {
            const formData = new FormData();
            formData.append("image", img);
            return axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formData)
                .then(res => res.data.data.url)
                .catch(err => console.error('Upload error:', err));
        });

        const imageUrls = await Promise.all(promises);

        axios.post(`http://localhost:5000/gallerySection`, { images: imageUrls, category: selectedCategory })
            .then(() => {
                setGallery(prev => [...imageUrls.map(url => ({ imageUrl: url, _id: Date.now() })), ...prev]);
                setNewImageSelected(false);
                setSelectedCategory('');
                setErrorMessage('');

                
            })


            .catch(err => console.error('Error storing images:', err));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/gallerySection/${id}`)
                    .then(() => {
                        setGallery(prev => prev.filter(item => item._id !== id));
                        Swal.fire('Deleted!', 'Image has been deleted.', 'success');
                    })
                    .catch(err => Swal.fire('Error!', 'Failed to delete image.', 'error'));
            }
        });
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans">
            {/* Upload Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 mb-12">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Upload New Images</h2>

                {newImageSelected && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {previewUrls.map((url, i) => (
                            <img
                                key={i}
                                src={url}
                                alt={`Preview ${i}`}
                                className="w-full h-60 object-cover rounded-xl border border-gray-200 shadow-sm"
                            />
                        ))}
                    </div>
                )}

                <form onSubmit={handleUpdateImg} className="flex flex-col md:flex-row md:items-center gap-4">
                    <select
                        className="select select-bordered select-primary w-full md:w-1/3"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="category1">Travel </option>
                        <option value="category2">Wedding </option>
                        <option value="category3">Food</option>
                        <option value="category4">Nature </option>
                        <option value="category5">Wild </option>
                    </select>

                    <input
                        type="file"
                        multiple
                        className="file-input file-input-bordered file-input-primary w-full md:w-1/3"
                        onChange={handleFileChange}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-full md:w-1/5"
                    >
                        Upload
                    </button>
                </form>
                {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
            </div>

            {/* Gallery Grid */}
            <h2 className="text-center text-4xl font-bold mb-8">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mx-4">
                {gallery.map(item => (
                    <div key={item._id} className="relative group rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={item.imageUrl}
                            alt="Gallery"
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            {/* Floating Down Arrow */}
            <img
                className="fixed bottom-4 right-4 w-16 h-16 cursor-pointer animate-bounce"
                src={downArrow}
                alt="Down Arrow"
            />
        </div>
    );
};

export default GallerySection;
