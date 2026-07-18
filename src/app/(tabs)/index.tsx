import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Body,
  Card,
  Chip,
  MutedText,
  PrimaryButton,
  Screen,
  SerifText,
  Subtitle,
  Title,
  VerseBlock,
} from "@/components/ui";
import { Fonts, Spacing } from "@/constants/theme";
import {
  EMPTY_PROFILE,
  isProfile,
  PROFILE_STORAGE_KEY,
  type Profile,
} from "@/lib/profile";
import { quoteOfTheDay } from "@/lib/quotes";
import { useAppTheme } from "@/lib/theme-context";
import { useStoredState } from "@/lib/use-stored-state";
import {
  randomVerseForWord,
  verseForInput,
  type Verse,
} from "@/lib/verses";

type Mode = "number" | "birthday" | "word";

const modeOptions: { id: Mode; label: string }[] = [
  { id: "number", label: "🔢 A Number" },
  { id: "birthday", label: "🎂 My Birthday" },
  { id: "word", label: "💭 A Word" },
];

const placeholders: Record<Mode, string> = {
  number: "Enter any number, e.g. 7 or 2026",
  birthday: "Enter your birthday, e.g. 15 May",
  word: "Enter a word, e.g. hope, love, peace",
};

export default function HomeScreen() {
  const { colors, mode: themeMode, toggle } = useAppTheme();
  const router = useRouter();
  const [profile] = useStoredState<Profile>(
    PROFILE_STORAGE_KEY,
    EMPTY_PROFILE,
    isProfile
  );
  const firstName = profile.name.trim().split(/\s+/)[0];

  const daily = useMemo(() => quoteOfTheDay(), []);
  const dateLabel = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const [mode, setMode] = useState<Mode>("word");
  const [input, setInput] = useState("");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [searchedWord, setSearchedWord] = useState("");

  const revealWordVerse = (previous: Verse | null) => {
    const word = input.trim();
    const match = randomVerseForWord(word, previous);
    if (match) {
      setVerse(match.verse);
      setMatchCount(match.matchCount);
    } else {
      setVerse(verseForInput(`word:${word}`));
      setMatchCount(0);
    }
    setSearchedWord(word);
  };

  const findVerse = () => {
    if (!input.trim()) return;
    if (mode === "word") {
      revealWordVerse(null);
      return;
    }
    setVerse(verseForInput(`${mode}:${input}`));
    setMatchCount(null);
    setSearchedWord("");
  };

  return (
    <Screen>
      <View>
        <View style={styles.topRow}>
          <View style={styles.brandRow}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              accessibilityLabel="Daily Promise logo"
            />
            <SerifText style={{ color: colors.primary, fontWeight: "600" }}>
              Daily Promise
            </SerifText>
          </View>
          <Pressable
            onPress={toggle}
            accessibilityLabel="Toggle light or dark mode"
            style={[
              styles.themeButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={{ fontSize: 18 }}>
              {themeMode === "dark" ? "🌙" : "☀️"}
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => router.push("/profile")}
          accessibilityLabel="Open my profile"
          style={styles.avatarWrap}
        >
          {profile.photo ? (
            <Image
              source={{ uri: profile.photo }}
              style={[styles.avatar, { borderColor: colors.primary }]}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarPlaceholder,
                {
                  borderColor: colors.primarySoft,
                  backgroundColor: colors.cardSoft,
                },
              ]}
            >
              <Text style={{ fontSize: 44 }}>🙂</Text>
            </View>
          )}
        </Pressable>
        <Title>
          {firstName ? `Be inspired, ${firstName}` : "Be inspired today"}
        </Title>
        <Subtitle>
          A gentle place to find encouragement. Receive a verse, reflect,
          pray, and keep believing.
        </Subtitle>
      </View>

      <Card soft>
        <View style={styles.cardHeader}>
          <SerifText style={styles.cardTitle}>
            Today&apos;s inspiration 🌅
          </SerifText>
          <MutedText>{dateLabel}</MutedText>
        </View>
        <SerifText style={styles.dailyQuote}>“{daily.quote}”</SerifText>
        <VerseBlock text={daily.verse.text} reference={daily.verse.reference} />
      </Card>

      <Card>
        <SerifText style={styles.cardTitle}>Find your verse ✨</SerifText>
        <MutedText>
          Share a number, your birthday, or a word on your heart and receive
          a verse to carry with you.
        </MutedText>

        <View style={styles.chipRow}>
          {modeOptions.map(({ id, label }) => (
            <Chip
              key={id}
              label={label}
              active={mode === id}
              onPress={() => {
                setMode(id);
                setInput("");
              }}
            />
          ))}
        </View>

        <TextInput
          value={input}
          onChangeText={setInput}
          maxLength={100}
          placeholder={placeholders[mode]}
          placeholderTextColor={colors.muted}
          keyboardType={mode === "number" ? "number-pad" : "default"}
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
          label="Reveal Verse"
          onPress={findVerse}
          disabled={!input.trim()}
        />

        {verse && (
          <View style={{ gap: Spacing.two }}>
            <VerseBlock
              text={verse.text}
              reference={verse.reference}
              theme={verse.theme}
            />
            {matchCount !== null && (
              <View style={styles.matchRow}>
                <MutedText style={{ flex: 1 }}>
                  {matchCount > 0
                    ? `One of ${matchCount} verse${
                        matchCount === 1 ? "" : "s"
                      } speaking of “${searchedWord}”`
                    : `No verse mentions “${searchedWord}”, so here is one chosen just for it`}
                </MutedText>
                {matchCount > 1 && (
                  <Pressable
                    onPress={() => revealWordVerse(verse)}
                    style={[
                      styles.anotherButton,
                      { backgroundColor: colors.cardSoft },
                    ]}
                  >
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      🔄 Show another
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        )}
      </Card>

      <Body style={{ textAlign: "center" }}>
        💜 “Your word is a lamp to my feet” (Psalm 119:105)
      </Body>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.three,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 999,
  },
  themeButton: {
    borderRadius: 999,
    borderWidth: 1,
    padding: 8,
  },
  avatarWrap: {
    alignSelf: "center",
    marginBottom: Spacing.three,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
    borderWidth: 3,
  },
  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  cardTitle: { fontSize: 20, fontWeight: "600" },
  dailyQuote: { marginVertical: Spacing.two },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    fontSize: 15,
    marginTop: Spacing.two,
    marginBottom: Spacing.two,
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  anotherButton: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
