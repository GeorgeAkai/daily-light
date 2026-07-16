"use client";

import { useRef, useState } from "react";
import { useHydrated, useLocalStorage } from "@/lib/storage";

interface Profile {
  name: string;
  photo: string; // data URL, resized before saving
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

/** Downscale the chosen image to a small JPEG so it fits localStorage. */
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      // Cover-crop to a centered square
      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) / 2;
      const sy = (img.height - side) / 2;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image"));
    };
    img.src = url;
  });
}

const fields: {
  key: Exclude<keyof Profile, "photo" | "name">;
  label: string;
  icon: string;
  placeholder: string;
  rows: number;
}[] = [
  {
    key: "favoriteVerse",
    label: "Favorite verse",
    icon: "📖",
    placeholder: "e.g. Jeremiah 29:11, because it reminds me God has a plan",
    rows: 2,
  },
  {
    key: "favoriteBooks",
    label: "Favorite books of the Bible",
    icon: "📚",
    placeholder: "e.g. Psalms, Ruth, and Philippians",
    rows: 2,
  },
  {
    key: "hobbies",
    label: "Hobbies",
    icon: "🎨",
    placeholder: "e.g. singing, gardening, football, baking",
    rows: 2,
  },
  {
    key: "inspiration",
    label: "What inspires me",
    icon: "✨",
    placeholder: "The people, moments, and truths that keep you going",
    rows: 3,
  },
];

export default function ProfilePage() {
  const hydrated = useHydrated();
  const [profile, setProfile] = useLocalStorage<Profile>(
    STORAGE_KEY,
    EMPTY_PROFILE,
    isProfile
  );
  const [draft, setDraft] = useState<Profile | null>(null);
  const [saved, setSaved] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  // Edit a local draft; fall back to the stored profile until first edit.
  const view = draft ?? profile;

  const update = (patch: Partial<Profile>) => {
    setDraft({ ...view, ...patch });
    setSaved(false);
  };

  const onPhotoChosen = async (file: File | undefined) => {
    if (!file) return;
    setPhotoError("");
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      return;
    }
    try {
      const photo = await resizeImage(file);
      update({ photo });
    } catch {
      setPhotoError("Sorry, that image could not be loaded.");
    }
  };

  const save = () => {
    const trimmed = { ...view };
    (Object.keys(trimmed) as (keyof Profile)[]).forEach((key) => {
      if (key !== "photo") {
        trimmed[key] = trimmed[key].trim().slice(0, MAX_FIELD_LENGTH);
      }
    });
    setProfile(trimmed);
    setDraft(trimmed);
    setSaved(true);
  };

  if (!hydrated) {
    return (
      <p className="text-center text-sm text-muted">Loading your profile…</p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="text-center">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
          My Profile 🌸
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          A little space that is just yours. Everything here stays private on
          your device and is never uploaded anywhere.
        </p>
      </section>

      <section className="rounded-3xl border border-border-soft bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-2">
            {view.photo ? (
              /* eslint-disable-next-line @next/next/no-img-element -- local data URL, not an optimizable remote asset */
              <img
                src={view.photo}
                alt="Profile"
                className="size-28 rounded-full border-4 border-primary-soft object-cover shadow-sm"
              />
            ) : (
              <div className="flex size-28 items-center justify-center rounded-full border-4 border-primary-soft bg-card-soft text-4xl">
                🙂
              </div>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPhotoChosen(e.target.files?.[0])}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="rounded-full bg-primary-soft px-4 py-1.5 text-xs font-medium text-primary transition hover:opacity-80"
              >
                {view.photo ? "Change photo" : "Upload photo"}
              </button>
              {view.photo && (
                <button
                  type="button"
                  onClick={() => update({ photo: "" })}
                  className="rounded-full bg-card-soft px-4 py-1.5 text-xs text-muted transition hover:text-foreground"
                >
                  Remove
                </button>
              )}
            </div>
            {photoError && (
              <p className="text-xs text-accent">{photoError}</p>
            )}
          </div>

          <div className="w-full flex-1">
            <label className="block text-sm font-medium">Name</label>
            <input
              value={view.name}
              onChange={(e) => update({ name: e.target.value })}
              maxLength={100}
              placeholder="What should we call you?"
              className="mt-1 w-full rounded-2xl border border-border-soft bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
            />
            {view.name && (
              <p className="mt-2 text-sm text-muted">
                Welcome, {view.name} 💜
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {fields.map(({ key, label, icon, placeholder, rows }) => (
            <div key={key}>
              <label className="block text-sm font-medium">
                {icon} {label}
              </label>
              <textarea
                value={view[key]}
                onChange={(e) => update({ [key]: e.target.value })}
                maxLength={MAX_FIELD_LENGTH}
                rows={rows}
                placeholder={placeholder}
                className="mt-1 w-full resize-y rounded-2xl border border-border-soft bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={save}
            className="rounded-2xl bg-primary px-8 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Save Profile
          </button>
          {saved && (
            <span className="animate-rise text-sm text-sage">
              Saved on this device ✓
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
