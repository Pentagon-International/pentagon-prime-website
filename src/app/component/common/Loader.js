"use client";
import { Box, Loader as MantineLoader, Text } from "@mantine/core";
import { COLORS } from "@/app/utils/COLORS";
import { useState, useEffect, useRef } from "react";

const Loader = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(66); // Default navbar height

  // Calculate navbar height dynamically
  useEffect(() => {
    const calculateNavbarHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setNavbarHeight(header.offsetHeight);
      }
    };

    // Calculate on mount and when loading starts
    calculateNavbarHeight();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateNavbarHeight);
    
    return () => window.removeEventListener('resize', calculateNavbarHeight);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      // Small delay to trigger fade-in
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // Fade out before removing from DOM
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
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
};

export default Loader;

