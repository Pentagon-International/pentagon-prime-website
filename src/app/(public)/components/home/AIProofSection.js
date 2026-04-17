"use client";

import { Badge, Box, Card, Container, Grid, Group, Stack, Text, Title } from "@mantine/core";
import {
  IconFileUpload,
  IconSearch,
  IconAlertTriangle,
  IconCheckbox,
} from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";
import { homeTypography } from "./homeTypography";

const rightSteps = [
  {
    icon: IconFileUpload,
    title: "1. Upload any document",
    description:
      "Invoice, packing list, or certificate. PRIME accepts PDF, image, or EDI. No template required.",
    badge: "Instant ingestion",
  },
  {
    icon: IconSearch,
    title: "2. AI extracts & cross-validates",
    description:
      "Fields extracted and cross-checked against BL, customs tariff schedules, and carrier data - automatically.",
    badge: "97% field accuracy",
  },
  {
    icon: IconAlertTriangle,
    title: "3. Errors flagged before submission",
    description:
      "Mismatched weights, wrong HS codes, expired certs - all flagged in seconds, not after a customs hold.",
    badge: "Pre-clearance safety",
  },
  {
    icon: IconCheckbox,
    title: "4. Verified & submitted automatically",
    description:
      "Clean, validated documentation transmitted to customs. No manual re-entry, no delay, no back-and-forth.",
    badge: "80% less processing time",
  },
];

