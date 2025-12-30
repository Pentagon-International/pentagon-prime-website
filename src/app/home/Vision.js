'use client';
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
  Card,
  GridCol,
  Grid,
  Stack,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import {
  IconBrandParsinta,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";
import { TYPOGRAPHY } from "@/app/utils/TYPOGRAPHY";
import Images from "@/app/utils/image";
import Trade from "../component/common/Trade";
import { highlightText } from "../utils/highlightText";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { client } from "../api/contentful";

const styles = {
  container: {
    background: "white",
    color: "rgb(0, 34, 95)",
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

const Vision = ({ title, content, tradeItems, tradeContent }) => {
  const router = useRouter();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [embla, setEmbla] = useState(null);
  const videoRefs = useRef([]);

  const [visionData, setVisionData] = useState([]);

  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        const res = await client.getEntries({
          content_type: "visionServices",
          order: "sys.createdAt",
        });
        setVisionData(res.items || []);
      } catch (error) {
        console.error("Error fetching vision data:", error);
      }
    };

    fetchVisionData();
  }, []);

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
      py={20}
      pb={30}
      style={styles.container}
    >
      <Trade items={tradeItems} content={tradeContent} />
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
          <Title tt={"uppercase"} c="rgb(0, 33, 95)" fw={800} size={isMobile ? TYPOGRAPHY.h4.mobile : TYPOGRAPHY.h3.desktop} lh={1}>
            {highlightText(title)}
          </Title>
          <Text mt={'lg'} c="rgb(54, 54, 54)" ta={'justify'} maw={"100%"} lh={"sm"} size="sm">
            {highlightText(content)}
          </Text>
          <Grid w={'100%'} gutter="xl" mt={'lg'}>
            {isMobile ? (
              <Carousel
                align={isMobile ? 'start' : 'center'} slideSize="70%" height={220} w={'100%'} slideGap="xs" loop
                styles={{
                  controls: {
                    display: 'none',
                    visibility: 'hidden',
                    opacity: 0,
                    pointerEvents: 'none',
                  },
                }}
              >
                {(
                  visionData ||
                  [])?.map((item, index) => (
                    <Carousel.Slide key={item.sys.id} w={'100%'}>
                      <GridCol
                        span={{ base: 12, md: 4 }}
                        key={item.sys.id}
                      >
                        <Card
                          bg={'#F2F7FC'}
                          display={"flex"}
                          direction={"column"}
                          justify={"flex-start"}
                          mih={"150"}
                          shadow="md"
                          p={isMobile ? '20px' : "20px"}
                          radius={20}
                          h={"100%"}
                          mah={"250px"}
                        >
                          <Flex
                            align={"center"}
                            display={"flex"}
                            mb={"10px"}
                            w={"fit-content"}
                            style={{ border: "none", borderRadius: "12px" }}
                          >
                            <Image
                              src={
                                item?.fields?.visionIcon?.fields?.file?.url ||
                                item?.fields.image?.fields?.file?.url
                              }
                              width={45}
                              height={45}
                              mah={45}
                            // alt={item.fields.vision_title || item.fields.title}
                            />
                          </Flex>
                          {isMobile ? <Stack w={"100%"}>
                            {/* <Title
                      tw="balance"
                      display={"flex"}
                      fw={700}
                      size={theme.fontSizes.base}
                      order={4}
                      mt={isMobile ? 0 : 28}
                    >
                      {item.fields.vision_title || item.fields.title}
                    </Title> */}
                            <Text
                              tw="balance"
                              c={COLORS.textColor}
                              lh={"sm"}
                              size="sm"
                              style={{ flexGrow: 1 }}
                            >
                              {item.fields.visionDescription || item.fields.description}
                            </Text>
                          </Stack> : <Group>
                            {/* <Title
                      tw="balance"
                      display={"flex"}
                      align={"center"}
                      fw={700}
                      size={theme.fontSizes.base}
                      order={4}
                      mt={28}
                    >
                      {item.fields.vision_title || item.fields.title}
                    </Title> */}
                            <Text
                              tw="balance"
                              c={COLORS.textColor}
                              lh={"sm"}
                              size="sm"
                              style={{ flexGrow: 1 }}
                            >
                              {item.fields.visionDescription || item.fields.description}
                            </Text>
                          </Group>}
                          {/* {item.fields?.knowmore && (
          <Flex
            align="center"
            gap={4}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Anchor
              href={item.fields.knowmore}
              target="_blank"
              c={COLORS.serviceColor}
              fw={500}
              pt={"10px"}
              mt={"auto"}
              display={"flex"}
              alignitems={"center"}
              size="xs"
              underline="hover"
            >
              {anchorText}
            </Anchor>
          </Flex>
        )} */}
                        </Card>
                      </GridCol>
                    </Carousel.Slide>

                  ))}
              </Carousel>)
              : <>
                {(
                  visionData ||
                  [])?.map((item, index) => (
                    <GridCol
                      span={{ base: 12, md: 4 }}
                      key={item.sys.id}
                    >
                      <Card
                        bg={'#F2F7FC'}
                        display={"flex"}
                        direction={"column"}
                        justify={"flex-start"}
                        mih={"150"}
                        shadow="md"
                        p={isMobile ? '20px' : "20px"}
                        radius={20}
                        h={"100%"}
                        mah={"250px"}
                      >
                        <Flex
                          align={"center"}
                          display={"flex"}
                          mb={"10px"}
                          w={"fit-content"}
                          gap={10}
                          style={{ border: "none", borderRadius: "12px" }}
                        >
                          <Image
                            src={
                              item?.fields?.visionIcon?.fields?.file?.url ||
                              item?.fields.image?.fields?.file?.url
                            }
                            style={{scale: 1.3}}
                            width={60}
                            height={60}
                            mah={60}
                          // alt={item.fields.vision_title || item.fields.title}
                          />
                        </Flex>
                        {isMobile ? <Stack w={"100%"}>
                          {/* <Title
                      tw="balance"
                      display={"flex"}
                      fw={700}
                      size={theme.fontSizes.base}
                      order={4}
                      mt={isMobile ? 0 : 28}
                    >
                      {item.fields.vision_title || item.fields.title}
                    </Title> */}
                          <Text
                            tw="balance"
                            c={COLORS.textColor}
                            lh={"sm"}
                            size="sm"
                            style={{ flexGrow: 1 }}
                          >
                            {item.fields.visionDescription || item.fields.description}
                          </Text>
                        </Stack> : <Group>
                          {/* <Title
                      tw="balance"
                      display={"flex"}
                      align={"center"}
                      fw={700}
                      size={theme.fontSizes.base}
                      order={4}
                      mt={28}
                    >
                      {item.fields.vision_title || item.fields.title}
                    </Title> */}
                          <Text
                            tw="balance"
                            c={COLORS.textColor}
                            lh={"sm"}
                            size="sm"
                            style={{ flexGrow: 1 }}
                          >
                            {item.fields.visionDescription || item.fields.description}
                          </Text>
                        </Group>}
                        {/* {item.fields?.knowmore && (
          <Flex
            align="center"
            gap={4}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Anchor
              href={item.fields.knowmore}
              target="_blank"
              c={COLORS.serviceColor}
              fw={500}
              pt={"10px"}
              mt={"auto"}
              display={"flex"}
              alignitems={"center"}
              size="xs"
              underline="hover"
            >
              {anchorText}
            </Anchor>
          </Flex>
        )} */}
                      </Card>
                    </GridCol>
                  ))}
              </>}
          <Group mt="md" gap={"xl"}>
            {/* <Button
              variant="filled"
              bg={COLORS.portColor}
              radius="md"
              size="lg"
              fz={"sm"}
              lh={"sm"}
              p={"12px 32px"}
              fw={700}
              onClick={() => router.push("/contact")}
            >
              Get in touch
            </Button> */}
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
              {/* <Flex align="center" gap={8} className="unstyled-button">
                <IconBrandParsinta
                  size={18}
                  className="icon"
                  style={{ transition: "all 0.3s ease" }}
                />
                <span style={{ transition: "all 0.3s ease" }}>Watch Video</span>
              </Flex> */}
            </UnstyledButton>
          </Group>
          </Grid>

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
            {embla ? embla.selectedScrollSnap() + 1 : 1} / {videos.length}
          </Text>
        </Box>
      </Modal>
    </Container>
  );
};

export default Vision;
