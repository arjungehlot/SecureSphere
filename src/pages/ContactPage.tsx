import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-[#030712] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secureSphere-purple/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get in{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Touch
              </span>
            </h1>
            <p className="text-xl text-secureSphere-gray-300 mb-8">
              Have questions about our services or need assistance? We're here
              to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-secureSphere-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Contact{" "}
                  <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                    Information
                  </span>
                </h2>
                <p className="text-secureSphere-gray-300 mb-8">
                  Our team is ready to assist you with any questions or concerns
                  about online security and scam prevention.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secureSphere-purple/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-secureSphere-purple-light" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email Us</h3>
                    <p className="text-secureSphere-gray-400 mt-1">
                      support@securesphere.com
                    </p>
                    <p className="text-secureSphere-gray-400">
                      info@securesphere.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secureSphere-blue/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-secureSphere-blue-light" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Call Us</h3>
                    <p className="text-secureSphere-gray-400 mt-1">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-secureSphere-gray-400">
                      Mon-Fri, 9AM-5PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secureSphere-yellow/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-secureSphere-yellow" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Visit Us</h3>
                    <p className="text-secureSphere-gray-400 mt-1">
                      123 Security Avenue
                    </p>
                    <p className="text-secureSphere-gray-400">
                      Cybertown, CT 10101
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secureSphere-purple/20 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-secureSphere-purple-light" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Live Chat
                    </h3>
                    <p className="text-secureSphere-gray-400 mt-1">
                      Available 24/7 through our AI assistant
                    </p>
                    <p className="text-secureSphere-gray-400">
                      Human agents: Mon-Fri, 9AM-8PM EST
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-secureSphere-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  {["twitter", "facebook", "instagram", "linkedin"].map(
                    (platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="bg-secureSphere-gray-800 hover:bg-secureSphere-gray-700 p-3 rounded-full transition-colors"
                      >
                        <img
                          src={`/icons/${platform}.svg`}
                          alt={platform}
                          className="h-5 w-5"
                        />
                      </a>
                    ),
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-secureSphere-gray-800 rounded-xl p-8 border border-secureSphere-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Send Us a Message
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-secureSphere-gray-300"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-secureSphere-gray-900 border-secureSphere-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-secureSphere-gray-300"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-secureSphere-gray-900 border-secureSphere-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-secureSphere-gray-300"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="bg-secureSphere-gray-900 border-secureSphere-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-secureSphere-gray-300"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your question or concern in detail..."
                      className="bg-secureSphere-gray-900 border-secureSphere-gray-700 text-white min-h-[150px]"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Questions
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How does the link analyzer work?",
                answer:
                  "Our link analyzer uses advanced algorithms to check URLs against our database of known scams, analyzes the website content, and verifies the domain reputation to determine if a link is safe or potentially malicious.",
                delay: 0.1,
              },
              {
                question: "Is SecureSphere free to use?",
                answer:
                  "Yes, our basic features are free for all users. We also offer premium plans with advanced features for individuals and organizations requiring enhanced protection.",
                delay: 0.2,
              },
              {
                question: "How can I report a scam I encountered?",
                answer:
                  "You can report scams through our Scam Reporting Hub. Simply navigate to the reporting section, fill out the form with details about the scam, and submit it to our database to help protect others.",
                delay: 0.3,
              },
              {
                question: "Does SecureSphere work on mobile devices?",
                answer:
                  "Yes, SecureSphere is fully responsive and works on all devices including smartphones and tablets. We also offer dedicated mobile apps for iOS and Android for a more optimized experience.",
                delay: 0.4,
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: faq.delay }}
                viewport={{ once: true }}
                className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {faq.question}
                </h3>
                <p className="text-secureSphere-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
