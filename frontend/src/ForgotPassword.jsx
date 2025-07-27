import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaMagic, FaCloud, FaHeadphones, FaStar, FaRocket, FaGem, FaLightbulb } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5001/api/forgot-password", {
        email,
        newPassword,
      });
      if (res.data.success) {
        setMessage("Password updated successfully! You can now log in.");
      } else {
        setError(res.data.message || "Failed to update password.");
      }
    } catch (err) {
      setError("Error updating password. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} delay={item.delay} idx={idx} />
      ))}
      <motion.div
        className="relative z-10 bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6 flex items-center gap-2">
          <FaLock /> Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FaLock /> New Password
            </label>
            <input
              type="password"
              className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-400"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          {message && (
            <div className="text-green-600 text-center">
              {message}
              <div className="mt-4">
                <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
                  Go to Login
                </Link>
              </div>
            </div>
          )}
          {error && <div className="text-red-600 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-lg hover:from-green-500 hover:to-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
