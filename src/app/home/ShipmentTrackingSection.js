"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { COLORS } from "../utils/COLORS";
import { homeTypography } from "./homeTypography";

const mockShipments = {
  "PPTM-2024-04821": {
    blNo: "PPTM-2024-04821",
    route: "Mumbai (BOM) -> Jebel Ali (DXB) -> Suez -> Rotterdam (RTM)",
    eta: "Mar 30",
    status: "On Track",
    events: [
      { title: "Departed - Mumbai (BOM)", date: "Mar 10, 2026" },
      { title: "Transshipment - Dubai (DXB)", date: "Mar 18, 2026" },
      { title: "In Transit - Suez Canal", date: "Mar 23, 2026" },
      { title: "Arrival - Rotterdam (RTM)", date: "Mar 30, 2026 (ETA)" },
    ],
  },
};

const ShipmentTrackingSection = () => {
  const [query, setQuery] = useState("");
  const [searchedRef, setSearchedRef] = useState("");

  const shipment = useMemo(() => {
    if (!searchedRef) return null;
    const normalized = searchedRef.trim().toUpperCase();
    return (
      mockShipments[normalized] || {
        blNo: normalized,
        route: "Mumbai (BOM) -> Jebel Ali (DXB) -> Suez -> Rotterdam (RTM)",
        eta: "Mar 30",
        status: "In Progress",
        events: [
          { title: "Booking Confirmed", date: "Shipment details synced" },
          { title: "Gate In Completed", date: "Origin terminal updated" },
          { title: "In Transit", date: "Latest milestone available" },
        ],
      }
    );
  }, [searchedRef]);

  const handleTrack = () => {
    const value = query.trim();
    if (!value) return;
    setSearchedRef(value);
  };

  return (
    <Container fluid px="2%" py={70} bg={COLORS.backgroundColor}>
      <Stack gap="md" maw={980} mx="auto">
        <Stack gap={6} align="center">
          <Text
            fw={700}
            c={COLORS.portColor}
            style={{
              fontFamily: homeTypography.bodyFontFamily,
              fontSize: homeTypography.navLink.fontSize,
              letterSpacing: "0.08em",
            }}
          >
            LIVE TRACKING
          </Text>
          <Title
            order={2}
            ta="center"
            style={{
              color: COLORS.headerBackground,
              fontFamily: homeTypography.headingFontFamily,
              fontSize: homeTypography.sectionTitle.fontSize,
              lineHeight: homeTypography.sectionTitle.lineHeight,
            }}
          >
            Track Your Shipment
          </Title>
          <Text
            ta="center"
            c={COLORS.textColor}
            style={{
              fontFamily: homeTypography.bodyFontFamily,
              fontSize: homeTypography.sectionSub.fontSize,
              lineHeight: homeTypography.sectionSub.lineHeight,
            }}
          >
            Enter your B/L number or booking reference to view current shipment
            milestones.
          </Text>
        </Stack>

        <Flex gap="sm" align="center" direction={{ base: "column", sm: "row" }}>
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleTrack();
            }}
            radius="md"
            size="md"
            placeholder="PPTM-2024-04821"
            leftSection={<IconSearch size={16} color={COLORS.textColor} />}
            style={{ flex: 1, width: "100%" }}
            styles={{
              input: {
                fontFamily: homeTypography.bodyFontFamily,
                fontSize: homeTypography.sectionSub.fontSize,
              },
            }}
          />
          <Button
            onClick={handleTrack}
            radius="md"
            size="md"
            bg={COLORS.portColor}
            c={COLORS.headerBackground}
            style={{
              fontFamily: homeTypography.bodyFontFamily,
              fontWeight: 700,
              minWidth: 120,
            }}
          >
            Track
          </Button>
        </Flex>

        {shipment && (
          <Card radius="lg" p="lg" withBorder bg="#FFFFFF">
            <Flex justify="space-between" align="center" wrap="wrap" gap="sm">
              <Text
                fw={700}
                style={{
                  color: COLORS.headerBackground,
                  fontFamily: homeTypography.bodyFontFamily,
                  fontSize: homeTypography.sectionSub.fontSize,
                }}
              >
                B/L: {shipment.blNo}
              </Text>
              <Badge color="teal" variant="light">
                {shipment.status} - ETA {shipment.eta}
              </Badge>
            </Flex>

            <Text
              mt="xs"
              c={COLORS.textColor}
              style={{
                fontFamily: homeTypography.bodyFontFamily,
                fontSize: homeTypography.sectionSub.fontSize,
                lineHeight: homeTypography.sectionSub.lineHeight,
              }}
            >
              {shipment.route}
            </Text>

            <Divider my="md" />

            <Stack gap="sm">
              {shipment.events.map((event, index) => (
                <Box key={`${event.title}-${index}`}>
                  <Text
                    fw={600}
                    style={{
                      color: COLORS.headerBackground,
                      fontFamily: homeTypography.bodyFontFamily,
                      fontSize: homeTypography.sectionSub.fontSize,
                    }}
                  >
                    {event.title}
                  </Text>
                  <Text
                    c={COLORS.textColor}
                    style={{
                      fontFamily: homeTypography.bodyFontFamily,
                      fontSize: "0.86rem",
                    }}
                  >
                    {event.date}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
};

export default ShipmentTrackingSection;

