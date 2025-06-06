import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageSquare, Heart, Share2, AlertCircle, Trash2 } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

interface ScamReport {
  _id: string;
  title: string;
  description: string;
  scamType: string;
  imageUrl: string;
  imageId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  user?: {
    name: string;
    avatar: string;
  };
  likes?: number;
  comments?: any;
  isLiked?: boolean;
}

const ScamReportingHub = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(true);

  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    scamType: "Phishing", // Default value
    image: null as File | null,
  });

  // Get current user ID from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setCurrentUserId(parsedData._id);
    }
  }, []);

  // Fetch reports from API
  const fetchReports = async (allPosts = false) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      
      const endpoint = allPosts 
        ? 'https://securesphere-backend-1.onrender.com/api/v1/post/posts'
        : 'https://securesphere-backend-1.onrender.com/api/v1/post/myposts';

      const headers: Record<string, string> = {};
      
      if (!allPosts) {
        if (!token) {
          toast.error('Please login to view your posts');
          navigate('/login');
          return;
        }
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: headers
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch reports');
      }
      
      const data = await response.json();
      setReports(data.map((post: ScamReport) => ({
        ...post,
        likes: post.likes || 0,
        comments: post.comments || 0,
        isLiked: false,
        user: post.user || {
          name: "Post Owner",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
        }
      })));
    } catch (error) {
      toast.error('Failed to load reports');
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(showAllPosts);
  }, [showAllPosts, currentUserId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleScamTypeChange = (value: string) => {
    setNewReport((prev) => ({ ...prev, scamType: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewReport((prev) => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Please login to create a post');
      navigate('/login');
      return;
    }

    // Basic validation
    if (!newReport.title || !newReport.description || !newReport.scamType) {
      throw new Error('All fields are required');
    }

    const formData = new FormData();
    formData.append('title', newReport.title);
    formData.append('description', newReport.description);
    formData.append('scamType', newReport.scamType);
    
    if (newReport.image) {
      // Additional image validation
      if (!newReport.image.type.startsWith('image/')) {
        throw new Error('Only image files are allowed');
      }
      if (newReport.image.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image size must be less than 5MB');
      }
      formData.append('image', newReport.image);
    }

    // Debugging: Log what we're sending
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch('http://localhost:8000/api/v1/post/createpost', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type - let browser set it with boundary
      },
      body: formData
    });

    // Get raw response first
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      // Try to extract error message from HTML if needed
      const errorMatch = responseText.match(/<pre>(.*?)<\/pre>/s);
      const errorMessage = errorMatch ? errorMatch[1] : 'Server error occurred';
      throw new Error(errorMessage);
    }

    // Try to parse JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', responseText);
      throw new Error('Server returned invalid JSON');
    }

    console.log('Post created:', data);
    
    // Refresh the posts list
    await fetchReports(showAllPosts);
    
    // Reset form
    setNewReport({
      title: "",
      description: "",
      scamType: "Phishing",
      image: null,
    });
    setIsDialogOpen(false);
    
    toast.success('Post created successfully!');
  } catch (error: any) {
    console.error('Full error:', error);
    toast.error(error.message || 'Failed to create post');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Please login to delete posts');
        navigate('/login');
        return;
      }

      const response = await fetch(`https://securesphere-backend-1.onrender.com/api/v1/post/deletepost/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete post');
      }
      
      setReports(prev => prev.filter(report => report._id !== postId));
      toast.success('Post deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete post');
      console.error('Error deleting post:', error);
    }
  };

  const toggleLike = (reportId: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report._id === reportId
          ? {
              ...report,
              isLiked: !report.isLiked,
              likes: report.isLiked ? (report.likes || 0) - 1 : (report.likes || 0) + 1,
            }
          : report
      )
    );
  };

  const scamTypes = [
    "Phishing",
    "Investment Fraud",
    "Tech Support Scam",
    "Romance Scam",
    "Job Scam",
    "Shopping Scam",
    "Lottery/Prize Scam",
    "Identity Theft",
    "Other",
  ];

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full min-h-screen bg-[#030712] text-white px-4 py-6">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white">
              Scam Reporting Hub
            </h1>
            <p className="text-gray-400">
              Share your experiences and help others stay safe
            </p>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={() => setShowAllPosts(!showAllPosts)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {showAllPosts ? 'Show My Posts' : 'See All Posts'}
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report a Scam
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0f172a] text-white border border-gray-700">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Report a Scam</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Share your experience to help others avoid similar scams.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={newReport.title}
                        onChange={handleInputChange}
                        placeholder="Brief description of the scam"
                        required
                        className="bg-gray-800 text-white border-gray-600"
                      />
                    </div>

                    <div>
                      <Label>Scam Type</Label>
                      <Select
                        value={newReport.scamType}
                        onValueChange={handleScamTypeChange}
                        required
                      >
                        <SelectTrigger className="bg-gray-800 text-white border-gray-600">
                          <SelectValue placeholder="Select scam type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white">
                          {scamTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="hover:bg-gray-700"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newReport.description}
                        onChange={handleInputChange}
                        placeholder="Explain how the scam works"
                        className="min-h-[100px] bg-gray-800 text-white border-gray-600"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Evidence (Optional)</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-gray-800 text-white border-gray-600"
                      />
                      {newReport.image && (
                        <div className="mt-2">
                          <img 
                            src={URL.createObjectURL(newReport.image)} 
                            className="w-32 h-32 object-cover rounded-md"
                            alt="Preview"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {showAllPosts ? 'No posts available' : 'You have not created any posts yet'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <Card
                key={report._id}
                className="bg-[#0f172a] text-white border border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={report.user?.avatar} />
                      <AvatarFallback>
                        {report.user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">
                        {report.user?.name || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-400">{formatRelativeTime(report.createdAt)}</p>
                    </div>
                  </div>

                  <CardTitle className="mt-3 text-lg leading-tight text-white">
                    {report.title}
                  </CardTitle>

                  <span className="absolute top-4 right-4 bg-blue-700 text-white text-xs font-semibold rounded-full px-3 py-1 shadow-sm">
                    {report.scamType || 'Other'}
                  </span>
                  
                  {currentUserId === report.userId && (
                    <button 
                      onClick={() => handleDeletePost(report._id)}
                      className="absolute top-4 right-20 text-red-500 hover:text-red-400 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </CardHeader>

                <CardContent className="pb-4">
                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                    {report.description}
                  </p>

                  {report.imageUrl && (
                    <div className="overflow-hidden rounded-lg aspect-video">
                      <img
                        src={report.imageUrl}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-md"
                        alt="Evidence"
                      />
                    </div>
                  )}
                </CardContent>

                <CardFooter className="border-t border-gray-700 py-3 px-4">
                  <div className="flex items-center justify-between w-full text-sm text-gray-300">
                    <button
                      onClick={() => toggleLike(report._id)}
                      className="flex items-center gap-1 hover:text-red-400 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 transition-all ${
                          report.isLiked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      <span>{report.likes || 0}</span>
                    </button>

                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{report.comments || 0}</span>
                    </div>

                    <div className="flex items-center gap-1 hover:text-green-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </div>
                  </div>
                </CardFooter>

                <div className="px-4 pb-4 pt-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Commenter" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder="Add a comment..."
                      className="bg-gray-800 border border-gray-700 text-white rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamReportingHub;