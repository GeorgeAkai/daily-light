import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  Body,
  Chip,
  MutedText,
  Screen,
  SerifText,
  Subtitle,
} from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { useAppTheme } from "@/lib/theme-context";
import { shuffleCards, triviaCards, type TriviaCard } from "@/lib/trivia";

type Filter = "all" | "easy" | "medium" | "hard";

function FlipCard({ card }: { card: TriviaCard }) {
  const { colors } = useAppTheme();
  const [flipped, setFlipped] = useState(false);

  return (
    <Pressable
      onPress={() => setFlipped((f) => !f)}
      accessibilityLabel={flipped ? "Hide answer" : "Reveal answer"}
      style={[
        styles.card,
        flipped
          ? { backgroundColor: colors.primary, borderColor: colors.primary }
          : { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {flipped ? (
        <>
          <Text style={[styles.cardLabel, { color: colors.onPrimary }]}>
            ANSWER
          </Text>
          <Body style={{ color: colors.onPrimary, flex: 1 }}>
            {card.answer}
          </Body>
          <Text style={[styles.cardHint, { color: colors.onPrimary }]}>
            Tap to flip back ↻
          </Text>
        </>
      ) : (
        <>
          <View
            style={[
              styles.difficultyTag,
              {
                backgroundColor:
                  card.difficulty === "easy"
                    ? colors.sageSoft
                    : card.difficulty === "medium"
                      ? colors.accentSoft
                      : colors.primarySoft,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color:
                  card.difficulty === "easy"
                    ? colors.sage
                    : card.difficulty === "medium"
                      ? colors.accent
                      : colors.primary,
              }}
            >
              {card.difficulty}
            </Text>
          </View>
          <SerifText style={{ flex: 1, fontSize: 16 }}>
            {card.question}
          </SerifText>
          <MutedText>Tap to reveal ↻</MutedText>
        </>
      )}
    </Pressable>
  );
}

export default function TriviaScreen() {
  const [cards, setCards] = useState<TriviaCard[]>(triviaCards);
  const [filter, setFilter] = useState<Filter>("all");
  const [shuffleKey, setShuffleKey] = useState(0);

  const visible = cards.filter(
    (c) => filter === "all" || c.difficulty === filter
  );

  const reshuffle = () => {
    setCards(shuffleCards(triviaCards));
    setShuffleKey((k) => k + 1);
  };

  return (
    <Screen>
      <Subtitle>
        Flip a card to reveal the answer. A relaxed way to learn, no scores
        and no pressure.
      </Subtitle>

      <View style={styles.filterRow}>
        {(["all", "easy", "medium", "hard"] as Filter[]).map((f) => (
          <Chip
            key={f}
            label={f === "all" ? "All questions" : f}
            active={filter === f}
            onPress={() => setFilter(f)}
          />
        ))}
        <Chip label="🔀 Shuffle" active={false} onPress={reshuffle} />
      </View>

      <View style={styles.grid} key={shuffleKey}>
        {visible.map((card) => (
          <FlipCard key={card.question} card={card} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Spacing.two,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
    justifyContent: "center",
  },
  card: {
    width: 300,
    minHeight: 190,
    maxWidth: "100%",
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    opacity: 0.8,
  },
  cardHint: { fontSize: 12, opacity: 0.8 },
  difficultyTag: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
