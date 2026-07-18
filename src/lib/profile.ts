export interface Profile {
  name: string;
  photo: string; // data URI, downscaled by the picker before saving
  favoriteVerse: string;
  favoriteBooks: string;
  hobbies: string;
  inspiration: string;
}

export const PROFILE_STORAGE_KEY = "daily-light-profile";

export const EMPTY_PROFILE: Profile = {
  name: "",
  photo: "",
  favoriteVerse: "",
  favoriteBooks: "",
  hobbies: "",
  inspiration: "",
};

export const isProfile = (value: unknown): boolean =>
  !!value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  (Object.keys(EMPTY_PROFILE) as (keyof Profile)[]).every(
    (key) => typeof (value as Profile)[key] === "string"
  );
