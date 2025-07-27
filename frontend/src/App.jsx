import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home'; 
import Features from './Features';
import Pricing from './Pricing';
import Startpage from './Startpage';
import Team from './Team';
import History from './History';
import VoiceGenerator from './VoiceGenerator';
import ImageGenerator from './ImageGenerator';
import TextToSpeech from './TexttoSpeech';
import VoiceChanger from './VoiceChanger';
import ExploreVoiceLibrary from './ExploreVoiceLibrary';
import Profile from './Profile';
import Settings from './Settings';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import LogoutPage from './Logout';
import ForgotPassword from './ForgotPassword';
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import './App.css';

// Layout component for authenticated pages
const AuthLayout = ({ children }) => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Layout component for public pages
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Layout component for auth pages (login/signup)
const AuthPagesLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/home" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
        <Route path="/login" element={<AuthPagesLayout><Login /></AuthPagesLayout>} />
        <Route path="/signup" element={<AuthPagesLayout><Signup /></AuthPagesLayout>} />
        <Route path="/voice-generator" element={<AuthLayout><VoiceGenerator /></AuthLayout>} />
        <Route path="/text-to-speech" element={<AuthLayout><TextToSpeech /></AuthLayout>} />
        <Route path="/voicechanger" element={<AuthLayout><VoiceChanger /></AuthLayout>} />
        <Route path="/imagegenerator" element={<AuthLayout><ImageGenerator /></AuthLayout>} />
        <Route path="/profile" element={<AuthLayout><Profile /></AuthLayout>} />
        <Route path="/history" element={<AuthLayout><History /></AuthLayout>} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/texttospeech" element={<AuthLayout><TextToSpeech /></AuthLayout>} />
        <Route path="/explore-voice-library" element={<PublicLayout><ExploreVoiceLibrary /></PublicLayout>} />
        <Route path="/settings" element={<AuthLayout><Settings /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthPagesLayout><ForgotPassword /></AuthPagesLayout>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;