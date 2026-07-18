# ✦ Daily Light: Bible Verses & Inspiration

An inspirational React Native app (built with Expo) that runs on iOS,
Android, and the web from one codebase.

## Features

- **Find your verse**: enter a random number, your birthday, or a word on
  your heart and receive a Bible verse. Word searches return a random
  verse that actually contains the word, with a Show Another button.
- **Daily inspiration**: a motivational quote paired with a Bible verse
  that changes every day.
- **Notes & Prayers**: write a note of the day or a prayer; entries are
  saved privately on your device.
- **Goals**: list the goals you are believing for this year, with
  checkboxes and a progress bar to celebrate goals achieved.
- **Trivia**: flip cards with easy-to-medium Bible questions, with
  difficulty filters and shuffle.
- **Bible Quiz**: ten random multiple-choice questions per round (easy,
  medium, and hard) drawn from a pool of 50, with a score and an
  encouraging word no matter the result.
- **My Profile**: a private profile with your photo, favorite verse,
  favorite books, hobbies, and what inspires you.
- **Soft colors & light/dark mode**: a gentle pastel palette with a
  theme toggle that remembers your preference.

Verse text is from the World English Bible (WEB), a public domain
translation.

## Storage

All data (notes, prayers, goals, profile, theme) is stored on the
device with AsyncStorage. There is no server, no account, and nothing
is ever uploaded.

## Getting started

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the
web, or scan the QR code with the Expo Go app on your phone.

## Deploying the web version

The web build is a fully static site. A `vercel.json` is included, so
deploying to [Vercel](https://vercel.com) is just: import the GitHub
repo in the Vercel dashboard and deploy. No environment variables or
database are needed. (Any static host works: `npx expo export
--platform web` outputs the site to `dist/`.)

The iOS and Android apps are built separately with
[EAS Build](https://docs.expo.dev/build/introduction/) and distributed
through the app stores; they are not hosted on Vercel.

## Tech stack

- [Expo](https://expo.dev) + [React Native](https://reactnative.dev) + TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) (file-based tabs + stack)
- AsyncStorage for private, on-device persistence
- expo-image-picker for the profile photo
