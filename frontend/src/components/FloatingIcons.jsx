import React from "react";
import { motion } from "framer-motion";
import { 
  FaImage, FaMagic, FaPalette, FaCamera, FaStar, FaMoon, FaSun, 
  FaMountain, FaTree, FaCloud, FaHeart, FaMicrophone, FaMusic, 
  FaVolumeUp, FaHeadphones, FaPlay, FaPause, FaStop, FaCog, 
  FaUser, FaHome, FaSearch, FaBookmark, FaBell, FaEnvelope,
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube
} from "react-icons/fa";

const FloatingIcons = ({ theme = "default" }) => {
  const iconSets = {
    default: [
      { icon: <FaImage />, color: "text-purple-400" },
      { icon: <FaMagic />, color: "text-pink-400" },
      { icon: <FaPalette />, color: "text-blue-400" },
      { icon: <FaCamera />, color: "text-green-400" },
      { icon: <FaStar />, color: "text-yellow-400" },
      { icon: <FaMoon />, color: "text-indigo-400" },
      { icon: <FaSun />, color: "text-orange-400" },
      { icon: <FaMountain />, color: "text-teal-400" },
      { icon: <FaTree />, color: "text-emerald-400" },
      { icon: <FaCloud />, color: "text-sky-400" },
      { icon: <FaHeart />, color: "text-red-400" }
    ],
    voice: [
      { icon: <FaMicrophone />, color: "text-purple-400" },
      { icon: <FaMusic />, color: "text-pink-400" },
      { icon: <FaVolumeUp />, color: "text-blue-400" },
      { icon: <FaHeadphones />, color: "text-green-400" },
      { icon: <FaPlay />, color: "text-yellow-400" },
      { icon: <FaPause />, color: "text-indigo-400" },
      { icon: <FaStop />, color: "text-orange-400" },
      { icon: <FaCog />, color: "text-teal-400" },
      { icon: <FaStar />, color: "text-emerald-400" },
      { icon: <FaHeart />, color: "text-red-400" }
    ],
    social: [
      { icon: <FaUser />, color: "text-purple-400" },
      { icon: <FaHome />, color: "text-pink-400" },
      { icon: <FaSearch />, color: "text-blue-400" },
      { icon: <FaBookmark />, color: "text-green-400" },
      { icon: <FaBell />, color: "text-yellow-400" },
      { icon: <FaEnvelope />, color: "text-indigo-400" },
      { icon: <FaGithub />, color: "text-orange-400" },
      { icon: <FaLinkedin />, color: "text-teal-400" },
      { icon: <FaTwitter />, color: "text-emerald-400" },
      { icon: <FaInstagram />, color: "text-red-400" },
      { icon: <FaYoutube />, color: "text-purple-400" }
    ]
  };

  const floatingIcons = iconSets[theme] || iconSets.default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} text-4xl opacity-20`}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            scale: 0.5 + Math.random() * 0.5,
            rotate: Math.random() * 360
          }}
          animate={{
            y: ["0%", "-50%", "0%"],
            x: ["0%", "50%", "0%"],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons; 