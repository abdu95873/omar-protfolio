import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import './Styles.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

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
        <div className="gallery-container">
            <div className="filter-buttons flex justify-around py-4">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`btn1 ${selectedCategory === category ? 'btn-active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

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
