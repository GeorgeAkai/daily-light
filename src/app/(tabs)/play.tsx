import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  Body,
  BrandMark,
  MutedText,
  Screen,
  SerifText,
  Subtitle,
  Title,
} from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { inviteFriends } from "@/lib/share";
import { useAppTheme } from "@/lib/theme-context";

export default function PlayScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  return (
    <Screen>
      <BrandMark />
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
        <Body>50 levels, from simple to seasoned scholar.</Body>
        <MutedText>Score 100% on a level to earn a certificate.</MutedText>
      </Pressable>

      <View style={styles.smallRow}>
        <Pressable
          onPress={inviteFriends}
          style={({ pressed }) => [
            styles.smallCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={styles.smallIcon}>📤</Text>
          <Body style={{ fontWeight: "600" }}>Invite Friends</Body>
          <MutedText style={{ textAlign: "center" }}>
            Share Daily Promise with someone.
          </MutedText>
        </Pressable>
        <Pressable
          onPress={() => router.push("/about")}
          style={({ pressed }) => [
            styles.smallCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={styles.smallIcon}>👨🏾‍💻</Text>
          <Body style={{ fontWeight: "600" }}>About</Body>
          <MutedText style={{ textAlign: "center" }}>
            Meet the developer.
          </MutedText>
        </Pressable>
      </View>
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
  smallRow: { flexDirection: "row", gap: Spacing.three },
  smallCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.one,
    alignItems: "center",
  },
  smallIcon: { fontSize: 28 },
});
