"use client";

import {
  Box,
  Card,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconPhoneCall, IconPinnedFilled } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { client } from "../api/contentful";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { highlightText } from "../utils/highlightText";

const Global = () => {
  const [locationData, setLocationData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: "location",
          order: "sys.createdAt",
        });
        setLocationData(res.items);
        if (res.items.length > 0) {
          setSelectedPlace(res.items[0].fields.place);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchData();
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Group countries
  const indiaPlaces = ["New Delhi", "Pune", "Bangalore", "Chennai", "Ahmedabad"];
  const overseasPlaces = ["USA", "Kenya", "Dubai", "Vietnam", "China"];

  const indiaData = locationData.filter((item) =>
    indiaPlaces.includes(item.fields.place)
  );
  const overseasData = locationData.filter((item) =>
    overseasPlaces.includes(item.fields.place)
  );

  const places = [
    { name: "USA", x: "21%", y: "48%" },
    { name: "Kenya", x: "62%", y: "62.5%" },
    { name: "Dubai", x: "66%", y: "51%" },
    { name: "New Delhi", x: "73.5%", y: "50%" },
    { name: "Pune", x: "73%", y: "54%" },
    { name: "Bangalore", x: "73.5%", y: "57%" },
    { name: "Chennai", x: "75%", y: "57%" },
    { name: "Vietnam", x: "83.5%", y: "57%" },
    { name: "Ahmedabad", x: "71.5%", y: "52%" },
    { name: "China", x: "85.5%", y: "51%" },
  ];

  const handlePlaceSelect = (placeName) => setSelectedPlace(placeName);

  const renderCard = (item) => (
    <Card
      key={item.sys.id}
      bg={selectedPlace === item.fields.place ? "rgb(0, 33, 95)" : "#FFF"}
      c={selectedPlace === item.fields.place ? "#FFF" : "#000"}
      shadow="md"
      radius="32px"
      p={30}
      onMouseEnter={(e)=>{
        if(selectedPlace !== item.fields.place){
          e.currentTarget.style.backgroundColor = "rgb(0, 51, 145)";
          e.currentTarget.style.color = "#FFF";
          e.currentTarget.style.border = "3px solid rgb(0, 51, 145)";
        }
      }}
      onMouseLeave={(e)=>{
        if(selectedPlace !== item.fields.place){
          e.currentTarget.style.backgroundColor = "#FFF";
          e.currentTarget.style.color = "#000";
          e.currentTarget.style.border = "3px solid #E0E0E0";
        }
      }}
      onClick={() => setSelectedPlace(item.fields.place)}
      style={{
        transition: "all 0.5s ease",
        cursor: "pointer",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: selectedPlace === item.fields.place ? "3px solid rgb(0, 33, 95)" : "3px solid #E0E0E0",
      }}
    >
      {/* Title */}
      <Title
        size="md"
        fw={700}
        order={5}
        c={selectedPlace === item.fields.place ? "white" : "inherit"}
      >
        {item.fields.place}
      </Title>

      {/* Address */}
      <Text
        size="smx"
        mt={10}
        c={selectedPlace === item.fields.place ? "white" : "inherit"}
        style={{
          flexGrow: 1, // ✅ fills space evenly
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.fields.address}
      </Text>

      {/* Contact */}
      <Group align="center" wrap="nowrap" gap={5} mt={15}>
        <IconPhoneCall
          size={14}
          color={
            selectedPlace === item.fields.place ? "white" : COLORS.serviceColor
          }
        />
        <Text
          size="smx"
          c={selectedPlace === item.fields.place ? "white" : "inherit"}
        >
          {item.fields.number}
        </Text>
      </Group>
    </Card>
  );

  const renderCarousel = (data) => (
    <Carousel
      mt={20}
      align={"start"}
      slideSize="80%"
      height={"auto"}
      w={"100%"}
      slideGap="xs"
      loop
      initialSlide={
        selectedPlace
          ? data.findIndex((item) => item.fields.place === selectedPlace)
          : 0
      }
      onSlideChange={(index) => {
        if (data[index]) setSelectedPlace(data[index].fields.place);
      }}
      styles={{
        controls: {
          display: "none",
          visibility: "hidden",
          opacity: 0,
          pointerEvents: "none",
        },
      }}
    >
      {data.map((item) => (
        <Carousel.Slide key={item.sys.id}>{renderCard(item)}</Carousel.Slide>
      ))}
    </Carousel>
  );

  return (
    <Container fluid px={"7%"} py={"70px"}>
      {/* Header */}
      <Center tt={"uppercase"}>
        <Title size={isMobile ? "lg" : "xl"} fw={800} lh={"lgx2"}>
          Our <span style={{ color: COLORS.serviceColor }}>Global</span>{" "}
          Presence
        </Title>
      </Center>

      {/* Map Section */}
      <Box pos="relative" w="100%" mx="auto">
        <Image
          src="/images/worldMap.png"
          alt="World Map"
          style={{ width: "100%", height: "auto" }}
        />
        {places.map((place, idx) => (
          <Tooltip
            key={idx}
            label={place.name}
            arrowSize={8}
            bg={"white"}
            c={"rgb(0, 33, 95)"}
            fz={20}
            fw={600}
            withArrow
          >
            <Box
              onClick={() => handlePlaceSelect(place.name)}
              style={{
                position: "absolute",
                left: place.x,
                top: place.y,
                transform: "translate(-50%, -100%)",
                cursor: "pointer",
              }}
            >
              <IconPinnedFilled
                size={selectedPlace === place.name ? 32 : 24}
                stroke={1.5}
                color={
                  selectedPlace === place.name ? "rgb(0, 33, 95)" : "#e84c4c"
                }
              />
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* India Section */}
      <Box mt={40}>
        <Title order={3} fw={800} mb={20} tt="uppercase">
          {highlightText("# Indian # Branches")}
        </Title>
        {isMobile ? (
          renderCarousel(indiaData)
        ) : (
          <Grid columns={12} align="center" justify="flex-start" gutter="xl">
            {indiaData.map((item) => (
              <GridCol key={item.sys.id} span={3}>
                {renderCard(item)}
              </GridCol>
            ))}
          </Grid>
        )}
      </Box>

      {/* Overseas Section */}
      <Box mt={60}>
        <Title order={3} fw={800} mb={20} tt="uppercase">
          {highlightText("# Overseas # Branches")}
        </Title>
        {isMobile ? (
          renderCarousel(overseasData)
        ) : (
          <Grid columns={12} align="center" justify="flex-start" gutter="xl">
            {overseasData.map((item) => (
              <GridCol key={item.sys.id} span={3}>
                {renderCard(item)}
              </GridCol>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Global;
