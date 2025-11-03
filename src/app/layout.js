'use client';
import { ActionIcon, Button, MantineProvider, Transition } from '@mantine/core';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { kumbhSans, theme } from './utils/theme';
import QueryProvider from './api/QueryProvider';
import { Notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { baseURL } from './api/api';
import { IconArrowUp, IconBrandWhatsapp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { COLORS } from './utils/COLORS';
import { Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-libre-baskerville",
  style: ["normal", "italic"]
});
// export const metadata = {
//   title: "Pentagon Prime",
//   description: "Pentagon Prime is a unit of Pentagon Group",
//   icons: {
//     icon: "/logo-pp.png",
//   },
// };

const rootToWhatsApp = () => {
  const isAndroid = /android/i.test(navigator.userAgent);

  // console.log("Is Android:", isAndroid);
  const whatsappURL = isAndroid
    ? `intent://send/?phone=917400425960#Intent;scheme=smsto;package=com.whatsapp;end`
    : `https://wa.me/917400425960`;

  // window.location.href = whatsappURL;
    window.open(whatsappURL, '_blank');
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <body className={kumbhSans.className}>
        <QueryProvider>
          <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <Notifications position="top-right" zIndex={9999} />
            <Header />
            <main className="main">{children}</main>
            {/* <Button
              style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
              }}
              leftSection={<IconArrowUp size={16} />}
              onClick={rootToWhatsApp}
            >
              Scroll to top
            </Button> */}
            <ActionIcon
              onClick={rootToWhatsApp}
              style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', 
              }}
              color={'green'}
              // variant="default"
              radius={50}
              size={65}
            >
              <IconBrandWhatsapp size={30} 
              />
            </ActionIcon>
            <Footer />
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
