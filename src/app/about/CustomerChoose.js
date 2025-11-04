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
import { customerChooseList } from "../utils/llistData";
import { Carousel } from "@mantine/carousel";

const CustomerChoose = ({ title, content, title2 }) => {
  const [listData, setListData] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
    setListData(customerChooseList);
  }, []);

  return (
    <Container fluid px="7%" py="70px">
      {/* Services Section */}
      <Box mt={40}>
        <Title
          tt="uppercase"
          c={COLORS.headerBackground}
          lh="md"
          mb={30}
          ta="center"
          fw={800}
          size={isMobile ? "20px" : "28px"}
        >
          {highlightText("Pentagon Air: Why customers choose it")}
        </Title>
        <Text
          c={COLORS.textColor}
          mt={10}
          mb={30}
          ta="center"
          lh="sm"
        >
          When customers choose Pentagon Air Freight, they get more than speed — they get predictability and control.
        </Text>

        {/* Responsive Grid or Carousel */}
        <Grid columns={9} mt="lg" gutter="lg" w="100%">
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
                      bg={"#F2F7FC"}
                      p="20px"
                      radius={15}
                      style={{
                        flex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack gap="sm" justify="space-between" h="100%">
                        {/* Icon */}
                        <IconComponent size={42} stroke={1.6} color="#1E88E5" />

                        {/* Title */}
                        <Title
                          order={4}
                          fw={700}
                          size={theme.fontSizes.base}
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
                  span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                  style={{ display: "flex" }}
                >
                  <Card
                    bg={"#F2F7FC"}
                    p="20px"
                    radius={15}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack gap="sm" justify="space-between" h="100%">
                      {/* Icon */}
                      <IconComponent size={42} stroke={1.6} color="#1E88E5" />

                      {/* Title */}
                      <Title
                        order={4}
                        fw={700}
                        size={theme.fontSizes.base}
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

export default CustomerChoose;
