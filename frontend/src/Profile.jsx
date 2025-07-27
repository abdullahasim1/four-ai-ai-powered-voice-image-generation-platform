import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaSave, FaEdit, FaRocket, FaStar, FaGem, FaLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import profileImage from "./assets/images/profile-user.png";

const FloatingIcon = ({ icon: Icon, className, delay }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        y: [-20, 20, -20],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <Icon className="text-blue-400/30 text-4xl hover:text-blue-300/50 transition-colors duration-300" />
    </motion.div>
  );
};

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser({
        name: parsedData.username || "User",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        address: parsedData.address || "",
        profilePic: parsedData.profilePic || profileImage,
      });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setUser((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save to localStorage
    const userData = {
      ...JSON.parse(localStorage.getItem("userData") || "{}"),
      username: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profilePic: user.profilePic,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Trigger storage event to update other components
    window.dispatchEvent(new Event('storage'));
    
    setIsEditing(false);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1c2e 0%, #2a2d4a 25%, #3d3f6e 50%, #4a4d8c 75%, #5a5d9c 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      {/* Floating Icons */}
      <FloatingIcon icon={FaRocket} className="top-10 left-10" delay={0} />
      <FloatingIcon icon={FaStar} className="top-20 right-20" delay={1} />
      <FloatingIcon icon={FaGem} className="bottom-20 left-20" delay={2} />
      <FloatingIcon icon={FaLightbulb} className="bottom-10 right-10" delay={3} />

      <main className="flex-grow flex justify-center items-center px-4 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/10"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Picture Section */}
            <div className="relative group">
              <motion.img
                src={previewImage || user.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 object-cover"
                style={{
                  borderImage: "linear-gradient(45deg, #8b5cf6, #3b82f6, #6366f1) 1",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              />
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-full shadow-lg"
                >
                  <FaCamera className="text-white" />
                </motion.button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Edit/Save Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                isEditing 
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600" 
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
              } text-white shadow-lg`}
            >
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <FaSave /> Save Changes
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </div>
              )}
            </motion.button>

            {/* User Information */}
            <div className="w-full space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 rounded-lg backdrop-blur-sm">
                <FaUser className="text-purple-400" />
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 rounded-lg backdrop-blur-sm">
                <FaEnvelope className="text-blue-400" />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 rounded-lg backdrop-blur-sm">
                <FaPhone className="text-indigo-400" />
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Phone Number"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 rounded-lg backdrop-blur-sm">
                <FaMapMarkerAlt className="text-purple-400" />
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Address"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
