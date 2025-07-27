import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaSignOutAlt, FaMagic, FaCloud, FaHeadphones, FaStar, FaRocket, FaGem, FaLightbulb } from "react-icons/fa";
import UserManagement from "./UserManagement";

const floatingIcons = [
  { icon: FaMagic, delay: 0 },
  { icon: FaCloud, delay: 1 },
  { icon: FaHeadphones, delay: 2 },
  { icon: FaStar, delay: 3 },
  { icon: FaRocket, delay: 4 },
  { icon: FaGem, delay: 5 },
  { icon: FaLightbulb, delay: 6 },
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

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center py-10 overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} delay={item.delay} idx={idx} />
      ))}
      <motion.div
        className="relative z-10 bg-white/90 rounded-3xl shadow-2xl p-8 w-full max-w-2xl flex flex-col items-center"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaUserShield className="text-3xl text-indigo-600 animate-pulse" />
          <h2 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h2>
        </div>
        <UserManagement />
        <button
          onClick={handleLogout}
          className="mt-8 py-2 px-6 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500 text-white font-bold shadow-lg hover:from-pink-500 hover:to-indigo-600 transition flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
