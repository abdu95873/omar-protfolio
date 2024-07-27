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
        if (loadedData.images) {
            setPreviewUrls(loadedData.images);
        }
    }, [loadedData.images]);

    const handleUpdateImg = async (event) => {
        event.preventDefault();

        if (newImages.length === 0) {
            setErrorMessage('No new images selected');
            return;
        }

        if (!selectedCategory) {
            setErrorMessage('Please select a category');
            return;
        }

        const imgbbKey = '61de5a036f67062c4cecfd859d1bbacc';
        const promises = newImages.map(image => {
            const formData = new FormData();
            formData.append("image", image);

            return axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formData)
                .then(response => response.data.data.url)
                .catch(error => console.error('Error uploading image:', error));
        });

        const imageUrls = await Promise.all(promises);

        axios.post(`http://localhost:5000/gallerySection`, { images: imageUrls, category: selectedCategory })
            .then(response => {
                console.log('Images stored successfully:', response.data);
                event.target.reset();
                setPreviewUrls(imageUrls);
                setNewImageSelected(false);
                setSelectedCategory('');
                setErrorMessage('');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error storing image URLs:', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/gallerySection')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setGallery(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setNewImages(files);

        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(previewUrls);
        setNewImageSelected(true);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/gallerySection/${id}`)
                    .then(response => {
                        console.log('Image deleted successfully:', response.data);
                        setGallery(gallery.filter(item => item._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Your image has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting image:', error);
                        Swal.fire(
                            'Error!',
                            'There was an issue deleting your image.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div>
            <div className="hero bg-base-400 min-h-screen">
                <div className="card w-full bg-slate-50 max-w-xl shrink-0 shadow-2xl">
                    <div className="w-80 m-2 mx-auto">
                        <div className="grid grid-cols-1 mx-auto my-auto">
                            <div className="w-80 m-2">
                                {newImageSelected && (
                                    <div className="mb-4 flex w-fit gap-5">
                                        <p className="text-gray-700 text-sm mb-2">New Image Preview:</p>
                                        {previewUrls.map((url, index) => (
                                            <img key={index} src={url} alt={`New Preview ${index}`} className="w-full h-96 object-cover" />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <form onSubmit={handleUpdateImg}>
                                    <select
                                        className="select select-bordered select-primary w-full max-w-xs m-2"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="category1">Category 1</option>
                                        <option value="category2">Category 2</option>
                                        <option value="category3">Category 3</option>
                                        <option value="category4">Category 4</option>
                                        <option value="category5">Category 5</option>
                                    </select>
                                    <input
                                        type="file"
                                        name="images"
                                        multiple
                                        className="file-input file-input-bordered file-input-primary w-full max-w-xs m-2"
                                        onChange={handleFileChange}
                                    />
                                    <br />
                                    {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                                    <button type="submit" className="btn btn-primary m-2">Upload</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-10">
                <h2 className="flex justify-center bg-slate-400 py-10" style={{ fontSize: '3rem', fontWeight: 'bold', marginTop: '1rem' }}>Gallery</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                    {gallery.map(galleryItem => (
                        <div key={galleryItem._id} style={{ position: 'relative', padding: '1rem 0rem' }}>
                            <img
                                src={galleryItem.imageUrl}
                                alt={galleryItem.title}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <button
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    margin: '5px',
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '0.5rem',
                                    backgroundColor: '#f56565',
                                    color: '#fff',
                                    padding: '0.25rem',
                                    borderRadius: '1rem',
                                    cursor: 'pointer',
                                    border: 'none',
                                    fontSize: '1rem'
                                }}
                                onClick={() => handleDelete(galleryItem._id)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <img className="fixed bottom-4 right-4 w-16 h-16 cursor-pointer" src={downArrow} alt="Down Arrow" />
        </div>
    );
};

export default GallerySection;
