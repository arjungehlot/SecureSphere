import React from "react";
import {
  Shield,
  AlertTriangle,
  MessageCircle,
  Globe,
  Zap,
  Lock,
  Users,
  Database,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <AlertTriangle className="h-6 w-6 text-secureSphere-purple-light" />,
    title: "Link & Email Analyzer",
    description:
      "Instantly analyze suspicious URLs and emails to detect phishing attempts and malicious content.",
    color: "from-purple-500/20 to-purple-600/20",
    delay: 0.1,
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-secureSphere-blue-light" />,
    title: "Scam Reporting Hub",
    description:
      "Share and learn from community-reported scams to stay ahead of emerging threats.",
    color: "from-blue-500/20 to-blue-600/20",
    delay: 0.2,
  },
  {
    icon: <Globe className="h-6 w-6 text-secureSphere-yellow" />,
    title: "Interactive Scam Heatmap",
    description:
      "Visualize global scam hotspots and trends with our interactive mapping tool.",
    color: "from-yellow-500/20 to-yellow-600/20",
    delay: 0.3,
  },
  {
    icon: <Zap className="h-6 w-6 text-secureSphere-purple-light" />,
    title: "AI Chatbot Assistant",
    description:
      "Get instant guidance on scam detection and prevention from our AI-powered assistant.",
    color: "from-purple-500/20 to-purple-600/20",
    delay: 0.4,
  },
  {
    icon: <Lock className="h-6 w-6 text-secureSphere-blue-light" />,
    title: "Real-time Protection",
    description:
      "Receive alerts about new scams targeting your region or industry as they emerge.",
    color: "from-blue-500/20 to-blue-600/20",
    delay: 0.5,
  },
  {
    icon: <Users className="h-6 w-6 text-secureSphere-yellow" />,
    title: "Community Insights",
    description:
      "Leverage collective knowledge from our global community of security-conscious users.",
    color: "from-yellow-500/20 to-yellow-600/20",
    delay: 0.6,
  },
  {
    icon: <Database className="h-6 w-6 text-secureSphere-purple-light" />,
    title: "Comprehensive Database",
    description:
      "Access our extensive database of known scams, phishing sites, and malicious actors.",
    color: "from-purple-500/20 to-purple-600/20",
    delay: 0.7,
  },
  {
    icon: <Shield className="h-6 w-6 text-secureSphere-blue-light" />,
    title: "Educational Resources",
    description:
      "Learn best practices for staying safe online with our curated security resources.",
    color: "from-blue-500/20 to-blue-600/20",
    delay: 0.8,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secureSphere-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
              Protection
            </span>{" "}
            Features
          </h2>
          <p className="text-secureSphere-gray-300 text-lg">
            Our platform offers a suite of powerful tools designed to keep you
            safe from the latest online threats and scams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${feature.color} p-6 rounded-xl border border-secureSphere-gray-800 backdrop-blur-sm hover:shadow-lg hover:shadow-secureSphere-purple/5 transition-all duration-300`}
            >
              <div className="bg-secureSphere-gray-900/60 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-secureSphere-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
