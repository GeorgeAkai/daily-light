import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Body,
  Card,
  MutedText,
  PrimaryButton,
  Screen,
  Subtitle,
  Title,
} from "@/components/ui";
import { Fonts, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/lib/theme-context";
import { useStoredState } from "@/lib/use-stored-state";

interface Goal {
  id: string;
  text: string;
  achieved: boolean;
  createdAt: string;
}

const STORAGE_KEY = "daily-light-goals";
const NO_GOALS: Goal[] = [];
const MAX_GOAL_LENGTH = 300;

const isGoalList = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (g) =>
      g &&
      typeof g === "object" &&
      typeof (g as Goal).id === "string" &&
      typeof (g as Goal).text === "string" &&
      typeof (g as Goal).achieved === "boolean"
  );

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function GoalsScreen() {
  const { colors } = useAppTheme();
  const [goals, setGoals, hydrated] = useStoredState<Goal[]>(
    STORAGE_KEY,
    NO_GOALS,
    isGoalList
  );
  const [text, setText] = useState("");
  const year = new Date().getFullYear();

  const addGoal = () => {
    if (!text.trim()) return;
    const goal: Goal = {
      id: newId(),
      text: text.trim().slice(0, MAX_GOAL_LENGTH),
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
    <Screen>
      <View>
        <Title>Goals for {year} 🎯</Title>
        <Subtitle>
          “Commit your deeds to Yahweh, and your plans shall succeed.”
          (Proverbs 16:3)
        </Subtitle>
      </View>

      {goals.length > 0 && (
        <Card>
          <View style={styles.progressHeader}>
            <Body style={{ fontWeight: "600" }}>
              {achievedCount} of {goals.length} achieved 🎉
            </Body>
            <MutedText>
              {Math.round((achievedCount / goals.length) * 100)}%
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
                  width: `${(achievedCount / goals.length) * 100}%`,
                },
              ]}
            />
          </View>
        </Card>
      )}

      <Card>
        <TextInput
          value={text}
          onChangeText={setText}
          maxLength={MAX_GOAL_LENGTH}
          placeholder="I am believing for…"
          placeholderTextColor={colors.muted}
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.text,
              fontFamily: Fonts?.sans,
            },
          ]}
        />
        <PrimaryButton
          label="Add Goal"
          onPress={addGoal}
          disabled={!text.trim()}
        />
      </Card>

      {hydrated && goals.length === 0 && (
        <MutedText style={{ textAlign: "center" }}>
          No goals yet. Write down what you&apos;re believing for this
          year. 🌱
        </MutedText>
      )}

      {goals.map((goal) => (
        <Pressable
          key={goal.id}
          onPress={() => toggleGoal(goal.id)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: goal.achieved }}
          style={[
            styles.goal,
            {
              backgroundColor: goal.achieved ? colors.sageSoft : colors.card,
              borderColor: goal.achieved ? colors.sage : colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor: goal.achieved ? colors.sage : colors.muted,
                backgroundColor: goal.achieved ? colors.sage : "transparent",
              },
            ]}
          >
            {goal.achieved && (
              <Text style={{ color: "#ffffff", fontSize: 13 }}>✓</Text>
            )}
          </View>
          <Body
            style={{
              flex: 1,
              textDecorationLine: goal.achieved ? "line-through" : "none",
              color: goal.achieved ? colors.muted : colors.text,
            }}
          >
            {goal.text}
          </Body>
          <Pressable
            onPress={() => removeGoal(goal.id)}
            accessibilityLabel="Delete goal"
            hitSlop={8}
          >
            <Text style={{ color: colors.muted, fontSize: 13 }}>✕</Text>
          </Pressable>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: Spacing.two,
  },
  progressFill: { height: "100%", borderRadius: 999 },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: Spacing.two,
  },
  goal: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    borderRadius: 18,
    borderWidth: 1,
    padding: Spacing.four,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
