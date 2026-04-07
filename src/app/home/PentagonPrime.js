"use client";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridCol,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/app/utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { client } from "@/app/api/contentful";
import * as TablerIcons from "@tabler/icons-react";
import { highlightText } from "../utils/highlightText";
import { primeListData } from "../utils/llistData";
import { Carousel } from "@mantine/carousel";
import PrimeListCard from "../component/common/PrimeListCard";
import { homeTypography } from "./homeTypography";

const PentagonPrime = ({ title, content, title2 }) => {
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
    setListData(primeListData);
  }, []);

  return (
    <Container fluid px="2%" py="70px" >

      {/* Services Section */}
      <Box mt={20}>
        <Title
          tt="uppercase"
          c={COLORS.headerBackground}
          mb={50}
          ta="center"
          fw={800}
          style={{
            fontFamily: homeTypography.headingFontFamily,
            fontSize: homeTypography.sectionTitle.fontSize,
            lineHeight: homeTypography.sectionTitle.lineHeight,
          }}
        >
          {highlightText(title2)}
        </Title>

        {/* Responsive Grid or Carousel */}
        <Grid columns={9} mt="lg" gutter="xl" grow w="100%">
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
                    <PrimeListCard
                      IconComponent={IconComponent}
                      item={item}
                      backgroundColor="white"
                      iconColor={iconColor[index]}
                    />
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
                  <PrimeListCard
                    IconComponent={IconComponent}
                    item={item}
                    backgroundColor="white"
                    iconColor={iconColor[index]}
                  />
                </GridCol>
              );
            })
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default PentagonPrime;
