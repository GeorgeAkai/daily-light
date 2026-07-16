"use client";

import { useMemo } from "react";
import { quoteOfTheDay } from "@/lib/quotes";
import { useTodayKey } from "@/lib/storage";

export default function DailyQuote() {
  // Resolved on the client so the quote follows the visitor's local date.
  const todayKey = useTodayKey();

  const daily = useMemo(
    () => (todayKey ? quoteOfTheDay(new Date(todayKey)) : null),
    [todayKey]
  );

  const dateLabel = useMemo(
    () =>
      todayKey
        ? new Date(todayKey).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })
        : "",
    [todayKey]
  );

  return (
    <section className="rounded-3xl border border-border-soft bg-gradient-to-br from-accent-soft to-sage-soft p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-2xl font-semibold">
          Today&apos;s inspiration 🌅
        </h2>
        <span className="text-sm text-muted">{dateLabel}</span>
      </div>

      {daily ? (
        <div className="animate-rise mt-4 space-y-4">
          <p className="font-serif text-xl leading-relaxed">
            “{daily.quote}”
          </p>
          <div className="rounded-2xl bg-card/70 p-4">
            <p className="text-sm leading-relaxed">“{daily.verse.text}”</p>
            <p className="mt-2 text-sm font-semibold text-primary">
              — {daily.verse.reference}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">Gathering today&apos;s light…</p>
      )}
    </section>
  );
}
