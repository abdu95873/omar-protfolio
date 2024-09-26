import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import './Styles.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch images and categories from the server
        axios.get('http://localhost:5000/gallerySection')
            .then(response => {
                const data = response.data;
                setImages(data);
                setFilteredImages(data);

                // Extract categories from the image data if available
                const uniqueCategories = Array.from(new Set(data.map(img => img.category)));
                setCategories(['all', ...uniqueCategories]);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }, []);

    useEffect(() => {
        // Filter images based on selected category
        if (selectedCategory === 'all') {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.category === selectedCategory));
        }
    }, [selectedCategory, images]);

    // Define breakpoint columns
    const breakpointColumnsObj = {
        default: 4,   // 4 columns for large screens
        1100: 3,      // 3 columns for medium screens
        700: 2,       // 2 columns for small screens
        500: 1        // 1 column for extra small screens
    };

    return (
        <div className="gallery-container relative md:mx-72">
            {/* Dropdown for category filtering */}
            <div className="relative flex justify-end  text-left py-4 ">
                <div className="">
                    <button
                        type="button"
                        className="inline-flex justify-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {selectedCategory}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.944l3.71-3.714a.75.75 0 111.06 1.061l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Dropdown menu aligned to the top-right corner of the screen */}
                {dropdownOpen && (
                    <div
                        className="absolute top-14 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="py-1" role="none">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setDropdownOpen(false);
                                    }}
                                    className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${selectedCategory === category ? 'bg-gray-100' : ''
                                        }`}
                                    role="menuitem"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Masonry grid for images */}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {filteredImages.map(image => (
                    <div key={image._id} className="p-2">
                        <img src={image.imageUrl} alt={image.title} className="w-full h-auto" />
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

export default Gallery;
