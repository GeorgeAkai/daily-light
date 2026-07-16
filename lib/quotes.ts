import { verses, type Verse } from "./verses";

export interface DailyQuote {
  quote: string;
  verse: Verse;
}

const motivationalQuotes: string[] = [
  "Every sunrise is a fresh page. Write something beautiful on it today.",
  "Faith doesn't make things easy; it makes them possible.",
  "You were planted, not buried. Keep growing.",
  "Small steps of faith today become giant leaps of testimony tomorrow.",
  "God's timing is never early and never late. It is always perfect.",
  "Let your worries be watered down by gratitude.",
  "You are one prayer away from a changed perspective.",
  "The mountain ahead of you is a testimony waiting to be told.",
  "Grace means you don't have to carry today alone.",
  "Bloom with patience, for even the lily takes its season.",
  "What God has planned for you cannot be cancelled by a bad day.",
  "Courage is fear that has said its prayers.",
  "Your current chapter is not your whole story.",
  "Be still long enough to hear hope whisper.",
  "Kindness is a seed that never returns empty.",
  "When you can't trace God's hand, trust His heart.",
  "Today's obedience is tomorrow's open door.",
  "Light doesn't argue with darkness. It simply shines.",
  "A grateful heart turns what you have into enough.",
  "Storms don't last; well-anchored souls do.",
  "You don't need to see the whole staircase. Just take the first step.",
  "Peace is not the absence of trouble but the presence of God.",
  "Start where you are. Use what you have. Trust who He is.",
  "Broken crayons still color, and your story still matters.",
  "Waiting seasons are growing seasons.",
  "Speak to yourself the way God speaks about you.",
  "Hope is the heartbeat of the soul.",
  "Yesterday's failures are today's fertilizer for growth.",
  "God can restore what the years have taken.",
  "Do not despise small beginnings, for mustard seeds move mountains.",
  "Joy is the flag flown from the heart when the King is in residence.",
];

/**
 * Day-of-year based selection so everyone sees the same quote on the
 * same day, and it changes every day.
 */
export function dayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function quoteOfTheDay(date: Date = new Date()): DailyQuote {
  const day = dayOfYear(date);
  return {
    quote: motivationalQuotes[day % motivationalQuotes.length],
    verse: verses[day % verses.length],
  };
}
