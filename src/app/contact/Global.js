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
  Popover,
} from "@mantine/core";
import { IconPhoneCall, IconPinnedFilled } from "@tabler/icons-react";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { client } from "../api/contentful";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";

// Country → list of place names (branch names in Contentful)
const COUNTRY_CONFIG = [
  { country: "India", places: ["New Delhi", "Pune", "Bangalore", "Chennai", "Ahmedabad"] },
  { country: "USA", places: ["USA"] },
  { country: "Kenya", places: ["Kenya"] },
  { country: "Dubai", places: ["Dubai"] },
  { country: "Vietnam", places: ["Vietnam"] },
  { country: "China", places: ["China"] },
];

// Place name → map position (percentage)
const PLACE_COORDS = {
  USA: { x: "21%", y: "48%" },
  Kenya: { x: "62%", y: "62.5%" },
  Dubai: { x: "66%", y: "51%" },
  "New Delhi": { x: "73.5%", y: "50%" },
  Pune: { x: "73%", y: "54%" },
  Bangalore: { x: "73.5%", y: "57%" },
  Chennai: { x: "75%", y: "57%" },
  Vietnam: { x: "83.5%", y: "57%" },
  Ahmedabad: { x: "71.5%", y: "52%" },
  China: { x: "85.5%", y: "51%" },
};

const Global = () => {
  const [locationData, setLocationData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [popoverPlace, setPopoverPlace] = useState(null);
  const mapSectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: "location",
          order: "sys.createdAt",
        });
        setLocationData(res.items);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchData();
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleCountryClick = useCallback(
    (country) => {
      setSelectedCountry(country);
      setPopoverPlace(null);
      mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const branchesForCountry = useMemo(() => {
    const config = COUNTRY_CONFIG.find((c) => c.country === selectedCountry);
    if (!config) return [];
    return locationData.filter((item) =>
      config.places.includes(item.fields.place)
    );
  }, [selectedCountry, locationData]);

  const renderCountryCard = (countryName) => {
    const isSelected = selectedCountry === countryName;
    return (
      <Card
        key={countryName}
        bg={isSelected ? "rgb(0, 33, 95)" : "#FFF"}
        c={isSelected ? "#FFF" : "#000"}
        shadow="md"
        radius="24px"
        p={16}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "rgb(0, 51, 145)";
            e.currentTarget.style.color = "#FFF";
            e.currentTarget.style.border = "3px solid rgb(0, 51, 145)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "#FFF";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.border = "3px solid #E0E0E0";
          }
        }}
        onClick={() => handleCountryClick(countryName)}
        style={{
          transition: "all 0.5s ease",
          cursor: "pointer",
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: isSelected ? "3px solid rgb(0, 33, 95)" : "3px solid #E0E0E0",
        }}
      >
        <Title size="md" fw={700} order={5} c={isSelected ? "white" : "inherit"}>
          {countryName}
        </Title>
      </Card>
    );
  };

  const countryCarousel = (
    <Carousel
      mt={20}
      align="start"
      slideSize="80%"
      height="auto"
      w="100%"
      slideGap="xs"
      loop
      styles={{
        controls: { display: "none", visibility: "hidden", opacity: 0, pointerEvents: "none" },
      }}
    >
      {COUNTRY_CONFIG.map(({ country }) => (
        <Carousel.Slide key={country}>{renderCountryCard(country)}</Carousel.Slide>
      ))}
    </Carousel>
  );

  return (
    <Container fluid px={"7%"} py={"70px"} bg={COLORS.backgroundColor}>
      <Center tt={"uppercase"}>
        <Title size={isMobile ? "lg" : "xl"} fw={800} lh={"lgx2"}>
          Our <span style={{ color: COLORS.serviceColor }}>Global</span> Presence
        </Title>
      </Center>

      {/* Country list – only country names */}
      <Box mt={32}>
        {isMobile ? (
          countryCarousel
        ) : (
          <Grid columns={12} align="center" justify="flex-start" gutter="xl">
            {COUNTRY_CONFIG.map(({ country }) => (
              <GridCol key={country} span={2}>
                {renderCountryCard(country)}
              </GridCol>
            ))}
          </Grid>
        )}
      </Box>

      {/* Map – pins only for selected country's branches */}
      <Box
        ref={mapSectionRef}
        pos="relative"
        w="100%"
        mx="auto"
        py="lg"
        mt={40}
        style={{ borderRadius: "16px" }}
      >
        <Image
          src="/images/worldMap.png"
          alt="World Map"
          style={{ width: "100%", height: "auto", borderRadius: "16px" }}
        />
        {branchesForCountry.map((item) => {
          const placeName = item.fields.place;
          const coords = PLACE_COORDS[placeName];
          if (!coords) return null;
          const isPopoverOpen = popoverPlace === placeName;
          return (
            <Popover
              key={item.sys.id}
              position="bottom"
              withArrow
              shadow="md"
              opened={isPopoverOpen}
              onChange={(open) => { if (!open) setPopoverPlace(null); }}
            >
              <Popover.Target>
                <Box
                  onClick={() => setPopoverPlace((p) => (p === placeName ? null : placeName))}
                  style={{
                    position: "absolute",
                    left: coords.x,
                    top: coords.y,
                    transform: "translate(-50%, -100%)",
                    cursor: "pointer",
                  }}
                >
                  <IconPinnedFilled
                    size={isPopoverOpen ? 32 : 24}
                    stroke={1.5}
                    color={isPopoverOpen ? "rgb(0, 33, 95)" : "#e84c4c"}
                  />
                </Box>
              </Popover.Target>
              <Popover.Dropdown>
                <Box maw={280}>
                  <Text size="sm" fw={600} mb={4}>
                    {item.fields.place}
                  </Text>
                  <Text size="xs" c="dimmed" mb={8}>
                    {item.fields.address}
                  </Text>
                  <Group gap={6} align="center">
                    <IconPhoneCall size={14} color={COLORS.serviceColor} />
                    <Text size="xs">{item.fields.number}</Text>
                  </Group>
                </Box>
              </Popover.Dropdown>
            </Popover>
          );
        })}
      </Box>
    </Container>
  );
};

export default Global;
