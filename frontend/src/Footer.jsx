import React from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaYoutube, 
  FaDiscord,
  FaTwitter,
  FaInstagram,
  FaRocket,
  FaStar,
  FaGem,
  FaLightbulb,
  FaMagic,
  FaMicrophoneAlt,
  FaCloud,
  FaHeadphones
} from "react-icons/fa";

const FloatingIcon = ({ icon: Icon, className, delay }) => (
  <motion.div
    className={`pointer-events-none absolute ${className}`}
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: [0.15, 0.3, 0.15], y: [-20, 20, -20] }}
    transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <Icon className="text-white/20 text-5xl drop-shadow-lg" />
  </motion.div>
);

const Footer = () => {
  const floatingIcons = [
    { icon: FaMagic, className: "top-10 left-10", delay: 0 },
    { icon: FaMicrophoneAlt, className: "top-20 right-20", delay: 1 },
    { icon: FaCloud, className: "bottom-20 left-20", delay: 2 },
    { icon: FaHeadphones, className: "bottom-10 right-10", delay: 3 },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 mt-10 overflow-hidden"
    >
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} className={item.className} delay={item.delay} />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {/* Research Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">RESEARCH</h3>
            <ul className="space-y-3">
              {['Text to Speech', 'Speech to Text', 'Speech to Speech', 'Text to Sound Effects', 'Voice Cloning', 'Voice Isolator'].map((item, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">PRODUCTS</h3>
            <ul className="space-y-3">
              {['Projects', 'Conversational AI', 'Dubbing Studio', 'Audio Native', 'FourStudios', 'API', 'Voiceover Studio', 'FourReader'].map((item, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Solutions Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">SOLUTIONS</h3>
            <ul className="space-y-3">
              {['For Enterprise', 'For Teams', 'For Creators', 'For Developers', 'For Startups', 'Publishing', 'Media & Entertainment', 'Conversational AI'].map((item, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources & Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">RESOURCES</h3>
            <ul className="space-y-3">
              {['API Reference', 'Product Guides', 'Help Centre', 'Languages', 'Webinars', 'Discord'].map((item, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-6 mb-4 text-white/90">COMPANY</h3>
            <ul className="space-y-3">
              {['About', 'Safety', 'Careers', 'Blog', 'Impact Program', 'Brand & Press Kit', 'Iconic Voices'].map((item, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center space-x-8 mt-12"
        >
          {[
            { icon: FaLinkedin, color: "hover:text-blue-400" },
            { icon: FaGithub, color: "hover:text-gray-300" },
            { icon: FaTwitter, color: "hover:text-blue-400" },
            { icon: FaInstagram, color: "hover:text-pink-400" },
            { icon: FaYoutube, color: "hover:text-red-400" },
            { icon: FaDiscord, color: "hover:text-indigo-400" }
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href="#"
              whileHover={{ scale: 1.2, y: -5 }}
              className={`text-white/70 ${social.color} transition-colors`}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-white/50 text-sm"
        >
          © {new Date().getFullYear()} Four AI. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
