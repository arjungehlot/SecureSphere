import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Video,
  Shield,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

const ResourcesPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-secureSphere-gray-950 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secureSphere-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secureSphere-blue/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Security{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Resources
              </span>
            </h1>
            <p className="text-xl text-secureSphere-gray-300 mb-8">
              Expand your knowledge about online security and learn how to
              protect yourself from the latest scams and threats.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 bg-secureSphere-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Security{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Guides
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              Comprehensive guides to help you understand and prevent various
              types of online scams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Ultimate Guide to Phishing Prevention",
                description:
                  "Learn how to identify and avoid sophisticated phishing attempts targeting your personal and financial information.",
                icon: (
                  <AlertTriangle className="h-6 w-6 text-secureSphere-purple-light" />
                ),
                color: "from-purple-500/20 to-purple-600/20",
                delay: 0.1,
              },
              {
                title: "Securing Your Online Accounts",
                description:
                  "Best practices for creating strong passwords, implementing two-factor authentication, and managing your digital identities.",
                icon: <Lock className="h-6 w-6 text-secureSphere-blue-light" />,
                color: "from-blue-500/20 to-blue-600/20",
                delay: 0.2,
              },
              {
                title: "Recognizing Social Engineering Tactics",
                description:
                  "How to spot manipulation techniques used by scammers to trick you into revealing sensitive information or taking harmful actions.",
                icon: <Shield className="h-6 w-6 text-secureSphere-yellow" />,
                color: "from-yellow-500/20 to-yellow-600/20",
                delay: 0.3,
              },
            ].map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: guide.delay }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${guide.color} p-6 rounded-xl border border-secureSphere-gray-800 backdrop-blur-sm hover:shadow-lg hover:shadow-secureSphere-purple/5 transition-all duration-300`}
              >
                <div className="bg-secureSphere-gray-900/60 p-3 rounded-lg inline-block mb-4">
                  {guide.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {guide.title}
                </h3>
                <p className="text-secureSphere-gray-400 mb-4">
                  {guide.description}
                </p>
                <Button
                  variant="outline"
                  className="border-secureSphere-gray-700 text-white hover:bg-secureSphere-gray-800"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Read Guide
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16 bg-secureSphere-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Downloadable{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Resources
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              Free tools and documents to enhance your online security knowledge
              and practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Scam Prevention Checklist",
                format: "PDF",
                size: "1.2 MB",
                delay: 0.1,
              },
              {
                title: "Digital Security Toolkit",
                format: "ZIP",
                size: "4.5 MB",
                delay: 0.2,
              },
              {
                title: "Online Safety Guide for Seniors",
                format: "PDF",
                size: "2.8 MB",
                delay: 0.3,
              },
              {
                title: "Phishing Email Templates",
                format: "PDF",
                size: "3.1 MB",
                delay: 0.4,
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: resource.delay }}
                viewport={{ once: true }}
                className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800 hover:border-secureSphere-purple-light transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-secureSphere-gray-800 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-secureSphere-purple-light" />
                  </div>
                  <div className="bg-secureSphere-gray-800 px-2 py-1 rounded text-xs font-medium text-secureSphere-gray-300">
                    {resource.format} • {resource.size}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {resource.title}
                </h3>
                <Button className="w-full bg-secureSphere-gray-800 hover:bg-secureSphere-gray-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials Section */}
      <section className="py-16 bg-secureSphere-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Video{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Tutorials
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              Watch our educational videos to learn practical security skills
              and techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "How to Spot a Phishing Email",
                thumbnail:
                  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
                duration: "8:24",
                delay: 0.1,
              },
              {
                title: "Securing Your Social Media Accounts",
                thumbnail:
                  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
                duration: "12:51",
                delay: 0.2,
              },
              {
                title: "Understanding Cryptocurrency Scams",
                thumbnail:
                  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
                duration: "15:32",
                delay: 0.3,
              },
              {
                title: "Safe Online Shopping Practices",
                thumbnail:
                  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
                duration: "10:17",
                delay: 0.4,
              },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: video.delay }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secureSphere-gray-950 to-transparent opacity-70"></div>
                  <div className="absolute top-4 right-4 bg-secureSphere-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-secureSphere-purple/80 backdrop-blur-sm p-4 rounded-full group-hover:bg-secureSphere-purple transition-colors">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-secureSphere-gray-800">
                  <h3 className="text-lg font-semibold text-white group-hover:text-secureSphere-purple-light transition-colors">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-secureSphere-purple-light text-secureSphere-purple-light hover:bg-secureSphere-purple/10"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View All Tutorials
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-secureSphere-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Latest from our{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Blog
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              Stay updated with the latest security news, trends, and insights
              from our experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Rise of AI-Powered Scams: What You Need to Know",
                excerpt:
                  "Artificial intelligence is making scams more sophisticated and harder to detect. Learn how to protect yourself from these advanced threats.",
                date: "June 15, 2023",
                author: "Alex Morgan",
                image:
                  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
                delay: 0.1,
              },
              {
                title: "How to Secure Your Smart Home Devices",
                excerpt:
                  "Smart home devices can create security vulnerabilities if not properly configured. Follow these steps to secure your connected home.",
                date: "May 28, 2023",
                author: "Sophia Chen",
                image:
                  "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
                delay: 0.2,
              },
              {
                title: "The Psychology Behind Social Engineering Attacks",
                excerpt:
                  "Understanding the psychological tactics scammers use can help you recognize and avoid falling victim to social engineering attacks.",
                date: "May 10, 2023",
                author: "Marcus Johnson",
                image:
                  "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80",
                delay: 0.3,
              },
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: post.delay }}
                viewport={{ once: true }}
                className="bg-secureSphere-gray-900/50 rounded-xl overflow-hidden border border-secureSphere-gray-800 hover:border-secureSphere-purple-light transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3 text-xs text-secureSphere-gray-400">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white hover:text-secureSphere-purple-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-secureSphere-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-secureSphere-purple-light hover:bg-secureSphere-purple/10 p-0"
                  >
                    Read More <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-secureSphere-purple-light text-secureSphere-purple-light hover:bg-secureSphere-purple/10"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-secureSphere-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-secureSphere-purple/20 to-secureSphere-blue/20 rounded-2xl p-8 md:p-12 border border-secureSphere-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Stay{" "}
                <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                  Informed
                </span>
              </h2>
              <p className="text-secureSphere-gray-300 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest security
                updates, threat alerts, and educational resources directly to
                your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-secureSphere-gray-800 border border-secureSphere-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secureSphere-purple-light"
              />
              <Button className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>

            <p className="text-secureSphere-gray-400 text-xs text-center mt-4">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPage;
