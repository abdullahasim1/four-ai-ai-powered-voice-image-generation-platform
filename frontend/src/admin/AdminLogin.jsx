import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaMagic, FaCloud, FaHeadphones, FaStar, FaRocket, FaGem, FaLightbulb } from "react-icons/fa";

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

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} delay={item.delay} idx={idx} />
      ))}
      <motion.form
        className="relative z-10 bg-white/80 p-8 rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        onSubmit={handleLogin}
      >
        <FaLock className="text-4xl text-indigo-600 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Admin Login</h2>
        <input
          type="password"
          className="w-full p-3 mb-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 shadow"
          placeholder="Admin Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-lg hover:from-green-500 hover:to-blue-600 transition"
        >
          Login
        </button>
        {error && <div className="mt-4 text-pink-600 font-semibold">{error}</div>}
      </motion.form>
    </div>
  );
};

export default AdminLogin;
