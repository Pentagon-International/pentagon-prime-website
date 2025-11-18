"use client";

import React, { useRef, useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Box } from "@mantine/core";
import "./index.css"

export default function VideoCarousel({ videos = [] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef([]);
  const emblaRef = useRef(null);

  // Play only active video + reset others
  useEffect(() => {
    videoRefs.current.forEach((v, index) => {
      if (!v) return;

      if (index === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
    setProgress(0);
  }, [active]);

  // Auto next slide when video ends
  const handleVideoEnd = () => {
    const next = (active + 1) % videos.length;
    scrollToSlide(next);
  };

  // Track progress
  const handleTimeUpdate = () => {
    const vid = videoRefs.current[active];
    if (!vid || !vid.duration) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  };

  // Scroll handler
  const scrollToSlide = (index) => {
    if (emblaRef.current) emblaRef.current.scrollTo(index);
    setActive(index);
  };

  return (
    <Box mt={20} p={20} style={{ width: "90%" }}>
      <Carousel
        getEmblaApi={(api) => (emblaRef.current = api)}
        slideSize={{ base: "100%", sm: "70%" }}
        slideGap="xs"
        height={450}
        align="center"
        withIndicators={false}
        withControls
        loop
        dragFree={false}
        onSlideChange={setActive}
      >
        {videos.map((src, i) => (
          <Carousel.Slide key={i}>
            <Box
              style={{
                cursor:"pointer",
                width: "100%",
                height: "100%",
                transition: "0.4s",
                borderRadius: 10,
                overflow: "hidden",
                transform: i === active ? "scale(1)" : "scale(0.9)",
                filter: i === active ? "none" : "blur(4px) brightness(40%)",
              }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={src}
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnd}
                onTimeUpdate={i === active ? handleTimeUpdate : undefined}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Progress bar ONLY for active slide */}
              {i === active && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Thumbnails */}
      <Box
        mt={20}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
        }}
      >
        {videos.map((src, i) => (
          <Box
            key={i}
            mt={20}
            onClick={() => scrollToSlide(i)}
            style={{
              width: 120,
              height: 80,
              borderRadius: 8,
              overflow: "hidden",
              cursor: "pointer",
              border: i === active ? "3px solid #007bff" : "3px solid #ffffff",
              transition: "0.3s",
            }}
          >
            <video
              src={src}
              muted
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: i === active ? "brightness(100%)" : "brightness(40%)",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
