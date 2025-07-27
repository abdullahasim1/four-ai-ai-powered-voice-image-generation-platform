import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createFloatingIcons, cleanupAnimations } from "./animations/loginAnimations";
import {
  createMainIconsAnimation,
  createCardAnimation,
  createTitleAnimation,
  createButtonAnimation,
  createGradientAnimation,
  cleanupAllAnimations
} from "./animations/motionAnimations";

const API_URL = 'http://localhost:5001/api';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Refs for elements
  const envelopeRef = useRef(null);
  const lockRef = useRef(null);
  const cardRef = useRef(null);
  const gradientRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create all animations
    const mainIconsTimelines = createMainIconsAnimation(envelopeRef, lockRef);
    const cardTimeline = createCardAnimation(cardRef);
    const titleTimeline = createTitleAnimation(titleRef);
    const buttonTimeline = createButtonAnimation(buttonRef);
    const gradientTimeline = createGradientAnimation(gradientRef);
    const floatingIconTimelines = createFloatingIcons(containerRef.current);

    // Combine all timelines for cleanup
    const allTimelines = [
      ...mainIconsTimelines,
      cardTimeline,
      titleTimeline,
      buttonTimeline,
      gradientTimeline,
      floatingIconTimelines
    ];

    return () => cleanupAllAnimations(allTimelines);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5001/api/login', {
        email,
        password
      });

      if (res.data.success) {
        // Store user data
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        localStorage.setItem("loggedIn", "true");
        
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        // Navigate to home page
        navigate("/home");
      } else {
        setError(res.data.message || "Login failed!");
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      ref={gradientRef}
      className="w-full h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden login-container transition-all duration-1000"
      style={{
        background: "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)",
        backgroundSize: "200% 200%",
      }}
    >
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        {/* Background icons will be rendered here */}
      </div>

      {/* Main floating icons */}
      <FaEnvelope
        ref={envelopeRef}
        className="absolute text-indigo-400 text-6xl top-10 left-10 transform transition-all duration-300 z-10"
      />
      <FaLock
        ref={lockRef}
        className="absolute text-indigo-400 text-6xl bottom-10 right-10 transform transition-all duration-300 z-10"
      />

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-sm w-full bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 space-y-5 z-20 transform transition-transform duration-300 hover:shadow-2xl"
      >
        <div className="text-center pb-8">
          <motion.h3
            
            className="text-2xl font-bold text-gray-800 sm:text-3xl"
            
          >
            Log in to your account
          </motion.h3>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                disabled={loading}
              />
              <FaEnvelope className="absolute top-3 right-3 text-indigo-400" />
            </div>
          </div>

          <div>
            <label className="font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                disabled={loading}
              />
              <FaLock className="absolute top-3 right-3 text-indigo-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && (
            <motion.p
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            ref={buttonRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white font-medium rounded-lg transition-all duration-300 shadow-lg ${
              loading 
                ? 'bg-indigo-600 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-600'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>
        </form>

        <button
          type="button"
          className="w-full mt-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold"
          onClick={() => navigate('/admin/login')}
        >
          Login as Administrator
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default Login;