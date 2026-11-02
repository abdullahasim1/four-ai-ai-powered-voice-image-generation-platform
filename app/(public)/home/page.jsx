"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBolt,
  FaCode,
  FaGlobe,
  FaHeadphones,
  FaMicrophone,
  FaRobot,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import { VoiceGeneratorTool } from "@/components/VoiceGeneratorTool";
import { getSession } from "@/lib/auth-client";

const VOICES = [
  {
    title: "Carter's Edge",
    listens: "17.8m",
    users: "3.7k",
    description: "A rugged, masculine voice built for narration and cinematic trailers.",
    icon: <FaMicrophone className="text-xl" />,
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Carter Motivational",
    listens: "5.4m",
    users: "1.1k",
    description: "A commanding tone that carries energy through every sentence.",
    icon: <FaHeadphones className="text-xl" />,
    gradient: "from-cyan-500 to-blue-500",
  },
];

const FEATURES = [
  { title: "High-quality AI voices", text: "Natural-sounding speech in dozens of languages and accents.", icon: <FaMicrophone />, gradient: "from-pink-500 to-purple-500" },
  { title: "AI voice generation", text: "Advanced neural models produce expressive, lifelike delivery.", icon: <FaRobot />, gradient: "from-cyan-500 to-blue-500" },
  { title: "Customizable output", text: "Tune speed, voice and effects until it sounds just right.", icon: <FaStar />, gradient: "from-emerald-500 to-teal-500" },
  { title: "Easy integration", text: "Clean APIs with documentation that gets you running fast.", icon: <FaCode />, gradient: "from-amber-500 to-orange-500" },
  { title: "Scales with you", text: "From a single demo to enterprise-grade workloads.", icon: <FaGlobe />, gradient: "from-indigo-500 to-violet-500" },
  { title: "Real-time processing", text: "Low-latency generation for dynamic applications.", icon: <FaBolt />, gradient: "from-rose-500 to-pink-500" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay },
});

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getSession()));
  }, []);

  return (
    <PageShell contentClassName="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative py-20 text-center md:py-28">
        <div
          aria-hidden="true"
          data-parallax="-60"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[110px] will-change-transform"
        />
        <motion.span {...fadeUp(0)} className="badge mx-auto">
          ✨ Everything you need to create
        </motion.span>
        <motion.h1
          {...fadeUp(0.1)}
          className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight t-text sm:text-6xl"
        >
          Welcome to <span className="gradient-text">Four AI</span>
        </motion.h1>
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed t-muted"
        >
          Create, customize and generate voices and images with advanced AI — try the tools right below.
        </motion.p>
      </section>

      {/* Live tool preview */}
      <motion.section {...fadeUp(0.1)} className="-mt-8 pb-20">
        <div>
          <VoiceGeneratorTool />
        </div>
      </motion.section>

      {/* Voice library */}
      <section className="py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp()}>
            <span className="badge">Voice Library</span>
            <h2 className="mt-4 section-title !text-left">Discover signature voices</h2>
            <p className="mt-4 leading-relaxed t-muted">
              A growing collection of professionally crafted voices. From natural and warm to bold
              and dramatic — find the perfect match for your project.
            </p>
            <Link href="/explore-voice-library" className="btn-primary group mt-7">
              Explore library
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="space-y-5">
            {VOICES.map((voice, i) => (
              <motion.div key={voice.title} {...fadeUp(i * 0.1)}>
                <div className="glass-card card-hover flex items-start gap-5 p-6">
                  <span className={`shrink-0 rounded-xl bg-gradient-to-br ${voice.gradient} p-3.5 text-white shadow-lg`}>
                    {voice.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold t-text">{voice.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed t-muted">{voice.description}</p>
                    <div className="mt-3 flex gap-5 text-xs t-muted">
                      <span className="flex items-center gap-1.5"><FaHeadphones className="text-violet-500" /> {voice.listens}</span>
                      <span className="flex items-center gap-1.5"><FaUsers className="text-violet-500" /> {voice.users}</span>
                      <span className="flex items-center gap-1.5"><FaStar className="text-amber-500" /> 4.9</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <motion.div {...fadeUp()} className="mb-14 text-center">
          <span className="badge mx-auto">Features</span>
          <h2 className="mt-4 section-title">Powerful by design</h2>
          <p className="section-subtitle">
            Everything you need to create amazing voice and image content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div key={feature.title} {...fadeUp(i * 0.06)}>
              <div className="glass-card card-hover h-full p-6">
                <span className={`inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg`}>
                  {feature.icon}
                </span>
                <h3 className="mt-4 font-semibold t-text">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed t-muted">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section {...fadeUp()} className="py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-600 p-10 text-center shadow-2xl shadow-violet-600/25 sm:p-16">
          
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to transform your ideas?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-violet-100">
            Join creators using Four AI to bring their stories, videos and artwork to life.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {loggedIn ? (
              <Link href="/voice-generator" className="btn-primary group">
                Start creating <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link href="/signup" className="btn-primary group">
                Start creating now <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/25">
              View pricing
            </Link>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
