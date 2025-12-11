import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Edit, Trash2, Copy, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8000/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      setDeletingId(id);
      const { data } = await axios.delete(`http://localhost:8000/blog/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchBlogs()
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete blog");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = (slug) => {
    const blogUrl = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(blogUrl);
    setCopiedId(slug);
    toast.success("Blog URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (slug) => {
    navigate(`/admin/edit/blog/${slug}`);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <p className="text-gray-600">Total Blogs: {blogs.length}</p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found. Create your first blog!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left font-semibold">Image</th>
                <th className="p-3 text-left font-semibold">Title</th>
                <th className="p-3 text-left font-semibold">Slug</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-left font-semibold">Created</th>
                <th className="p-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={`http://localhost:8000${blog.image}`}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/64";
                      }}
                    />
                  </td>

                  <td className="p-3">
                    <div className="font-medium">{blog.title}</div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        blog/{blog.slug}
                      </code>
                      <button
                        onClick={() => handleCopy(blog.slug)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                        title="Copy URL"
                      >
                        {copiedId === blog.slug ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(blog.slug)}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-1"
                        title="Edit Blog"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        disabled={deletingId === blog._id}
                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1 disabled:opacity-50"
                        title="Delete Blog"
                      >
                        {deletingId === blog._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
