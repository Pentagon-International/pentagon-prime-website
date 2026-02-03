"use client";

import React, { useMemo, useState, useRef } from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Image, ActionIcon } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";

export default function MantineAutoplayCarousel({
  slides,
  interval = 4000,
  loop = true,
  draggable = true,
  height = 400,
  bgColor = "#fff",
}) {
  const [active, setActive] = useState(0);
  const [itemAspectRatios, setItemAspectRatios] = useState({});
  const emblaRef = useRef(null);
  const autoplay = useMemo(
    () => Autoplay({ delay: interval, stopOnInteraction: false }),
    [interval]
  );

  // Detect aspect ratio (16:9 ≈ 1.778, 2:3 ≈ 0.667)
  const detectAspectRatio = (width, height) => {
    if (!width || !height) return null;
    const ratio = width / height;
    const diff169 = Math.abs(ratio - 16/9);
    const diff23 = Math.abs(ratio - 2/3);
    return diff169 < diff23 ? "16:9" : "2:3";
  };

  // Handle image load to detect aspect ratio
  const handleImageLoad = (index, event) => {
    const img = event.target;
    if (img.naturalWidth && img.naturalHeight) {
      const ratio = detectAspectRatio(img.naturalWidth, img.naturalHeight);
      if (ratio) {
        setItemAspectRatios(prev => ({ ...prev, [index]: ratio }));
      }
    }
  };

  // Scroll handler with smooth transition
  const scrollToSlide = (index) => {
    if (emblaRef.current) {
      emblaRef.current.scrollTo(index, true);
    }
  };

  // Handle slide change
  const handleSlideChange = (index) => {
    setActive(index);
  };

  // Navigate to previous slide
  const handlePrev = () => {
    autoplay.stop();
    const prev = active === 0 ? slides.length - 1 : active - 1;
    scrollToSlide(prev);
  };

  // Navigate to next slide
  const handleNext = () => {
    autoplay.stop();
    const next = (active + 1) % slides.length;
    scrollToSlide(next);
  };

  return (
    <Box 
      mt={20} 
      px={20} 
      style={{ 
        width: "85%", 
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: COLORS.backgroundColor 
      }}
    >
      <Box
        style={{
          aspectRatio: "16/9",
          width: "100%",
          position: "relative",
        }}
      >
        <Carousel
          getEmblaApi={(api) => (emblaRef.current = api)}
          loop={loop}
          height="100%"
          slideSize='100%'
          slideGap={0}
          withControls={false}
          withIndicators={false}
          draggable={draggable}
          plugins={[autoplay]}
          onSlideChange={handleSlideChange}
          onMouseEnter={() => autoplay.stop()}
          onMouseLeave={() => autoplay.reset()}
          styles={{
            root: {
              height: "100%",
            },
            viewport: {
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              height: "100%",
            },
            slide: {
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              height: "100%",
              padding: 0,
              margin: 0,
            },
            container: {
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              height: "100%",
            },
          }}
        >
          {slides.map((s, index) => {
            const aspectRatio = itemAspectRatios[index] || null;
            const is23Ratio = aspectRatio === "2:3";
            const is169Ratio = aspectRatio === "16:9";

            return (
              <Carousel.Slide key={index} style={{ borderRadius: 0, height: "100%", padding: 0, margin: 0 }}>
                <Box
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: is23Ratio ? "transparent" : "black",
                    borderRadius: 20,
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: index === active ? "scale(1)" : "scale(0.9)",
                    filter:
                      index === active ? "none" : "blur(4px) brightness(40%)",
                    display: is169Ratio ? "block" : "flex",
                    alignItems: is169Ratio ? "stretch" : "center",
                    justifyContent: is169Ratio ? "stretch" : "center",
                  }}
                >
                  {/* Blur background for 2:3 images */}
                  {is23Ratio && (
                    <Box
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${s.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(25px)",
                        opacity: 0.4,
                        transform: "scale(1.1)",
                        zIndex: 1,
                        backgroundColor: "transparent",
                      }}
                    />
                  )}

                  {/* MAIN IMAGE */}
                  <Image
                    src={s.src}
                    alt={s.alt || `slide-${index}`}
                    fit={is169Ratio ? "cover" : "contain"}
                    onLoad={(e) => handleImageLoad(index, e)}
                    style={{
                      position: is169Ratio ? "absolute" : "relative",
                      top: is169Ratio ? 0 : "auto",
                      left: is169Ratio ? 0 : "auto",
                      right: is169Ratio ? 0 : "auto",
                      bottom: is169Ratio ? 0 : "auto",
                      height: "100%",
                      width: is169Ratio ? "100%" : "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: is169Ratio ? "cover" : "contain",
                      zIndex: 2,
                    }}
                  />
                </Box>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Box>

      {/* Custom Indicators with Controls */}
      <Box
        mt={30}
        mb={40}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {/* Previous Button */}
        <ActionIcon
          variant="filled"
          size="lg"
          radius="xl"
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: 0,
            backgroundColor: "rgb(0, 33, 113)",
            color: "#ffffff",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <IconChevronLeft size={20} />
        </ActionIcon>

        {/* Indicators */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          {slides.map((s, i) => {
            const isActive = i === active;

            return (
              <Box
                key={i}
                onClick={() => {
                  autoplay.stop();
                  scrollToSlide(i);
                }}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.3s",
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                <Box
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: isActive ? "rgb(0, 33, 113)" : "#cccccc",
                    border: isActive ? "2px solid rgb(0, 33, 113)" : "2px solid #cccccc",
                    transition: "0.3s",
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Next Button */}
        <ActionIcon
          variant="filled"
          size="lg"
          radius="xl"
          onClick={handleNext}
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: "rgb(0, 33, 113)",
            color: "#ffffff",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <IconChevronRight size={20} />
        </ActionIcon>
      </Box>
    </Box>
  );
}
