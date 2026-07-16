"use client";

import { useState } from "react";
import { triviaCards, shuffleCards, type TriviaCard } from "@/lib/trivia";

type Filter = "all" | "easy" | "medium";

export default function TriviaPage() {
  // Deterministic order on first render (matches SSR); shuffling is user-triggered.
  const [cards, setCards] = useState<TriviaCard[]>(triviaCards);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>("all");

  const visible = cards.filter(
    (c) => filter === "all" || c.difficulty === filter
  );

  const toggleFlip = (question: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });
  };

  const reshuffle = () => {
    setCards(shuffleCards(triviaCards));
    setFlipped(new Set());
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
          Trivia 🃏
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Flip a card to reveal the answer. A relaxed way to learn, no
          scores and no pressure.
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {(["all", "easy", "medium"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm capitalize transition ${
              filter === f
                ? "bg-primary text-white shadow-sm"
                : "bg-card-soft text-muted hover:text-foreground"
            }`}
          >
            {f === "all" ? "All questions" : f}
          </button>
        ))}
        <button
          onClick={reshuffle}
          className="rounded-full bg-accent-soft px-4 py-2 text-sm text-foreground transition hover:opacity-80"
        >
          🔀 Shuffle
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card) => {
          const isFlipped = flipped.has(card.question);
          return (
            <button
              key={card.question}
              onClick={() => toggleFlip(card.question)}
              aria-label={
                isFlipped ? "Hide answer" : "Reveal answer"
              }
              className={`flip-card h-56 text-left ${
                isFlipped ? "flipped" : ""
              }`}
            >
              <div className="flip-card-inner relative h-full w-full">
                {/* Front: question */}
                <div className="flip-card-face absolute inset-0 flex flex-col rounded-3xl border border-border-soft bg-card p-5 shadow-sm">
                  <span
                    className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      card.difficulty === "easy"
                        ? "bg-sage-soft text-sage"
                        : "bg-accent-soft text-accent"
                    }`}
                  >
                    {card.difficulty}
                  </span>
                  <p className="mt-3 flex-1 font-serif text-base leading-relaxed">
                    {card.question}
                  </p>
                  <span className="text-xs text-muted">
                    Tap to reveal ↻
                  </span>
                </div>
                {/* Back: answer */}
                <div className="flip-card-face flip-card-back absolute inset-0 flex flex-col rounded-3xl bg-primary p-5 text-white shadow-sm">
                  <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                    Answer
                  </span>
                  <p className="mt-3 flex-1 text-base leading-relaxed">
                    {card.answer}
                  </p>
                  <span className="text-xs opacity-80">Tap to flip back ↻</span>
                </div>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
