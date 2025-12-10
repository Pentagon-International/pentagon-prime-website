"use client";
import { Box, Loader as MantineLoader, Text } from "@mantine/core";
import { COLORS } from "@/app/utils/COLORS";
import { useState, useEffect, useRef, useCallback } from "react";
import { memo } from "react";

const Loader = memo(({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(66); // Default navbar height
  const resizeTimeoutRef = useRef(null);

  // Calculate navbar height dynamically (debounced resize)
  const calculateNavbarHeight = useCallback(() => {
    const header = document.querySelector('header');
    if (header) {
      setNavbarHeight(header.offsetHeight);
    }
  }, []);

  useEffect(() => {
    // Calculate on mount
    calculateNavbarHeight();
    
    // Debounced resize handler to prevent excessive re-renders
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        calculateNavbarHeight();
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [calculateNavbarHeight]);

  useEffect(() => {
    let visibilityTimer;
    let renderTimer;

    if (isLoading) {
      setShouldRender(true);
      // Small delay to trigger fade-in
      visibilityTimer = setTimeout(() => setIsVisible(true), 10);
    } else {
      // Fade out before removing from DOM
      setIsVisible(false);
      renderTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
    }

    return () => {
      if (visibilityTimer) clearTimeout(visibilityTimer);
      if (renderTimer) clearTimeout(renderTimer);
    };
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <Box
      style={{
        position: "fixed",
        top: `${navbarHeight}px`, // Start below navbar
        left: 0,
        width: "100vw",
        height: `calc(100vh - ${navbarHeight}px)`, // Full height minus navbar
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",  
        zIndex: 500, // Below navbar (navbar z-index is 1000)
        backdropFilter: "blur(4px)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <MantineLoader
        size="xl"
        color="rgb(0, 33, 95)"
        type="dots"
      />
      <Text size="28px" c="rgb(0, 33, 95)" fw={700}>Worth the Wait</Text>
    </Box>
  );
});

Loader.displayName = 'Loader';

export default Loader;

