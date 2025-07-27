import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaHistory, FaClock, FaCalendarAlt, FaUser, FaMicrophone, FaRobot, FaImage,
  FaMagic, FaMicrophoneAlt, FaCloud, FaHeadphones, FaRocket, FaStar, FaGem, FaLightbulb, FaMusic, FaVolumeUp, FaWaveSquare, FaUserAstronaut
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Settings from './Settings';

// Floating icons config
const floatingIcons = [
  { icon: FaMagic, delay: 0 },
  { icon: FaMicrophoneAlt, delay: 1 },
  { icon: FaCloud, delay: 2 },
  { icon: FaHeadphones, delay: 3 },
  { icon: FaRocket, delay: 4 },
  { icon: FaStar, delay: 5 },
  { icon: FaGem, delay: 6 },
  { icon: FaLightbulb, delay: 7 },
  { icon: FaMusic, delay: 8 },
  { icon: FaVolumeUp, delay: 9 },
  { icon: FaWaveSquare, delay: 10 },
  { icon: FaUserAstronaut, delay: 11 },
];

const getRandom = (min, max) => Math.random() * (max - min) + min;

const FloatingIcon = ({ icon: Icon, delay, idx }) => {
  const startX = getRandom(0, 80); // vw
  const endX = getRandom(0, 80); // vw
  const startY = getRandom(0, 80); // vh
  const endY = getRandom(0, 80); // vh
  const duration = getRandom(14, 22);
  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{ left: 0, top: 0, x: 0, y: 0 }}
      initial={{
        x: `${startX}vw`,
        y: `${startY}vh`,
        opacity: 0.15 + (idx % 3) * 0.08,
        scale: getRandom(0.8, 1.4),
      }}
      animate={{
        x: [`${startX}vw`, `${endX}vw`, `${startX}vw`],
        y: [`${startY}vh`, `${endY}vh`, `${startY}vh`],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon className="text-white/30 drop-shadow-lg" style={{ fontSize: getRandom(2.5, 4.5) + 'rem' }} />
    </motion.div>
  );
};

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const userHistory = JSON.parse(localStorage.getItem("userHistory") || "[]");
    setHistory(userHistory);
  }, [navigate]);

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case 'text-to-speech':
        return <FaMicrophone className="text-blue-500" />;
      case 'voice-generator':
        return <FaRobot className="text-purple-500" />;
      case 'image-generator':
        return <FaImage className="text-green-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-10 px-4 overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} delay={item.delay} idx={idx} />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
            <FaHistory className="text-yellow-300" />
            Usage History
          </h1>
          <p className="text-white/80 mt-2">Track your activity and feature usage</p>
        </motion.div>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-10"
          >
            <p className="text-white/80">No history available yet. Start using features to see your history here.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFeatureIcon(item.feature)}
                    <div>
                      <h3 className="font-semibold text-indigo-700 capitalize">{item.feature}</h3>
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt />
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <FaClock className="ml-2" />
                    <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;