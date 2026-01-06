"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  Title,
  BackgroundImage,
} from "@mantine/core";
import { COLORS } from "../utils/COLORS";
import { TYPOGRAPHY } from "../utils/TYPOGRAPHY";
import { client } from "../api/contentful";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { highlightText } from "../utils/highlightText";

const Mission = () => {
  const [visionData, setVisionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: "visionMission",
          order: "-sys.createdAt",
        });
        setVisionData(res.items);
      } catch (error) {
        console.error("Error fetching vision mission:", error);
      }
    };

    fetchData();
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Container fluid px={"2%"} py={"50px"} mt={50}>
      <Box mb={50}>
        <Title
          tt={"uppercase"}
          lh={isMobile ? "md" : "lgx2"}
          fw={800}
          mb={30}
          size={isMobile ? TYPOGRAPHY.h4.mobile : TYPOGRAPHY.h3.desktop}
        >
          {highlightText("Our Edge: # Tech + People #")}
        </Title>
        <Text
          c={COLORS.textColor}
          lh={1.6} 
          style={{
            textIndent: "5rem",
            textAlign: "justify",
            whiteSpace: "pre-line",
          }}
        >
          We’re not traditional forwarders — we’re <b>tech-enabled logistics partners</b>.
          Our operational, customs, and project specialists work alongside our IT and product teams to convert process-driven playbooks into <b>digital workflows</b> that reduce admin, improve speed, and deliver consistency.
        </Text>
      </Box>
      <Flex direction={"column"} gap={"xl"}>
        {visionData.map((item, index) => (
          <BackgroundImage
            key={index}
            src={
              isMobile
                ? item.fields.mobImage.fields.file.url
                : item.fields.image.fields.file.url
            }
            radius="30px"
            h={isMobile ? "auto" : "350px"}
            style={{
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              c={COLORS.primaryColor}
              maw={isMobile ? "100%" : "60%"}
              ml={"auto"}
              mt={isMobile ? "70%" : 0}
              mb={isMobile && 50}
              p={isMobile ? "20px 10px" : "20px 30px"}
              style={{
                borderRadius: "10px",
                backdropFilter: "blur(5px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Title
                tt={"uppercase"}
                lh={isMobile ? "md" : "lgx2"}
                fw={800}
                size={isMobile ? TYPOGRAPHY.h4.mobile : TYPOGRAPHY.h3.desktop}
                c={COLORS.portColor}
              >
                {/* <Title fw={800} size={'lg'} tt={'uppercase'} c={COLORS.portColor}> */}
                {item.fields.title}
              </Title>
              <Text
                size="base"
                lh={"30px"}
                maw={isMobile ? "100%" : "80%"}
                mt={14}
              >
                {/* <Text size="base" lh={'30px'} tw="balance" w={isMobile ? '100%' : '80%'} mt={20}> */}
                {highlightText(item.fields.content)}
              </Text>
            </Box>
          </BackgroundImage>
        ))}
      </Flex>
    </Container>
  );
};

export default Mission;
