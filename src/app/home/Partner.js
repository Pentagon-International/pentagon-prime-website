"use client";

import { useState, useEffect, useRef } from "react";
import { COLORS } from "@/app/utils/COLORS";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { client } from "../api/contentful";
import { highlightText } from "../utils/highlightText";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";

import { useMantineTheme } from "@mantine/core";

const Partner = ({ title, content }) => {
  const [partners, setPartners] = useState([]);
  const router = useRouter();
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const isMobile = useMediaQuery("(max-width:768px)");

  const isXL = useMediaQuery("(min-width: 1200px)");
  const isLG = useMediaQuery("(min-width: 992px)");
  const isMD = useMediaQuery("(min-width: 768px)");
  const isSM = useMediaQuery("(min-width: 576px)");

  const columns = isXL ? 6 : isLG ? 4 : isMD ? 3 : isSM ? 2 : 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: "partners",
          order: "sys.createdAt",
        });
        setPartners(res.items);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      px={"4%"}
      pt={"40px"}
      pb={"70px"}
      fluid
      bg={COLORS.backgroundColor}
    >
      <Flex
        align={"center"}
        justify={"space-between"}
        direction={isMobile ? "column" : "row"}
      >
        <Stack>
          <Title size="lg" tt={"uppercase"} fw={800}>
            {highlightText(title)}
          </Title>
          <Text c={COLORS.textColor} size="base" lh="sm">
            {/* <Text size="sm" fw={500}> */}
            {highlightText(content)}
          </Text>
        </Stack>
        {/* <Button
          fz={'sm'}
        variant="outline"
          size="lg"
          radius={'12px'}
          fw={600}
          c={COLORS.serviceColor}
          fullWidth={isMobile ? true : false}
          mt={isMobile ? 25 : 0}
          onClick={() => router.push('/contact')}
        >
          Get In Touch
        </Button> */}
      </Flex>

      <Box
        mt={50}
        pos={"relative"}
        // p={isMobile ? 0 : 20}
        w={isMobile ? "100%" : "100%"}
        // m={'0 auto'}
      >
        {/* <Carousel
          slideSize="100%"
          slideGap="xs"
          loop
          align="start"
          withIndicators
          withControls={false}
          pb={30}
          styles={{
            indicators: {
              bottom: 10,
            },
            indicator: {
              backgroundColor: "#A1A1A1",
              width: 8,
              height: 8,
            },
            indicatorActive: {
              backgroundColor: "#FCFCFC",
            },
          }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          {partners.map((item, index) => (
            <CarouselSlide key={index}>
              <Flex
                w="100%"
                h={isMobile ? "100%" : 400}
                direction={isMobile ? "column" : "row"}
                align="stretch"
                style={{
                  backgroundColor: "white",
                  borderRadius: isMobile ? 22 : 54,
                  overflow: "hidden",
                }}
              >
                <Box
                  w={isMobile ? "100%" : "40%"}
                  p={20}
                  display="flex"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={item.fields.image.fields.file.url}
                    alt={item.fields.image.fields.title}
                    w="100%"
                    maw={isMobile ? 260 : 220}
                    h="auto"
                    fit="contain"
                  />
                </Box>
                <Box
                  w={isMobile ? "100%" : "60%"}
                  p={20}
                  display="flex"
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    size="base"
                    lh="sm"
                    maw={isMobile ? "100%" : "90%"}
                    tw="balance"
                  >
                    {highlightText(item.fields.content)}
                  </Text>

                  <Text size="base" fw={700} c={COLORS.portColor} mt={16}>
                    {highlightText(item.fields.shortvalue)}
                  </Text>
                </Box>
              </Flex>
            </CarouselSlide>
          ))}
        </Carousel> */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
          spacing={{ base: 10, md: 16 }}
        >
          {partners.map((item, index) => {
            return (
              <Paper
                key={index}
                radius="lg"
                p={"lg"}
                shadow="sm"
                withBorder
                style={{
                  maxHeight: "250px",
                  height: "100%",
                  textAlign: "center",
                  backgroundColor: index%2!==0 ? "#e2f2ff02" : "#ffffff",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <Center
                  mb={16}
                  maw={180}

                  style={{
                    flex: 3.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={item.fields.image.fields.file.url}
                    alt={item.fields.image.fields.title}
                    w="100%"
                    h="100px"
                    fit="contain"
                  />
                </Center>
                {/* <Center
                  mb={16}
                  maw={180}
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Text size="base" fw={700} c={COLORS.portColor}>
                    {highlightText(item.fields.shortvalue)}
                  </Text>
                </Center> */}
              </Paper>
            );
          })}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Partner;
