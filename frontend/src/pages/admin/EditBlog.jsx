import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function EditBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    status: "draft",
  });

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [blogId, setBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setFetching(true);
      const { data } = await axios.get(`http://localhost:8000/blog/slug/${slug}`);
      if (data.success && data.blog) {
        const blog = data.blog;
        setBlogId(blog._id);
        setFormData({
          title: blog.title || "",
          description: blog.description || "",
          metaTitle: blog.metaTitle || "",
          metaDescription: blog.metaDescription || "",
          metaKeywords: blog.metaKeywords ? blog.metaKeywords.join(", ") : "",
          status: blog.status || "draft",
        });
        setExistingImage(blog.image || "");
      } else {
        toast.error("Blog not found");
        // navigate("/admin/manage/blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch blog");
      }
      // navigate("/admin/manage/blog");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fdata = new FormData();
    Object.entries(formData).forEach(([key, value]) => fdata.append(key, value));
    if (image) {
      fdata.append("image", image);
    }

    try {
      if (!blogId) {
        toast.error("Blog ID not found");
        return;
      }
      const { data } = await axios.put(`http://localhost:8000/blog/update/${blogId}`, fdata);

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/manage/blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

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

        <div>
          <label className="block text-sm font-medium mb-2">Current Image:</label>
          {existingImage && (
            <img
              src={`http://localhost:8000${existingImage}`}
              alt="Current"
              className="w-32 h-32 object-cover rounded mb-2"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/128";
              }}
            />
          )}
          <label className="block text-sm font-medium mb-2">Upload New Image (optional):</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded-lg"
            accept="image/*"
          />
        </div>

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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/manage/blog")}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

