import { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts, MaxContentWidth, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/lib/theme-context";

/** Scrollable themed page wrapper used by every screen. */
export function Screen({ children }: { children: ReactNode }) {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function Title({ children }: { children: ReactNode }) {
  const { colors } = useAppTheme();
  return (
    <Text style={[styles.title, { color: colors.text }]}>{children}</Text>
  );
}

export function Subtitle({ children }: { children: ReactNode }) {
  const { colors } = useAppTheme();
  return (
    <Text style={[styles.subtitle, { color: colors.muted }]}>{children}</Text>
  );
}

export function Card({
  children,
  soft,
  style,
}: {
  children: ReactNode;
  soft?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: soft ? colors.cardSoft : colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Body({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  const { colors } = useAppTheme();
  return (
    <Text style={[styles.body, { color: colors.text }, style]}>{children}</Text>
  );
}

export function MutedText({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  const { colors } = useAppTheme();
  return (
    <Text style={[styles.muted, { color: colors.muted }, style]}>
      {children}
    </Text>
  );
}

export function SerifText({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  const { colors } = useAppTheme();
  return (
    <Text style={[styles.serif, { color: colors.text }, style]}>
      {children}
    </Text>
  );
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryButton,
        {
          backgroundColor: colors.primary,
          opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? colors.primary : colors.cardSoft,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          { color: active ? colors.onPrimary : colors.muted },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** Verse blockquote with theme tag and reference. */
export function VerseBlock({
  text,
  reference,
  theme,
}: {
  text: string;
  reference: string;
  theme?: string;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.verseBlock, { backgroundColor: colors.primarySoft }]}>
      {theme ? (
        <View style={[styles.themeTag, { backgroundColor: colors.card }]}>
          <Text style={[styles.themeTagText, { color: colors.primary }]}>
            {theme}
          </Text>
        </View>
      ) : null}
      <SerifText style={styles.verseText}>“{text}”</SerifText>
      <Text style={[styles.verseRef, { color: colors.primary }]}>
        {reference}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: Spacing.six },
  inner: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    fontFamily: Fonts?.serif,
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: Spacing.two,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  body: { fontSize: 15, lineHeight: 22 },
  muted: { fontSize: 13, lineHeight: 19 },
  serif: { fontFamily: Fonts?.serif, fontSize: 18, lineHeight: 27 },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: Spacing.five,
    alignItems: "center",
  },
  primaryButtonText: { fontSize: 16, fontWeight: "600" },
  chip: {
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  chipText: { fontSize: 14, fontWeight: "500" },
  verseBlock: {
    borderRadius: 18,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  themeTag: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  themeTagText: { fontSize: 12, fontWeight: "600" },
  verseText: { marginTop: Spacing.one },
  verseRef: { fontSize: 14, fontWeight: "600" },
});
