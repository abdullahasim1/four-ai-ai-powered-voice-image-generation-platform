"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaDownload, FaImage, FaMagic } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

import { ToolHeader } from "@/components/PageShell";
import { toast } from "@/lib/toast";
import { generateImage } from "@/lib/api";
import { accountApi } from "@/lib/api";

const IDEAS = [
  "A neon-lit cyberpunk street at night, rain reflections, cinematic",
  "An astronaut relaxing on a beach of a purple alien planet, digital art",
  "A cozy cabin in a snowy forest at dusk, warm light in the windows",
  "A majestic dragon flying over a medieval castle at sunrise",
  "Abstract 3D render of flowing liquid chrome shapes, studio lighting",
];

function ImageGeneratorContent() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [steps, setSteps] = useState(28);
  const [guidance, setGuidance] = useState(3.5);
  const [image, setImage] = useState(null);
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Seed from a template link (?prompt=…)
  useEffect(() => {
    const seed = searchParams.get("prompt");
    if (seed) setPrompt(seed.slice(0, 1000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Revoke object URLs to avoid leaks
  useEffect(() => () => {
    if (image) URL.revokeObjectURL(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ideas = useMemo(() => IDEAS.slice(0, 3), []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Describe what you want to see first");
      return;
    }
    setLoading(true);
    setImage(null);
    setModel("");
    setStatus("Warming up the models…");

    try {
      const result = await generateImage({
        prompt,
        negativePrompt,
        steps,
        guidance,
      });
      setImage(result.url);
      setModel(result.model);
      setStatus("");
      toast.success("Image generated!");
      accountApi
        .trackActivity("image-generator", `Generated art: "${prompt.slice(0, 60)}${prompt.length > 60 ? "…" : ""}"`)
        .catch(() => {});
    } catch (err) {
      setStatus("");
      toast.error(err.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `fourai-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ToolHeader
        icon={<FiImage />}
        title="Image Generator"
        subtitle="Create stunning images from text using advanced AI models."
      />

      <div className="glass-card overflow-hidden">
      <div className="grid lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* Controls */}
        <div className="space-y-5 border-b border-line p-6 lg:border-b-0 lg:border-r">
          <div>
            <label className="input-label"><FaMagic /> Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Describe the image you want to create…"
              className="input-field resize-none"
              maxLength={1000}
            />
            <div className="mt-1.5 text-right text-xs t-faint">{prompt.length} / 1000</div>
          </div>

          <div>
            <label className="input-label">Negative prompt</label>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={2}
              placeholder="What to avoid (blurry, low quality…)"
              className="input-field resize-none"
              maxLength={500}
            />
          </div>

          <div>
            <label className="input-label">
              Steps <span className="ml-auto font-semibold t-text">{steps}</span>
            </label>
            <input
              type="range"
              min="20"
              max="50"
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="input-label">
              Guidance <span className="ml-auto font-semibold t-text">{guidance.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={guidance}
              onChange={(e) => setGuidance(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full justify-center !py-3">
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating…
              </>
            ) : (
              <>
                Generate Image <FaMagic className="text-xs" />
              </>
            )}
          </button>

          {/* Idea chips */}
          <div className="border-t border-line pt-4">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider t-faint">Try an idea</p>
            <div className="flex flex-wrap gap-2">
              {ideas.map((idea) => (
                <button
                  key={idea}
                  onClick={() => setPrompt(idea)}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs t-2 transition-all hover:border-[var(--primary-soft-border)] hover:text-[var(--primary)]"
                >
                  {idea.length > 46 ? idea.slice(0, 46) + "…" : idea}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden lg:aspect-auto lg:min-h-[560px]">
          {loading ? (
            <div className="p-8 text-center">
              <span className="mx-auto mb-4 block h-14 w-14 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
              <p className="text-sm t-2">{status}</p>
              <p className="mt-1 text-xs t-faint">This can take up to a minute</p>
            </div>
          ) : image ? (
            <>
              <img src={image} alt={prompt} className="absolute inset-0 h-full w-full object-cover" />
              {model && (
                <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                  {model}
                </span>
              )}
              <button
                onClick={handleDownload}
                className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-violet-700 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <FaDownload /> Download
              </button>
            </>
          ) : (
            <div className="p-8 text-center">
              <span className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--primary-soft)] text-3xl text-[var(--primary)]">
                <FaImage />
              </span>
              <p className="font-medium t-text">Your generated image will appear here</p>
              <p className="mt-1 text-sm t-muted">Write a prompt and hit Generate Image.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default function ImageGenerator() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6" />}>
      <ImageGeneratorContent />
    </Suspense>
  );
}
