import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);

    // Fetch all reviews from backend
    const fetchReviews = () => {
        fetch('https://omar-server-side.vercel.app/reviewSection')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error('Error fetching reviews:', err));
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Handle adding a new review
    const handleAddReview = (event) => {
        event.preventDefault();
        const form = event.target;
        const review = form.review.value;
        const name = form.name.value;
        const designation = form.designation.value;

        const body = { review, name, designation };

        fetch('https://omar-server-side.vercel.app/reviewSection', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(data => {
                form.reset();
                fetchReviews(); // Refresh the list after adding
            })
            .catch(err => console.error('Error adding review:', err));
    };

    // Handle deleting a review
    const handleDeleteReview = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This review will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://omar-server-side.vercel.app/reviewSection/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The review has been deleted.',
                            'success'
                        );
                        setReviews(reviews.filter(r => r._id !== id)); // Remove from state
                    })
                    .catch(err => {
                        console.error('Error deleting review:', err);
                        Swal.fire('Error', 'Failed to delete review', 'error');
                    });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
            <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">Reviews</h2>

            {/* Add Review Form */}
            <div className="max-w-lg mx-auto bg-white shadow-2xl rounded-3xl p-6 mb-12">
                <form onSubmit={handleAddReview} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Review</label>
                        <textarea
                            name="review"
                            placeholder="Write your review"
                            className="input input-bordered w-full h-40 p-3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="input input-bordered w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            placeholder="Your designation"
                            className="input input-bordered w-full p-2"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-4">Add Review</button>
                </form>
            </div>

            {/* Display Reviews */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {reviews.map((r) => (
    <div
        key={r._id}
        className="group bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow relative"
    >
        <p className="text-gray-700 mb-4">{r.review}</p>
        <div>
            <p className="font-semibold text-gray-800">{r.name}</p>
            <p className="text-gray-500 text-sm">{r.designation}</p>
        </div>

        {/* Delete Button: hidden by default, shown on hover */}
        <button
            onClick={() => handleDeleteReview(r._id)}
            className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
            ×
        </button>
    </div>
))}

            </div>
        </div>
    );
};

export default ReviewsSection;
