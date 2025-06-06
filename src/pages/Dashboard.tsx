import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Edit, MoreVertical, Plus, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface Post {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        // Fetch user's posts directly
        const postsResponse = await fetch(
          "https://securesphere-backend-1.onrender.com/api/v1/post/myposts", 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!postsResponse.ok) {
          if (postsResponse.status === 401) {
            localStorage.removeItem("accessToken");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch posts");
        }

        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Dashboard error:", error);
        toast.error("Failed to load posts");
        localStorage.removeItem("accessToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://securesphere-backend-1.onrender.com/api/v1/post/deletepost/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
          return;
        }
        throw new Error("Failed to delete post");
      }

      setPosts(posts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Error deleting post");
      console.error("Delete error:", error);
    }
  };

  const handleEditPost = (postId: string) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-[#030712] to-[#0f172a] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secureSphere-purple mb-4"></div>
            <p className="text-gray-300 text-lg">Loading your content...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#030712] to-[#0f172a] text-white p-6">
        {/* Welcome Message */}
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-[#334155] rounded-2xl p-8 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secureSphere-purple rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secureSphere-blue rounded-full filter blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue">
              Welcome to Your Creative Space
            </h2>
            <p className="mt-3 text-gray-300 max-w-2xl">
              Here you can manage all your posts. Create, edit, and share your thoughts with the world.
            </p>
            <button
              onClick={handleCreatePost}
              className="mt-6 flex items-center gap-2 bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue hover:from-secureSphere-purple-dark hover:to-secureSphere-blue-dark text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} />
              Create New Post
            </button>
          </div>
        </div>

        {/* User Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue">
              Your Recent Creations
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">
                {posts.length} {posts.length === 1 ? "post" : "posts"} total
              </span>
              <button
                onClick={handleCreatePost}
                className="flex items-center gap-2 bg-secureSphere-purple hover:bg-secureSphere-purple-dark text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                <Plus size={16} />
                New Post
              </button>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="bg-[#0f172a] border border-[#1e293b] p-12 rounded-2xl text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1e293b] flex items-center justify-center">
                  <Plus size={40} className="text-secureSphere-purple" />
                </div>
                <h4 className="text-xl font-medium text-gray-200 mb-3">
                  Your story begins here
                </h4>
                <p className="text-gray-400 mb-6">
                  You haven't created any posts yet. Start sharing your ideas and creations with the world.
                </p>
                <button
                  onClick={handleCreatePost}
                  className="flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue hover:from-secureSphere-purple-dark hover:to-secureSphere-blue-dark text-white px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Create Your First Post
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="relative group bg-gradient-to-b from-[#0f172a] to-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={() => setHoveredPost(post._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${hoveredPost === post._id ? 'scale-105' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <button
                        onClick={() => handleEditPost(post._id)}
                        className="text-white bg-secureSphere-purple/80 hover:bg-secureSphere-purple px-3 py-1 rounded-md text-sm transition-colors duration-200"
                      >
                        Edit Post
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-lg mb-2 line-clamp-1">{post.title}</h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(showMenu === post._id ? null : post._id);
                          }}
                          className="p-1 hover:bg-[#334155] rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                          <MoreVertical size={16} />
                        </button>

                       {showMenu === post._id && (
  <div className="absolute right-0 bottom-full mb-2 w-40 bg-[#1e293b] border border-[#334155] rounded-md shadow-lg z-50 overflow-visible">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleEditPost(post._id);
      }}
      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#334155] transition-colors text-gray-300"
    >
      <Edit size={14} className="mr-2" />
      Edit
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDeletePost(post._id);
      }}
      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-[#334155] transition-colors"
    >
      <Trash2 size={14} className="mr-2" />
      Delete
    </button>
  </div>
)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;