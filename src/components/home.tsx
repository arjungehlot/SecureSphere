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


const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <Navbar />

      <HeroSection />

      {/* Hero Section */}
      {/* <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Protect Yourself in the Digital World
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            SecureSphere helps you identify, report, and learn about online
            scams through powerful verification tools and community insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="text-white bg-[#ffbb00e6] hover:bg-[#ffbb00c0]"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-black hover:text-blue-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section> */}

      {/* Main Content with Tabs */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="analyzer" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-800">
                <TabsTrigger
                  value="analyzer"
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Link & Email Analyzer
                </TabsTrigger>
                <TabsTrigger
                  value="reporting"
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Scam Reporting Hub
                </TabsTrigger>
                <TabsTrigger
                  value="heatmap"
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Scam Heatmap
                </TabsTrigger>
              </TabsList>
            </div>

            <Card className="bg-gray-900 border-gray-800 shadow-xl">
              <CardContent className="p-6">
                <TabsContent value="analyzer">
                  <LinkEmailAnalyzer />
                </TabsContent>
                <TabsContent value="reporting">
                  <ScamReportingHub />
                </TabsContent>
                <TabsContent value="heatmap">
                  <ScamHeatmap />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </section> */}

      <FeaturesSection />
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
