import { Share } from "react-native";

/** Public URL of the app; update if the deployment domain changes. */
export const SITE_URL = "https://thedailypromise.vercel.app";

export async function inviteFriends() {
  try {
    await Share.share({
      message:
        "🌿 I've been finding daily encouragement on Daily Promise: Bible verses, " +
        `a daily quote, goals, and a Bible quiz. Join me: ${SITE_URL}`,
    });
  } catch {
    // Sharing not available on this platform; nothing to do.
  }
}

export async function shareCertificate(name: string, level: number) {
  try {
    await Share.share({
      message:
        `🏆 ${name} scored a perfect 10/10 on Level ${level} of the Daily Promise ` +
        `Bible Quiz! "Give diligence to present yourself approved by God." ` +
        `(2 Timothy 2:15) Try it yourself: ${SITE_URL}`,
    });
  } catch {
    // Sharing not available on this platform; nothing to do.
  }
}
