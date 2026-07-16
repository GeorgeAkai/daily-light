"use client";

import { useState } from "react";
import {
  randomVerseForWord,
  verseForInput,
  type Verse,
} from "@/lib/verses";

type Mode = "number" | "birthday" | "word";

const modes: { id: Mode; label: string; icon: string }[] = [
  { id: "number", label: "A Number", icon: "🔢" },
  { id: "birthday", label: "My Birthday", icon: "🎂" },
  { id: "word", label: "A Word", icon: "💭" },
];

const placeholders: Record<Mode, string> = {
  number: "Enter any number, e.g. 7 or 2026",
  birthday: "",
  word: "Enter a word, e.g. hope, love, peace…",
};

export default function VerseFinder() {
  const [mode, setMode] = useState<Mode>("word");
  const [input, setInput] = useState("");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [searchedWord, setSearchedWord] = useState("");
  const [revealKey, setRevealKey] = useState(0);

  const revealWordVerse = (previous: Verse | null) => {
    const word = input.trim();
    const match = randomVerseForWord(word, previous);
    if (match) {
      setVerse(match.verse);
      setMatchCount(match.matchCount);
    } else {
      // No verse contains the word, so give a verse chosen for it instead.
      setVerse(verseForInput(`word:${word}`));
      setMatchCount(0);
    }
    setSearchedWord(word);
    setRevealKey((k) => k + 1);
  };

  const findVerse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (mode === "word") {
      revealWordVerse(null);
      return;
    }
    setVerse(verseForInput(`${mode}:${input}`));
    setMatchCount(null);
    setSearchedWord("");
    setRevealKey((k) => k + 1);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setInput("");
  };

  return (
    <section className="rounded-3xl border border-border-soft bg-card p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-2xl font-semibold">
        Find your verse ✨
      </h2>
      <p className="mt-1 text-sm text-muted">
        Share a number, your birthday, or a word on your heart and receive a
        verse to carry with you.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {modes.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => switchMode(id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              mode === id
                ? "bg-primary text-white shadow-sm"
                : "bg-card-soft text-muted hover:text-foreground"
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <form onSubmit={findVerse} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type={mode === "birthday" ? "date" : "text"}
          inputMode={mode === "number" ? "numeric" : "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={100}
          placeholder={placeholders[mode]}
          aria-label={
            mode === "birthday" ? "Enter your birthday" : placeholders[mode]
          }
          className="flex-1 rounded-2xl border border-border-soft bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="rounded-2xl bg-primary px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reveal Verse
        </button>
      </form>

      {verse && (
        <blockquote
          key={revealKey}
          className="animate-rise mt-6 rounded-2xl bg-primary-soft p-6"
        >
          <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-medium text-primary">
            {verse.theme}
          </span>
          <p className="mt-3 font-serif text-lg leading-relaxed">
            “{verse.text}”
          </p>
          <footer className="mt-3 text-sm font-semibold text-primary">
            {verse.reference}
          </footer>

          {matchCount !== null && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-card pt-3">
              <span className="text-xs text-muted">
                {matchCount > 0
                  ? `One of ${matchCount} verse${
                      matchCount === 1 ? "" : "s"
                    } speaking of “${searchedWord}”`
                  : `No verse mentions “${searchedWord}”, so here is one chosen just for it`}
              </span>
              {matchCount > 1 && (
                <button
                  type="button"
                  onClick={() => revealWordVerse(verse)}
                  className="rounded-full bg-card px-4 py-1.5 text-xs font-medium text-primary transition hover:opacity-80"
                >
                  🔄 Show another
                </button>
              )}
            </div>
          )}
        </blockquote>
      )}
    </section>
  );
}
