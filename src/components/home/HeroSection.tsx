import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import HomeImage from "./../../assets/HomeImage.png"; // Adjust the path as necessary
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secureSphere-gray-950 via-secureSphere-gray-900 to-secureSphere-purple-dark opacity-90 z-0"></div>

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10 z-0"></div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-secureSphere-purple/20 blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secureSphere-blue/20 blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center md:items-start max-w-7xl gap-10">
            {/* Left side: Text content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-secureSphere-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 justify-center md:justify-start">
                <span className="bg-secureSphere-purple-light h-2 w-2 rounded-full animate-pulse"></span>
                <span className="text-secureSphere-gray-300 text-sm">
                  New: AI-powered scam detection
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Your{" "}
                <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                  Digital Shield-
                </span>{" "}
                <br />
                Against Online Frauds!
              </h1>

              <p className="text-xl text-secureSphere-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
                SecureSphere helps you identify, report, and learn about online
                scams through powerful verification tools and community
                insights.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link to="/all-features">
                 <Button
                  size="lg"
                  className="bg-gradient-to-r from-secureSphere-purple w-40 to-secureSphere-blue-light hover:opacity-90 text-white px-8 py-6 text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </Link>
               
                <Link to="/learn-more">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-gradient-to-r from-secureSphere-purple w-40 to-secureSphere-blue-light hover:opacity-90 hover:text-white px-8 py-6 text-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side: Image */}
            <div className="flex-1 max-w-md md:max-w-lg">
              <img
                src={HomeImage}
                alt="Home Image"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-secureSphere-gray-900/60 backdrop-blur-sm p-4 rounded-lg border border-secureSphere-gray-800">
              <p className="text-3xl font-bold text-secureSphere-purple-light mb-1">
                10M+
              </p>
              <p className="text-secureSphere-gray-400 text-sm">
                Links Analyzed
              </p>
            </div>
            <div className="bg-secureSphere-gray-900/60 backdrop-blur-sm p-4 rounded-lg border border-secureSphere-gray-800">
              <p className="text-3xl font-bold text-secureSphere-blue-light mb-1">
                50K+
              </p>
              <p className="text-secureSphere-gray-400 text-sm">
                Scams Reported
              </p>
            </div>
            <div className="bg-secureSphere-gray-900/60 backdrop-blur-sm p-4 rounded-lg border border-secureSphere-gray-800">
              <p className="text-3xl font-bold text-secureSphere-yellow mb-1">
                98%
              </p>
              <p className="text-secureSphere-gray-400 text-sm">
                Detection Rate
              </p>
            </div>
            <div className="bg-secureSphere-gray-900/60 backdrop-blur-sm p-4 rounded-lg border border-secureSphere-gray-800">
              <p className="text-3xl font-bold text-white mb-1">120+</p>
              <p className="text-secureSphere-gray-400 text-sm">
                Countries Protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
