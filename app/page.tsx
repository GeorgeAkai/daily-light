import Link from "next/link";
import DailyQuote from "@/components/DailyQuote";
import VerseFinder from "@/components/VerseFinder";

const featureCards = [
  {
    href: "/notes",
    icon: "📝",
    title: "Notes & Prayers",
    text: "Write a note of the day or a quiet prayer.",
  },
  {
    href: "/goals",
    icon: "🎯",
    title: "My Goals",
    text: "Set the goals you're believing for this year.",
  },
  {
    href: "/quiz",
    icon: "🃏",
    title: "Bible Quiz",
    text: "Flip cards and test your Bible knowledge.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
          Be inspired today
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          A gentle place to find encouragement — receive a verse, reflect,
          pray, and keep believing.
        </p>
      </section>

      <DailyQuote />
      <VerseFinder />

      <section className="grid gap-4 sm:grid-cols-3">
        {featureCards.map(({ href, icon, title, text }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-3xl border border-border-soft bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-3xl">{icon}</span>
            <h3 className="mt-3 font-serif text-lg font-semibold group-hover:text-primary">
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
