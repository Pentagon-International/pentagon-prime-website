"use client";

import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { kumbhSans, theme } from "@/app/utils/theme";
import QueryProvider from "@/lib/api/QueryProvider";
import Images from "@/app/utils/image";
import { Libre_Baskerville } from "next/font/google";
import { LoadingProvider } from "@/components/common/LoadingContext";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  style: ["normal", "italic"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <head>
        <link rel="icon" href={Images.logo_only} />
      </head>
      <body className={kumbhSans.className}>
        <QueryProvider>
          <LoadingProvider>
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
              <Notifications position="top-right" zIndex={9999} />
              {children}
            </MantineProvider>
          </LoadingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
