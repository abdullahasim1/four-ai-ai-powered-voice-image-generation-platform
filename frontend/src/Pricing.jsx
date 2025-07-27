/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FaCheck, 
  FaRocket, 
  FaCrown, 
  FaGem, 
  FaStar, 
  FaLightbulb, 
  FaChartLine, 
  FaCode,
  FaMicrophone,
  FaHeadphones,
  FaVolumeUp,
  FaUsers,
  FaShieldAlt,
  FaGlobe,
  FaBolt,
  FaInfinity
} from "react-icons/fa";

const pricingPlans = [
  {
    name: "Basic",
    price: "$9.99",
    period: "per month",
    icon: <FaMicrophone className="text-4xl" />,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      { text: "Access to basic AI tools", icon: <FaCheck /> },
      { text: "100 generations per month", icon: <FaInfinity /> },
      { text: "Standard quality outputs", icon: <FaVolumeUp /> },
      { text: "Email support", icon: <FaUsers /> },
      { text: "Basic tutorials", icon: <FaLightbulb /> },
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "per month",
    icon: <FaHeadphones className="text-4xl" />,
    gradient: "from-purple-500 to-pink-500",
    features: [
      { text: "Access to all AI tools", icon: <FaCheck /> },
      { text: "Unlimited generations", icon: <FaInfinity /> },
      { text: "High quality outputs", icon: <FaVolumeUp /> },
      { text: "Priority support", icon: <FaUsers /> },
      { text: "Advanced tutorials", icon: <FaLightbulb /> },
      { text: "Custom solutions", icon: <FaCode /> },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49.99",
    period: "per month",
    icon: <FaCrown className="text-4xl" />,
    gradient: "from-amber-500 to-orange-500",
    features: [
      { text: "Access to all AI tools", icon: <FaCheck /> },
      { text: "Unlimited generations", icon: <FaInfinity /> },
      { text: "Highest quality outputs", icon: <FaVolumeUp /> },
      { text: "24/7 Priority support", icon: <FaUsers /> },
      { text: "Custom training", icon: <FaBolt /> },
      { text: "API access", icon: <FaCode /> },
      { text: "Dedicated account manager", icon: <FaShieldAlt /> },
    ],
    popular: false,
  },
];

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

const Pricing = () => {
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #db2777 100%)",
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
      <FloatingIcon icon={FaMicrophone} className="top-10 left-10" delay={0} />
      <FloatingIcon icon={FaHeadphones} className="top-20 right-20" delay={1} />
      <FloatingIcon icon={FaCrown} className="bottom-20 left-20" delay={2} />
      <FloatingIcon icon={FaVolumeUp} className="bottom-10 right-10" delay={3} />
      <FloatingIcon icon={FaUsers} className="top-1/2 left-1/4" delay={4} />
      <FloatingIcon icon={FaBolt} className="top-1/3 right-1/4" delay={5} />
      <FloatingIcon icon={FaInfinity} className="bottom-1/3 left-1/3" delay={6} />
      <FloatingIcon icon={FaShieldAlt} className="top-1/4 right-1/3" delay={7} />
      <FloatingIcon icon={FaCode} className="bottom-1/4 left-1/4" delay={8} />

      {/* Pricing Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4"
            >
              Pricing Plans
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Choose Your Perfect Plan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-blue-200 text-lg"
            >
              Select the plan that best fits your needs
            </motion.p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * (index + 2) }}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-8 border ${
                  plan.popular 
                    ? "border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-transparent" 
                    : "border-white/10"
                } hover:border-blue-500/30 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${plan.gradient} text-white shadow-lg mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-blue-200">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * featureIndex }}
                      className="flex items-center gap-3 text-blue-100"
                    >
                      <span className={`p-1 rounded-full bg-gradient-to-br ${plan.gradient} text-white`}>
                        {feature.icon}
                      </span>
                      {feature.text}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors shadow-lg ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Pricing;
