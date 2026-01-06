"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Image, ActionIcon } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { IconPlayerPlay, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "./index.css";

export default function MediaCarousel({
  items = [],
  interval = 4000,
  loop = true,
  draggable = true,
  height = 450,
  bgColor = "#fff",
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [itemAspectRatios, setItemAspectRatios] = useState({});
  const videoRefs = useRef([]);
  const emblaRef = useRef(null);
  const autoplay = useMemo(
    () => Autoplay({ delay: interval, stopOnInteraction: false }),
    [interval]
  );

  // Find current item type
  const currentItem = items[active];
  const isCurrentVideo = currentItem?.type === "video";

  // Get video index for a given item index
  const getVideoIndex = (itemIndex) => {
    let videoCount = 0;
    for (let i = 0; i < itemIndex; i++) {
      if (items[i]?.type === "video") videoCount++;
    }
    return videoCount;
  };

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

  // Handle video loadedmetadata to detect aspect ratio
  const handleVideoLoadedMetadata = (index, event) => {
    const video = event.target;
    if (video.videoWidth && video.videoHeight) {
      const ratio = detectAspectRatio(video.videoWidth, video.videoHeight);
      if (ratio) {
        setItemAspectRatios(prev => ({ ...prev, [index]: ratio }));
      }
    }
  };

  // Play only active video + reset others
  useEffect(() => {
    videoRefs.current.forEach((v, videoIdx) => {
      if (!v) return;
      
      // Find which item index corresponds to this video index
      let itemIdx = -1;
      let videoCount = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i]?.type === "video") {
          if (videoCount === videoIdx) {
            itemIdx = i;
            break;
          }
          videoCount++;
        }
      }

      if (itemIdx === active && items[active]?.type === "video") {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
    setProgress(0);
  }, [active, items]);

  // Auto next slide when video ends
  const handleVideoEnd = () => {
    if (items[active]?.type === "video") {
      // Ensure autoplay is stopped before transitioning
      autoplay.stop();
      const next = (active + 1) % items.length;
      scrollToSlide(next);
    }
  };

  // Track progress for videos
  const handleTimeUpdate = () => {
    if (items[active]?.type === "video") {
      const videoIdx = getVideoIndex(active);
      const vid = videoRefs.current[videoIdx];
      if (!vid || !vid.duration) return;
      setProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  // Scroll handler with smooth transition
  const scrollToSlide = (index) => {
    if (emblaRef.current) {
      emblaRef.current.scrollTo(index, true); // true enables smooth scroll
      // Don't setActive here - let onSlideChange handle it to avoid conflicts
    }
  };

  // Handle slide change - stop autoplay for videos, start for images
  const handleSlideChange = (index) => {
    setActive(index);
    const nextItem = items[index];
    // Always stop autoplay first
    autoplay.stop();
    // Only restart autoplay for images, videos will advance via handleVideoEnd
    if (nextItem?.type === "image") {
      autoplay.reset();
    }
    // For videos, ensure autoplay stays stopped
    if (nextItem?.type === "video") {
      autoplay.stop();
    }
  };

  // Navigate to previous slide
  const handlePrev = () => {
    // Stop autoplay temporarily when manually navigating
    autoplay.stop();
    const prev = active === 0 ? items.length - 1 : active - 1;
    scrollToSlide(prev);
  };

  // Navigate to next slide
  const handleNext = () => {
    // Stop autoplay temporarily when manually navigating
    autoplay.stop();
    const next = (active + 1) % items.length;
    scrollToSlide(next);
  };

  // Handle mouse enter/leave for autoplay (pause autoplay on hover, but don't stop videos)
  const handleMouseEnter = () => {
    if (!isCurrentVideo) {
      autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (!isCurrentVideo) {
      autoplay.reset();
    }
  };

  // Control autoplay based on current item type - ensure autoplay is stopped for videos
  useEffect(() => {
    if (items.length > 0) {
      const currentItem = items[active];
      if (currentItem?.type === "video") {
        // Stop autoplay for videos immediately - it should only advance when video ends
        autoplay.stop();
        // Double-check to ensure it's stopped (prevents race conditions)
        setTimeout(() => autoplay.stop(), 0);
      } else if (currentItem?.type === "image") {
        // Restart autoplay for images
        autoplay.reset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items]);

  // Initialize autoplay state on mount - stop if first item is video
  useEffect(() => {
    if (items.length > 0 && items[0]?.type === "video") {
      autoplay.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box 
      mt={20} 
      px={20} 
      style={{ 
        width: "90%", 
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: bgColor 
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
        {items.map((item, index) => {
          const isVideo = item.type === "video";
          const videoIdx = isVideo ? getVideoIndex(index) : -1;
          const aspectRatio = itemAspectRatios[index] || null;
          const is23Ratio = aspectRatio === "2:3";
          const is169Ratio = aspectRatio === "16:9";

          return (
            <Carousel.Slide key={index} style={{ borderRadius: 0, height: "100%", padding: 0, margin: 0 }}>
              {isVideo ? (
                <Box
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: 20,
                    overflow: "hidden",
                    transform: index === active ? "scale(1)" : "scale(0.9)",
                    filter:
                      index === active ? "none" : "blur(4px) brightness(40%)",
                    position: "relative",
                    display: is169Ratio ? "block" : "flex",
                    alignItems: is169Ratio ? "stretch" : "center",
                    justifyContent: is169Ratio ? "stretch" : "center",
                    backgroundColor: is23Ratio ? "transparent" : "black",
                  }}
                >
                  {/* Blur background for 2:3 videos */}
                  {is23Ratio && (
                    <Box
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `
                          radial-gradient(
                            circle at center,
                            rgba(0,0,0,0.35) 0%,
                            rgba(0,0,0,0.65) 45%,
                            rgba(0,0,0,0.9) 100%
                          )
                        `,
                        zIndex: 1,
                      }}
                    />
                  )}


                  <video
                    ref={(el) => {
                      if (videoIdx >= 0) {
                        videoRefs.current[videoIdx] = el;
                      }
                    }}
                    src={item.src}
                    muted
                    playsInline
                    preload="auto"
                    onEnded={handleVideoEnd}
                    onLoadedMetadata={(e) => handleVideoLoadedMetadata(index, e)}
                    onTimeUpdate={
                      index === active ? handleTimeUpdate : undefined
                    }
                    style={{
                      width: is169Ratio ? "100%" : "auto",
                      height: is169Ratio ? "100%" : "100%",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: is169Ratio ? "cover" : "contain",
                      position: is169Ratio ? "absolute" : "relative",
                      top: is169Ratio ? 0 : "auto",
                      left: is169Ratio ? 0 : "auto",
                      right: is169Ratio ? 0 : "auto",
                      bottom: is169Ratio ? 0 : "auto",
                      zIndex: 2,
                    }}
                  />

                  {/* Progress bar ONLY for active video */}
                  {index === active && (
                    <div 
                      className="progress-bar"
                      style={{
                        position: "absolute",
                        bottom: "25px",
                        left: "25px",
                        right: "25px",
                        zIndex: 10,
                      }}
                    >
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </Box>
              ) : (
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
                        backgroundImage: `url(${item.src})`,
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
                    src={item.src}
                    alt={item.alt || `slide-${index}`}
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
              )}
            </Carousel.Slide>
          );
        })}
      </Carousel>
      </Box>

      {/* Custom Indicators with Controls - Dots for images, Play icons for videos */}
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
          {items.map((item, i) => {
            const isActive = i === active;
            const isVideo = item.type === "video";

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
                {isVideo ? (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: isActive ? "rgb(0, 33, 113)" : "#ffffff",
                      border: isActive ? "2px solid rgb(0, 33, 113)" : "2px solid #cccccc",
                      transition: "0.3s",
                    }}
                  >
                    <IconPlayerPlay
                      size={12}
                      fill={isActive ? "#ffffff" : "rgb(0, 33, 113)"}
                      color={isActive ? "#ffffff" : "rgb(0, 33, 113)"}
                      style={{
                        marginLeft: 2,
                      }}
                    />
                  </Box>
                ) : (
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
                )}
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
