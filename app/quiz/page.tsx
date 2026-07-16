"use client";

import { useState } from "react";
import {
  buildQuizRound,
  encouragementFor,
  type QuizQuestion,
} from "@/lib/quizQuestions";

type Stage = "start" | "playing" | "results";

const difficultyStyles: Record<QuizQuestion["difficulty"], string> = {
  easy: "bg-sage-soft text-sage",
  medium: "bg-accent-soft text-accent",
  hard: "bg-primary-soft text-primary",
};

export default function QuizPage() {
  const [stage, setStage] = useState<Stage>("start");
  const [round, setRound] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const startQuiz = () => {
    setRound(buildQuizRound());
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setStage("playing");
  };

  const question = round[current];
  const answered = selected !== null;

  const choose = (index: number) => {
    if (answered) return;
    setSelected(index);
    if (index === question.answerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= round.length) {
      setStage("results");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="text-center">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
          Bible Quiz 🏆
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Ten random questions: easy, medium, and hard. See how many you can
          get right!
        </p>
      </section>

      {stage === "start" && (
        <section className="animate-rise rounded-3xl border border-border-soft bg-card p-8 text-center shadow-sm">
          <p className="text-5xl">📖</p>
          <h2 className="mt-4 font-serif text-2xl font-semibold">
            Ready when you are
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            You&apos;ll get 4 easy, 3 medium, and 3 hard questions, drawn at
            random from a pool of 50. Take your time; this is about growing,
            not grades.
          </p>
          <blockquote className="mx-auto mt-5 max-w-md rounded-2xl bg-primary-soft p-4 text-sm">
            “I can do all things through Christ who strengthens me.”
            <span className="mt-1 block font-semibold text-primary">
              Philippians 4:13
            </span>
          </blockquote>
          <button
            onClick={startQuiz}
            className="mt-6 rounded-2xl bg-primary px-8 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Start Quiz
          </button>
        </section>
      )}

      {stage === "playing" && question && (
        <section
          key={current}
          className="animate-rise rounded-3xl border border-border-soft bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="font-medium text-muted">
              Question {current + 1} of {round.length}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                difficultyStyles[question.difficulty]
              }`}
            >
              {question.difficulty}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-card-soft">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((current + 1) / round.length) * 100}%` }}
            />
          </div>

          <h2 className="mt-5 font-serif text-xl leading-relaxed">
            {question.question}
          </h2>

          <div className="mt-5 space-y-3">
            {question.options.map((option, i) => {
              let styles =
                "border-border-soft bg-background hover:border-primary";
              if (answered) {
                if (i === question.answerIndex) {
                  styles = "border-sage bg-sage-soft font-medium";
                } else if (i === selected) {
                  styles = "border-accent bg-accent-soft";
                } else {
                  styles = "border-border-soft bg-background opacity-60";
                }
              }
              return (
                <button
                  key={option}
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${styles}`}
                >
                  {option}
                  {answered && i === question.answerIndex && " ✓"}
                  {answered &&
                    i === selected &&
                    i !== question.answerIndex &&
                    " ✗"}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="animate-rise mt-5 flex items-center justify-between gap-3">
              <p className="text-sm text-muted">
                {selected === question.answerIndex
                  ? "Wonderful, that's right! 🎉"
                  : "Good try! Now you know it for next time. 💜"}
              </p>
              <button
                onClick={next}
                className="rounded-2xl bg-primary px-6 py-2.5 font-medium text-white shadow-sm transition hover:opacity-90"
              >
                {current + 1 >= round.length ? "See Results" : "Next"}
              </button>
            </div>
          )}
        </section>
      )}

      {stage === "results" && (
        <ResultsCard score={score} total={round.length} onRetry={startQuiz} />
      )}
    </div>
  );
}

function ResultsCard({
  score,
  total,
  onRetry,
}: {
  score: number;
  total: number;
  onRetry: () => void;
}) {
  const encouragement = encouragementFor(score, total);
  return (
    <section className="animate-rise rounded-3xl border border-border-soft bg-card p-8 text-center shadow-sm">
      <p className="text-5xl">
        {score / total >= 0.6 ? "🌟" : "🌱"}
      </p>
      <h2 className="mt-4 font-serif text-2xl font-semibold">
        {encouragement.title}
      </h2>
      <p className="mt-3 font-serif text-4xl font-semibold text-primary">
        {score} / {total}
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        {encouragement.message}
      </p>
      <blockquote className="mx-auto mt-5 max-w-md rounded-2xl bg-primary-soft p-4 text-sm">
        {encouragement.verse}
      </blockquote>
      <button
        onClick={onRetry}
        className="mt-6 rounded-2xl bg-primary px-8 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
      >
        Play Again
      </button>
    </section>
  );
}
