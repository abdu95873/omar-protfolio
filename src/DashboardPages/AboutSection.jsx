import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AboutSection = () => {
  const loadAbout = useLoaderData();
  const [newVideo, setNewVideo] = useState({ subtitle: '', url: '', details: '' });
  const [loading, setLoading] = useState(false);

  // Convert YouTube URL to embed URL
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
    if (url.includes('youtube.com/embed')) return url;
    return url;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  // Add new video
  const handleAddVideo = async (e) => {
    e.preventDefault();
    setLoading(true);

    const embedUrl = convertToEmbed(newVideo.url);

    try {
      const res = await fetch('http://localhost:5000/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newVideo, url: embedUrl }),
      });
      const data = await res.json();
      console.log('Added:', data);
      setNewVideo({ subtitle: '', url: '', details: '' });
      window.location.reload();
    } catch (error) {
      console.error('Error adding video:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete video
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This video will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/about/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          Swal.fire('Deleted!', data.message, 'success');
          window.location.reload(); // reload page to update list
        } else {
          Swal.fire('Error!', data.message, 'error');
        }
      } catch (error) {
        console.error('Error deleting video:', error);
        Swal.fire('Error!', 'Something went wrong', 'error');
      }
    }
  };

  return (
    <div className="m-10 flex flex-col gap-10">
      {/* Add New Video Form */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
        <form onSubmit={handleAddVideo} className="flex flex-col gap-4">
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            className="input input-bordered"
            required
            value={newVideo.subtitle}
            onChange={handleChange}
          />
          <input
            type="text"
            name="url"
            placeholder="YouTube URL (youtu.be or youtube.com/watch)"
            className="input input-bordered"
            required
            value={newVideo.url}
            onChange={handleChange}
          />
          <textarea
            name="details"
            placeholder="Details"
            className="textarea textarea-bordered h-32"
            required
            value={newVideo.details}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Video'}
          </button>
        </form>
      </div>

      {/* Existing Videos */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md grid gap-6 
                grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
  {loadAbout.map((about) => (
    <div key={about._id} className="m-5 flex flex-col">
      <div
        className="relative overflow-hidden mb-2"
        style={{ width: '100%', height: '300px' }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={about.url}
          title={about.subtitle}
          allowFullScreen
        />
      </div>
      <div className="flex gap-2">
        <Link to={`/dashboard/aboutSection/${about._id}`}>
          <button className="btn btn-outline btn-primary px-5">Edit</button>
        </Link>
        <button
          className="btn btn-outline btn-error px-5"
          onClick={() => handleDelete(about._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
{/* ✅ Explanation:
grid → makes the container a grid.

gap-6 → adds space between grid items.

grid-cols-1 → default 1 column on xs screens.

sm:grid-cols-1 → small screens stay 1 column.

md:grid-cols-2 → medium screens and above show 2 columns.

This way, your layout is responsive:

Mobile: 1 video per row

Tablet/Desktop: 2 videos per row

If you want, I can rewrite your full AboutSection.jsx with this responsive grid applied together with Add and Delete functionality so you can just copy-paste it.

Do you want me to d



 */}




    </div>
  );
};

export default AboutSection;
