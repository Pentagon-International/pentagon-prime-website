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
import Images from '@/app/utils/image';
import { LoadingProvider, useLoading } from './component/common/LoadingContext';
import Loader from './component/common/Loader';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback, memo } from 'react';

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


const LayoutContent = memo(({ children }) => {
  const pathname = usePathname();
  const { isLoading, stopLoading } = useLoading();
  const [startTime, setStartTime] = useState(null);

  // Reset and track when loading starts
  useEffect(() => {
    if (isLoading && !startTime) {
      setStartTime(Date.now());
    } else if (!isLoading) {
      setStartTime(null);
    }
  }, [isLoading, startTime]);

  // Wait for page to actually load
  useEffect(() => {
    if (!isLoading) return;

    let isMounted = true;
    const minDisplayTime = 600; // Minimum 600ms for smooth UX
    const maxWaitTime = 5000; // Maximum 5 seconds wait time

    const checkPageReady = () => {
      // Check if main content exists and is rendered
      const mainContent = document.querySelector('main.main');
      const hasContent = mainContent && mainContent.children.length > 0;
      
      // Check if document is fully loaded
      const isDocumentReady = document.readyState === 'complete';
      
      // Check if images are loaded (optional, but improves UX)
      const images = document.querySelectorAll('img');
      const criticalImagesLoaded = Array.from(images).every(img => img.complete || !img.src);
      
      return hasContent && isDocumentReady && criticalImagesLoaded;
    };

    const tryStopLoading = () => {
      if (!isMounted) return;
      
      const elapsed = Date.now() - (startTime || Date.now());
      const isReady = checkPageReady();
      
      if (isReady && elapsed >= minDisplayTime) {
        // Page is ready and minimum time has passed
        stopLoading();
      } else if (elapsed >= maxWaitTime) {
        // Maximum wait time reached, stop loading anyway
        stopLoading();
      } else {
        // Check again after a short delay
        setTimeout(tryStopLoading, 100);
      }
    };

    // Start checking after a small delay to allow navigation to start
    const initialDelay = setTimeout(() => {
      tryStopLoading();
    }, 200);

    // Also listen for window load event as a backup
    const handleWindowLoad = () => {
      if (isMounted) {
        setTimeout(() => {
          const elapsed = Date.now() - (startTime || Date.now());
          if (elapsed >= minDisplayTime) {
            stopLoading();
          } else {
            setTimeout(() => stopLoading(), minDisplayTime - elapsed);
          }
        }, 100);
      }
    };

    if (document.readyState === 'complete') {
      // Page already loaded
      setTimeout(tryStopLoading, 100);
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    return () => {
      isMounted = false;
      clearTimeout(initialDelay);
      window.removeEventListener('load', handleWindowLoad);
    };
  }, [isLoading, pathname, startTime, stopLoading]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Header />
      <main className="main">{children}</main>
    </>
  );
});

const WhatsAppButton = memo(() => {
  const buttonStyle = useMemo(() => ({
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', 
  }), []);

  return (
    <ActionIcon
      onClick={rootToWhatsApp}
      style={buttonStyle}
      color={'green'}
      radius={50}
      size={65}
    >
      <IconBrandWhatsapp size={30} />
    </ActionIcon>
  );
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
              <LayoutContent>{children}</LayoutContent>
              <WhatsAppButton />
              <Footer />
            </MantineProvider>
          </LoadingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
