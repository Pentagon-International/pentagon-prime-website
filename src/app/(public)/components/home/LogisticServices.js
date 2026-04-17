'use client';
import { Button, Container, Flex, Grid, Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ServiceCard from "@/components/common/ServiceCard";
import { client } from "@/lib/api/contentful";
import { highlightText } from "@/app/utils/highlightText";
import { COLORS } from "@/app/utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { homeTypography } from "./homeTypography";

const LogisticsServices = ({ title }) => {

  const [serviceData, setServiceData] = useState([]);

  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await client.getEntries({
          content_type: "logisticsServices",
          order: "sys.createdAt",
        });
        setServiceData(res.items || []);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchServiceData();
  }, []);

  const anchorText = "Know More";

  return (
    <Container fluid px={"2%"} py={"70px"} bg={COLORS.backgroundColor}>
      <Flex direction={'row'} align={'center'} gap={'lg'} justify={'space-between'}>
        <Stack>
          <Title
            tt={"uppercase"}
            fw={800}
            style={{
              fontFamily: homeTypography.headingFontFamily,
              fontSize: homeTypography.sectionTitle.fontSize,
              lineHeight: homeTypography.sectionTitle.lineHeight,
            }}
          >
            {highlightText(title)}
          </Title>
        </Stack>
        {/* <Button
          fz={"sm"}
          size="lg"
          radius={"12px"}
          fw={600}
          bg={COLORS.serviceColor}
        >
          View All Services
        </Button> */}
      </Flex>
      <Grid columns={9} mt="lg" gutter="lg" w={'100%'}>
        {isMobile ? (
          <Carousel
            align={isMobile ? 'start' : 'center'} slideSize="70%" height={300} w={'100%'} slideGap="xs" loop
            styles={{
              controls: {
                display: 'none',
                visibility: 'hidden',
                opacity: 0,
                pointerEvents: 'none',
              },
            }}
          >
            {(serviceData || [])?.map((item, index) => (
              <Carousel.Slide key={item.sys.id} w={'100%'}>
                <ServiceCard
                  key={index}
                  item={item}
                  backgroundColor="#FFF"
                  anchorText={anchorText}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        ) :
          (
            serviceData || [])?.map((item, index) => (
              <ServiceCard
                key={index}
                item={item}
                backgroundColor="#FFF"
                anchorText={anchorText}
              />
            ))
        }
      </Grid>
    </Container>
  );
};

export default LogisticsServices;
