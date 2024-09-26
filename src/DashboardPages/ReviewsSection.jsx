import React from 'react';

const ReviewsSection = () => {
    const handleAddReview = (event) => {
        event.preventDefault();
        const form = event.target;
        const review = form.review.value;
        const name = form.name.value;
        const designation = form.designation.value;

        const body = {
            review,
            name,
            designation
        };

        fetch(`http://localhost:5000/reviewSection`, {
            method: "POST",
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
                console.error('Error updating banner image:', error);
            });
    };
    return (
        <div className="hero bg-base-400 min-h-screen">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                <form onSubmit={handleAddReview} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Review</span>
                        </label>
                        <textarea type="text" name='review' placeholder="review" className="input input-bordered h-56" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Designation</span>
                        </label>
                        <input type="text" name='designation' placeholder="designation" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">

                        <button type="submit" className="btn btn-primary">Add Review</button>
                    </div>
                </form>
            </div>



        </div>
    );
};

export default ReviewsSection;