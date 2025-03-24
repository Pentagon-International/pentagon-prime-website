"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Title,
  UnstyledButton,
  Modal,
  Box,
  ActionIcon,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import {
  IconBrandParsinta,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";
import Images from "@/app/utils/image";
import Trade from "../component/common/Trade";
import { highlightText } from "../utils/highlightText";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";

const styles = {
  container: {
    background: "linear-gradient(180deg, #0012E6 0%, #FFFFFF 100%)",
    color: "white",
    padding: "4rem 2rem",
    paddingLeft: "0",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  highlightText: {
    color: COLORS.vision,
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    zIndex: 200,
    color: "white",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.1)",
      color: COLORS.portColor,
    },
  },
  carouselControls: {
    button: {
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      border: "none",
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: COLORS.portColor,
      },
    },
  },
};

const Vision = ({ title, content, tradeItems }) => {
  const router = useRouter();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [embla, setEmbla] = useState(null); 
  const [videoCount , setVideoCount] = useState(1);
  const videoRefs = useRef([]);


  const isMobile = useMediaQuery("(max-width: 768px)");

  const videos = [
    {
      id: 1,
      url: "https://pentagon-prime.s3.ap-south-1.amazonaws.com/Limco+Gold_Vessel+Loading+details/limco-video-1.mp4",
    },
    {
      id: 2,
      url: "https://pentagon-prime.s3.ap-south-1.amazonaws.com/Limco+Gold_Vessel+Loading+details/limco-video-2.mp4",
    },
    {
      id: 3,
      url: "https://pentagon-prime.s3.ap-south-1.amazonaws.com/Limco+Gold_Vessel+Loading+details/limco-video-3.mp4",
    },
  ];

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos.length]);

  // Handle slide change
  useEffect(() => {
    if (!embla) return;

    const handleSlideChange = () => {
      // Pause all videos
      videoRefs.current.forEach(video => {
        if (video) video.pause();
      });

      
      // Play the current video
      const currentIndex = embla.selectedScrollSnap();
      setVideoCount(currentIndex + 1); // Update the video count
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch(err => console.log("Auto-play prevented:", err));
      }
    };

    embla.on("select", handleSlideChange);
    return () => embla.off("select", handleSlideChange);
  }, [embla]);

  // Play first video when modal opens
  useEffect(() => {
    if (videoModalOpen && videoRefs.current[0]) {
      setTimeout(() => {
        videoRefs.current[0].play().catch(err => console.log("Auto-play prevented:", err));
      }, 300);
    }
  }, [videoModalOpen]);

  return (
    <Container
      fluid
      px={"7%"}
      py={isMobile ? "30px" : "70px"}
      style={styles.container}
    >
      <Trade items={tradeItems} />
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify={"space-between"}
        w={"100%"}
        gap="md"
      >
        <Group display={'flex'} align="center" justify="center" w={isMobile ? "90%" : "40%"}>
          <Image
            src={Images.vision}
            w={isMobile ? "100%" : "70%"}
            alt="PentagonPrime Logo"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Group>
        <Flex direction="column" w={isMobile ? "100%" : "60%"}
          ta={'left'}
          p={'0 2%'}
          mt={isMobile && 50}
        >
          <Title size={isMobile ? "lg" : "xl"} tt={"uppercase"} lh={isMobile ? "lgx2" : "xlx"} tw="balance" fw={900}>
            {highlightText(title)}
          </Title>
          <Text mt="md" c={isMobile ? COLORS.textColor : ''} maw={"100%"} lh={"sm"} size="sm">
            {highlightText(content)}
          </Text>
          <Group mt="lg" gap={"xl"}>
            <Button
              variant="filled"
              bg={COLORS.portColor}
              radius="md"
              size="lg"
              fz={"sm"}
              lh={"sm"}
              p={"18px 32px"}
              fw={700}
              onClick={() => router.push("/contact")}
            >
              Get in touch
            </Button>
            <UnstyledButton
              size={"sm"}
              className="unstyled-button"
              onClick={() => setVideoModalOpen(true)}
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateX(5px)",
                  "& .icon": {
                    transform: "scale(1.1)",
                    color: COLORS.portColor,
                  },
                },
              }}
            >
              <Flex align="center" gap={8} className="unstyled-button">
                <IconBrandParsinta
                  size={18}
                  className="icon"
                  style={{ transition: "all 0.3s ease" }}
                />
                <span style={{ transition: "all 0.3s ease" }}>Watch Video</span>
              </Flex>
            </UnstyledButton>
          </Group>
        </Flex>
      </Flex>

      {/* Mantine Carousel Video Modal */}
      <Modal
        opened={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        size="xl"
        padding={0}
        withCloseButton={false}
        centered
        radius="lg"
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 5,
        }}
        styles={{
          content: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <Box
          style={{
            position: "relative",
            backgroundColor: "#222",
            padding: "8px",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <ActionIcon
            onClick={() => setVideoModalOpen(false)}
            sx={styles.closeButton}
            size="lg"
            variant="transparent"
          >
            <IconX size={24} />
          </ActionIcon>

          <Carousel
            getEmblaApi={setEmbla}
            withControls
            loop={false}
            draggable={false}
            slideSize="100%"
            slideGap={0}
            align="center"
            styles={{
              control: styles.carouselControls.button,
              indicators: { bottom: "15px" },
              indicator: {
                width: "8px",
                height: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                "&[data-active]": {
                  backgroundColor: COLORS.portColor,
                },
              },
            }}
          >
            {videos.map((video, index) => (
              <Carousel.Slide key={video.id}>
                <Box
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    backgroundColor: "#222",
                  }}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={video.url}
                    controls
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>

          <Text
            size="sm"
            c="white"
            fw={500}
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "4px 12px",
              borderRadius: "20px",
            }}
          >
            {embla ? videoCount : 1} / {videos.length}
          </Text>
        </Box>
      </Modal>
    </Container>
  );
};

export default Vision;
