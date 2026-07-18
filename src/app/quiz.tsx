import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  Body,
  Card,
  MutedText,
  PrimaryButton,
  Screen,
  SerifText,
  Subtitle,
} from "@/components/ui";
import { Spacing } from "@/constants/theme";
import {
  buildQuizRound,
  encouragementFor,
  type QuizQuestion,
} from "@/lib/quizQuestions";
import { useAppTheme } from "@/lib/theme-context";

type Stage = "start" | "playing" | "results";

export default function QuizScreen() {
  const { colors } = useAppTheme();
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

  const difficultyColors = {
    easy: { bg: colors.sageSoft, fg: colors.sage },
    medium: { bg: colors.accentSoft, fg: colors.accent },
    hard: { bg: colors.primarySoft, fg: colors.primary },
  } as const;

  return (
    <Screen>
      {stage === "start" && (
        <Card style={styles.centered}>
          <Text style={styles.bigEmoji}>📖</Text>
          <SerifText style={styles.stageTitle}>Ready when you are</SerifText>
          <Subtitle>
            You&apos;ll get 4 easy, 3 medium, and 3 hard questions, drawn at
            random from a pool of 50. Take your time; this is about growing,
            not grades.
          </Subtitle>
          <View
            style={[styles.verseBox, { backgroundColor: colors.primarySoft }]}
          >
            <Body style={{ textAlign: "center" }}>
              “I can do all things through Christ who strengthens me.”
            </Body>
            <Text
              style={[
                styles.verseRef,
                { color: colors.primary, textAlign: "center" },
              ]}
            >
              Philippians 4:13
            </Text>
          </View>
          <PrimaryButton label="Start Quiz" onPress={startQuiz} />
        </Card>
      )}

      {stage === "playing" && question && (
        <Card>
          <View style={styles.quizHeader}>
            <MutedText style={{ fontWeight: "600" }}>
              Question {current + 1} of {round.length}
            </MutedText>
            <View
              style={[
                styles.difficultyTag,
                { backgroundColor: difficultyColors[question.difficulty].bg },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: difficultyColors[question.difficulty].fg,
                }}
              >
                {question.difficulty}
              </Text>
            </View>
          </View>

          <View
            style={[styles.progressTrack, { backgroundColor: colors.cardSoft }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${((current + 1) / round.length) * 100}%`,
                },
              ]}
            />
          </View>

          <SerifText style={{ fontSize: 19, marginVertical: Spacing.two }}>
            {question.question}
          </SerifText>

          <View style={{ gap: Spacing.two }}>
            {question.options.map((option, i) => {
              let bg = colors.background;
              let border = colors.border;
              let dim = false;
              if (answered) {
                if (i === question.answerIndex) {
                  bg = colors.sageSoft;
                  border = colors.sage;
                } else if (i === selected) {
                  bg = colors.accentSoft;
                  border = colors.accent;
                } else {
                  dim = true;
                }
              }
              return (
                <Pressable
                  key={option}
                  onPress={() => choose(i)}
                  disabled={answered}
                  style={[
                    styles.option,
                    {
                      backgroundColor: bg,
                      borderColor: border,
                      opacity: dim ? 0.55 : 1,
                    },
                  ]}
                >
                  <Body>
                    {option}
                    {answered && i === question.answerIndex && "  ✓"}
                    {answered &&
                      i === selected &&
                      i !== question.answerIndex &&
                      "  ✗"}
                  </Body>
                </Pressable>
              );
            })}
          </View>

          {answered && (
            <View style={styles.feedbackRow}>
              <MutedText style={{ flex: 1 }}>
                {selected === question.answerIndex
                  ? "Wonderful, that's right! 🎉"
                  : "Good try! Now you know it for next time. 💜"}
              </MutedText>
              <PrimaryButton
                label={current + 1 >= round.length ? "See Results" : "Next"}
                onPress={next}
              />
            </View>
          )}
        </Card>
      )}

      {stage === "results" && (
        <ResultsCard score={score} total={round.length} onRetry={startQuiz} />
      )}
    </Screen>
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
  const { colors } = useAppTheme();
  const encouragement = encouragementFor(score, total);
  return (
    <Card style={styles.centered}>
      <Text style={styles.bigEmoji}>
        {score / total >= 0.6 ? "🌟" : "🌱"}
      </Text>
      <SerifText style={styles.stageTitle}>{encouragement.title}</SerifText>
      <SerifText style={[styles.score, { color: colors.primary }]}>
        {score} / {total}
      </SerifText>
      <Body style={{ textAlign: "center" }}>{encouragement.message}</Body>
      <View style={[styles.verseBox, { backgroundColor: colors.primarySoft }]}>
        <Body style={{ textAlign: "center" }}>{encouragement.verse}</Body>
      </View>
      <PrimaryButton label="Play Again" onPress={onRetry} />
    </Card>
  );
}

const styles = StyleSheet.create({
  centered: { alignItems: "center", gap: Spacing.three },
  bigEmoji: { fontSize: 44 },
  stageTitle: { fontSize: 22, fontWeight: "600", textAlign: "center" },
  verseBox: {
    borderRadius: 16,
    padding: Spacing.three,
    alignSelf: "stretch",
    gap: Spacing.one,
  },
  verseRef: { fontSize: 14, fontWeight: "600" },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  difficultyTag: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: Spacing.two,
  },
  progressFill: { height: "100%", borderRadius: 999 },
  option: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: Spacing.three,
  },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    marginTop: Spacing.two,
    flexWrap: "wrap",
  },
  score: { fontSize: 40, fontWeight: "700" },
});
