import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
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
  MutedText,
  PrimaryButton,
  Screen,
  Subtitle,
  Title,
} from "@/components/ui";
import { Fonts, Spacing } from "@/constants/theme";
import { useAppTheme } from "@/lib/theme-context";
import { useStoredState } from "@/lib/use-stored-state";

interface Profile {
  name: string;
  photo: string; // data URI, downscaled by the picker before saving
  favoriteVerse: string;
  favoriteBooks: string;
  hobbies: string;
  inspiration: string;
}

const STORAGE_KEY = "daily-light-profile";
const EMPTY_PROFILE: Profile = {
  name: "",
  photo: "",
  favoriteVerse: "",
  favoriteBooks: "",
  hobbies: "",
  inspiration: "",
};
const MAX_FIELD_LENGTH = 500;

const isProfile = (value: unknown): boolean =>
  !!value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  (Object.keys(EMPTY_PROFILE) as (keyof Profile)[]).every(
    (key) => typeof (value as Profile)[key] === "string"
  );

const fields: {
  key: Exclude<keyof Profile, "photo" | "name">;
  label: string;
  placeholder: string;
}[] = [
  {
    key: "favoriteVerse",
    label: "📖 Favorite verse",
    placeholder: "e.g. Jeremiah 29:11, because it reminds me God has a plan",
  },
  {
    key: "favoriteBooks",
    label: "📚 Favorite books of the Bible",
    placeholder: "e.g. Psalms, Ruth, and Philippians",
  },
  {
    key: "hobbies",
    label: "🎨 Hobbies",
    placeholder: "e.g. singing, gardening, football, baking",
  },
  {
    key: "inspiration",
    label: "✨ What inspires me",
    placeholder: "The people, moments, and truths that keep you going",
  },
];

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const [profile, setProfile, hydrated] = useStoredState<Profile>(
    STORAGE_KEY,
    EMPTY_PROFILE,
    isProfile
  );
  const [draft, setDraft] = useState<Partial<Profile>>({});
  const [saved, setSaved] = useState(false);
  const [photoError, setPhotoError] = useState("");

  // The screen edits a draft layered over the stored profile.
  const view: Profile = { ...profile, ...draft };

  const update = (patch: Partial<Profile>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setSaved(false);
  };

  const pickPhoto = async () => {
    setPhotoError("");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    if (!asset.base64) {
      setPhotoError("Sorry, that image could not be loaded.");
      return;
    }
    const mime = asset.mimeType ?? "image/jpeg";
    update({ photo: `data:${mime};base64,${asset.base64}` });
  };

  const save = () => {
    const trimmed = { ...view };
    (Object.keys(trimmed) as (keyof Profile)[]).forEach((key) => {
      if (key !== "photo") {
        trimmed[key] = trimmed[key].trim().slice(0, MAX_FIELD_LENGTH);
      }
    });
    setProfile(trimmed);
    setDraft({});
    setSaved(true);
  };

  if (!hydrated) {
    return (
      <Screen>
        <MutedText style={{ textAlign: "center" }}>
          Loading your profile…
        </MutedText>
      </Screen>
    );
  }

  return (
    <Screen>
      <View>
        <Title>My Profile 🌸</Title>
        <Subtitle>
          A little space that is just yours. Everything here stays private
          on your device and is never uploaded anywhere.
        </Subtitle>
      </View>

      <Card>
        <View style={styles.avatarSection}>
          {view.photo ? (
            <Image
              source={{ uri: view.photo }}
              style={[styles.avatar, { borderColor: colors.primarySoft }]}
              accessibilityLabel="Profile photo"
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
              <Text style={{ fontSize: 40 }}>🙂</Text>
            </View>
          )}
          <View style={styles.avatarButtons}>
            <Pressable
              onPress={pickPhoto}
              style={[
                styles.smallButton,
                { backgroundColor: colors.primarySoft },
              ]}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                {view.photo ? "Change photo" : "Upload photo"}
              </Text>
            </Pressable>
            {view.photo ? (
              <Pressable
                onPress={() => update({ photo: "" })}
                style={[
                  styles.smallButton,
                  { backgroundColor: colors.cardSoft },
                ]}
              >
                <Text style={{ color: colors.muted, fontSize: 13 }}>
                  Remove
                </Text>
              </Pressable>
            ) : null}
          </View>
          {photoError ? (
            <MutedText style={{ color: colors.accent }}>
              {photoError}
            </MutedText>
          ) : null}
        </View>

        <Body style={styles.fieldLabel}>Name</Body>
        <TextInput
          value={view.name}
          onChangeText={(name) => update({ name })}
          maxLength={100}
          placeholder="What should we call you?"
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
        {view.name ? <MutedText>Welcome, {view.name} 💜</MutedText> : null}

        {fields.map(({ key, label, placeholder }) => (
          <View key={key}>
            <Body style={styles.fieldLabel}>{label}</Body>
            <TextInput
              value={view[key]}
              onChangeText={(text) => update({ [key]: text })}
              maxLength={MAX_FIELD_LENGTH}
              multiline
              placeholder={placeholder}
              placeholderTextColor={colors.muted}
              style={[
                styles.input,
                styles.textarea,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                  fontFamily: Fonts?.sans,
                },
              ]}
            />
          </View>
        ))}

        <View style={styles.saveRow}>
          <PrimaryButton label="Save Profile" onPress={save} />
          {saved && (
            <Text style={{ color: colors.sage, fontSize: 13 }}>
              Saved on this device ✓
            </Text>
          )}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatarSection: { alignItems: "center", gap: Spacing.two },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 999,
    borderWidth: 4,
  },
  avatarPlaceholder: { alignItems: "center", justifyContent: "center" },
  avatarButtons: { flexDirection: "row", gap: Spacing.two },
  smallButton: {
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  fieldLabel: { fontWeight: "600", marginTop: Spacing.three },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    fontSize: 15,
    marginTop: 6,
  },
  textarea: { minHeight: 70, textAlignVertical: "top" },
  saveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
});
