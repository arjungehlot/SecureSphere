import Layout from "@/components/layout/Layout";
import React from "react";

// Dummy user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Cybersecurity enthusiast | Explorer | SecureSphere Member",
  avatar: "https://i.pravatar.cc/150?img=3",
};

// Dummy post data
const posts = [
  { id: 1, image: "https://source.unsplash.com/random/300x300?cybersecurity" },
  { id: 2, image: "https://source.unsplash.com/random/300x300?hacker" },
  { id: 3, image: "https://source.unsplash.com/random/300x300?security" },
  { id: 4, image: "https://source.unsplash.com/random/300x300?data" },
  { id: 5, image: "https://source.unsplash.com/random/300x300?technology" },
  { id: 6, image: "https://source.unsplash.com/random/300x300?network" },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-[#030712] text-white p-6">
        {/* User Profile Card */}
        <div className="max-w-4xl mx-auto bg-[#0d1420] border border-[#1f2a3a] rounded-xl p-6 shadow-lg mb-10">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-2 border-secureSphere-purple"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="mt-2 text-gray-300">{user.bio}</p>
            </div>
          </div>
        </div>

        {/* User Posts Grid */}
        <h3 className="text-xl font-semibold mb-4 text-secureSphere-purple">
          Your Posts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 border border-[#1f2a3a]"
            >
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
