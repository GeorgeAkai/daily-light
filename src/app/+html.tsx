import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

/**
 * Root HTML document for web static export.
 * https://docs.expo.dev/router/reference/static-rendering/
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        {/* PWA: installable "add to home screen" support */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#161616" />
        <meta name="application-name" content="Daily Promise" />

        {/* iOS "add to home screen" support (Safari ignores the manifest) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Daily Promise" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
