import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "SecureSphere helped me identify a sophisticated phishing attempt that my regular email provider missed. The detailed analysis saved me from a potential identity theft situation.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
  },
  {
    quote:
      "The scam heatmap feature is incredibly useful for my international business. I can see where the latest scams are emerging and prepare my team accordingly.",
    author: "Michael Chen",
    role: "Business Owner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
  },
  {
    quote:
      "As someone who was previously victimized by an online scam, SecureSphere has become my go-to tool for verifying emails and links. The peace of mind is invaluable.",
    author: "Elena Rodriguez",
    role: "Financial Analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    rating: 5,
  },
  {
    quote:
      "The AI chatbot provided immediate guidance when I received a suspicious text message. The step-by-step instructions helped me report and block the scammer effectively.",
    author: "David Thompson",
    role: "IT Professional",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 4,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-secureSphere-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-secureSphere-gray-950 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-secureSphere-gray-950 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-secureSphere-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secureSphere-blue/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
              Thousands
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-secureSphere-gray-300 text-lg">
            Hear from our users who have successfully protected themselves from
            online scams using SecureSphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-secureSphere-gray-700 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-secureSphere-purple-light opacity-20" />
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full border-2 border-secureSphere-purple-light"
                />
                <div>
                  <h4 className="text-white font-medium">
                    {testimonial.author}
                  </h4>
                  <p className="text-secureSphere-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-secureSphere-yellow fill-secureSphere-yellow" : "text-secureSphere-gray-600"}`}
                  />
                ))}
              </div>
              <p className="text-secureSphere-gray-300">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
