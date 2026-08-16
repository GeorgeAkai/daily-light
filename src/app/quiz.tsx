import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import {
  Body,
  Card,
  MutedText,
  PrimaryButton,
  Screen,
  SerifText,
  Subtitle,
} from "@/components/ui";
import { Fonts, Spacing } from "@/constants/theme";
import { EMPTY_PROFILE, isProfile, PROFILE_STORAGE_KEY, type Profile } from "@/lib/profile";
import {
  buildLevelRound,
  encouragementFor,
  levelMix,
  PASS_SCORE,
  QUESTIONS_PER_LEVEL,
  TOTAL_LEVELS,
  type QuizQuestion,
} from "@/lib/quizQuestions";
import { shareCertificatePdf } from "@/lib/certificate";
import { inviteFriends } from "@/lib/share";
import { useAppTheme } from "@/lib/theme-context";
import { useStoredState } from "@/lib/use-stored-state";

type Stage = "map" | "playing" | "results";

interface LevelRecord {
  best: number;
  completedAt: string;
}
type Progress = Record<string, LevelRecord>;

const PROGRESS_KEY = "daily-light-quiz-progress";
const NO_PROGRESS: Progress = {};

const isProgress = (value: unknown): boolean =>
  !!value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.values(value as Record<string, unknown>).every(
    (r) =>
      !!r &&
      typeof r === "object" &&
      typeof (r as LevelRecord).best === "number"
  );

function levelLabel(level: number): string {
  const mix = levelMix(level);
  if (mix.hard === QUESTIONS_PER_LEVEL) return "hard";
  if (mix.easy === QUESTIONS_PER_LEVEL) return "easy";
  if (mix.hard >= 5) return "hard mix";
  if (mix.easy >= 5) return "gentle mix";
  return "mixed";
}

