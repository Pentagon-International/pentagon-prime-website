"use client";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Image,
  Box,
  Group,
  Grid,
  Flex,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { apiCallProtected } from "../api/api";
import { COLORS } from "../utils/COLORS";
import { TYPOGRAPHY } from "../utils/TYPOGRAPHY";
import { useMediaQuery } from "@mantine/hooks";

const logos = {
  "ASYAD SEABRIDGE": "/shipping-line-logo/ASYAD.jpg",
  "American President Lines": "/shipping-line-logo/APL.jpg",
  "BEN LINE": "/shipping-line-logo/BEN-LINE.jpg",
  CEEKAY: "/shipping-line-logo/CEEKAY.jpg",
  "CMA-CGM": "/shipping-line-logo/CMA-CGM.jpg",
  CORDELIA: "/shipping-line-logo/CORDELIA.jpg",
  "COSCO SHIPPING LINES (INDIA) PRIVATE LIMITED":
    "/shipping-line-logo/COSCO.jpg",
  DAHNAY: "/shipping-line-logo/DAHNAY.jpg",
  ECHONSHIP: "/shipping-line-logo/ECHONSHIP.jpg",
  "EMIRATES SHIPPING AGENCIES (I) PVT LTD": "/shipping-line-logo/EMIRATES.jpg",
  EVERGREEN: "/shipping-line-logo/EVERGREEN.jpg",
  "FCLS-GIL-VOLTA": "/shipping-line-logo/FCLS-GIL-VOLTA.jpg",
  GOODRICH: "/shipping-line-logo/GOODRICH.jpg",
  "HAM - SUD": "/shipping-line-logo/HAM-SUD.jpg",
  HAPAG: "/shipping-line-logo/HAPAG.jpg",
  "HMM SHIPPING INDIA PVT LTD": "/shipping-line-logo/HMM.jpg",
  "HUEANG HAL SINOKOR": "/shipping-line-logo/HUEANG.jpg",
  IAL: "/shipping-line-logo/IAL.jpg",
  KMTC: "/shipping-line-logo/KMTC.jpg",
  LANCERCTNR: "/shipping-line-logo/LANCERCTNR.jpg",
  "LG-E-SHIP": "/shipping-line-logo/LG-E-SHIP.jpg",
  "MAXICON SHIPPING AGENCIES": "/shipping-line-logo/MAXICON.jpg",
  MSC: "/shipping-line-logo/MSC.jpg",
  "MSK-SAF": "/shipping-line-logo/MAERSK.jpg",
  "NAVIO SHIPPING PVT LTD": "/shipping-line-logo/NAVIO.jpg",
  "New Star": "/shipping-line-logo/NEWSTAR.jpg",
  "Nile dutch lines": "/shipping-line-logo/NILEDUTCH.jpg",
  ONE: "/shipping-line-logo/ONE.jpg",
  OOCL: "/shipping-line-logo/OOCL.jpg",
  PERMA: "/shipping-line-logo/PERMA.jpg",
  PIL: "/shipping-line-logo/PIL.jpg",
  "POSIEDON-BLUE-SCL": "/shipping-line-logo/POSIEDON.jpg",
  RCL: "/shipping-line-logo/RCL.jpg",
  "SAMUDRA SHIPPING LINE LTD.": "/shipping-line-logo/SAMUDRA.jpg",
  SARJAK: "/shipping-line-logo/SARJAK.jpg",
  SCI: "/shipping-line-logo/SCI.jpg",
  "SCL LINE": "/shipping-line-logo/SCI-LINE.jpg",
  "SEA HORSE": "/shipping-line-logo/SEAHORSE.jpg",
  "SEA LED": "/shipping-line-logo/SEALEAD.jpg",
  SEAGOLD: "/shipping-line-logo/SEAGOLD.jpg",
  "SINOKOR LINE": "/shipping-line-logo/SINOKAR.jpg",
  SNL: "/shipping-line-logo/SNL.jpg",
  TRANSLINER: "/shipping-line-logo/TRANSLINER.jpg",
  "TS Lines": "/shipping-line-logo/TSLINES.jpg",
  UNIFEEDER: "/shipping-line-logo/UNIFEEDER.jpg",
  VASI: "/shipping-line-logo/VASI.jpg",
  "WAN HAI": "/shipping-line-logo/WANHAI.jpg",
  "WIN WIN": "/shipping-line-logo/WINWIN.jpg",
  YML: "/shipping-line-logo/YML.jpg",
  "Z LINE": "/shipping-line-logo/ZLINE.jpg",
  "ZIM IINTEGRATED SHIPPING SERVICES(INDIA) PVT. LTD.":
    "/shipping-line-logo/ZIM.jpg",
};
const HIDE_LINES = [
  "ASYAD SEABRIDGE",
  "CEEKAY",
  "CORDELIA",
  "DAHNAY",
  "ECHONSHIP",
  "EMIRATES SHIPPING AGENCIES (I) PVT LTD",
  "FCLS-GIL-VOLTA",
  "GOODRICH",
  "IAL",
  "LANCERCTNR",
  "LG-E-SHIP",
  "MAXICON SHIPPING AGENCIES",
  "NAVIO SHIPPING PVT LTD",
  "PERMA",
  "POSIEDON-BLUE-SCL",
  "SARJAK",
  "SCL LINE",
  "SEA HORSE",
  "SEA LED",
  "SEAGOLD",
  "SNL",
  "TRANSLINER",
  "VASI",
  "WIN WIN",
];

const ShipLines = () => {
  const shipmentLinesQuery = useQuery({
    queryKey: ["shipment-types"],
    queryFn: async () => {
      const response = await apiCallProtected.get("/pentagon/shippingLInes");
      return response.data;
    },
    select: ({ data }) => {
      return data?.map((item) => ({
        label: item.name,
        logo: "https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg",
      }));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Container fluid px="2%" py="70px" bg={COLORS.backgroundColor}>
      <Title
        size={isMobile ? TYPOGRAPHY.h5.desktop : "lg"}
        lh={isMobile ? "md" : "lgx2"}
        tt={"uppercase"}
        fw={800}
        ta="center"
      >
        {/* <Title size="lg" tt="uppercase" ta="center"> */}
        SHIPPING LINES
      </Title>
      <Text mt={10} size="sm" ta="center" c={COLORS.textColor}>
        shipping lines, Track shipment, View rates, Get schedules
      </Text>

      <SimpleGrid
        mt="80px"
        cols={{ base: 1, sm: 2, md: 3, lg: 3 }}
        spacing={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
      >
        {shipmentLinesQuery?.data
          ?.filter((item) => !HIDE_LINES.includes(item.label))
          .map((item) => (
            <Box key={item.id} p="md" bg="#FFF" style={{ borderRadius: 8 }}>
              {/* <Group align="center" justify="flex-start"> */}
              <Grid>
                <Grid.Col span={3}>
                  <Image
                    src={logos[item.label]}
                    alt={item.label}
                    radius="md"
                    fit="contain"
                    // withPlaceholder
                    style={{
                      height: 50,
                      width: "100%",
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={9}>
                  <Flex align={"center"} h={"100%"}>
                    <Text
                      tw="balance"
                      c={COLORS.textColor}
                      lh={"sm"}
                      fw={500}
                      size="sm"
                      style={{ flexGrow: 1 }}
                    >
                      {/* <Text size="xs" fw={500}> */}
                      {item.label}
                    </Text>
                  </Flex>
                </Grid.Col>
              </Grid>

              {/* </Group> */}
            </Box>
          ))}
      </SimpleGrid>
    </Container>
  );
};

export default ShipLines;
