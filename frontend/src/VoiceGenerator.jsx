import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlay, FaPause, FaMicrophone, FaImage, FaMagic, FaVolumeUp, FaGlobe, FaBook, FaHeadphones, FaVideo } from "react-icons/fa";
import { BsMic, BsCameraVideo } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const VoiceGenerator = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [text, setText] = useState(
    "The Four AI voice generator can deliver high-quality, human-like speech in 32 languages. Perfect for audiobooks, video voiceovers, commercials, and more."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("Brian");
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  const voices = ["Brian", "Emma", "Olivia", "James", "Sophia", "Daniel", "Liam"];
  const languages = ["English", "Spanish", "French", "German", "Italian", "Chinese", "Japanese"];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        audioRef.current.play();
      }
    }
  };

  const handleGenerateVoice = async () => {
    try {
      setIsPlaying(false);
      // Use a real audio file for testing
      setTimeout(() => {
        setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
        // Don't set isPlaying here; let onCanPlay handle it
      }, 2000);
    } catch (error) {
      console.error("Error generating voice:", error);
    }
  };

  const tools = [
    {
      title: "Text to Speech",
      icon: <FaVolumeUp className=" text-2xl" />,
      description: "Convert text to natural-sounding speech",
      route: "/texttospeech",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Voice Changer",
      icon: <FaMagic className=" text-2xl" />,
      description: "Transform your voice in real-time",
      route: "/voicechanger",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Text to Image",
      icon: <FaImage className=" text-2xl" />,
      description: "Generate images from text descriptions",
      route: "/imagegenerator",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Text to Video",
      icon: <FaVideo className=" text-2xl" />,
      description: "Generate videos from text descriptions",
      route: "/texttovideo",
      gradient: "from-red-500 to-orange-500"
    }
  ];

  return (
    <div className="container mx-auto mt-10 px-4">
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
            onClick={() => navigate(tool.route)}
          >
            <div className={`p-4 rounded-xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {tool.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
            <p className="text-gray-600">{tool.description}</p>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        {/* Editable Text */}
        <div className="mb-6">
          {isEditing ? (
            <textarea
              className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <div 
              className="text-lg text-gray-700 cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all duration-300"
              onClick={() => setIsEditing(true)}
            >
              {text}
            </div>
          )}
        </div>

        {/* Language & Options */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <FaGlobe className="text-blue-500" />
              {selectedLanguage}
              <IoMdArrowDropdown />
            </button>

            {showLanguageDropdown && (
              <div className="absolute bg-white border shadow-lg rounded-lg mt-2 z-10 w-40">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
            onClick={() => alert("Tell a Story")}
          >
            <FaBook className="text-purple-500" />
            Tell a Story
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
            onClick={() => alert("Introduce a Podcast")}
          >
            <FaHeadphones className="text-green-500" />
            Introduce a Podcast
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
            onClick={() => alert("Create a Video Voiceover")}
          >
            <FaVideo className="text-red-500" />
            Create a Video Voiceover
          </button>
        </div>

        {/* Voice Selection and Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => setShowVoiceDropdown(!showVoiceDropdown)}
            >
              <FaMicrophone className="text-indigo-500" />
              {selectedVoice}
              <IoMdArrowDropdown />
            </button>

            {showVoiceDropdown && (
              <div className="absolute bg-white border shadow-lg rounded-lg mt-2 z-10 w-40">
                {voices.map((voice) => (
                  <div
                    key={voice}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedVoice(voice);
                      setShowVoiceDropdown(false);
                    }}
                  >
                    {voice}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">156/500</span>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleGenerateVoice}
            >
              {isPlaying ? (
                <>
                  <FaPause /> Pause
                </>
              ) : (
                <>
                  <FaPlay /> Generate & Play
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onCanPlay={() => {
              if (isPlaying) {
                audioRef.current.play();
              }
            }}
            onEnded={() => setIsPlaying(false)}
            controls
            className="w-full mt-2"
          />
        )}
      </div>

      {/* Bottom CTA */}
      
      {!loggedIn && (
        <div className="text-center mt-8">
          <p className="text-xl font-bold text-gray-900 mb-4">
            Experience the Full Audio AI Platform
          </p>
          <button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            onClick={() => alert("Try for Free")}
          >
            Try for Free
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceGenerator;






