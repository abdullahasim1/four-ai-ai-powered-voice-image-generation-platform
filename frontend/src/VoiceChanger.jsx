import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaMagic, FaMicrophoneAlt, FaCloud, FaHeadphones, FaRocket, FaStar, FaGem, FaLightbulb, FaMusic, FaVolumeUp, FaWaveSquare, FaUserAstronaut, FaRobot
} from "react-icons/fa";
import { encodeWAV } from "./utils/wavEncoder"; // We'll create this helper

const floatingIcons = [
  { icon: FaMagic, delay: 0 },
  { icon: FaMicrophoneAlt, delay: 1 },
  { icon: FaCloud, delay: 2 },
  { icon: FaHeadphones, delay: 3 },
  { icon: FaRocket, delay: 4 },
  { icon: FaStar, delay: 5 },
  { icon: FaGem, delay: 6 },
  { icon: FaLightbulb, delay: 7 },
  { icon: FaMusic, delay: 8 },
  { icon: FaVolumeUp, delay: 9 },
  { icon: FaWaveSquare, delay: 10 },
  { icon: FaUserAstronaut, delay: 11 },
  { icon: FaRobot, delay: 12 },
];

const getRandom = (min, max) => Math.random() * (max - min) + min;

const FloatingIcon = ({ icon: Icon, delay, idx }) => {
  // Randomize start/end positions for each icon
  const startX = getRandom(0, 80); // vw
  const endX = getRandom(0, 80); // vw
  const startY = getRandom(0, 80); // vh
  const endY = getRandom(0, 80); // vh
  const duration = getRandom(12, 22);
  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{ left: 0, top: 0, x: 0, y: 0 }}
      initial={{
        x: `${startX}vw`,
        y: `${startY}vh`,
        opacity: 0.18 + (idx % 3) * 0.07,
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

const VoiceChanger = () => {
  const [file, setFile] = useState(null);
  const [effect, setEffect] = useState("normal");
  const [audioUrl, setAudioUrl] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [customSpeed, setCustomSpeed] = useState(1);
  const [robotEffect, setRobotEffect] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [processedBlob, setProcessedBlob] = useState(null);
  const audioRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEffectChange = (e) => {
    setEffect(e.target.value);
  };

  // Helper to process audio with effect and speed
  const processAudio = async (file, effect, speed) => {
    return new Promise(async (resolve, reject) => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const audioCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100 * 120, 44100); // 2 min max
        const decoded = await audioCtx.decodeAudioData(arrayBuffer);
        let source = audioCtx.createBufferSource();
        source.buffer = decoded;
        source.playbackRate.value = speed;
        let node = source;
        let lastNode = node;
        // Apply effect
        if (effect === "robot") {
          const filter = audioCtx.createBiquadFilter();
          filter.type = "highpass";
          filter.frequency.value = 1000;
          lastNode.connect(filter);
          lastNode = filter;
          const gain = audioCtx.createGain();
          gain.gain.value = 1.2;
          lastNode.connect(gain);
          lastNode = gain;
        } else if (effect === "slow") {
          source.playbackRate.value = Math.max(0.5, speed * 0.7);
        } else if (effect === "fast") {
          source.playbackRate.value = Math.min(2.0, speed * 1.5);
        } else if (effect === "echo") {
          const delay = audioCtx.createDelay();
          delay.delayTime.value = 0.25; // 250ms
          const feedback = audioCtx.createGain();
          feedback.gain.value = 0.4;
          lastNode.connect(delay);
          delay.connect(feedback);
          feedback.connect(delay);
          delay.connect(audioCtx.destination);
          lastNode = null; // already connected
        } else if (effect === "distortion") {
          const distortion = audioCtx.createWaveShaper();
          // Simple distortion curve
          function makeDistortionCurve(amount) {
            const n_samples = 44100, curve = new Float32Array(n_samples);
            for (let i = 0; i < n_samples; ++i) {
              let x = i * 2 / n_samples - 1;
              curve[i] = ((3 + amount) * x * 20 * Math.PI / 180) / (Math.PI + amount * Math.abs(x));
            }
            return curve;
          }
          distortion.curve = makeDistortionCurve(400);
          distortion.oversample = '4x';
          lastNode.connect(distortion);
          lastNode = distortion;
        } else if (effect === "reverb") {
          const convolver = audioCtx.createConvolver();
          // Simple impulse response (short, for demo)
          const irBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 2, audioCtx.sampleRate);
          for (let c = 0; c < irBuffer.numberOfChannels; c++) {
            const channel = irBuffer.getChannelData(c);
            for (let i = 0; i < irBuffer.length; i++) {
              channel[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irBuffer.length, 2); // noise tail
            }
          }
          convolver.buffer = irBuffer;
          lastNode.connect(convolver);
          lastNode = convolver;
        } else if (effect === "tremolo") {
          const gain = audioCtx.createGain();
          const lfo = audioCtx.createOscillator();
          lfo.type = 'sine';
          lfo.frequency.value = 8; // 8 Hz
          const lfoGain = audioCtx.createGain();
          lfoGain.gain.value = 0.5;
          lfo.connect(lfoGain);
          lfoGain.connect(gain.gain);
          lfo.start(0);
          lastNode.connect(gain);
          lastNode = gain;
        } else if (effect === "lowpass") {
          const filter = audioCtx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 800;
          lastNode.connect(filter);
          lastNode = filter;
        }
        if (lastNode) lastNode.connect(audioCtx.destination);
        source.start();
        const rendered = await audioCtx.startRendering();
        resolve(rendered);
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleApplyEffect = async () => {
    setError("");
    setProcessing(true);
    setProcessedBlob(null);
    setAudioUrl(null);
    if (!file) {
      setProcessing(false);
      return;
    }
    try {
      const processedBuffer = await processAudio(file, effect, customSpeed);
      // Encode to WAV
      const wav = encodeWAV(processedBuffer);
      const blob = new Blob([wav], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      setProcessedBlob(blob);
      setAudioUrl(url);
      setPlaybackRate(1); // Already baked in
      setRobotEffect(effect === "robot");
    } catch (err) {
      setError("Failed to process audio: " + err.message);
    }
    setProcessing(false);
  };

  const handleSpeedChange = (e) => {
    setCustomSpeed(parseFloat(e.target.value));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
      {/* Floating Icons - move across the whole document */}
      {floatingIcons.map((item, idx) => (
        <FloatingIcon key={idx} icon={item.icon} delay={item.delay} idx={idx} />
      ))}

      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          Voice Changer
        </h1>

        <input
          type="file"
          accept="audio/*"
          className="w-full mb-4 p-3 bg-white/80 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 shadow"
          onChange={handleFileChange}
        />

        <div className="flex flex-col mb-6 w-full">
          <label className="text-lg font-semibold text-indigo-700 mb-2">Choose an Effect</label>
          <select
            className="w-full p-3 bg-white/80 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 shadow"
            value={effect}
            onChange={handleEffectChange}
          >
            <option value="normal">Normal</option>
            <option value="robot">Robot</option>
            <option value="slow">Slow</option>
            <option value="fast">Fast</option>
            <option value="echo">Echo</option>
            <option value="distortion">Distortion</option>
            <option value="reverb">Reverb</option>
            <option value="tremolo">Tremolo</option>
            <option value="lowpass">Lowpass Filter</option>
          </select>
        </div>

        <div className="flex flex-col mb-6 w-full">
          <label className="text-lg font-semibold text-indigo-700 mb-2">Playback Speed: {customSpeed}x</label>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.01"
            value={customSpeed}
            onChange={handleSpeedChange}
            className="w-full accent-indigo-500"
          />
        </div>

        <button
          onClick={handleApplyEffect}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-lg hover:from-green-500 hover:to-blue-600 transition"
          disabled={processing}
        >
          {processing ? "Processing..." : "Apply Effect"}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {audioUrl && (
          <div className="mt-4 text-center">
            <audio
              controls
              className="w-full mt-2"
              src={audioUrl}
              ref={audioRef}
            />
            <a
              href={audioUrl}
              download="processed-audio.wav"
              className="inline-block mt-4 py-2 px-6 rounded-xl bg-gradient-to-r from-indigo-400 to-pink-500 text-white font-bold shadow-lg hover:from-indigo-500 hover:to-pink-600 transition"
            >
              Download Processed Audio
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VoiceChanger;