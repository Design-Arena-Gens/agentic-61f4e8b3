"use client";

import { type ReactNode, useMemo, useState } from "react";
import {
  type EditingBeat,
  type NarrationLine,
  type ScenePlan,
  type ScriptSegment,
  type SubtitleWord,
  generateViralPackage,
} from "@/lib/generator";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="rounded-2xl border border-white/10 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-lg dark:border-white/5 dark:bg-zinc-900/50">
    <h2 className="mb-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
      {title}
    </h2>
    <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
      {children}
    </div>
  </section>
);

function ScriptBlock({ script }: { script: ScriptSegment[] }) {
  return (
    <div className="space-y-3">
      {script.map((segment) => (
        <div
          key={segment.order}
          className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 dark:border-white/10 dark:bg-zinc-900/60"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-pink-600 dark:text-pink-400">
            <span>{segment.label}</span>
            <span>{segment.durationSeconds}s</span>
          </div>
          <p className="mt-2 text-base font-semibold leading-5 text-zinc-900 dark:text-white">
            {segment.text}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Objective: {segment.objective}
          </p>
        </div>
      ))}
    </div>
  );
}

function NarrationBlock({ narration }: { narration: NarrationLine[] }) {
  return (
    <div className="space-y-3">
      {narration.map((line, idx) => (
        <div
          key={`${line.segmentType}-${idx}`}
          className="rounded-xl border border-indigo-200/40 bg-indigo-50/70 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
            {line.segmentType}
          </div>
          <p className="mt-2 text-sm font-semibold text-indigo-950 dark:text-indigo-100">
            {line.text}
          </p>
          <p className="mt-2 text-xs text-indigo-700 dark:text-indigo-200">
            Voice: {line.voiceProfile}
          </p>
          <p className="text-xs text-indigo-600/80 dark:text-indigo-200/80">
            Pacing: {line.pacing}
          </p>
          <p className="text-xs text-indigo-500/80 dark:text-indigo-200/60">
            Notes: {line.notes}
          </p>
        </div>
      ))}
    </div>
  );
}

function SceneBlock({ scenes }: { scenes: ScenePlan[] }) {
  return (
    <div className="space-y-3">
      {scenes.map((scene, idx) => (
        <div
          key={`${scene.segmentType}-${idx}`}
          className="rounded-xl border border-zinc-300/50 bg-gradient-to-r from-white to-amber-50 p-4 dark:border-white/10 dark:from-zinc-900/60 dark:to-zinc-900/20"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-300">
            {scene.segmentType}
          </div>
          <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">
            Visual: {scene.visualPrompt}
          </p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
            Motion: {scene.motionDirection}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-300">
            B-roll: {scene.supportingBroll}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-200">
            Overlay: {scene.overlayText}
          </p>
        </div>
      ))}
    </div>
  );
}

