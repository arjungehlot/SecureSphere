import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { default as LinkEmailAnalyzer } from "./LinkEmailAnalyzer";
import ScamReportingHub from "./ScamReportingHub";
import ScamHeatmap from "./ScamHeatmap";
import AIChatbot from "./AIChatbot";
import { MessageCircle, Shield, AlertTriangle, Globe } from "lucide-react";
import Navbar from "./layout/Navbar";
import FeaturesSection from "./home/FeaturesSection";
import TestimonialSection from "./home/TestimonialSection";
import Footer from "./layout/Footer";
import HeroSection from "./home/HeroSection";
import CTASection from "./home/CTASection";
import RecentPost from "./home/RecentPost";


const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <RecentPost />
      <TestimonialSection />
      <Footer />

      {/* Floating AI Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* AI Chatbot Component */}
      {isChatbotOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <AIChatbot onClose={() => setIsChatbotOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
