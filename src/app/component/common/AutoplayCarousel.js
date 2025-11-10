"use client";

import React, { useRef, useMemo } from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";

export default function MantineAutoplayCarousel({
  slides,
  interval = 3000,
  loop = true,
  withIndicators = true,
  draggable = true,
  height = 400,
  bgColor = "#fff",
}) {
  // ✅ useMemo ensures plugin created only once
  const autoplay = useMemo(
    () => Autoplay({ delay: interval, stopOnInteraction: false }),
    [interval]
  );

  return (
    <Box px={20} style={{ width: "90%", backgroundColor: bgColor, overflow: "hidden" }}>
      <Carousel
        loop={loop}
        height={height}
        slideSize="80%"
        slideGap="sm"
        controlsOffset="lg"
        controlSize={20}
        withControls
        withIndicators
        draggable={draggable}
        plugins={[autoplay]}
        onMouseEnter={() => autoplay.stop()}
        onMouseLeave={() => autoplay.reset()}
      >
        {slides.map((s, index) => (
          <Carousel.Slide key={index}>
            <Box
              style={{
                height,
                width: "100%",
                backgroundColor: bgColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={s.src}
                alt={s.alt || `slide-${index}`}
                fit="contain"
                height={height}
                radius={20}
                width="100%"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
