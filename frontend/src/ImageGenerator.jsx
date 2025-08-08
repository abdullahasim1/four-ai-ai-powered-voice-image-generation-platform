import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  HUGGING_FACE_API_KEY, 
  API_CONFIG, 
  IMAGE_MODELS, 
  retryApiCall, 
  validateEnvironment 
} from "./api";
import { FaImage, FaMagic, FaPalette, FaCamera, FaStar, FaMoon, FaSun, FaMountain, FaTree, FaCloud, FaHeart } from "react-icons/fa";

// Debug: Show if API key is present (masked)
if (import.meta.env.DEV) {
  const envErrors = validateEnvironment();
  if (envErrors.length > 0) {
    console.error('❌ Environment validation errors:', envErrors);
  } else {
    console.log('🔑 Hugging Face API Key loaded:', HUGGING_FACE_API_KEY.slice(0, 6) + '...' + HUGGING_FACE_API_KEY.slice(-4));
  }
}

const ImageGen = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [numInferenceSteps, setNumInferenceSteps] = useState(28);
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [currentModel, setCurrentModel] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const floatingIcons = [
    { icon: <FaImage />, color: "text-purple-400" },
    { icon: <FaMagic />, color: "text-pink-400" },
    { icon: <FaPalette />, color: "text-blue-400" },
    { icon: <FaCamera />, color: "text-green-400" },
    { icon: <FaStar />, color: "text-yellow-400" },
    { icon: <FaMoon />, color: "text-indigo-400" },
    { icon: <FaSun />, color: "text-orange-400" },
    { icon: <FaMountain />, color: "text-teal-400" },
    { icon: <FaTree />, color: "text-emerald-400" },
    { icon: <FaCloud />, color: "text-sky-400" },
    { icon: <FaHeart />, color: "text-red-400" }
  ];

  const generateImage = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt!");
    
    const envErrors = validateEnvironment();
    if (envErrors.length > 0) {
      alert(`Configuration error: ${envErrors.join(', ')}`);
      return;
    }
    
    setLoading(true);
    setCurrentModel("");
    setStatusMessage("Initializing...");
    
    // Try models in order of preference
    const modelsToTry = [
      IMAGE_MODELS.primary,
      IMAGE_MODELS.fallback1,
      IMAGE_MODELS.fallback2
    ];
    
    for (const model of modelsToTry) {
      try {
        setCurrentModel(model);
        setStatusMessage(`Trying ${model}...`);
        console.log(`🔄 Trying model: ${model}`);
        
        const payload = {
          inputs: prompt,
          parameters: {
            negative_prompt: negativePrompt,
            num_inference_steps: numInferenceSteps,
            guidance_scale: guidanceScale,
            width: 1024,
            height: 1024,
          }
        };
        
        const response = await retryApiCall(model, payload, {
          timeout: 60000, // 60 seconds for image generation
          retries: 2
        });
        
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
        setStatusMessage(`✅ Generated using ${model}`);
        console.log(`✅ Successfully generated image using ${model}`);
        return; // Success, exit the loop
        
      } catch (error) {
        console.error(`❌ Failed with model ${model}:`, error.message);
        setStatusMessage(`❌ Failed with ${model}, trying next...`);
        
        // If this is the last model, show error
        if (model === modelsToTry[modelsToTry.length - 1]) {
          let errorMessage = "Failed to generate image with all available models.\n\n";
          errorMessage += "Common issues:\n";
          errorMessage += "• Check your Hugging Face API key\n";
          errorMessage += "• Ensure you have sufficient API credits\n";
          errorMessage += "• Try a simpler prompt\n";
          errorMessage += "• Check your internet connection\n\n";
          errorMessage += `Last error: ${error.message}`;
          
          alert(errorMessage);
          setStatusMessage("❌ All models failed");
        }
        // Continue to next model
      }
    }
    
    setLoading(false);
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated-image.jpg";
    link.click();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
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
            animate={{
              y: ["0%", "-50%", "0%"],
              x: ["0%", "50%", "0%"],
              rotate: [0, 360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Qwen <span className="text-indigo-400">Image</span>
          </h1>
          <p className="text-gray-300 text-lg">Advanced AI image generation with exceptional text rendering</p>
        </motion.div>

        {/* Image Display */}
        <motion.div
          className="relative w-96 h-96 backdrop-blur-lg bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden border border-white/20 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-400 mx-auto mb-4"></div>
              <p className="text-gray-300 text-sm">{statusMessage}</p>
              {currentModel && (
                <p className="text-indigo-400 text-xs mt-2">Model: {currentModel}</p>
              )}
            </div>
          ) : image ? (
            <div className="relative w-full h-full">
              <motion.img
                src={image}
                alt="Generated"
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
              {statusMessage && (
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg p-2">
                  <p className="text-white text-xs text-center">{statusMessage}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-6">
              <FaImage className="text-6xl text-indigo-400 mx-auto mb-4" />
              <p className="text-gray-300">Your AI-generated image will appear here</p>
            </div>
          )}
        </motion.div>

        {/* Input & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-4 mt-8 w-full max-w-md"
        >
          <div className="relative w-full">
            <input
              type="text"
              className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your imagination... (Try adding text like 'sign saying Hello World')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <FaMagic className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 text-xl" />
          </div>

          <div className="relative w-full">
            <input
              type="text"
              className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Negative prompt (what to avoid)..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="text-gray-300 text-sm mb-1 block">Steps: {numInferenceSteps}</label>
              <input
                type="range"
                min="20"
                max="50"
                value={numInferenceSteps}
                onChange={(e) => setNumInferenceSteps(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-300 text-sm mb-1 block">Guidance: {guidanceScale}</label>
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={guidanceScale}
                onChange={(e) => setGuidanceScale(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                prompt 
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/25" 
                  : "bg-gray-700 cursor-not-allowed"
              }`}
              onClick={generateImage}
              disabled={!prompt}
            >
              {loading ? "Generating..." : "Generate"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                image 
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25" 
                  : "bg-gray-700 cursor-not-allowed"
              }`}
              onClick={handleDownload}
              disabled={!image}
            >
              Download
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-gray-400"
        >
          © <span className="text-indigo-400">Four AI</span> | Powered by Qwen-Image
        </motion.p>
      </div>
    </div>
  );
};

export default ImageGen;
