import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  Body,
  MutedText,
  Screen,
  SerifText,
  Subtitle,
  Title,
} from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { useAppTheme } from "@/lib/theme-context";

export default function PlayScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  return (
    <Screen>
      <View>
        <Title>Play & Learn 🎮</Title>
        <Subtitle>
          Two gentle ways to grow in the Word: relaxed flip cards, or a
          scored quiz challenge.
        </Subtitle>
      </View>

      <Pressable
        onPress={() => router.push("/trivia")}
        style={({ pressed }) => [
          styles.bigCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text style={styles.bigIcon}>🃏</Text>
        <SerifText style={styles.bigTitle}>Trivia</SerifText>
        <Body>Flip cards to reveal answers at your own pace.</Body>
        <MutedText>No scores, no pressure. Just learning.</MutedText>
      </Pressable>

      <Pressable
        onPress={() => router.push("/quiz")}
        style={({ pressed }) => [
          styles.bigCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text style={styles.bigIcon}>🏆</Text>
        <SerifText style={styles.bigTitle}>Bible Quiz</SerifText>
        <Body>Ten random questions: easy, medium, and hard.</Body>
        <MutedText>Get a score and a word of encouragement.</MutedText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.five,
    gap: Spacing.two,
    alignItems: "center",
  },
  bigIcon: { fontSize: 44 },
  bigTitle: { fontSize: 22, fontWeight: "600" },
});
