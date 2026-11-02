"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiMic } from "react-icons/fi";

import { ToolHeader } from "@/components/PageShell";
import { VoiceGeneratorTool } from "@/components/VoiceGeneratorTool";

function VoiceGeneratorContent() {
  const searchParams = useSearchParams();
  const initialText = searchParams.get("text") || undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ToolHeader
        icon={<FiMic />}
        title="Voice Generator"
        subtitle="Create realistic AI voices with different styles and accents."
      />
      <VoiceGeneratorTool initialText={initialText} />
    </div>
  );
}

export default function VoiceGeneratorPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6" />}>
      <VoiceGeneratorContent />
    </Suspense>
  );
}
