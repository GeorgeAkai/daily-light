"use client";

import { useState } from "react";
import { useHydrated, useLocalStorage } from "@/lib/storage";

interface Goal {
  id: string;
  text: string;
  achieved: boolean;
  createdAt: string;
}

const STORAGE_KEY = "daily-light-goals";
const NO_GOALS: Goal[] = [];

export default function GoalsPage() {
  const hydrated = useHydrated();
  const [goals, setGoals] = useLocalStorage<Goal[]>(STORAGE_KEY, NO_GOALS);
  const [text, setText] = useState("");
  const year = new Date().getFullYear();

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const goal: Goal = {
      id: crypto.randomUUID(),
      text: text.trim(),
      achieved: false,
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, goal]);
    setText("");
  };

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, achieved: !g.achieved } : g))
    );
  };

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const achievedCount = goals.filter((g) => g.achieved).length;

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
          Goals I&apos;m believing for in {year} 🎯
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          “Commit your deeds to Yahweh, and your plans shall succeed.” —
          Proverbs 16:3
        </p>
      </section>

      {goals.length > 0 && (
        <section className="rounded-3xl border border-border-soft bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {achievedCount} of {goals.length} achieved 🎉
            </span>
            <span className="text-muted">
              {Math.round((achievedCount / goals.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-card-soft">
            <div
              className="h-full rounded-full bg-sage transition-all duration-500"
              style={{
                width: `${(achievedCount / goals.length) * 100}%`,
              }}
            />
          </div>
        </section>
      )}

      <form
        onSubmit={addGoal}
        className="flex flex-col gap-3 rounded-3xl border border-border-soft bg-card p-6 shadow-sm sm:flex-row"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I am believing for…"
          className="flex-1 rounded-2xl border border-border-soft bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-2xl bg-primary px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Goal
        </button>
      </form>

      <section className="space-y-3">
        {hydrated && goals.length === 0 && (
          <p className="text-center text-sm text-muted">
            No goals yet — write down what you&apos;re believing for this
            year. 🌱
          </p>
        )}
        {goals.map((goal) => (
          <label
            key={goal.id}
            className={`animate-rise flex cursor-pointer items-center gap-4 rounded-2xl border p-5 shadow-sm transition ${
              goal.achieved
                ? "border-sage bg-sage-soft"
                : "border-border-soft bg-card hover:border-primary"
            }`}
          >
            <input
              type="checkbox"
              checked={goal.achieved}
              onChange={() => toggleGoal(goal.id)}
              className="size-5 shrink-0 accent-[var(--sage)]"
            />
            <span
              className={`flex-1 leading-relaxed ${
                goal.achieved ? "text-muted line-through" : ""
              }`}
            >
              {goal.text}
            </span>
            {goal.achieved && <span aria-hidden>✅</span>}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                removeGoal(goal.id);
              }}
              aria-label="Delete goal"
              className="text-xs text-muted transition hover:text-red-400"
            >
              ✕
            </button>
          </label>
        ))}
      </section>
    </div>
  );
}
