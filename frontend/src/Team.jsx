/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaCode, 
  FaPalette, 
  FaServer, 
  FaLaptopCode,
  FaStar,
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaMicrophone,
  FaRobot,
  FaMagic,
  FaHeadphones,
  FaVolumeUp,
  FaGlobe,
  FaBolt,
  FaChartLine,
  FaShieldAlt
} from "react-icons/fa";

import saifImage from "./assets/images/saif.jpg";
import abdullahImage from "./assets/images/abdullah.jpg";
import adeelImage from "./assets/images/adeel.jpg";
import malikImage from "./assets/images/malik.jpg";
import profileImage from "./assets/images/profile-user.png";

const teamMembers = [
  {
    name: "Saif Ur Rahman",
    role: "Lead Developer",
    img: saifImage,
    social: {
      github: "https://github.com/saif-9-coder",
      linkedin: "https://www.linkedin.com/in/saif-ur-rahman-677b2b25b/",
      facebook: "https://www.facebook.com/saif.ur.rahman.321107"
    },
    description: "Full-stack developer with expertise in AI and machine learning",
    icon: <FaCode className="" />,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    name: "Abdullah Bin Asim",
    role: "Frontend Developer",
    img: abdullahImage,
    social: {
      github: "https://github.com/abdullahasim1",
      linkedin: "https://www.linkedin.com/in/abdullah-bin-asim-654287267/",
      facebook: "https://www.facebook.com/asim.sahkeel.1"
    },
    description: "Frontend specialist with a passion for creating beautiful interfaces",
    icon: <FaLaptopCode className="" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "M Adeel Gujar",
    role: "Backend Developer",
    img: adeelImage,
    social: {
      
      linkedin: "https://www.linkedin.com/in/adeel-hayyat-371597336/",
      facebook: "https://www.facebook.com/adeel.gujjar.158718"
    },
    description: "Backend expert specializing in scalable architecture",
    icon: <FaServer className="" />,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Malik Mujahid Azam Lail",
    role: "UI/UX Designer",
    img: malikImage,
    social: {
      
      linkedin: "https://www.linkedin.com/in/mujahid-azam-34b477340/",
      facebook: "https://www.facebook.com/muhammad.mujahid.azam.2025"
    },
    description: "Creative designer focused on user-centered design",
    icon: <FaPalette className="" />,
    gradient: "from-amber-500 to-orange-500"
  }
];

const floatingIcons = [
  { icon: <FaStar />, color: "text-yellow-400" },
  { icon: <FaRocket />, color: "text-blue-400" },
  { icon: <FaLightbulb />, color: "text-amber-400" },
  { icon: <FaUsers />, color: "text-purple-400" },
  { icon: <FaCode />, color: "text-green-400" },
  { icon: <FaPalette />, color: "text-pink-400" },
  { icon: <FaMicrophone />, color: "text-red-400" },
  { icon: <FaServer />, color: "text-indigo-400" },
  { icon: <FaLaptopCode />, color: "text-cyan-400" },
  { icon: <FaGithub />, color: "text-gray-400" },
  { icon: <FaLinkedin />, color: "text-blue-500" },
  { icon: <FaTwitter />, color: "text-sky-400" },
  { icon: <FaRobot />, color: "text-purple-500" },
  { icon: <FaMagic />, color: "text-violet-400" },
  { icon: <FaHeadphones />, color: "text-rose-400" },
  { icon: <FaVolumeUp />, color: "text-emerald-400" },
  { icon: <FaGlobe />, color: "text-teal-400" },
  { icon: <FaBolt />, color: "text-orange-400" },
  { icon: <FaChartLine />, color: "text-lime-400" },
  { icon: <FaShieldAlt />, color: "text-blue-600" },
  { icon: <FaStar />, color: "text-amber-300" },
  { icon: <FaRocket />, color: "text-indigo-300" },
  { icon: <FaLightbulb />, color: "text-yellow-300" },
  { icon: <FaUsers />, color: "text-pink-300" },
  { icon: <FaCode />, color: "text-emerald-300" },
  { icon: <FaPalette />, color: "text-rose-300" },
  { icon: <FaMicrophone />, color: "text-red-300" },
  { icon: <FaServer />, color: "text-violet-300" },
  { icon: <FaLaptopCode />, color: "text-cyan-300" },
  { icon: <FaGithub />, color: "text-gray-300" },
  { icon: <FaLinkedin />, color: "text-blue-300" },
  { icon: <FaTwitter />, color: "text-sky-300" },
  { icon: <FaRobot />, color: "text-purple-300" },
  { icon: <FaMagic />, color: "text-violet-300" },
  { icon: <FaHeadphones />, color: "text-rose-300" },
  { icon: <FaVolumeUp />, color: "text-emerald-300" },
  { icon: <FaGlobe />, color: "text-teal-300" },
  { icon: <FaBolt />, color: "text-orange-300" },
  { icon: <FaChartLine />, color: "text-lime-300" },
  { icon: <FaShieldAlt />, color: "text-blue-300" }
];

const Team = () => {
  const [imageLoaded, setImageLoaded] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: ["0%", "-20%", "0%"],
      x: ["0%", "10%", "0%"],
      rotate: [0, 10, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color} text-4xl opacity-20`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5 + Math.random() * 0.5,
              rotate: Math.random() * 360
            }}
            animate="animate"
            variants={floatingVariants}
            custom={index}
            whileHover={{ scale: 1.2 }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-4"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
            >
              Meet Our Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto"
            >
              The talented people behind our innovative voice AI platform
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Team Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-6xl py-20 px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Member Image Section */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <motion.img
                  src={member.img}
                  alt={member.name}
                  className={`w-full h-full object-cover transform transition-transform duration-500 ${
                    imageLoaded[member.name] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(prev => ({ ...prev, [member.name]: true }))}
                  whileHover={{ scale: 1.1 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
                >
                  <div className="flex space-x-3 justify-center">
                    <motion.a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <FaGithub className="text-xl" />
                    </motion.a>
                    <motion.a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <FaLinkedin className="text-xl" />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <FaTwitter className="text-xl" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
              
              {/* Member Info Section */}
              <div className="p-6 relative">
                <motion.div 
                  className={`absolute -top-6 left-6 p-3 rounded-xl bg-gradient-to-br ${member.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {member.icon}
                </motion.div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Join Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
          >
            Join Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8"
          >
            We're always looking for talented individuals to join our team
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#careers"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Team;