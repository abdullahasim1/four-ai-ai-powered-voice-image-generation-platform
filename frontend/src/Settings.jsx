import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser, FaEnvelope, FaLock, FaMagic, FaCloud, FaHeadphones, FaStar, FaRocket, FaGem, FaLightbulb
} from "react-icons/fa";

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

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setName(userData.name || userData.username || "");
    setEmail(userData.email || "");
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    // Update localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}" );
    userData.name = name;
    userData.username = name;
    userData.email = email;
    if (password) userData.password = password;
    localStorage.setItem("userData", JSON.stringify(userData));
    setMessage("Profile updated successfully!");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} delay={item.delay} idx={idx} />
      ))}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          <FaUser className="text-purple-400" /> User Settings
        </h2>
        <form className="w-full" onSubmit={handleSave}>
          <div className="mb-5">
            <label className="flex text-indigo-700 font-semibold mb-2 items-center gap-2">
              <FaUser /> Name
            </label>
            <input
              type="text"
              className="w-full p-3 bg-white/80 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 shadow"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="flex text-indigo-700 font-semibold mb-2 items-center gap-2">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              className="w-full p-3 bg-white/80 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 shadow"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="flex text-indigo-700 font-semibold mb-2 items-center gap-2">
              <FaLock /> New Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-white/80 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 shadow"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
          </div>
          <div className="mb-8">
            <label className="flex text-indigo-700 font-semibold mb-2 items-center gap-2">
              <FaLock /> Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-white/80 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 shadow"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          {message && <div className="mb-4 text-center text-pink-600 font-semibold">{message}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-lg hover:from-green-500 hover:to-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Settings; 