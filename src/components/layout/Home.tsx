import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AIChatWithToggle from "../AIChatbot"; // rename import to match file
import { MessageCircle, X } from "lucide-react";
import Navbar from "./Navbar";
import FeaturesSection from "../home/FeaturesSection";
import TestimonialSection from "../home/TestimonialSection";
import Footer from "./Footer";
import HeroSection from "../home/HeroSection";
import CTASection from "../home/CTASection";
import RecentPost from "../home/RecentPost";

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
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl flex items-center justify-center transition duration-300"
        >
          {isChatbotOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* AI Chatbot Component */}
      {isChatbotOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <AIChatWithToggle onClose={() => setIsChatbotOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
