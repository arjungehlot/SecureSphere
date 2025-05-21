import React from "react";
import Layout from "@/components/layout/Layout";
import { Shield, Users, Globe, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-secureSphere-gray-950 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secureSphere-purple/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                SecureSphere
              </span>
            </h1>
            <p className="text-xl text-secureSphere-gray-300 mb-8">
              Our mission is to create a safer digital world by empowering users
              with the tools and knowledge to protect themselves from online
              scams.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-secureSphere-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Our{" "}
                <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                  Story
                </span>
              </h2>
              <p className="text-secureSphere-gray-300 mb-4">
                SecureSphere was founded in 2022 by a team of cybersecurity
                experts who recognized the growing threat of sophisticated
                online scams targeting everyday internet users.
              </p>
              <p className="text-secureSphere-gray-300 mb-4">
                After witnessing countless individuals fall victim to phishing
                attacks, fake websites, and social engineering schemes, we
                decided to create a comprehensive platform that combines
                advanced technology with community insights to combat these
                threats.
              </p>
              <p className="text-secureSphere-gray-300">
                Today, SecureSphere serves users in over 120 countries, helping
                them identify and avoid scams before they become victims. Our
                tools have analyzed millions of suspicious links and emails,
                preventing thousands of potential fraud cases.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-secureSphere-purple/20 to-secureSphere-blue/20 rounded-xl blur-xl"></div>
              <div className="relative bg-secureSphere-gray-800 rounded-xl overflow-hidden border border-secureSphere-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
                  alt="Cybersecurity team"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-secureSphere-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Our{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Values
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              These core principles guide everything we do at SecureSphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
            >
              <div className="bg-secureSphere-purple/20 p-3 rounded-lg inline-block mb-4">
                <Shield className="h-6 w-6 text-secureSphere-purple-light" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Protection First
              </h3>
              <p className="text-secureSphere-gray-400">
                We prioritize user safety above all else, constantly updating
                our systems to address emerging threats and vulnerabilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
            >
              <div className="bg-secureSphere-blue/20 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6 text-secureSphere-blue-light" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Community Empowerment
              </h3>
              <p className="text-secureSphere-gray-400">
                We believe in the power of collective knowledge and encourage
                users to share insights to strengthen our global security
                network.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
            >
              <div className="bg-secureSphere-yellow/20 p-3 rounded-lg inline-block mb-4">
                <Globe className="h-6 w-6 text-secureSphere-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Global Accessibility
              </h3>
              <p className="text-secureSphere-gray-400">
                We strive to make our tools accessible to everyone, regardless
                of technical expertise or geographic location.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secureSphere-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Team
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              The experts behind SecureSphere's innovative security solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                delay: 0.1,
              },
              {
                name: "Sophia Chen",
                role: "Chief Security Officer",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
                delay: 0.2,
              },
              {
                name: "Marcus Johnson",
                role: "Lead Developer",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
                delay: 0.3,
              },
              {
                name: "Priya Patel",
                role: "AI Research Lead",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
                delay: 0.4,
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: member.delay }}
                viewport={{ once: true }}
                className="bg-secureSphere-gray-800/50 p-6 rounded-xl border border-secureSphere-gray-700 text-center"
              >
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light rounded-full opacity-50 blur-md"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative rounded-full w-24 h-24 border-2 border-secureSphere-purple-light"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-secureSphere-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-secureSphere-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Our{" "}
              <span className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light text-transparent bg-clip-text">
                Achievements
              </span>
            </h2>
            <p className="text-secureSphere-gray-300">
              Milestones that mark our journey in the fight against online
              scams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="bg-secureSphere-purple/20 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-secureSphere-purple-light" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Cybersecurity Excellence Award 2023
                  </h3>
                  <p className="text-secureSphere-gray-400">
                    Recognized for our innovative approach to consumer-focused
                    threat detection and prevention.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="bg-secureSphere-blue/20 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-secureSphere-blue-light" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    10 Million Analysis Milestone
                  </h3>
                  <p className="text-secureSphere-gray-400">
                    Successfully analyzed over 10 million URLs and emails,
                    helping users avoid potential scams and threats.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="bg-secureSphere-yellow/20 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-secureSphere-yellow" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Global Expansion
                  </h3>
                  <p className="text-secureSphere-gray-400">
                    Expanded our services to over 120 countries, creating a
                    truly global network of scam detection and prevention.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-secureSphere-gray-900/50 p-6 rounded-xl border border-secureSphere-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="bg-secureSphere-purple/20 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-secureSphere-purple-light" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Community Growth
                  </h3>
                  <p className="text-secureSphere-gray-400">
                    Built a thriving community of over 500,000
                    security-conscious users who actively contribute to our scam
                    detection database.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
