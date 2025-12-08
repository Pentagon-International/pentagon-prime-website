"use client";
import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  GridCol,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { theme } from "@/app/utils/theme";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/app/utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { client } from "@/app/api/contentful";
import * as TablerIcons from "@tabler/icons-react";
import { highlightText } from "../utils/highlightText";
import { customerBenefitsList } from "../utils/llistData";
import { Carousel } from "@mantine/carousel";

const CustomerBenefits = ({ title, content, title2 }) => {
  const [listData, setListData] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const iconColor = ["red", "blue", "orange", "rgb(0, 33, 95)", "green"];

  useEffect(() => {
    // Example: fetching from Contentful (uncomment if needed)
    // const fetchListData = async () => {
    //   try {
    //     const res = await client.getEntries({
    //       content_type: "logisticsServices",
    //       order: "sys.createdAt",
    //     });
    //     setListData(res.items || []);
    //   } catch (error) {
    //     console.error("Error fetching service data:", error);
    //   }
    // };
    // fetchListData();
    setListData(customerBenefitsList);
  }, []);

  return (
    <Container fluid px="7%" py="70px">

      {/* Services Section */}
      <Box mt={40} mb={40}>
        <Title
          tt="uppercase"
          c={COLORS.headerBackground}
          lh="md"
          mb={50}
          ta="center"
          fw={800}
          size={isMobile ? "20px" : "32px"}
        >
          {highlightText("What customers get (benefits)")}
        </Title>

        {/* Responsive Grid or Carousel */}
        <Grid columns={9} mt="lg" gutter="xl" w="100%">
          {isMobile ? (
            <Carousel
              align="start"
              slideSize="70%"
              slideGap="lg"
              loop
              w="100%"
              styles={{
                controls: { display: "none" },
                slide: {
                  display: "flex",
                  alignItems: "stretch", // ensures equal height
                },
              }}
            >
              {listData.map((item, index) => {
                const IconComponent =
                  TablerIcons[item.fields.icon] || TablerIcons.IconQuestionMark;
                return (
                  <Carousel.Slide key={index}>
                    <Card
                      bg={"white"}
                      p="32px"
                      shadow="md"
                      radius={15}
                      style={{
                        flex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "3px solid #E0E0E0",
                      }}
                    >
                      <Stack gap="sm" justify="space-between" h="100%">
                        {/* Icon */}
                        <IconComponent size={52} stroke={1.8} color="white" style={{backgroundColor: iconColor[index], padding: "8px", borderRadius: "8px"}} />

                        {/* Title */}
                        <Title
                          order={4}
                          fw={700}
                          size="20px"
                          mt={isMobile ? 0 : 20}
                          c="rgb(0, 33, 95)"
                          lh="sm"
                        >
                          {item.fields.service_title || item.fields.title}
                        </Title>

                        {/* Description */}
                        <Text
                          c={COLORS.textColor}
                          lh="sm"
                          size="sm"
                          style={{
                            flexGrow: 1,
                          }}
                        >
                          {item.fields.service_description ||
                            item.fields.description}
                        </Text>
                      </Stack>
                    </Card>
                  </Carousel.Slide>
                );
              })}
            </Carousel>
          ) : (
            listData.map((item, index) => {
              const IconComponent =
                TablerIcons[item.fields.icon] || TablerIcons.IconQuestionMark;
              return (
                <GridCol
                  key={index}
                  span={{ base: 12, sm: 6, md: item.fields.service_title==="Sustainability" || item.fields.title==="Sustainability" || item.fields.title==="Support" || item.fields.service_title==="Support"  ? 6 : 4, lg: item.fields.service_title==="Sustainability" || item.fields.title==="Sustainability" || item.fields.title==="Support" || item.fields.service_title==="Support"  ? 4.5 : 3 }}
                  style={{ display: "flex" }}
                >
                  <Card
                    bg={"white"}
                    p="32px"
                    shadow="md"
                    radius={15}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      border: "3px solid #E0E0E0",
                    }}
                  >
                    <Stack gap="sm" justify="space-between" h="100%">
                      {/* Icon */}
                      <IconComponent size={52} stroke={1.8} color="white" style={{backgroundColor: iconColor[index], padding: "8px", borderRadius: "8px"}} />

                      {/* Title */}
                      <Title
                        order={4}
                        fw={700}
                        size="20px"
                        c="rgb(0, 33, 95)"
                        mt={isMobile ? 0 : 20}
                        lh="sm"
                      >
                        {item.fields.service_title || item.fields.title}
                      </Title>

                      {/* Description */}
                      <Text
                        c={COLORS.textColor}
                        lh="sm"
                        size="sm"
                        style={{
                          flexGrow: 1,
                        }}
                      >
                        {item.fields.service_description ||
                          item.fields.description}
                      </Text>
                    </Stack>
                  </Card>
                </GridCol>
              );
            })
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerBenefits;