export default function QuizScreen() {
  const { colors } = useAppTheme();
  const [progress, setProgress, hydrated] = useStoredState<Progress>(
    PROGRESS_KEY,
    NO_PROGRESS,
    isProgress
  );
  const [profile] = useStoredState<Profile>(
    PROFILE_STORAGE_KEY,
    EMPTY_PROFILE,
    isProfile
  );

  const [stage, setStage] = useState<Stage>("map");
  const [level, setLevel] = useState(1);
  const [round, setRound] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const completedCount = Object.keys(progress).filter(
    (key) => progress[key].best >= PASS_SCORE
  ).length;

  const isUnlocked = (n: number) =>
    n === 1 || (progress[String(n - 1)]?.best ?? 0) >= PASS_SCORE;

  const startLevel = (n: number) => {
    setLevel(n);
    setRound(buildLevelRound(n));
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
      // `score` already includes this question; choose() updated it.
      const finalScore = score;
      setProgress((prev) => {
        const record = prev[String(level)];
        if (!record || finalScore > record.best) {
          return {
            ...prev,
            [String(level)]: {
              best: finalScore,
              completedAt: new Date().toISOString(),
            },
          };
        }
        return prev;
      });
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

  // ----- Level map (the journey timeline) -----
  if (stage === "map") {
    return (
      <Screen>
        <Subtitle>
          Your journey through {TOTAL_LEVELS} levels. Level 1 starts
          simple; each level gets a little harder. Score{" "}
          {PASS_SCORE}/{QUESTIONS_PER_LEVEL} to unlock the next, and score a
          perfect {QUESTIONS_PER_LEVEL}/{QUESTIONS_PER_LEVEL} to earn a
          certificate. 🏆
        </Subtitle>

        <Card>
          <View style={styles.progressHeader}>
            <Body style={{ fontWeight: "600" }}>
              {completedCount} of {TOTAL_LEVELS} levels completed
            </Body>
            <MutedText>
              {Math.round((completedCount / TOTAL_LEVELS) * 100)}%
            </MutedText>
          </View>
          <View
            style={[styles.progressTrack, { backgroundColor: colors.cardSoft }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.sage,
                  width: `${(completedCount / TOTAL_LEVELS) * 100}%`,
                },
              ]}
            />
          </View>
          <View style={{ marginTop: Spacing.two }}>
            <PrimaryButton label="📤 Invite Friends" onPress={inviteFriends} />
          </View>
        </Card>

        {hydrated &&
          Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1).map((n) => {
            const unlocked = isUnlocked(n);
            const record = progress[String(n)];
            const perfect = record?.best === QUESTIONS_PER_LEVEL;
            const passed = (record?.best ?? 0) >= PASS_SCORE;
            return (
              <View key={n} style={styles.timelineRow}>
                <View style={styles.timelineRail}>
                  <View
                    style={[
                      styles.timelineNode,
                      {
                        backgroundColor: perfect
                          ? colors.primary
                          : passed
                            ? colors.sage
                            : unlocked
                              ? colors.card
                              : colors.cardSoft,
                        borderColor: unlocked ? colors.border : colors.cardSoft,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 15 }}>
                      {perfect ? "🏆" : passed ? "✓" : unlocked ? n : "🔒"}
                    </Text>
                  </View>
                  {n < TOTAL_LEVELS && (
                    <View
                      style={[
                        styles.timelineLine,
                        {
                          backgroundColor: passed
                            ? colors.sage
                            : colors.cardSoft,
                        },
                      ]}
                    />
                  )}
                </View>
                <Pressable
                  disabled={!unlocked}
                  onPress={() => startLevel(n)}
                  style={({ pressed }) => [
                    styles.levelCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: perfect ? colors.primary : colors.border,
                      opacity: unlocked ? (pressed ? 0.9 : 1) : 0.45,
                    },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Body style={{ fontWeight: "600" }}>
                      Level {n}
                      {perfect ? "  ·  Certificate earned" : ""}
                    </Body>
                    <MutedText>
                      {levelLabel(n)}
                      {record
                        ? ` · best ${record.best}/${QUESTIONS_PER_LEVEL}`
                        : unlocked
                          ? " · not attempted"
                          : " · locked"}
                    </MutedText>
                  </View>
                  {unlocked && (
                    <Text style={{ color: colors.primary, fontSize: 16 }}>
                      {passed ? "↻" : "▶"}
                    </Text>
                  )}
                </Pressable>
              </View>
            );
          })}
      </Screen>
    );
  }

  // ----- Playing a level -----
  if (stage === "playing" && question) {
    return (
      <Screen>
        <Card>
          <View style={styles.quizHeader}>
            <MutedText style={{ fontWeight: "600" }}>
              Level {level} · Question {current + 1} of {round.length}
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
      </Screen>
    );
  }

  // ----- Results -----
  const perfect = score === QUESTIONS_PER_LEVEL;
  const passed = score >= PASS_SCORE;
  const encouragement = encouragementFor(score, QUESTIONS_PER_LEVEL);
  const displayName = profile.name.trim() || "A Faithful Student";

  return (
    <Screen>
      {perfect ? (
        <Certificate name={displayName} level={level} />
      ) : (
        <Card style={styles.centered}>
          <Text style={styles.bigEmoji}>{passed ? "🌟" : "🌱"}</Text>
          <SerifText style={styles.stageTitle}>
            {encouragement.title}
          </SerifText>
          <SerifText style={[styles.score, { color: colors.primary }]}>
            {score} / {QUESTIONS_PER_LEVEL}
          </SerifText>
          <Body style={{ textAlign: "center" }}>{encouragement.message}</Body>
          <View
            style={[styles.verseBox, { backgroundColor: colors.primarySoft }]}
          >
            <Body style={{ textAlign: "center" }}>{encouragement.verse}</Body>
          </View>
          <Body style={{ textAlign: "center", fontWeight: "600" }}>
            {passed
              ? level < TOTAL_LEVELS
                ? `Level ${level} passed! Level ${level + 1} is unlocked. 🎉`
                : "You have completed the final level! 🎉"
              : `Score ${PASS_SCORE}/${QUESTIONS_PER_LEVEL} or better to unlock the next level. You're close!`}
          </Body>
        </Card>
      )}

      <View style={styles.resultButtons}>
        {perfect && (
          <PrimaryButton
            label="📄 Share Certificate (PDF)"
            onPress={() => shareCertificatePdf(displayName, level)}
          />
        )}
        {passed && level < TOTAL_LEVELS && (
          <PrimaryButton
            label={`Continue to Level ${level + 1} →`}
            onPress={() => startLevel(level + 1)}
          />
        )}
        {!perfect && (
          <PrimaryButton
            label={`Retry Level ${level}`}
            onPress={() => startLevel(level)}
          />
        )}
        <Pressable
          onPress={() => setStage("map")}
          style={[styles.mapButton, { backgroundColor: colors.cardSoft }]}
        >
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            🗺 Back to the Level Map
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

/** Stylized certificate for a perfect score. */
function Certificate({ name, level }: { name: string; level: number }) {
  const { colors } = useAppTheme();
  const date = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <View
      style={[
        styles.certOuter,
        { borderColor: colors.primary, backgroundColor: colors.card },
      ]}
    >
      <View style={[styles.certInner, { borderColor: colors.border }]}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.certLogo}
          accessibilityLabel="Daily Promise logo"
        />
        <Text style={[styles.certHeading, { color: colors.primary }]}>
          ✦ CERTIFICATE OF EXCELLENCE ✦
        </Text>
        <MutedText>Daily Promise Bible Quiz</MutedText>
        <Text
          style={[
            styles.certName,
            { color: colors.text, fontFamily: Fonts?.serif },
          ]}
        >
          {name}
        </Text>
        <View style={[styles.certRule, { backgroundColor: colors.primary }]} />
        <Body style={{ textAlign: "center" }}>
          answered every question correctly on{" "}
          <Body style={{ fontWeight: "700" }}>Level {level}</Body>, earning a
          perfect score of {QUESTIONS_PER_LEVEL}/{QUESTIONS_PER_LEVEL}. 🏆
        </Body>
        <View
          style={[styles.certVerse, { backgroundColor: colors.primarySoft }]}
        >
          <SerifText style={{ textAlign: "center", fontSize: 15 }}>
            “Give diligence to present yourself approved by God, a workman
            who doesn&apos;t need to be ashamed, properly handling the Word
            of Truth.”
          </SerifText>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "600",
              textAlign: "center",
              marginTop: 6,
            }}
          >
            2 Timothy 2:15
          </Text>
        </View>
        <MutedText>{date}</MutedText>
      </View>
    </View>
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
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  difficultyTag: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  timelineRow: {
    flexDirection: "row",
    gap: Spacing.three,
    marginVertical: -Spacing.two,
  },
  timelineRail: { alignItems: "center", width: 40 },
  timelineNode: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineLine: { width: 3, flex: 1, minHeight: 22 },
  levelCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    borderRadius: 18,
    borderWidth: 1,
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  resultButtons: { gap: Spacing.two },
  mapButton: {
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
  },
  certOuter: {
    borderWidth: 3,
    borderRadius: 24,
    padding: 6,
  },
  certInner: {
    borderWidth: 1,
    borderRadius: 18,
    padding: Spacing.four,
    alignItems: "center",
    gap: Spacing.two,
  },
  certLogo: { width: 56, height: 56, borderRadius: 999 },
  certHeading: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  certName: { fontSize: 30, fontWeight: "700", textAlign: "center" },
  certRule: { height: 2, width: 120, borderRadius: 2 },
  certVerse: {
    borderRadius: 16,
    padding: Spacing.three,
    alignSelf: "stretch",
  },
});
