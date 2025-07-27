import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaMicrophone, 
  FaRobot, 
  FaCode, 
  FaGlobe, 
  FaBolt, 
  FaChartLine,
  FaMagic,
  FaHeadphones,
  FaVolumeUp,
  FaUsers,
  FaShieldAlt,
  FaCloud,
  FaStar,
  FaRocket,
  FaLightbulb,
  FaPalette,
  FaServer,
  FaLaptopCode,
  FaGithub,
  FaLinkedin,
  FaTwitter
} from "react-icons/fa";

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
  // Additional icons with lighter colors
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

const Features = () => {
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

  const features = [
    { 
      title: "AI Voice Generation", 
      text: "Generate high-quality, natural-sounding voices using advanced AI technology.",
      icon: <FaMicrophone className="" />,
      gradient: "from-pink-500 to-purple-500"
    },
    { 
      title: "Customizable Voices", 
      text: "Adjust voice styles, tones, and emotions to suit your needs.",
      icon: <FaMagic className="" />,
      gradient: "from-blue-500 to-indigo-500"
    },
    { 
      title: "Easy Integration", 
      text: "Seamlessly integrate our API into your applications with comprehensive documentation.",
      icon: <FaCode className="" />,
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      title: "Multi-Language Support", 
      text: "Generate voices in multiple languages for global applications.",
      icon: <FaGlobe className="" />,
      gradient: "from-amber-500 to-orange-500"
    },
    { 
      title: "Real-Time Processing", 
      text: "Experience fast and real-time voice generation for dynamic applications.",
      icon: <FaBolt className=" " />,
      gradient: "from-cyan-500 to-blue-500"
    },
    { 
      title: "Scalable Solutions", 
      text: "Our platform scales with your needs, from small projects to enterprise-level applications.",
      icon: <FaChartLine className="" />,
      gradient: "from-indigo-500 to-violet-500"
    }
  ];

  const additionalFeatures = [
    {
      title: "Voice Cloning",
      description: "Create perfect replicas of any voice with our advanced AI technology.",
      icon: <FaHeadphones className="" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Text to Speech",
      description: "Convert any text into natural-sounding speech in multiple languages.",
      icon: <FaVolumeUp className="" />,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Team Collaboration",
      description: "Work seamlessly with your team on voice projects.",
      icon: <FaUsers className="" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security for your voice data and projects.",
      icon: <FaShieldAlt className="" />,
      gradient: "from-red-500 to-rose-500"
    },
    {
      title: "Cloud Storage",
      description: "Secure cloud storage for all your voice projects.",
      icon: <FaCloud className="" />,
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

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
              Powerful Features
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto"
            >
              Discover all the tools and features that make our AI voice platform stand out
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-6xl py-20 px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
            >
              <motion.div
                className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg inline-block mb-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {feature.text}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Additional Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white py-20"
      >
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              More Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Explore additional features that enhance your voice generation experience
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true }}
                className="group bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg inline-block mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8"
          >
            Join thousands of users who are already creating amazing voice content
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Creating Now
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Features;
