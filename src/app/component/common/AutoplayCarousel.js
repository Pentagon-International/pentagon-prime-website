"use client";

import React, { useMemo } from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";

export default function MantineAutoplayCarousel({
  slides,
  interval = 4000,
  loop = true,
  draggable = true,
  height = 400,
  bgColor = "#fff",
}) {
  const autoplay = useMemo(
    () => Autoplay({ delay: interval, stopOnInteraction: false }),
    [interval]
  );

  return (
    <Box px={20} style={{ width: "90%", backgroundColor: bgColor }}>
      <Carousel
        loop={loop}
        height={height}
        slideSize={{ base: "100%", sm: "70%" }}
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
                position: "relative",
                cursor:"pointer",
                height:"100%",
                width: "100%",
                overflow: "hidden",
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              {/* BLACK GLASS BLUR BG */}
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${s.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(25px)",
                  opacity: 0.35,
                  transform: "scale(1.2)",
                }}
              />

              {/* MAIN IMAGE – FIXED HEIGHT + CENTERED */}
              <Image
                src={s.src}
                alt={s.alt || `slide-${index}`}
                fit="contain"
                style={{
                  position: "relative",
                  height: "100%",
                  width: "auto",        
                  maxWidth: "100%",    
                  objectFit: "contain",
                  zIndex: 2,
                }}
              />
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
