"use client";

import { ActionIcon } from "@mantine/core";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import "../globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import AIAssistantWidget from "@/components/common/AIAssistantWidget";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Loader from "@/components/common/Loader";
import { useLoading } from "@/components/common/LoadingContext";
import { usePathname } from "next/navigation";
import { memo, useEffect, useMemo, useRef } from "react";

const rootToWhatsApp = () => {
  const isAndroid = /android/i.test(navigator.userAgent);
  const whatsappURL = isAndroid
    ? "intent://send/?phone=917400425960#Intent;scheme=smsto;package=com.whatsapp;end"
    : "https://wa.me/917400425960";

  window.open(whatsappURL, "_blank");
};

const LayoutContent = memo(({ children }) => {
  const pathname = usePathname();
  const { isLoading, stopLoading, startLoading } = useLoading();
  const startTimeRef = useRef(null);
  const isInitialLoadRef = useRef(true);
  const previousPathnameRef = useRef(pathname);
  const loadingCheckIntervalRef = useRef(null);

  useEffect(() => {
    document.title = "Pentagon Prime";
  }, [pathname]);

  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      startLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
    } else {
      startTimeRef.current = null;
      if (loadingCheckIntervalRef.current) {
        clearInterval(loadingCheckIntervalRef.current);
        loadingCheckIntervalRef.current = null;
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (pathname !== previousPathnameRef.current) {
      previousPathnameRef.current = pathname;
      if (isLoading && startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
    }
  }, [pathname, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (loadingCheckIntervalRef.current) {
        clearInterval(loadingCheckIntervalRef.current);
        loadingCheckIntervalRef.current = null;
      }
      return;
    }

    const minDisplayTime = 1200;
    const maxWaitTime = 10000;
    const imageLoadPromises = new Set();
    const loadedImages = new Set();
    let fontsReadyResolved = false;

    const checkFontsReady = async () => {
      if (fontsReadyResolved) return true;
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
          fontsReadyResolved = true;
          return true;
        }
      } catch (e) {
        // noop
      }
      fontsReadyResolved = true;
      return true;
    };

    checkFontsReady();

    const trackImageLoading = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (img.src && !loadedImages.has(img.src)) {
          if (img.complete) {
            loadedImages.add(img.src);
          } else {
            const promise = new Promise((resolve) => {
              const onLoad = () => {
                loadedImages.add(img.src);
                img.removeEventListener("load", onLoad);
                img.removeEventListener("error", onLoad);
                resolve();
              };
              img.addEventListener("load", onLoad, { once: true });
              img.addEventListener("error", onLoad, { once: true });
            });
            imageLoadPromises.add(promise);
          }
        }
      });
    };

    const resolveImagePromises = async () => {
      if (imageLoadPromises.size > 0) {
        try {
          await Promise.race([
            Promise.all(Array.from(imageLoadPromises)),
            new Promise((resolve) => setTimeout(resolve, 2000)),
          ]);
        } catch (e) {
          // noop
        }
      }
    };

    resolveImagePromises();

    let checkCount = 0;
    const maxChecks = 200;
    let isReadyState = false;
    let lastReadyCheck = 0;

    const tryStopLoading = () => {
      if (!isLoading) return;

      checkCount++;
      const elapsed = Date.now() - (startTimeRef.current || Date.now());

      if (elapsed - lastReadyCheck >= 500 || checkCount === 1) {
        lastReadyCheck = elapsed;

        const mainContent = document.querySelector("main.main");
        const hasContent = mainContent && mainContent.children.length > 0;
        const isDocumentReady = document.readyState === "complete";

        trackImageLoading();
        const images = document.querySelectorAll("img");
        const hasImages = images.length > 0;
        let allImagesLoaded = true;

        if (hasImages) {
          allImagesLoaded = Array.from(images).every(
            (img) => img.complete || loadedImages.has(img.src) || !img.src,
          );
        }

        const isReactHydrated =
          document.body.hasAttribute("data-reactroot") ||
          document.querySelector("[data-reactroot]") !== null ||
          (mainContent && mainContent.children.length > 0);

        const fontsLoaded =
          fontsReadyResolved ||
          (document.fonts && document.fonts.status === "loaded");

        isReadyState =
          hasContent &&
          isDocumentReady &&
          fontsLoaded &&
          allImagesLoaded &&
          isReactHydrated;
      }

      if (isReadyState && elapsed >= minDisplayTime) {
        stopLoading();
        return;
      }

      if (elapsed >= maxWaitTime || checkCount >= maxChecks) {
        stopLoading();
      }
    };

    const checkInterval = setInterval(() => {
      tryStopLoading();
    }, 100);

    loadingCheckIntervalRef.current = checkInterval;

    const handleWindowLoad = () => {
      if (isLoading) {
        setTimeout(() => {
          if (!isLoading) return;

          const elapsed = Date.now() - (startTimeRef.current || Date.now());
          const mainContent = document.querySelector("main.main");
          const hasContent = mainContent && mainContent.children.length > 0;
          const isDocumentReady = document.readyState === "complete";

          trackImageLoading();
          const images = document.querySelectorAll("img");
          const allImagesLoaded =
            images.length === 0 ||
            Array.from(images).every(
              (img) => img.complete || loadedImages.has(img.src) || !img.src,
            );

          if (hasContent && isDocumentReady && allImagesLoaded && elapsed >= minDisplayTime) {
            stopLoading();
          } else if (elapsed >= minDisplayTime) {
            setTimeout(() => {
              if (isLoading) stopLoading();
            }, Math.max(0, minDisplayTime - elapsed + 500));
          }
        }, 500);
      }
    };

    if (document.readyState === "complete") {
      setTimeout(() => tryStopLoading(), 200);
    } else {
      window.addEventListener("load", handleWindowLoad, { once: true });
    }

    return () => {
      clearInterval(checkInterval);
      loadingCheckIntervalRef.current = null;
      window.removeEventListener("load", handleWindowLoad);
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
  const buttonStyle = useMemo(
    () => ({
      position: "fixed",
      bottom: 20,
      right: 20,
      zIndex: 1000,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    }),
    [],
  );

  return (
    <ActionIcon
      onClick={rootToWhatsApp}
      style={buttonStyle}
      color="green"
      radius={50}
      size={45}
    >
      <IconBrandWhatsapp size={30} />
    </ActionIcon>
  );
});

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  const shouldHideFooter = pathname.startsWith("/service");

  return (
    <>
      <LayoutContent>{children}</LayoutContent>
      <AIAssistantWidget />
      <WhatsAppButton />
      {!shouldHideFooter && <Footer />}
    </>
  );
}
