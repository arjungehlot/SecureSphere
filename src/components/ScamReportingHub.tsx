"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from "./ui/separator";
import { MessageSquare, Heart, Share2, AlertCircle } from "lucide-react";

interface ScamReport {
  id: string;
  title: string;
  description: string;
  scamType: string;
  images: string[];
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const ScamReportingHub = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reports, setReports] = useState<ScamReport[]>([
   
  {
    id: "1",
    title: "Fake Amazon Order Confirmation Email",
    description:
      "I received an email claiming to be from Amazon about an order I never placed. It had a link to 'cancel' the order but led to a phishing page.",
    scamType: "Phishing",
    images: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"],
    user: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    title: "Fake Job Offer via WhatsApp",
    description:
      "Received a message offering a job with a suspicious link. They asked for an upfront payment to proceed with hiring.",
    scamType: "Job Scam",
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"],
    user: {
      name: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    timestamp: "5 hours ago",
    likes: 17,
    comments: 4,
    isLiked: false,
  },
  {
    id: "3",
    title: "Suspicious Bank Call Asking for OTP",
    description:
      "A person posing as a bank official called and asked me to share an OTP to verify my account. Luckily, I didn’t share it.",
    scamType: "OTP Fraud",
    images: ["https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=80"],
    user: {
      name: "Ravi Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
    },
    timestamp: "Today at 9:45 AM",
    likes: 31,
    comments: 5,
    isLiked: false,
  },
  {
    id: "4",
    title: "Online Seller Demanded Advance Then Disappeared",
    description:
      "I found a clothing seller on Instagram who asked for full payment in advance. Once I paid, they blocked me.",
    scamType: "Online Shopping Scam",
    images: ["https://images.unsplash.com/photo-1605902711622-cfb43c44367d?w=800&q=80"],
    user: {
      name: "Meera Nair",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
    },
    timestamp: "Yesterday",
    likes: 45,
    comments: 12,
    isLiked: true,
  },
  {
    id: "5",
    title: "Lottery Win Message on Facebook",
    description:
      "Received a message claiming I won a lottery from Facebook. They asked me to pay ₹2,000 to claim the prize.",
    scamType: "Lottery Scam",
    images: ["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80"],
    user: {
      name: "Arun Kumar",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun",
    },
    timestamp: "3 days ago",
    likes: 12,
    comments: 2,
    isLiked: false,
  },
  {
    id: "6",
    title: "Fake Tech Support Call",
    description:
      "Got a call claiming my computer was hacked and they needed remote access to fix it. They asked me to install an app.",
    scamType: "Tech Support Scam",
    images: ["https://images.unsplash.com/photo-1581092919533-3e42b1e276a7?w=800&q=80"],
    user: {
      name: "Lena Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lena",
    },
    timestamp: "Just now",
    likes: 7,
    comments: 1,
    isLiked: false,
  },
  {
    id: "7",
    title: "Fraudulent UPI Request on Paytm",
    description:
      "Received a Paytm UPI request from a person pretending to be a buyer. They sent a fake screenshot of payment success.",
    scamType: "UPI Scam",
    images: ["https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&q=80"],
    user: {
      name: "Nikhil Verma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhil",
    },
    timestamp: "4 hours ago",
    likes: 19,
    comments: 3,
    isLiked: true,
  },
  {
    id: "8",
    title: "Instagram Influencer Scam",
    description:
      "A fake influencer promised paid promotions and asked for a deposit. After I paid, they vanished.",
    scamType: "Social Media Scam",
    images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"],
    user: {
      name: "Sara Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    },
    timestamp: "Last week",
    likes: 28,
    comments: 9,
    isLiked: false,
  },
  {
    id: "9",
    title: "Fake Police Call Threatening Arrest",
    description:
      "Caller claimed to be from cybercrime police and said my Aadhaar was used in illegal activities. Demanded money to 'close the case.'",
    scamType: "Impersonation Scam",
    images: ["https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=800&q=80"],
    user: {
      name: "Deepak Joshi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak",
    },
    timestamp: "6 days ago",
    likes: 34,
    comments: 6,
    isLiked: false,
  },
  {
    id: "10",
    title: "Rent Scam with Fake Property Listing",
    description:
      "Found a flat on OLX. The 'owner' claimed to be out of town and asked for a deposit to courier the keys. No response after payment.",
    scamType: "Rental Scam",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"],
    user: {
      name: "Ritika Mehta",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ritika",
    },
    timestamp: "1 week ago",
    likes: 22,
    comments: 5,
    isLiked: false,
  },
  ]);

  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    scamType: "",
    images: [],
  });

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
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setNewReport((prev) => ({
        ...prev,
        images: [...prev.images, ...fileArray],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScamReport: ScamReport = {
      id: Date.now().toString(),
      title: newReport.title,
      description: newReport.description,
      scamType: newReport.scamType,
      images: newReport.images,
      user: {
        name: "Current User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
      },
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
    };
    setReports((prev) => [newScamReport, ...prev]);
    setNewReport({
      title: "",
      description: "",
      scamType: "",
      images: [],
    });
    setIsDialogOpen(false);
  };

  const toggleLike = (reportId: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? {
              ...report,
              isLiked: !report.isLiked,
              likes: report.isLiked ? report.likes - 1 : report.likes + 1,
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

  return (
    <div className="w-full min-h-screen bg-[#030712] text-white px-4 py-6">
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
                    <Label htmlFor="images">Evidence (Optional)</Label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="bg-gray-800 text-white border-gray-600"
                    />
                    {newReport.images.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {newReport.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit Report
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card
              key={report.id}
              className="bg-[#0f172a] text-white border border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              <CardHeader className="relative">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={report.user.avatar} />
                    <AvatarFallback>
                      {report.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">
                      {report.user.name}
                    </p>
                    <p className="text-sm text-gray-400">{report.timestamp}</p>
                  </div>
                </div>

                <CardTitle className="mt-3 text-lg leading-tight text-white">
                  {report.title}
                </CardTitle>

                <span className="absolute top-4 right-4 bg-blue-700 text-white text-xs font-semibold rounded-full px-3 py-1 shadow-sm">
                  {report.scamType}
                </span>
              </CardHeader>

              <CardContent className="pb-4">
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                  {report.description}
                </p>

                {report.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {report.images.map((img, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-lg aspect-video"
                      >
                        <img
                          src={img}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-md"
                          alt="Evidence"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="border-t border-gray-700 py-3 px-4">
                <div className="flex items-center justify-between w-full text-sm text-gray-300">
                  <button
                    onClick={() => toggleLike(report.id)}
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        report.isLiked ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    <span>{report.likes}</span>
                  </button>

                  <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{report.comments}</span>
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
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser" />
                    <AvatarFallback>CU</AvatarFallback>
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
      </div>
    </div>
  );
};

export default ScamReportingHub;
