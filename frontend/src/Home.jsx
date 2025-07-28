import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VoiceGenerator from "./VoiceGenerator";
import { 
  FaUserCircle, 
  FaMicrophone, 
  FaRobot, 
  FaCode, 
  FaChartLine, 
  FaBolt,
  FaPlay,
  FaHeadphones,
  FaUsers,
  FaArrowRight,
  FaStar,
  FaMagic
} from "react-icons/fa";
import {
  heroAnimation,
  voiceGeneratorAnimation,
  voiceLibraryAnimation,
  textSectionAnimation,
  voiceCardsAnimation,
  voiceCardHoverAnimation,
  featuresAnimation,
  featureCardHoverAnimation,
  ctaAnimation,
  MotionHeader,
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionH3,
  MotionP,
  MotionButton
} from "./animations/homeAnimations";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  const voiceLibraryData = [
    {
      title: "Carter's Edge ⚙",
      listens: "17.8m",
      users: "3.7k",
      description: "A rugged & masculine man's voice...",
      icon: <FaMicrophone className=" text-2xl" />,
      gradient: "from-pink-500 to-purple-500"
    },
    {
      title: "Carter Motivational ⚙",
      listens: "5.4m",
      users: "1.1k",
      description: "A commanding voice for motivation...",
      icon: <FaHeadphones className=" text-2xl" />,
      gradient: "from-cyan-500 to-blue-500"
    },
  ];

  const featuresData = [
    { 
      title: "High-Quality AI Voices", 
      text: "Generate natural-sounding speech.",
      icon: <FaMicrophone className=" text-3xl" />,
      gradient: "from-pink-500 to-purple-500"
    },
    { 
      title: "AI Voice Generation", 
      text: "Generate high-quality, natural-sounding voices using advanced AI technology.",
      icon: <FaRobot className=" text-3xl" />,
      gradient: "from-cyan-500 to-blue-500"
    },
    { 
      title: "Customizable Voices", 
      text: "Adjust voice styles, tones, and emotions to suit your needs.",
      icon: <FaUsers className=" text-3xl" />,
      gradient: "from-emerald-500 to-teal-500"
    },
    { 
      title: "Easy Integration", 
      text: "Seamlessly integrate our API into your applications with comprehensive documentation.",
      icon: <FaCode className=" text-3xl" />,
      gradient: "from-amber-500 to-orange-500"
    },
    { 
      title: "Scalable Solutions", 
      text: "Our platform scales with your needs, from small projects to enterprise-level applications.",
      icon: <FaChartLine className=" text-3xl" />,
      gradient: "from-indigo-500 to-violet-500"
    },
    { 
      title: "Real-Time Processing", 
      text: "Experience fast and real-time voice generation for dynamic applications.",
      icon: <FaBolt className=" text-3xl" />,
      gradient: "from-rose-500 to-pink-500"
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 min-h-screen">
      {/* Hero Section */}
      <MotionHeader
        {...heroAnimation}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-4"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <MotionH1 className="text-5xl md:text-7xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Welcome to Four AI
          </MotionH1>
          <MotionP className="text-xl md:text-2xl text-center mb-12 text-blue-100 max-w-3xl mx-auto">
            Create, customize, and clone voices with advanced AI technology. Experience the future of voice generation.
          </MotionP>
          
          {!loggedIn && (
            <div className="flex justify-center gap-6">
              <Link
                to="/login"
                className="group px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Get Started 
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                Learn More
              </Link>
            </div>
          )}
        </div>
      </MotionHeader>

      {/* Voice Generator */}
      <MotionDiv
        {...voiceGeneratorAnimation}
        className="container mx-auto max-w-6xl px-4 -mt-16"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <VoiceGenerator />
        </div>
      </MotionDiv>

      {/* Voice Library Section */}
      <MotionSection
        {...voiceLibraryAnimation}
        className="py-24 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Section */}
            <MotionDiv
              {...textSectionAnimation}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">
                Voice Library
              </div>
              <MotionH1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Discover Our Voice Library
              </MotionH1>
              <MotionP className="text-xl text-gray-600 leading-relaxed">
                Access a vast collection of professionally crafted voices for your creative projects. From natural to dramatic, find the perfect voice for your needs.
              </MotionP>
              <Link
                to="/explore-voice-library"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Explore Library 
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionDiv>

            {/* Voice Cards Section */}
            <MotionDiv
              {...voiceCardsAnimation}
              className="grid grid-cols-1 gap-6"
            >
              {voiceLibraryData.map((voice, index) => (
                <MotionDiv
                  key={index}
                  {...voiceCardHoverAnimation}
                  className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:bg-gradient-to-r hover:from-white hover:to-gray-50"
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${voice.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {voice.icon}
                    </div>
                    <div className="flex-1">
                      <MotionH3 className="text-2xl font-bold text-gray-900 mb-3">{voice.title}</MotionH3>
                      <MotionP className="text-gray-600 text-lg mb-4">{voice.description}</MotionP>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <FaHeadphones className="text-indigo-500" /> {voice.listens}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaUsers className="text-purple-500" /> {voice.users}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaStar className="text-amber-500" /> 4.9
                        </span>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>
        </div>
      </MotionSection>

      {/* Features Section */}
      <MotionSection
        {...featuresAnimation}
        className="py-24 px-4 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">
              Features
            </div>
            <MotionH2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </MotionH2>
            <MotionP className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create amazing voice content with cutting-edge AI technology
            </MotionP>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <MotionDiv
                key={index}
                {...featureCardHoverAnimation}
                className="group bg-white p-8 rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
              >
                <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg inline-block group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <MotionH3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </MotionH3>
                <MotionP className="text-gray-600 text-lg">
                  {feature.text}
                </MotionP>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Call to Action */}
      <MotionSection
        {...ctaAnimation}
        className="py-24 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
            Get Started Today
          </div>
          <MotionH2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Ready to Transform Your Voice?
          </MotionH2>
          <MotionP className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of creators using AI to bring their ideas to life. Start your journey today.
          </MotionP>
          {!loggedIn && (
            <div className="flex justify-center gap-6">
              <Link
                to="/signup"
                className="group px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Start Creating Now 
                <FaArrowRight className="group-hover:translate-x-1 transition-transform " />
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                View Features
              </Link>
            </div>
          )}
        </div>
      </MotionSection>
    </div>
  );
};

export default Home;
