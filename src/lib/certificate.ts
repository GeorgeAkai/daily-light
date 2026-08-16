import { Platform } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { CERTIFICATE_LOGO_BASE64 } from "./certificateLogo";
import { shareCertificate } from "./share";

/**
 * A printed certificate always uses this fixed, elegant palette
 * regardless of the device's current light/dark theme, matching the
 * app's light-mode brand colors.
 */
const INK = "#38423a";
const MUTED = "#84907f";
const GREEN = "#2f6b3d";
const GOLD = "#c29a1f";
const PARCHMENT = "#fbf8f1";
const VERSE_BG = "#eef4ec";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function certificateHtml(name: string, level: number, dateLabel: string): string {
  const safeName = escapeHtml(name);
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @page { size: A4 landscape; margin: 0; }
      body {
        margin: 0;
        padding: 36px;
        background: ${PARCHMENT};
        font-family: Georgia, 'Times New Roman', serif;
        color: ${INK};
      }
      .outer {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 520px;
        border: 4px solid ${GOLD};
        border-radius: 20px;
        padding: 8px;
      }
      .inner {
        box-sizing: border-box;
        height: 100%;
        border: 1px solid ${MUTED};
        border-radius: 14px;
        padding: 44px 56px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }
      .logo {
        width: 64px;
        height: 64px;
        border-radius: 999px;
      }
      .heading {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 3px;
        color: ${GREEN};
        margin: 0;
      }
      .subheading {
        font-size: 13px;
        color: ${MUTED};
        margin: 0;
        font-family: Helvetica, Arial, sans-serif;
      }
      .name {
        font-size: 38px;
        font-weight: 700;
        margin: 10px 0 0 0;
      }
      .rule {
        width: 140px;
        height: 2px;
        background: ${GREEN};
        border: none;
        margin: 4px 0;
      }
      .body {
        font-size: 16px;
        line-height: 1.6;
        max-width: 520px;
        margin: 0;
      }
      .verse-box {
        background: ${VERSE_BG};
        border-radius: 14px;
        padding: 18px 26px;
        max-width: 560px;
        margin-top: 8px;
      }
      .verse {
        font-size: 16px;
        font-style: italic;
        margin: 0;
      }
      .verse-ref {
        font-size: 14px;
        font-weight: 700;
        color: ${GREEN};
        margin: 6px 0 0 0;
        font-family: Helvetica, Arial, sans-serif;
      }
      .date {
        font-size: 13px;
        color: ${MUTED};
        margin-top: 10px;
        font-family: Helvetica, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner">
        <img class="logo" src="data:image/jpeg;base64,${CERTIFICATE_LOGO_BASE64}" />
        <p class="heading">✦ CERTIFICATE OF EXCELLENCE ✦</p>
        <p class="subheading">Daily Promise Bible Quiz</p>
        <p class="name">${safeName}</p>
        <hr class="rule" />
        <p class="body">
          answered every question correctly on <strong>Level ${level}</strong>,
          earning a perfect score of 10/10. 🏆
        </p>
        <div class="verse-box">
          <p class="verse">
            &ldquo;Give diligence to present yourself approved by God, a
            workman who doesn't need to be ashamed, properly handling the
            Word of Truth.&rdquo;
          </p>
          <p class="verse-ref">2 Timothy 2:15</p>
        </div>
        <p class="date">${dateLabel}</p>
      </div>
    </div>
  </body>
</html>`;
}

/**
 * Generates the certificate as a PDF and opens the platform's native
 * share sheet so the user can save, print, or send the file. On web,
 * where apps can't hand off a file the way native share sheets do,
 * this opens the browser's print dialog with the certificate loaded,
 * where "Save as PDF" is one of the built-in destinations.
 */
export async function shareCertificatePdf(name: string, level: number) {
  const dateLabel = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const html = certificateHtml(name, level, dateLabel);

  try {
    if (Platform.OS === "web") {
      await Print.printAsync({ html });
      return;
    }

    const { uri } = await Print.printToFileAsync({ html });
    const canShareFiles = await Sharing.isAvailableAsync();
    if (canShareFiles) {
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: `${name}'s Certificate, Level ${level}`,
        UTI: "com.adobe.pdf",
      });
    } else {
      await shareCertificate(name, level);
    }
  } catch {
    // The user may have cancelled the share sheet or print dialog;
    // nothing needs to happen in that case.
  }
}
