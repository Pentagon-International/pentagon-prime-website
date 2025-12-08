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

const PentagonPrime = ({ title, content, title2 }) => {
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
    setListData(primeListData);
  }, []);

  return (
    <Container fluid px="7%" py="70px" >

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
          {highlightText(title2)}
        </Title>

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
                    <PrimeListCard
                      IconComponent={IconComponent}
                      item={item}
                      backgroundColor="#F2F7FC"
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
                    backgroundColor="#F2F7FC"
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
