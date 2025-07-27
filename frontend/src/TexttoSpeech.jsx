/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStop, FaMicrophoneAlt, FaWaveSquare, FaLanguage, FaUser, FaVolumeUp, FaMagic, FaBookOpen, FaCommentDots, FaCloud, FaHeadphones } from "react-icons/fa";
import { BsThreeDotsVertical, BsDownload } from "react-icons/bs";
import { RiSpeedLine } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import { trackActivity } from "./utils/historyTracker";

const floatingIcons = [
  { icon: FaWaveSquare, className: "top-10 left-10", delay: 0 },
  { icon: FaHeadphones, className: "top-20 right-20", delay: 1 },
  { icon: FaMicrophoneAlt, className: "bottom-20 left-20", delay: 2 },
  { icon: FaCloud, className: "bottom-10 right-10", delay: 3 },
];

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

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [showSettings, setShowSettings] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [voices, setVoices] = useState([]);

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utteranceRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const presets = [
    { name: "Document Narration", icon: "📄" },
    { name: "Video Voiceover", icon: "🎥" },
    { name: "Podcast Intro", icon: "🎙" },
    { name: "Casual Conversation", icon: "💬" },
  ];

  useEffect(() => {
    const loadVoices = () => {
      if (!synthRef.current) return;
      
      const availableVoices = synthRef.current.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices.find(v => v.default) || availableVoices[0]);
        setSelectedLanguage(availableVoices[0].lang);
      }
    };

    loadVoices();
    if (synthRef.current) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = null;
      }
    };
  }, [selectedVoice]);

  const startSpeech = () => {
    if (!synthRef.current || !selectedVoice) return;

    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.voice = selectedVoice;
    utteranceRef.current.rate = speed;
    utteranceRef.current.lang = selectedLanguage;

    utteranceRef.current.onstart = () => {
      setIsPlaying(true);
      startTimeRef.current = Date.now();
      startProgress();
    };

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setProgress(0);
      clearInterval(progressIntervalRef.current);
    };

    synthRef.current.speak(utteranceRef.current);
  };

  const startProgress = () => {
    clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      if (utteranceRef.current) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const progress = (elapsed / utteranceRef.current.duration) * 100;
        setProgress(Math.min(progress, 100));
      }
    }, 100);
  };

  const togglePlayPause = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      clearInterval(progressIntervalRef.current);
    } else {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        startProgress();
      } else {
        startSpeech();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const stopSpeech = () => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    setIsPlaying(false);
    setProgress(0);
    clearInterval(progressIntervalRef.current);
  };

  const handleDownload = () => {
    alert("Audio download feature would require server-side processing");
  };

  const playVoicePreview = (voice) => {
    if (!synthRef.current) return;
    
    const previewUtterance = new SpeechSynthesisUtterance(voice.name);
    previewUtterance.voice = voice;
    synthRef.current.speak(previewUtterance);
  };

  const handlePlay = () => {
    if (!text.trim()) return;
    
    // Track activity
    trackActivity('text-to-speech', `Converted text to speech: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`);
    
    if (!synthRef.current || !selectedVoice) return;

    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.voice = selectedVoice;
    utteranceRef.current.rate = speed;
    utteranceRef.current.lang = selectedLanguage;

    utteranceRef.current.onstart = () => {
      setIsPlaying(true);
      startTimeRef.current = Date.now();
      startProgress();
    };

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setProgress(0);
      clearInterval(progressIntervalRef.current);
    };

    synthRef.current.speak(utteranceRef.current);
  };

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} className={item.className} delay={item.delay} />
      ))}

      <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-2 py-6 md:px-8 lg:px-16 bg-transparent">
        {/* Main Content */}
        <motion.div
          className="relative flex flex-col flex-grow w-full max-w-6xl min-h-[75vh] rounded-3xl p-1 bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 shadow-2xl justify-center"
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-6 md:p-10 flex flex-col flex-grow min-h-[65vh] justify-center shadow-xl">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-3 mb-2">
                <FaWaveSquare className="text-3xl text-indigo-500" />
                <h2 className="text-3xl font-bold text-gray-800">Text to Speech</h2>
              </div>
              <div className="text-gray-500 flex items-center gap-2">
                <FaMagic className="text-lg text-purple-400" />
                <span>Convert your text into natural-sounding speech instantly!</span>
              </div>
            </div>

            {/* Text Input */}
            <div className="relative mb-8">
              <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold" htmlFor="tts-textarea">
                <FaBookOpen className="text-lg text-pink-400" />
                Enter Text
              </label>
              <textarea
                id="tts-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to speech..."
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 resize-none shadow-lg bg-white/90"
              />
              <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
                {text.length}/5000 characters
              </div>
            </div>

            {/* Controls Card */}
            <motion.div
              className="mt-6 flex flex-wrap gap-4 items-center justify-between bg-white/70 rounded-xl p-4 shadow-md border border-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-3 items-center flex-wrap">
                <div className="flex items-center gap-2">
                  <FaLanguage className="text-xl text-indigo-400" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="border rounded-lg py-2 px-4 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {[...new Set(voices.map(v => v.lang))].map(lang => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-xl text-purple-400" />
                  <select
                    value={selectedVoice?.name || ""}
                    onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
                    className="border rounded-lg py-2 px-4 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {voices.map(voice => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="border rounded-lg p-2 hover:bg-gray-200"
                  >
                    <BsThreeDotsVertical className="text-xl" />
                  </button>
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 z-10">
                      <div className="flex items-center gap-2 p-2">
                        <RiSpeedLine />
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={speed}
                          onChange={(e) => setSpeed(parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <span className="text-sm">{speed}x</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <motion.button
                  className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                  onClick={togglePlayPause}
                  whileHover={{ scale: 1.1 }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </motion.button>
                <motion.button
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
                  onClick={stopSpeech}
                  whileHover={{ scale: 1.1 }}
                  aria-label="Stop"
                >
                  <FaStop />
                </motion.button>
                <motion.button
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
                  onClick={handleDownload}
                  whileHover={{ scale: 1.1 }}
                  aria-label="Download"
                >
                  <BsDownload />
                </motion.button>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="mt-4 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>

            {/* Voice Selection */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaMicrophoneAlt className="text-indigo-400" /> Select Voice
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {voices.map((voice) => (
                  <motion.div
                    key={voice.name}
                    className={`p-4 border rounded-xl cursor-pointer shadow-lg transition-all flex items-center gap-4 ${
                      selectedVoice?.name === voice.name
                        ? "border-blue-600 bg-blue-50"
                        : "hover:border-blue-400 hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedVoice(voice)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        <FaUser className="text-purple-400" /> {voice.name}
                      </h4>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaLanguage className="text-indigo-400" /> {voice.lang}
                      </p>
                    </div>
                    <motion.button
                      className="p-2 rounded-full hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        playVoicePreview(voice);
                      }}
                      whileHover={{ scale: 1.1 }}
                      aria-label="Preview Voice"
                    >
                      <FaPlay />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Presets */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaMagic className="text-pink-400" /> Use Case Presets
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {presets.map((preset) => (
                  <motion.button
                    key={preset.name}
                    className="p-4 border rounded-xl hover:border-blue-400 transition-all text-center shadow-lg flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-2xl">
                      {preset.icon === "📄" && <FaBookOpen className="text-indigo-400" />}
                      {preset.icon === "🎥" && <FaMagic className="text-pink-400" />}
                      {preset.icon === "🎙" && <FaMicrophoneAlt className="text-purple-400" />}
                      {preset.icon === "💬" && <FaCommentDots className="text-blue-400" />}
                    </span>
                    <div className="mt-2 text-sm">{preset.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Subtle fade shadow at the bottom for depth */}
      <div className="pointer-events-none fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/10 to-transparent z-10" />
    </motion.div>
  );
};

export default TextToSpeech;
