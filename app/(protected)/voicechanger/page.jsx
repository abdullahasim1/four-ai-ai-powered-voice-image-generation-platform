"use client";

import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaDownload, FaMagic, FaWaveSquare } from "react-icons/fa";

import { ToolHeader } from "@/components/PageShell";
import { toast } from "@/lib/toast";
import { encodeWAV } from "@/lib/wavEncoder";
import { accountApi } from "@/lib/api";

const EFFECTS = [
  { value: "normal", label: "Normal" },
  { value: "robot", label: "Robot" },
  { value: "slow", label: "Slow" },
  { value: "fast", label: "Fast" },
  { value: "echo", label: "Echo" },
  { value: "distortion", label: "Distortion" },
  { value: "reverb", label: "Reverb" },
  { value: "tremolo", label: "Tremolo" },
  { value: "lowpass", label: "Lowpass filter" },
];

async function processAudio(file, effect, speed) {
      const arrayBuffer = await file.arrayBuffer();
      const tempCtx = new (window.AudioContext || window.webkitAudioContext)();
      const decoded = await tempCtx.decodeAudioData(arrayBuffer);
      tempCtx.close();

      let durationInSamples = Math.ceil(decoded.length * speed);
      if (effect === "echo") durationInSamples += Math.ceil(0.5 * 44100);
      if (effect === "reverb") durationInSamples += Math.ceil(2 * 44100);

      const audioCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
        1,
        durationInSamples,
        44100
      );

      let source = audioCtx.createBufferSource();
      source.buffer = decoded;
      source.playbackRate.value = speed;
      let node = source;
      let lastNode = node;

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
        delay.delayTime.value = 0.25;
        const feedback = audioCtx.createGain();
        feedback.gain.value = 0.4;
        lastNode.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(audioCtx.destination);
        lastNode = null;
      } else if (effect === "distortion") {
        const distortion = audioCtx.createWaveShaper();
        function makeDistortionCurve(amount) {
          const n_samples = 44100;
          const curve = new Float32Array(n_samples);
          for (let i = 0; i < n_samples; ++i) {
            const x = (i * 2) / n_samples - 1;
            curve[i] = ((3 + amount) * x * 20 * Math.PI / 180) / (Math.PI + amount * Math.abs(x));
          }
          return curve;
        }
        distortion.curve = makeDistortionCurve(400);
        distortion.oversample = "4x";
        lastNode.connect(distortion);
        lastNode = distortion;
      } else if (effect === "reverb") {
        const convolver = audioCtx.createConvolver();
        const irBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 2, audioCtx.sampleRate);
        for (let c = 0; c < irBuffer.numberOfChannels; c++) {
          const channel = irBuffer.getChannelData(c);
          for (let i = 0; i < irBuffer.length; i++) {
            channel[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irBuffer.length, 2);
          }
        }
        convolver.buffer = irBuffer;
        lastNode.connect(convolver);
        lastNode = convolver;
      } else if (effect === "tremolo") {
        const gain = audioCtx.createGain();
        const lfo = audioCtx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 8;
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
    return await audioCtx.startRendering();
}

export default function VoiceChanger() {
  const [file, setFile] = useState(null);
  const [fileDuration, setFileDuration] = useState(null);
  const [effect, setEffect] = useState("normal");
  const [customSpeed, setCustomSpeed] = useState(1);
  const [audioUrl, setAudioUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const objectUrlRef = useRef(null);

  const revokeOldUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    revokeOldUrl();
    setAudioUrl(null);
    setFile(selectedFile);

    if (!selectedFile) {
      setFileDuration(null);
      return;
    }
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const tempCtx = new (window.AudioContext || window.webkitAudioContext)();
      const decoded = await tempCtx.decodeAudioData(arrayBuffer);
      setFileDuration(decoded.duration);
      tempCtx.close();
    } catch {
      setFileDuration(null);
      toast.error("Could not read that file. Is it a valid audio format?");
    }
  };

  const handleApplyEffect = async () => {
    if (!file) {
      toast.error("Choose an audio file first");
      return;
    }
    setProcessing(true);
    revokeOldUrl();
    setAudioUrl(null);
    try {
      const processedBuffer = await processAudio(file, effect, customSpeed);
      const wav = encodeWAV(processedBuffer);
      const blob = new Blob([wav], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      setAudioUrl(url);
      toast.success(`"${EFFECTS.find((e) => e.value === effect)?.label}" applied`);
      accountApi
        .trackActivity("voice-changer", `Applied ${effect} effect to ${(file.size / 1024).toFixed(0)} KB audio`)
        .catch(() => {});
    } catch (err) {
      toast.error("Failed to process audio: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ToolHeader
        icon={<FaWaveSquare />}
        title="Voice Changer"
        subtitle="Transform your voice with AI-powered effects."
      />

      <div className="mx-auto max-w-2xl">
        <div className="glass-card p-6 md:p-8">
          {/* File picker */}
          <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--border-strong)] bg-soft px-6 py-10 text-center transition-colors hover:border-[var(--primary)]">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl text-white shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-110">
              <FaCloudUploadAlt />
            </span>
            <span className="mt-1 text-sm font-semibold t-text">
              {file ? file.name : "Upload Audio File"}
            </span>
            <span className="text-xs t-muted">Drag & drop or click to upload</span>
            <span className="text-xs t-faint">MP3, WAV, M4A · Max size 50 MB</span>
            <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
          </label>

          {fileDuration != null && (
            <p className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-sm text-emerald-600 dark:text-emerald-300">
              Duration: {Math.floor(fileDuration / 60)}:{(fileDuration % 60).toFixed(1).padStart(4, "0")}
            </p>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Effect */}
            <div>
              <label className="input-label"><FaMagic /> Change To</label>
              <select
                value={effect}
                onChange={(e) => setEffect(e.target.value)}
                className="input-field"
              >
                {EFFECTS.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            {/* Speed */}
            <div>
              <label className="input-label">
                Playback speed <span className="ml-auto font-semibold t-text">{customSpeed.toFixed(2)}x</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.01"
                value={customSpeed}
                onChange={(e) => setCustomSpeed(parseFloat(e.target.value))}
                className="mt-3 w-full"
              />
            </div>
          </div>

          <button onClick={handleApplyEffect} disabled={processing} className="btn-primary mt-7 w-full justify-center !py-3">
            {processing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing…
              </>
            ) : (
              <>
                Change Voice <FaMagic className="text-xs" />
              </>
            )}
          </button>

          {/* Result */}
          {audioUrl && (
            <div className="mt-7 border-t border-line pt-6">
              <audio controls src={audioUrl} className="w-full" />
              <a href={audioUrl} download="fourai-processed.wav" className="btn-secondary mt-4 w-full justify-center">
                <FaDownload /> Download WAV
              </a>
            </div>
          )}

          <p className="mt-5 text-center text-xs t-faint">
            Everything is processed locally in your browser — no time limits, nothing is uploaded.
          </p>
        </div>
      </div>
    </div>
  );
}
