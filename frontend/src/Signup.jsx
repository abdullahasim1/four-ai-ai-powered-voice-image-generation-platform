import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createFloatingIcons, cleanupAnimations } from "./animations/signupAnimations";
import {
  createMainIconsAnimation,
  createCardAnimation,
  createTitleAnimation,
  createButtonAnimation,
  createGradientAnimation,
  cleanupAllAnimations
} from "./animations/signupMotionAnimations";
import axios from "axios";

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Refs for animations
  const userRef = useRef(null);
  const envelopeRef = useRef(null);
  const lockRef = useRef(null);
  const cardRef = useRef(null);
  const gradientRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create all animations
    const mainIconsTimelines = createMainIconsAnimation(userRef, envelopeRef, lockRef);
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      setMessage('');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/signup', {
        name: username,
        email,
        password
      });

      if (res.data.success) {
        setMessage('Account created successfully!');
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
        
        // Redirect to login after successful signup
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(res.data.message || 'Registration failed');
        setMessage('');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Registration failed');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      ref={gradientRef}
      className="w-full h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden signup-container"
      style={{
        background: "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)",
        backgroundSize: "200% 200%",
      }}
    >
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        {/* Background icons will be rendered here */}
      </div>

      {/* Main floating icons */}
      <FaUser
        ref={userRef}
        className="absolute text-indigo-400 text-6xl top-10 left-10 transform transition-all duration-300 z-10"
      />
      <FaEnvelope
        ref={envelopeRef}
        className="absolute text-indigo-400 text-6xl top-10 right-10 transform transition-all duration-300 z-10"
      />
      <FaLock
        ref={lockRef}
        className="absolute text-indigo-400 text-6xl bottom-10 left-1/2 -translate-x-1/2 transform transition-all duration-300 z-10"
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
            Create your account
          </motion.h3>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="font-medium">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              <FaUser className="absolute top-3 right-3 text-indigo-400" />
            </div>
          </div>

          <div>
            <label className="font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
              />
              <FaLock className="absolute top-3 right-3 text-indigo-400" />
            </div>
          </div>

          {message && <p className="text-center text-green-600">{message}</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <motion.button
            ref={buttonRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </motion.button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default SignupPage;
