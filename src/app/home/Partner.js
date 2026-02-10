"use client";

import { useState, useEffect, useRef } from "react";
import { COLORS } from "@/app/utils/COLORS";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
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

const Partner = ({ title, content }) => {
  const [partners, setPartners] = useState([]);
  const router = useRouter();
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const isMobile = useMediaQuery("(max-width:768px)");

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
        <Carousel
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
                w={"100%"}
                h={isMobile ? "100%" : "400px"}
                align={"center"}
                pos={"relative"}
                direction={"row"}
                style={{
                  backgroundColor: "white",
                  borderRadius: isMobile ? "22px" : "54px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  p={20}
                  maw={isMobile ? "100%" : "65%"}
                  ml={"auto"}
                  mt={isMobile ? "450px" : 0}
                  style={{
                    borderRadius: "10px",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    height: "100%",
                  }}
                >
                  <Image
                    w={"100%"}
                    maw={200}
                    h="auto"
                    alt={item.fields.image.fields.title}
                    pos={"relative"}
                    src={item.fields.image.fields.file.url}
                  />
                </Box>
                <Box
                  p={20}
                  // c={}
                  maw={isMobile ? "100%" : "65%"}
                  ml={"auto"}
                  mt={isMobile ? "450px" : 0}
                  style={{
                    borderRadius: "10px",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Text size="base" lh="sm" maw={"90%"} tw="balance">
                    {/* <Text size="16px" lh={'sm'} maw={'90%'} tw="balance"> */}
                    {highlightText(item.fields.content)}
                  </Text>
                  <Text size="base" fw={700} c={COLORS.portColor} mt={20}>
                    {highlightText(item.fields.shortvalue)}
                  </Text>
                </Box>
              </Flex>
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default Partner;
