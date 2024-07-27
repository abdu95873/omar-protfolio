import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const AboutSectionUpdate = () => {
    const loadAbout = useLoaderData();
    const [videoUrl, setVideoUrl] = useState('');

    const handleUpdateSection = async (event) => {
        event.preventDefault();
        const form = event.target;
        const subtitle = form.subtitle.value;
        const url = form.url.value;
        const details = form.details.value;

        fetch(`http://localhost:5000/about/${loadAbout._id}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subtitle,
                url,
                details
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            event.target.reset();                       
             window.location.reload();  // Reload the page


        })
        .catch(error => {
            console.error('Error updating section:', error);
        });
    };

    const handleUrlChange = (event) => {
        const url = event.target.value;
        setVideoUrl(url);
    };

    return (
        <div className="hero bg-base-200 min-h-screen bg-slate-300">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                <form onSubmit={handleUpdateSection} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Subtitle</span>
                        </label>
                        <input type="text" name='subtitle' placeholder="Subtitle" className="input input-bordered" required defaultValue={loadAbout.subtitle} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">YouTube Link</span>
                        </label>
                        <input type="text" name="url" placeholder="YouTube link" className="input input-bordered" required defaultValue={loadAbout.url} onChange={handleUrlChange} />
                    </div>
                    <div className="form-control">
                        {videoUrl && (
                            <div className="form-control mb-4">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={videoUrl}
                                    title="YouTube video preview"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <textarea name="details" placeholder="Details" className="textarea textarea-bordered h-96" required defaultValue={loadAbout.details} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AboutSectionUpdate;
