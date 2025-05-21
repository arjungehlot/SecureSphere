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
        "I received an email claiming to be from Amazon about an order I never placed. It contained links to a fake Amazon login page trying to steal my credentials.",
      scamType: "Phishing",
      images: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      ],
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
      title: "Cryptocurrency Investment Scam",
      description:
        'Someone contacted me on LinkedIn offering an "exclusive" cryptocurrency investment opportunity with guaranteed 300% returns. They had a professional-looking website but asked for an upfront "verification fee".',
      scamType: "Investment Fraud",
      images: [
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      ],
      user: {
        name: "Samantha Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
      },
      timestamp: "1 day ago",
      likes: 56,
      comments: 12,
      isLiked: true,
    },
    {
      id: "3",
      title: "Tech Support Scam Call",
      description:
        'I received a call from someone claiming to be from Microsoft saying my computer was infected. They tried to get me to install remote access software and asked for payment to "fix" the issue.',
      scamType: "Tech Support Scam",
      images: [],
      user: {
        name: "Michael Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      timestamp: "3 days ago",
      likes: 32,
      comments: 15,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        URL.createObjectURL(file),
      );
      setNewReport((prev) => ({
        ...prev,
        images: [...prev.images, ...fileArray],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new report object
    const newScamReport: ScamReport = {
      id: Date.now().toString(),
      title: newReport.title,
      description: newReport.description,
      scamType: newReport.scamType,
      images: newReport.images,
      user: {
        name: "Current User", // In a real app, this would be the logged-in user
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
      },
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    // Add to reports list
    setReports((prev) => [newScamReport, ...prev]);

    // Reset form and close dialog
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
      prev.map((report) => {
        if (report.id === reportId) {
          const isLiked = !report.isLiked;
          return {
            ...report,
            isLiked,
            likes: isLiked ? report.likes + 1 : report.likes - 1,
          };
        }
        return report;
      }),
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
    <div className="w-full max-w-6xl mx-auto p-4 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Scam Reporting Hub</h1>
          <p className="text-muted-foreground">
            Share your experiences and help others stay safe
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <AlertCircle className="mr-2 h-4 w-4" />
              Report a Scam
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Report a Scam</DialogTitle>
                <DialogDescription>
                  Share your experience to help others avoid similar scams.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Brief description of the scam"
                    value={newReport.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="scamType">Scam Type</Label>
                  <Select
                    value={newReport.scamType}
                    onValueChange={handleScamTypeChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {scamTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide details about how the scam works"
                    value={newReport.description}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="images">Evidence (Optional)</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />

                  {newReport.images.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {newReport.images.map((img, index) => (
                        <div
                          key={index}
                          className="relative w-16 h-16 rounded overflow-hidden"
                        >
                          <img
                            src={img}
                            alt="Evidence"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Submit Report
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {reports.map((report) => (
          <Card key={report.id} className="overflow-hidden border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={report.user.avatar}
                    alt={report.user.name}
                  />
                  <AvatarFallback>{report.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{report.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.timestamp}
                  </p>
                </div>
              </div>
              <CardTitle className="mt-2">{report.title}</CardTitle>
              <div className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs">
                {report.scamType}
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-card-foreground mb-4">
                {report.description}
              </p>

              {report.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {report.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative rounded-md overflow-hidden aspect-video"
                    >
                      <img
                        src={img}
                        alt="Evidence"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter>
              <div className="flex items-center gap-6 w-full">
                <button
                  className="flex items-center gap-1 text-sm"
                  onClick={() => toggleLike(report.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${report.isLiked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span>{report.likes}</span>
                </button>

                <button className="flex items-center gap-1 text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>{report.comments}</span>
                </button>

                <button className="flex items-center gap-1 text-sm ml-auto">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </CardFooter>

            <Separator />

            <div className="p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
                    alt="Current User"
                  />
                  <AvatarFallback>CU</AvatarFallback>
                </Avatar>
                <Input
                  placeholder="Add a comment..."
                  className="rounded-full bg-secondary"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScamReportingHub;
