import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaHeadphones, FaMicrophone, FaWaveSquare, FaStar, FaVolumeUp, FaSearch } from "react-icons/fa";

const floatingIcons = [
  { icon: FaMusic, className: "top-10 left-10", delay: 0 },
  { icon: FaHeadphones, className: "top-20 right-20", delay: 1 },
  { icon: FaMicrophone, className: "bottom-20 left-20", delay: 2 },
  { icon: FaWaveSquare, className: "bottom-10 right-10", delay: 3 },
  { icon: FaStar, className: "top-1/2 left-1/4", delay: 4 },
  { icon: FaVolumeUp, className: "top-1/3 right-1/4", delay: 5 },
];

const featuredVoices = [
  {
    name: "Carter's Edge",
    description: "A rugged & masculine man's voice, perfect for narration and podcasts.",
    icon: <FaMicrophone className=" text-3xl" />, 
    listens: "17.8m",
    rating: 4.9,
    gradient: "from-pink-500 to-purple-500"
  },
  {
    name: "Carter Motivational",
    description: "A commanding voice for motivational content and speeches.",
    icon: <FaHeadphones className=" text-3xl" />, 
    listens: "5.4m",
    rating: 4.8,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "Sophie AI",
    description: "A warm, friendly female voice for customer service and guides.",
    icon: <FaVolumeUp className=" text-3xl" />, 
    listens: "8.2m",
    rating: 4.7,
    gradient: "from-emerald-500 to-teal-500"
  },
];

const FloatingIcon = ({ icon: Icon, className, delay }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: [0.2, 0.4, 0.2], y: [-20, 20, -20] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <Icon className="text-pink-400/30 text-4xl hover:text-indigo-400/50 transition-colors duration-300" />
  </motion.div>
);

const ExploreVoiceLibrary = () => {
  const containerRef = useRef(null);
  const [search, setSearch] = useState("");

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #db2777 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} className={item.className} delay={item.delay} />
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6 text-center drop-shadow-lg"
        >
          Explore Voice Library
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-white/80 max-w-2xl text-center mb-8"
        >
          Discover, preview, and use a wide variety of AI-generated voices for your creative projects. More features coming soon!
        </motion.p>
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-xl mb-10"
        >
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full py-4 pl-12 pr-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-md"
              placeholder="Search voices... (UI only)"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 text-xl" />
          </div>
        </motion.div>
        {/* Featured Voices */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {featuredVoices.map((voice, idx) => (
            <div
              key={idx}
              className={`bg-white/10 rounded-2xl p-8 text-white border border-white/20 shadow-xl backdrop-blur-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300`}
            >
              <div className={`mb-4 p-4 rounded-full bg-gradient-to-br ${voice.gradient} shadow-lg`}>{voice.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{voice.name}</h3>
              <p className="mb-4 text-white/80">{voice.description}</p>
              <div className="flex items-center gap-4 text-pink-200 text-sm">
                <span className="flex items-center gap-1"><FaHeadphones /> {voice.listens}</span>
                <span className="flex items-center gap-1"><FaStar /> {voice.rating}</span>
              </div>
            </div>
          ))}
        </motion.div>
        {/* Placeholder for future content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-2xl bg-white/10 rounded-2xl p-8 text-center text-white border border-white/20 shadow-xl backdrop-blur-lg"
        >
          <span className="text-2xl">🎤</span>
          <p className="mt-4 text-lg">Voice library content will appear here soon.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreVoiceLibrary; 