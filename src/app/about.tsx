import { Image, Linking, Pressable, StyleSheet, Text } from "react-native";

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
import { inviteFriends } from "@/lib/share";
import { useAppTheme } from "@/lib/theme-context";

const LINKEDIN_URL = "https://www.linkedin.com/in/georgeakai";

export default function AboutScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <Card style={styles.centered}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          accessibilityLabel="Daily Promise logo"
        />
        <SerifText style={styles.appName}>Daily Promise</SerifText>
        <Subtitle>
          A gentle place to find encouragement: receive a verse, reflect,
          pray, set goals, and grow in the Word.
        </Subtitle>
      </Card>

      <Card style={styles.centered}>
        <Text style={styles.wave}>👨🏾‍💻</Text>
        <SerifText style={styles.devName}>George Akai</SerifText>
        <MutedText>Developer</MutedText>
        <Body style={{ textAlign: "center" }}>
          Daily Promise was built to inspire people every day and bring the
          encouragement of Scripture into everyday moments.
        </Body>
        <Pressable
          onPress={() => Linking.openURL(LINKEDIN_URL)}
          accessibilityRole="link"
          style={[styles.linkedinButton, { backgroundColor: "#0a66c2" }]}
        >
          <Text style={styles.linkedinText}>in  Connect on LinkedIn</Text>
        </Pressable>
        <MutedText>linkedin.com/in/georgeakai</MutedText>
      </Card>

      <Card style={styles.centered}>
        <SerifText style={{ fontSize: 18, fontWeight: "600" }}>
          Enjoying Daily Promise? 🌿
        </SerifText>
        <Body style={{ textAlign: "center" }}>
          Share it with someone who could use a little encouragement today.
        </Body>
        <PrimaryButton label="📤 Invite Friends" onPress={inviteFriends} />
      </Card>

      <MutedText style={{ textAlign: "center", color: colors.muted }}>
        Verse text from the World English Bible, a public domain
        translation. Made with 💛 to inspire.
      </MutedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: { alignItems: "center", gap: Spacing.two },
  logo: { width: 84, height: 84, borderRadius: 999 },
  appName: { fontSize: 24, fontWeight: "600" },
  wave: { fontSize: 40 },
  devName: { fontSize: 22, fontWeight: "600" },
  linkedinButton: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: Spacing.five,
    marginTop: Spacing.two,
  },
  linkedinText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
});
