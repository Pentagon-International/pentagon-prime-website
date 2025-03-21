'use client';
import { Button, Container, Flex, Grid, Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ServiceCard from "../component/common/ServiceCard";
import { client } from "@/app/api/contentful";
import { highlightText } from "../utils/highlightText";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";

const LogisticsServices = ({ title }) => {

  const [serviceData, setServiceData] = useState([]);

  const isMobile = useMediaQuery("(max-width: 768px)");

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
    <Container fluid px={"7%"} py={"70px"} >
      <Flex direction={'row'} align={'center'} gap={'lg'} justify={'space-between'}>
        <Stack>
          <Title tt={"uppercase"} lh={"lgx2"} fw={800} size={isMobile ? "20px" : "34px"}>
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
          <Carousel  align={isMobile ? 'start' : 'center'} slideSize="70%" height={300} w={'100%'} slideGap="xs" loop dragFree>
            {(serviceData || [])?.map((item, index) => (
              <Carousel.Slide key={item.sys.id}>
                <ServiceCard
                  key={index}
                  item={item}
                  backgroundColor="#F2F7FC"
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
                backgroundColor="#F2F7FC"
                anchorText={anchorText}
              />
            ))
        }
      </Grid>
    </Container>
  );
};

export default LogisticsServices;
