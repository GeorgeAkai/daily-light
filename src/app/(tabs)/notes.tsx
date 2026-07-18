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
  Chip,
  MutedText,
  PrimaryButton,
  Screen,
  Subtitle,
  Title,
} from "@/components/ui";
import { Fonts, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/lib/theme-context";
import { useStoredState } from "@/lib/use-stored-state";

interface Entry {
  id: string;
  type: "note" | "prayer";
  text: string;
  date: string;
}

const STORAGE_KEY = "daily-light-entries";
const NO_ENTRIES: Entry[] = [];
const MAX_ENTRY_LENGTH = 5000;

const isEntryList = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (e) =>
      e &&
      typeof e === "object" &&
      typeof (e as Entry).id === "string" &&
      typeof (e as Entry).text === "string" &&
      typeof (e as Entry).date === "string" &&
      ((e as Entry).type === "note" || (e as Entry).type === "prayer")
  );

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function NotesScreen() {
  const { colors } = useAppTheme();
  const [entries, setEntries, hydrated] = useStoredState<Entry[]>(
    STORAGE_KEY,
    NO_ENTRIES,
    isEntryList
  );
  const [type, setType] = useState<Entry["type"]>("note");
  const [text, setText] = useState("");

  const addEntry = () => {
    if (!text.trim()) return;
    const entry: Entry = {
      id: newId(),
      type,
      text: text.trim().slice(0, MAX_ENTRY_LENGTH),
      date: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setText("");
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <Screen>
      <View>
        <Title>Notes & Prayers 📝</Title>
        <Subtitle>
          Capture a thought from today, or write a prayer from your heart.
          Everything stays private on your device.
        </Subtitle>
      </View>

      <Card>
        <View style={styles.chipRow}>
          <Chip
            label="📝 Note of the day"
            active={type === "note"}
            onPress={() => setType("note")}
          />
          <Chip
            label="🙏 Prayer"
            active={type === "prayer"}
            onPress={() => setType("prayer")}
          />
        </View>
        <TextInput
          value={text}
          onChangeText={setText}
          maxLength={MAX_ENTRY_LENGTH}
          multiline
          numberOfLines={4}
          placeholder={
            type === "note"
              ? "What is on your mind today?"
              : "Lord, today I bring to you…"
          }
          placeholderTextColor={colors.muted}
          style={[
            styles.textarea,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.text,
              fontFamily: Fonts?.sans,
            },
          ]}
        />
        <PrimaryButton
          label={type === "note" ? "Save Note" : "Save Prayer"}
          onPress={addEntry}
          disabled={!text.trim()}
        />
      </Card>

      {hydrated && entries.length === 0 && (
        <MutedText style={{ textAlign: "center" }}>
          No entries yet. Your first note or prayer will appear here. 🌱
        </MutedText>
      )}

      {entries.map((entry) => (
        <View
          key={entry.id}
          style={[
            styles.entry,
            {
              backgroundColor:
                entry.type === "prayer" ? colors.sageSoft : colors.accentSoft,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.entryHeader}>
            <MutedText>
              {entry.type === "prayer" ? "🙏 Prayer" : "📝 Note"} ·{" "}
              {new Date(entry.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </MutedText>
            <Pressable
              onPress={() => removeEntry(entry.id)}
              accessibilityLabel="Delete entry"
              hitSlop={8}
            >
              <Text style={{ color: colors.muted, fontSize: 13 }}>✕</Text>
            </Pressable>
          </View>
          <Body>{entry.text}</Body>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.two },
  textarea: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: "top",
    marginVertical: Spacing.two,
  },
  entry: {
    borderRadius: 18,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.two,
  },
});
