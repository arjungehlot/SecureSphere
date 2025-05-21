import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { default as LinkEmailAnalyzer } from "./LinkEmailAnalyzer";
import ScamReportingHub from "./ScamReportingHub";
import ScamHeatmap from "./ScamHeatmap";
import AIChatbot from "./AIChatbot";
import { MessageCircle, Shield, AlertTriangle, Globe } from "lucide-react";

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold">SecureSphere</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Protect Yourself in the Digital World
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            SecureSphere helps you identify, report, and learn about online
            scams through powerful verification tools and community insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-12">
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
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-12">
            Protecting Users Worldwide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-800 rounded-lg">
              <p className="text-4xl font-bold text-blue-500 mb-2">10M+</p>
              <p className="text-gray-300">Links Analyzed</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <p className="text-4xl font-bold text-blue-500 mb-2">50K+</p>
              <p className="text-gray-300">Scams Reported</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <p className="text-4xl font-bold text-blue-500 mb-2">120+</p>
              <p className="text-gray-300">Countries Protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">SecureSphere</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SecureSphere. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

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