const AIProofSection = () => {
  return (
    <Container fluid px="2%" py={70} bg={COLORS.backgroundColor}>
      <Stack gap="sm" mb="xl">
        <Text
          fw={700}
          c={COLORS.portColor}
          style={{
            fontFamily: homeTypography.bodyFontFamily,
            fontSize: homeTypography.navLink.fontSize,
            letterSpacing: "0.08em",
          }}
        >
          AI IN ACTION
        </Text>

        <Title
          order={2}
          style={{
            color: COLORS.headerBackground,
            fontFamily: homeTypography.headingFontFamily,
            fontSize: homeTypography.sectionTitle.fontSize,
            lineHeight: homeTypography.sectionTitle.lineHeight,
          }}
        >
          Proof - not promises
        </Title>

        <Text
          c={COLORS.textColor}
          maw={650}
          style={{
            fontFamily: homeTypography.bodyFontFamily,
            fontSize: homeTypography.sectionSub.fontSize,
            lineHeight: homeTypography.sectionSub.lineHeight,
          }}
        >
          Here is what AI-powered document verification actually looks like at
          Pentagon Prime.
        </Text>
      </Stack>

      <Grid gutter="lg" align="stretch">
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Card
            withBorder
            radius="lg"
            p={0}
            h="100%"
            bg="#FFFFFF"
            style={{
              borderColor: "rgba(17, 31, 64, 0.12)",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Stack gap="md">
              <Group
                justify="space-between"
                px="md"
                py={10}
                style={{
                  backgroundColor: "rgba(14, 201, 242, 0.10)",
                  borderTopLeftRadius: "inherit",
                  borderTopRightRadius: "inherit",
                }}
              >
                <Group gap={8}>
                  <Text c="#FF6B6B" fw={700}>●</Text>
                  <Text c="#FFA94D" fw={700}>●</Text>
                  <Text c="#69DB7C" fw={700}>●</Text>
                </Group>
                <Text
                  fw={500}
                  style={{
                    color: COLORS.headerBackground,
                    fontFamily: homeTypography.bodyFontFamily,
                    fontSize: "0.86rem",
                  }}
                >
                  PRIME Document Intelligence - Live Demo
                </Text>
                <Box w={44} />
              </Group>

              <Stack px="md" pb="md" gap="md">
              <Card
                withBorder
                radius="md"
                p="md"
                bg="#FFF7F7"
                style={{ borderColor: "rgba(255, 107, 107, 0.30)" }}
              >
                <Text
                  fw={700}
                  c="#C92A2A"
                  mb="xs"
                  style={{
                    fontFamily: homeTypography.bodyFontFamily,
                    fontSize: "0.88rem",
                  }}
                >
                  BEFORE - MANUAL ENTRY (3 ERRORS FOUND)
                </Text>
                <Stack gap={6}>
                  <Box style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1.25fr", alignItems: "center", gap: "8px 16px" }}>
                    <Text c={COLORS.textColor} fz="0.86rem">HS Code</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">854140.00</Text>
                    <Text fw={700} c="#FF6B6B" fz="0.86rem" ta="right">MISMATCH</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Gross Weight</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">2,450 KG</Text>
                    <Text fw={700} c="#FF6B6B" fz="0.86rem" ta="right">BL says 2,850</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Country Of Origin</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">China</Text>
                    <Text fw={700} c="#00E599" fz="0.86rem" ta="right">OK</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Incoterm</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">FOB</Text>
                    <Text fw={700} c="#00E599" fz="0.86rem" ta="right">OK</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Customs Duty</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">12.5%</Text>
                    <Text fw={700} c="#FF6B6B" fz="0.86rem" ta="right">Rate changed: 10%</Text>
                  </Box>
                </Stack>
              </Card>

              <Text
                ta="center"
                fw={700}
                c="#2C7BFF"
                style={{
                  fontFamily: homeTypography.headingFontFamily,
                  fontSize: "1.4rem",
                }}
              >
                ↓ AI corrects & validates in 4 seconds
              </Text>

              <Card
                withBorder
                radius="md"
                p="md"
                bg="#F3FFFA"
                style={{ borderColor: "rgba(0, 229, 153, 0.35)" }}
              >
                <Text
                  fw={700}
                  c="#1E9D73"
                  mb="xs"
                  style={{
                    fontFamily: homeTypography.bodyFontFamily,
                    fontSize: "0.88rem",
                  }}
                >
                  AFTER - PRIME VERIFIED & CLEARED
                </Text>
                <Stack gap={6}>
                  <Box style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1.25fr", alignItems: "center", gap: "8px 16px" }}>
                    <Text c={COLORS.textColor} fz="0.86rem">HS Code</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">854143.00</Text>
                    <Text fw={700} c="#00E599" fz="0.86rem" ta="right">Auto-corrected</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Gross Weight</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">2,850 KG</Text>
                    <Text fw={700} c="#00E599" fz="0.86rem" ta="right">Matched to BL</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Country of Origin</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">China</Text>
                    <Text fw={700} c="#00E599" fz="0.86rem" ta="right">OK</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Incoterm</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">FOB</Text>
                    <Text fw={700} c="#00E599" fz="0.86rem" ta="right">OK</Text>

                    <Text c={COLORS.textColor} fz="0.86rem">Customs Duty</Text>
                    <Text fw={700} c={COLORS.headerBackground} fz="0.96rem" ta="center">10.0%</Text>
                    <Text fw={700} c="#00E599" fz="0.86rem" ta="right">Updated to current</Text>
                  </Box>
                </Stack>
              </Card>

              <Card
                withBorder
                radius="md"
                p="sm"
                bg="#F6FAFF"
                style={{ borderColor: "rgba(17, 31, 64, 0.12)" }}
              >
                <Text
                  style={{
                    color: COLORS.textColor,
                    fontFamily: homeTypography.bodyFontFamily,
                    fontSize: "0.84rem",
                  }}
                >
                  Errors caught before submission = no delays, no fines, no customs holds.
                </Text>
              </Card>
              </Stack>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Stack gap="md">
            {rightSteps.map((step, index) => {
              const Icon = step.icon;
              const isDarkCard = index % 2 === 1;
              return (
                <Card
                  key={step.title}
                  withBorder
                  radius="lg"
                  p="md"
                  bg={isDarkCard ? "rgb(0,33,95)" : "#FFFFFF"}
                >
                  <Group align="flex-start" wrap="nowrap">
                    <Icon size={20} color={isDarkCard ? "#46DABE" : COLORS.portColor} />
                    <Stack gap={6} style={{ flex: 1 }}>
                      <Text
                        fw={700}
                        style={{
                          color: isDarkCard ? "#FFFFFF" : COLORS.headerBackground,
                          fontFamily: homeTypography.headingFontFamily,
                          fontSize: "1.05rem",
                          lineHeight: 1.25,
                        }}
                      >
                        {step.title}
                      </Text>
                      <Text
                        style={{
                          color: isDarkCard ? "#D9E6FF" : COLORS.textColor,
                          fontFamily: homeTypography.bodyFontFamily,
                          fontSize: homeTypography.sectionSub.fontSize,
                          lineHeight: homeTypography.sectionSub.lineHeight,
                        }}
                      >
                        {step.description}
                      </Text>
                      <Badge
                        color={isDarkCard ? "cyan" : "teal"}
                        variant="light"
                        w="fit-content"
                      >
                        {step.badge}
                      </Badge>
                    </Stack>
                  </Group>
                </Card>
              );
            })}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AIProofSection;

