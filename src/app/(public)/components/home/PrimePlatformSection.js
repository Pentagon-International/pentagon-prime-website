"use client";

import { Badge, Card, Container, Grid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import {
  IconBolt,
  IconRobot,
  IconShip,
  IconFileText,
  IconMessage2,
  IconChartBar,
} from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";
import { homeTypography } from "./homeTypography";

const platformCards = [
  {
    icon: IconBolt,
    title: "AI Quoting - 10 seconds",
    description:
      "Type origin and destination. PRIME scans 50+ carriers and returns ranked options with all-in prices, transit times, and reliability scores - instantly.",
    badge: "80% faster than traditional",
  },
  {
    icon: IconRobot,
    title: "RPA - Automatic Documentation",
    description:
      "Robotic Process Automation captures data from ports, carriers, and customs systems. Bills of lading, certificates, and invoices prepared and validated automatically.",
    badge: "80% less manual data entry",
  },
  {
    icon: IconShip,
    title: "Tracking - Real-Time Visibility",
    description:
      "Know where your cargo is, updated every 15 minutes. AI-predicted ETAs with confidence scores, port alert notifications, and delay early-warnings.",
    badge: "15-min refresh cycle",
  },
  {
    icon: IconFileText,
    title: "Document Intelligence",
    description:
      "AI reads, extracts, and cross-validates your trade documents. Wrong HS code? Mismatched weight? Flagged before customs - not after a costly delay.",
    badge: "Pre-clearance validation",
  },
  {
    icon: IconMessage2,
    title: "Ask Prime - AI Agent",
    description:
      "Ask anything in plain language: rates, tracking, customs rules, port conditions. Prime answers from live data - not a FAQ page. Available 24/7.",
    badge: "<2s response time",
  },
  {
    icon: IconChartBar,
    title: "Client Analytics Portal",
    description:
      "Self-serve dashboard: freight spend by lane, CO2 per shipment, invoice history, carrier performance - all without calling your account manager.",
    badge: "Full self-serve access",
  },
];

const PrimePlatformSection = () => {
  return (
    <Container fluid px="2%" py={70} bg={COLORS.backgroundColor}>
      <Stack gap="sm">
        <Text
          fw={700}
          c={COLORS.portColor}
          style={{
            fontFamily: homeTypography.bodyFontFamily,
            fontSize: homeTypography.navLink.fontSize,
            letterSpacing: "0.08em",
          }}
        >
          PRIME PLATFORM
        </Text>

        <Title
          order={2}
          maw={760}
          style={{
            color: COLORS.headerBackground,
            fontFamily: homeTypography.headingFontFamily,
            fontSize: homeTypography.sectionTitle.fontSize,
            lineHeight: homeTypography.sectionTitle.lineHeight,
          }}
        >
          What our AI actually does for your shipments
        </Title>

        <Text
          c={COLORS.textColor}
          maw={620}
          style={{
            fontFamily: homeTypography.bodyFontFamily,
            fontSize: homeTypography.sectionSub.fontSize,
            lineHeight: homeTypography.sectionSub.lineHeight,
          }}
        >
          No jargon. Here is what the PRIME platform delivers.
        </Text>
      </Stack>

      <Grid mt="xl" gutter="lg">
        {platformCards.map((item) => {
          const IconComponent = item.icon;
          return (
            <Grid.Col key={item.title} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card
                radius="lg"
                p="lg"
                h="100%"
                withBorder
                bg="#FFFFFF"
                style={{
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-8px)";
                  event.currentTarget.style.boxShadow = "0 12px 28px rgba(17,31,64,0.14)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.boxShadow = "";
                }}
              >
                <Stack gap="sm">
                  <ThemeIcon size={38} radius="md" variant="light" color="cyan">
                    <IconComponent size={20} />
                  </ThemeIcon>

                  <Title
                    order={4}
                    style={{
                      color: COLORS.headerBackground,
                      fontFamily: homeTypography.headingFontFamily,
                      fontSize: "1.2rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}
                  </Title>

                  <Text
                    style={{
                      color: COLORS.textColor,
                      fontFamily: homeTypography.bodyFontFamily,
                      fontSize: homeTypography.sectionSub.fontSize,
                      lineHeight: homeTypography.sectionSub.lineHeight,
                    }}
                  >
                    {item.description}
                  </Text>

                  <Badge mt="xs" color="teal" variant="light" w="fit-content">
                    {item.badge}
                  </Badge>
                </Stack>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};

export default PrimePlatformSection;

