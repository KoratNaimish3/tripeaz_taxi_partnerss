import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    status: "draft",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fdata = new FormData();
    Object.entries(formData).forEach(([key, value]) => fdata.append(key, value));
    fdata.append("image", image);

    try {
      const { data } = await axios.post("http://localhost:8000/blog/add", fdata);

      if (data.success) {
        toast.success(data.message)
        setFormData({
          title: "",
          description: "",
          metaTitle: "",
          metaDescription: "",
          metaKeywords: "",
          status: "draft",
        });
        setImage(null);
      }
    } catch (error) {
      console.error(" error in  add blog (axios)", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      }
      else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full p-3 border rounded-lg"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Blog Description"
          className="w-full p-3 border rounded-lg h-32"
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded-lg"
          required
        />

        <input
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
          placeholder="Meta Title"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          placeholder="Meta Description"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="metaKeywords"
          value={formData.metaKeywords}
          onChange={handleChange}
          placeholder="Meta Keywords (comma separated)"
          className="w-full p-3 border rounded-lg"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}
