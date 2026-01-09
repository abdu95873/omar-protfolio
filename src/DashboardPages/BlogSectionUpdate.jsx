import React, { useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";

const BlogSectionUpdate = () => {
  const loadedUrl = useLoaderData();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');

  const handleUpdateBlog = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const details = form.details.value;
    const imageFile = form.image.files[0];

    const updateBlog = (imageUrl = loadedUrl.image) => {
      const body = { title, details, image: imageUrl };
      fetch(`http://localhost:5000/blogSection/${loadedUrl._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(() => navigate("/dashboard/blogSection"))
        .catch(err => console.error("Error updating blog:", err));
    };

    if (imageFile) {
      const data = new FormData();
      data.append("image", imageFile);

      fetch("https://api.imgbb.com/1/upload?key=61de5a036f67062c4cecfd859d1bbacc", {
        method: "POST",
        body: data
      })
        .then(res => res.json())
        .then(data => updateBlog(data.data.url))
        .catch(err => console.error("Error uploading image:", err));
    } else {
      updateBlog();
    }
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Update Blog</h2>

        <form onSubmit={handleUpdateBlog} className="space-y-6">
          {/* Image preview */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Blog Image</h3>
            <img
              src={previewUrl || loadedUrl.image}
              alt="Preview"
              className="w-full max-w-md h-64 md:h-96 object-cover rounded-xl shadow-lg mb-2"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-primary w-full max-w-md"
            />
            <p className="text-red-600 text-sm mt-1">Recommended: 1365 x 2048 px</p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <textarea
              name="title"
              defaultValue={loadedUrl.title}
              className="textarea textarea-bordered w-full h-24 md:h-32 resize-none"
              required
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Details</label>
            <textarea
              name="details"
              defaultValue={loadedUrl.details}
              className="textarea textarea-bordered w-full h-48 md:h-64 resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary btn-lg w-full md:w-1/2">Update Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogSectionUpdate;
