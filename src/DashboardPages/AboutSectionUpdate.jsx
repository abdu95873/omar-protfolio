import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const AboutSectionUpdate = () => {
  const loadAbout = useLoaderData();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(loadAbout.url || '');
  const [loading, setLoading] = useState(false);

  const convertToEmbed = (url) => {
    if (!url) return '';
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // already embed or fallback
  };

  const handleUpdateSection = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const subtitle = form.subtitle.value;
    const url = convertToEmbed(form.url.value);
    const details = form.details.value;

    try {
      const res = await fetch(`http://localhost:5000/about/${loadAbout._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtitle, url, details }),
      });
      const data = await res.json();
      console.log('Updated:', data);
      navigate('/dashboard/aboutSection');
    } catch (error) {
      console.error('Error updating section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    const embedUrl = convertToEmbed(e.target.value);
    setVideoUrl(embedUrl);
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 md:sticky md:top-4 w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Video Section</h2>
          <form onSubmit={handleUpdateSection} className="flex flex-col gap-5">
            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">Subtitle</span>
              </label>
              <input
                type="text"
                name="subtitle"
                placeholder="Subtitle"
                className="input input-bordered w-full"
                required
                defaultValue={loadAbout.subtitle}
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">YouTube Link</span>
              </label>
              <input
                type="text"
                name="url"
                placeholder="YouTube URL"
                className="input input-bordered w-full"
                required
                defaultValue={loadAbout.url}
                onChange={handleUrlChange}
              />
              <p className="text-gray-500 text-sm mt-1">
                Paste a YouTube URL to see live preview below.
              </p>
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">Details</span>
              </label>
              <textarea
                name="details"
                placeholder="Details about the video"
                className="textarea textarea-bordered h-48 resize-none w-full"
                required
                defaultValue={loadAbout.details}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary mt-3 ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>

        {/* Right: Video Preview */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-700">Live Preview</h3>
<div className="bg-white rounded-xl shadow-lg overflow-hidden w-full h-64 md:h-[450px]">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title={loadAbout.subtitle}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Video preview will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSectionUpdate;
