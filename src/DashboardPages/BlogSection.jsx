import React, { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import downArrow from '../assets/44969.png';

const BlogSection = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const loadInfos = useLoaderData();

  const handleAddBlog = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = new FormData();
    data.append("image", image);
    const title = form.get("title");
    const details = form.get("details");

    fetch("https://api.imgbb.com/1/upload?key=61de5a036f67062c4cecfd859d1bbacc", {
      method: "POST",
      body: data
    })
    .then(res => res.json())
    .then(data => {
      if (!data.data) return console.error('Error uploading image:', data);
      const imageUrl = data.data.url;

      return fetch(`http://localhost:5000/blogSection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, details, image: imageUrl }),
      });
    })
    .then(res => res.json())
    .then(() => {
      event.target.reset();
      setPreviewUrl('');
      window.location.reload();
    })
    .catch(error => console.error('Error updating Blog:', error));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-6 md:px-20 py-10 bg-gray-50 min-h-screen">
      
      {/* Add Blog Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Add New Blog</h2>
        
        {previewUrl && (
          <div className="mb-6">
            <img src={previewUrl} alt="Preview" className="w-full h-72 object-cover rounded-2xl shadow-md" />
          </div>
        )}

        <form onSubmit={handleAddBlog} className="space-y-6">
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-primary w-full"
            />
            <p className="text-sm text-red-600 mt-1">Note: Image Width x Height must be 1365 x 2048</p>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input type="text" name="title" placeholder="Blog Title" className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Details</span>
            </label>
            <textarea name="details" placeholder="Blog Details" className="textarea textarea-bordered w-full" rows={4} required />
          </div>

          <button type="submit" className="btn btn-primary w-full text-lg">Add Blog</button>
        </form>
      </div>

      {/* Blog List */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loadInfos.map(blog => (
          <div key={blog._id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-500 mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-700 text-base mb-4 line-clamp-3">{blog.details}</p>
              <Link to={`/dashboard/blogSectionUpdate/${blog._id}`}>
                <button className="btn btn-outline btn-primary w-full">Update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top / Down Arrow */}
      <img
        className="fixed bottom-6 right-6 w-14 h-14 cursor-pointer animate-bounce"
        src={downArrow}
        alt="Down Arrow"
      />
    </div>
  );
};

export default BlogSection;
