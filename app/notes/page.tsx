"use client";

import { useState } from "react";
import { useHydrated, useLocalStorage } from "@/lib/storage";

interface Entry {
  id: string;
  type: "note" | "prayer";
  text: string;
  date: string;
}

const STORAGE_KEY = "daily-light-entries";
const NO_ENTRIES: Entry[] = [];
const MAX_ENTRY_LENGTH = 5000;

const isEntryList = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (e) =>
      e &&
      typeof e === "object" &&
      typeof (e as Entry).id === "string" &&
      typeof (e as Entry).text === "string" &&
      typeof (e as Entry).date === "string" &&
      ((e as Entry).type === "note" || (e as Entry).type === "prayer")
  );

export default function NotesPage() {
  const hydrated = useHydrated();
  const [entries, setEntries] = useLocalStorage<Entry[]>(
    STORAGE_KEY,
    NO_ENTRIES,
    isEntryList
  );
  const [type, setType] = useState<Entry["type"]>("note");
  const [text, setText] = useState("");

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const entry: Entry = {
      id: crypto.randomUUID(),
      type,
      text: text.trim().slice(0, MAX_ENTRY_LENGTH),
      date: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setText("");
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
          Notes & Prayers 📝
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Capture a thought from today, or write a prayer from your heart.
          Everything stays private on your device.
        </p>
      </section>

      <form
        onSubmit={addEntry}
        className="rounded-3xl border border-border-soft bg-card p-6 shadow-sm"
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType("note")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              type === "note"
                ? "bg-primary text-white"
                : "bg-card-soft text-muted hover:text-foreground"
            }`}
          >
            📝 Note of the day
          </button>
          <button
            type="button"
            onClick={() => setType("prayer")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              type === "prayer"
                ? "bg-primary text-white"
                : "bg-card-soft text-muted hover:text-foreground"
            }`}
          >
            🙏 Prayer
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          maxLength={MAX_ENTRY_LENGTH}
          placeholder={
            type === "note"
              ? "What is on your mind today?"
              : "Lord, today I bring to you…"
          }
          className="mt-4 w-full resize-y rounded-2xl border border-border-soft bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="mt-3 rounded-2xl bg-primary px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save {type === "note" ? "Note" : "Prayer"}
        </button>
      </form>

      <section className="space-y-3">
        {hydrated && entries.length === 0 && (
          <p className="text-center text-sm text-muted">
            No entries yet. Your first note or prayer will appear here. 🌱
          </p>
        )}
        {entries.map((entry) => (
          <article
            key={entry.id}
            className={`animate-rise rounded-2xl border border-border-soft p-5 shadow-sm ${
              entry.type === "prayer" ? "bg-sage-soft" : "bg-accent-soft"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-medium text-muted">
                {entry.type === "prayer" ? "🙏 Prayer" : "📝 Note"} ·{" "}
                {new Date(entry.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() => removeEntry(entry.id)}
                aria-label="Delete entry"
                className="text-xs text-muted transition hover:text-red-400"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 whitespace-pre-wrap leading-relaxed">
              {entry.text}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
