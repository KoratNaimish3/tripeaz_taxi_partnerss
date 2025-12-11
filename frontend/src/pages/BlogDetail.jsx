import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Loader2, Calendar, ArrowLeft, Clock } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`http://localhost:8000/blog/slug/${slug}`);
      if (data.success) {
        setBlog(data.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      if (error.response?.status === 404) {
        setError("Blog not found");
      } else {
        setError("Failed to load blog");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navigation />
        <div className="pt-20 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-black mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "The blog you're looking for doesn't exist."}</p>
            <Link
              to="/blog"
              className="inline-flex items-center text-brand-yellow hover:text-yellow-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      <article className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-brand-yellow transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>

          {/* Blog Header */}
          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`http://localhost:8000${blog.image}`}
              alt={blog.title}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400";
              }}
            />
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.description}
              </div>
            </div>
          </div>

          {/* Meta Information */}
          {(blog.metaTitle || blog.metaDescription || blog.metaKeywords?.length > 0) && (
            <div className="mt-12 bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">SEO Information</h2>
              {blog.metaTitle && (
                <div className="mb-3">
                  <span className="font-semibold text-gray-700">Meta Title:</span>
                  <p className="text-gray-600">{blog.metaTitle}</p>
                </div>
              )}
              {blog.metaDescription && (
                <div className="mb-3">
                  <span className="font-semibold text-gray-700">Meta Description:</span>
                  <p className="text-gray-600">{blog.metaDescription}</p>
                </div>
              )}
              {blog.metaKeywords && blog.metaKeywords.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-700">Keywords:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blog.metaKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-brand-yellow/20 text-black rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blog"
              className="inline-flex items-center text-brand-yellow hover:text-yellow-400 font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Blogs
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}