function EditingBlock({ beats }: { beats: EditingBeat[] }) {
  return (
    <div className="grid gap-3">
      {beats.map((beat, idx) => (
        <div
          key={`${beat.timestamp}-${idx}`}
          className="rounded-xl border border-pink-200/40 bg-pink-50/70 p-4 dark:border-pink-500/20 dark:bg-pink-500/10"
        >
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-200">
            <span>{beat.timestamp}</span>
            <span>{beat.action}</span>
          </div>
          <p className="mt-2 text-sm text-pink-900 dark:text-pink-100">
            {beat.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function SubtitleBlock({ subtitles }: { subtitles: SubtitleWord[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-lime-200/40 bg-lime-50/70 dark:border-lime-500/20 dark:bg-lime-500/10">
      <table className="w-full text-left text-xs text-lime-800 dark:text-lime-100">
        <thead className="bg-lime-100/70 text-lime-700 dark:bg-lime-500/20 dark:text-lime-200">
          <tr>
            <th className="px-3 py-2">Word</th>
            <th className="px-3 py-2">Start</th>
            <th className="px-3 py-2">End</th>
          </tr>
        </thead>
        <tbody>
          {subtitles.map((sub, idx) => (
            <tr
              key={`${sub.word}-${idx}`}
              className="border-t border-lime-200/40 dark:border-lime-400/10"
            >
              <td className="px-3 py-2 font-semibold uppercase tracking-wide">
                {sub.word}
              </td>
              <td className="px-3 py-2">{sub.start.toFixed(2)}s</td>
              <td className="px-3 py-2">{sub.end.toFixed(2)}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(() => generateViralPackage("viral content"));
  const [iterations, setIterations] = useState(1);

  const characterCount = useMemo(() => category.trim().length, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 py-16 text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 md:px-10">
        <header className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg backdrop-blur-2xl md:text-left">
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-fuchsia-300">
            Auto Viral Content AI Agent
          </div>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Drop a category, get a ready-to-post 19s viral reel blueprint.
          </h1>
          <p className="text-sm text-zinc-200 md:text-base">
            Optimized hooks, narration, edit plan, subtitles, captions, hashtags, timing, replies—everything engineered for maximum virality across Instagram Reels, TikTok, and YouTube Shorts.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setResult(generateViralPackage(category || "viral content"));
              setIterations((prev) => prev + 1);
            }}
            className="mt-6 flex flex-col gap-4 md:flex-row"
          >
            <div className="flex w-full flex-col gap-2 md:flex-1">
              <label
                htmlFor="category"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="e.g. fitness coaching, crypto trading, skincare routines"
                className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/40"
              />
              <p className="text-xs text-zinc-400">
                Characters: {characterCount} · Iterations generated: {iterations}
              </p>
            </div>
            <button
              type="submit"
              className="h-fit rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:scale-105 hover:shadow-2xl focus:outline-none"
            >
              Generate Viral System
            </button>
          </form>
        </header>

        {result && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Section title="Trending Angles & Insights">
              <p className="text-sm font-semibold text-fuchsia-200">
                Category focus: {result.category.toUpperCase()}
              </p>
              <ul className="list-disc space-y-2 pl-4 text-sm text-zinc-100">
                {result.trendInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
              <p className="text-xs text-zinc-300">{result.insightSummary}</p>
              <p className="text-xs font-semibold text-fuchsia-300">
                Hook formula: {result.hookFormula}
              </p>
            </Section>

            <Section title="Viral Script (12-19s)">
              <ScriptBlock script={result.script} />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Total duration: {result.script.reduce((acc, seg) => acc + seg.durationSeconds, 0)}s
              </p>
            </Section>

            <Section title="AI Voice Narration (SSML-ready)">
              <NarrationBlock narration={result.narration} />
            </Section>

            <Section title="Scene & Visual Direction">
              <SceneBlock scenes={result.scenes} />
            </Section>

            <Section title="Edit Timeline & Motion Plan">
              <EditingBlock beats={result.editingPlan} />
            </Section>

            <Section title="Word-by-Word Subtitles">
              <SubtitleBlock subtitles={result.subtitles} />
            </Section>

            <Section title="Distribution Toolkit">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">Viral Titles</h3>
                <ul className="mt-2 space-y-1 text-sm text-zinc-200">
                  {result.viralTitles.map((title, idx) => (
                    <li key={idx}>• {title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">Captions</h3>
                <ul className="mt-2 space-y-1 text-sm text-zinc-200">
                  {result.captions.map((caption, idx) => (
                    <li key={idx}>• {caption}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">SEO Hashtags</h3>
                <p className="mt-2 text-xs text-zinc-300">
                  {result.hashtags.join(" ")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">Keywords</h3>
                <p className="mt-2 text-xs text-zinc-300">
                  {result.keywords.join(", ")}
                </p>
              </div>
            </Section>

            <Section title="Thumbnail & Posting">
              <p className="text-sm font-semibold text-zinc-100">
                Thumbnail Prompt
              </p>
              <p className="text-xs text-zinc-300">{result.thumbnailPrompt}</p>
              <p className="text-sm font-semibold text-zinc-100">
                Best Post Time
              </p>
              <p className="text-xs text-zinc-300">{result.bestPostTime}</p>
              <p className="text-sm font-semibold text-zinc-100">
                CTA & Comment Strategy
              </p>
              <p className="text-xs text-zinc-300">{result.callToAction}</p>
              <p className="text-sm font-semibold text-zinc-100">
                Auto-reply Comments
              </p>
              <ul className="mt-2 space-y-1 text-xs text-zinc-300">
                {result.autoReplyComments.map((comment, idx) => (
                  <li key={idx}>• {comment}</li>
                ))}
              </ul>
            </Section>
          </div>
        )}
      </main>
    </div>
  );
}
