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

  const splitIntoColumns = (array, cols) => {
    const total = array.length;
    const baseCount = Math.floor(total / cols);
    const remainder = total % cols;

    // Create empty columns
    const result = Array.from({ length: cols }, () => []);

    let currentIndex = 0;

    // First pass: fill baseCount in all columns
    for (let col = 0; col < cols; col++) {
      for (let i = 0; i < baseCount; i++) {
        result[col].push(array[currentIndex++]);
      }
    }

    // Second pass: distribute remainder
    if (remainder > 0) {
      // First fill odd columns (0,2,4)
      const oddColumns = [];
      for (let i = 0; i < cols; i += 2) {
        oddColumns.push(i);
      }

      // Then even columns (1,3,5)
      const evenColumns = [];
      for (let i = 1; i < cols; i += 2) {
        evenColumns.push(i);
      }

      const order = [...oddColumns, ...evenColumns];

      for (let i = 0; i < remainder; i++) {
        result[order[i]].push(array[currentIndex++]);
      }
    }

    return result;
  };

  const columnData = splitIntoColumns(partners, columns);

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
      px={"2%"}
      pt={"40px"}
      pb={"70px"}
      fluid
      bg={COLORS.backgroundColor}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        align={"center"}
        justify={"space-between"}
        direction={isMobile ? "column" : "row"}
        w={"100%"}
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
        maw={1000}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
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
        <Flex
          gap={{ base: 10, md: 16 }}
          style={{ maxWidth: "1096px", margin: "0 auto" }}
          align="flex-start"
        >
          {columnData.map((column, colIndex) => (
            <Flex
              key={colIndex}
              direction="column"
              gap={{ base: 10, md: 16 }}
              flex={1}
            >
              {column.map((item, index) => (
                <Paper
                  key={index}
                  radius="24px"
                  p={16}
                  withBorder
                  shadow="sm"
                  style={{
                    textAlign: "center",
                    marginTop: colIndex % 2 !== 0 && index == 0 ? "40px" : "",
                    backgroundColor: (colIndex % 2 !== 0 && index%2 !== 0) || (colIndex % 2 === 0 && index%2 === 0) ? "#ffffffa0" : "#ffffff",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
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
                  <Center>
                    <Image
                      src={item.fields.image.fields.file.url}
                      alt={item.fields.image.fields.title}
                      w="100%"
                      h={80}
                      fit="contain"
                    />
                  </Center>
                </Paper>
              ))}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Container>
  );
};

export default Partner;
