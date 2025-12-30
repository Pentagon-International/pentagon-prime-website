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
import { useEffect, useState, useMemo, useCallback, memo, useRef } from 'react';

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
  const { isLoading, stopLoading, startLoading } = useLoading();
  const startTimeRef = useRef(null);
  const isInitialLoadRef = useRef(true);
  const previousPathnameRef = useRef(pathname);
  const loadingCheckIntervalRef = useRef(null);

  // Set static page title for all pages
  useEffect(() => {
    document.title = "Pentagon Prime";
  }, [pathname]); // Reset title on navigation to ensure it stays static

  // Start loading on initial app load (only once)
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      startLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Reset and track when loading starts
  useEffect(() => {
    if (isLoading) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
    } else {
      startTimeRef.current = null;
      // Clear any existing intervals
      if (loadingCheckIntervalRef.current) {
        clearInterval(loadingCheckIntervalRef.current);
        loadingCheckIntervalRef.current = null;
      }
    }
  }, [isLoading]);

  // Reset startTime when pathname changes during loading (navigation happened)
  useEffect(() => {
    if (pathname !== previousPathnameRef.current) {
      previousPathnameRef.current = pathname;
      // Only reset timer if we're currently loading
      if (isLoading && startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
    }
  }, [pathname, isLoading]);

  // Wait for page to actually load
  useEffect(() => {
    if (!isLoading) {
      // Clear any existing intervals when not loading
      if (loadingCheckIntervalRef.current) {
        clearInterval(loadingCheckIntervalRef.current);
        loadingCheckIntervalRef.current = null;
      }
      return;
    }

    const minDisplayTime = 1200; // Minimum 1.2 seconds for smooth UX
    const maxWaitTime = 10000; // Maximum 10 seconds wait time
    const imageLoadPromises = new Set();
    const loadedImages = new Set();
    let fontsReadyResolved = false;
    
    // Check fonts loading
    const checkFontsReady = async () => {
      if (fontsReadyResolved) return true;
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
          fontsReadyResolved = true;
          return true;
        }
      } catch (e) {
        // Font API not available or error
      }
      fontsReadyResolved = true;
      return true;
    };
    
    // Start checking fonts in background
    checkFontsReady();

    // Track image loading
    const trackImageLoading = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (img.src && !loadedImages.has(img.src)) {
          if (img.complete) {
            loadedImages.add(img.src);
          } else {
            const promise = new Promise((resolve) => {
              const onLoad = () => {
                loadedImages.add(img.src);
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onLoad); // Count errors as loaded
                resolve();
              };
              img.addEventListener('load', onLoad, { once: true });
              img.addEventListener('error', onLoad, { once: true });
            });
            imageLoadPromises.add(promise);
          }
        }
      });
    };

    // Track image loading promises for async resolution
    const resolveImagePromises = async () => {
      if (imageLoadPromises.size > 0) {
        try {
          await Promise.race([
            Promise.all(Array.from(imageLoadPromises)),
            new Promise(resolve => setTimeout(resolve, 2000)) // Max 2s wait for images
          ]);
        } catch (e) {
          // Ignore errors
        }
      }
    };
    
    // Resolve image promises in background
    resolveImagePromises();

    let checkCount = 0;
    const maxChecks = 200; // Maximum number of checks (20 seconds at 100ms interval)
    let isReadyState = false;
    let lastReadyCheck = 0;

    const tryStopLoading = () => {
      if (!isLoading) return; // Double check loading state
      
      checkCount++;
      const elapsed = Date.now() - (startTimeRef.current || Date.now());
      
      // Check readiness less frequently (every 500ms) for performance
      if (elapsed - lastReadyCheck >= 500 || checkCount === 1) {
        lastReadyCheck = elapsed;
        
        // Synchronous check first
        const mainContent = document.querySelector('main.main');
        const hasContent = mainContent && mainContent.children.length > 0;
        const isDocumentReady = document.readyState === 'complete';
        
        // Check images synchronously
        trackImageLoading();
        const images = document.querySelectorAll('img');
        const hasImages = images.length > 0;
        let allImagesLoaded = true;
        
        if (hasImages) {
          allImagesLoaded = Array.from(images).every(img => {
            return img.complete || loadedImages.has(img.src) || !img.src;
          });
        }
        
        // Check React hydration
        const isReactHydrated = document.body.hasAttribute('data-reactroot') || 
                                document.querySelector('[data-reactroot]') !== null ||
                                (mainContent && mainContent.children.length > 0);
        
        // Check fonts - use resolved state
        const fontsLoaded = fontsReadyResolved || (document.fonts && document.fonts.status === 'loaded');
        
        isReadyState = hasContent && isDocumentReady && fontsLoaded && allImagesLoaded && isReactHydrated;
      }
      
      if (isReadyState && elapsed >= minDisplayTime) {
        // Page is ready and minimum time has passed
        stopLoading();
        return;
      }
      
      if (elapsed >= maxWaitTime || checkCount >= maxChecks) {
        // Maximum wait time reached, stop loading anyway
        stopLoading();
        return;
      }
    };

    // Use interval instead of recursive setTimeout for better performance
    const checkInterval = setInterval(() => {
      tryStopLoading();
    }, 100);

    loadingCheckIntervalRef.current = checkInterval;

    // Also listen for window load event as a backup
    const handleWindowLoad = () => {
      if (isLoading) {
        // Wait a bit for React to finish rendering and images to load
        setTimeout(() => {
          if (!isLoading) return;
          
          const elapsed = Date.now() - (startTimeRef.current || Date.now());
          
          // Final comprehensive check
          const mainContent = document.querySelector('main.main');
          const hasContent = mainContent && mainContent.children.length > 0;
          const isDocumentReady = document.readyState === 'complete';
          
          trackImageLoading();
          const images = document.querySelectorAll('img');
          const allImagesLoaded = images.length === 0 || Array.from(images).every(img => {
            return img.complete || loadedImages.has(img.src) || !img.src;
          });
          
          if (hasContent && isDocumentReady && allImagesLoaded && elapsed >= minDisplayTime) {
            stopLoading();
          } else if (elapsed >= minDisplayTime) {
            // Even if not fully ready, stop after minimum time if window loaded
            setTimeout(() => {
              if (isLoading) stopLoading();
            }, Math.max(0, minDisplayTime - elapsed + 500));
          }
        }, 500);
      }
    };

    // Check immediately if page is already loaded
    if (document.readyState === 'complete') {
      setTimeout(() => tryStopLoading(), 200);
    } else {
      window.addEventListener('load', handleWindowLoad, { once: true });
    }

    return () => {
      clearInterval(checkInterval);
      loadingCheckIntervalRef.current = null;
      window.removeEventListener('load', handleWindowLoad);
      imageLoadPromises.clear();
      loadedImages.clear();
    };
  }, [isLoading, stopLoading]);

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
      size={45}
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
