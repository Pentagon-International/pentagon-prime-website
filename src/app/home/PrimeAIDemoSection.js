"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconRobot,
  IconMessageCircle,
  IconShip,
  IconFolder,
} from "@tabler/icons-react";
import { COLORS } from "../utils/COLORS";
import { homeTypography } from "./homeTypography";

const capabilities = [
  {
    icon: IconRobot,
    title: "Robotic Process Automation",
    description:
      "Quotes, booking confirmations, and customs documents generated in seconds - no manual data entry.",
  },
  {
    icon: IconMessageCircle,
    title: "Generative AI Co-pilot",
    description:
      "Ask Prime anything - rate lookups, HS code classification, route optimization, compliance checks.",
  },
  {
    icon: IconShip,
    title: "Live Shipment Intelligence",
    description:
      "Real-time ETAs, port congestion alerts, and proactive exception notifications pushed to your inbox.",
  },
  {
    icon: IconFolder,
    title: "Self-Serve Client Portal",
    description:
      "Track shipments, download invoices, view documents - 24/7 without calling your coordinator.",
  },
];

const PrimeAIDemoSection = () => {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState(
    "What is the sea freight rate from Mumbai to Hamburg for a 20ft container?"
  );

  const handleAsk = () => {
    const value = question.trim();
    if (!value) return;
    setSubmittedQuestion(value);
    setQuestion("");
  };

  return (
    <Container fluid px="2%" py={70} bg={COLORS.backgroundColor}>
      <Grid gutter="xl" align="start">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Stack gap="lg">
            <Stack gap={6}>
              <Text
                fw={700}
                c={COLORS.portColor}
                style={{
                  fontFamily: homeTypography.bodyFontFamily,
                  fontSize: homeTypography.navLink.fontSize,
                  letterSpacing: "0.08em",
                }}
              >
                THE PRIME PLATFORM
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
                What does PRIME actually do?
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
                PRIME is Pentagon&apos;s proprietary freight operating system -
                combining AI-driven automation, real-time visibility and digital
                documentation in one platform your team and clients use every day.
              </Text>
            </Stack>

            <Stack gap="md">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    radius="md"
                    p="md"
                    bg="#FFFFFF"
                    style={{
                      border: `1px solid ${
                        index === 0 ? "rgba(14, 201, 242, 0.9)" : "rgba(17, 31, 64, 0.12)"
                      }`,
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.transform = "translateY(-6px)";
                      event.currentTarget.style.boxShadow = "0 12px 24px rgba(17,31,64,0.12)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.transform = "translateY(0)";
                      event.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon size={34} radius="md" variant="light" color="cyan">
                        <Icon size={18} color={COLORS.portColor} />
                      </ThemeIcon>
                      <Stack gap={4}>
                        <Text
                          fw={700}
                          c={COLORS.headerBackground}
                          style={{
                            fontFamily: homeTypography.headingFontFamily,
                            fontSize: "1.1rem",
                            lineHeight: 1.15,
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          c={COLORS.textColor}
                          style={{
                            fontFamily: homeTypography.bodyFontFamily,
                            fontSize: homeTypography.sectionSub.fontSize,
                            lineHeight: homeTypography.sectionSub.lineHeight,
                          }}
                        >
                          {item.description}
                        </Text>
                      </Stack>
                    </Group>
                  </Card>
                );
              })}
            </Stack>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }} style={{alignSelf: "center", justifySelf:"flex-start"}}>
          <Card
            radius="lg"
            p={0}
            bg="#FFFFFF"
            style={{
              border: "1px solid rgba(17, 31, 64, 0.12)",
              overflow: "hidden",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Group
              justify="space-between"
              px="md"
              py={10}
              style={{ backgroundColor: "rgba(14, 201, 242, 0.10)" }}
            >
              <Group gap={8}>
                <Text c="#FF6B6B" fw={700}>●</Text>
                <Text c="#FFA94D" fw={700}>●</Text>
                <Text c="#69DB7C" fw={700}>●</Text>
              </Group>
              <Text
                c={COLORS.headerBackground}
                style={{
                  fontFamily: homeTypography.bodyFontFamily,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                PRIME AI - Live Demo
              </Text>
              <Box w={44} />
            </Group>

            <Stack p="sm" gap="sm">
              <Stack gap={6}>
                <Text c={COLORS.textColor} style={{ fontSize: "0.76rem" }}>PRIME AI</Text>
                <Box
                  style={{
                    backgroundColor: "#F6FAFF",
                    border: "1px solid rgba(17, 31, 64, 0.12)",
                    borderRadius: 12,
                    padding: "10px 12px",
                  }}
                >
                  <Text
                    c={COLORS.headerBackground}
                    style={{ fontFamily: homeTypography.bodyFontFamily, fontSize: "0.9rem" }}
                  >
                    Hello! I can help with quotes, tracking, HS codes, and documentation. What do you need?
                  </Text>
                </Box>
              </Stack>

              <Stack gap={6} align="flex-end">
                <Text c={COLORS.textColor} style={{ fontSize: "0.76rem" }}>You</Text>
                <Box
                  style={{
                    backgroundColor: "#EAF8FF",
                    border: "1px solid rgba(14, 201, 242, 0.45)",
                    borderRadius: 12,
                    padding: "10px 12px",
                    width: "78%",
                  }}
                >
                  <Text
                    c={COLORS.headerBackground}
                    style={{ fontFamily: homeTypography.bodyFontFamily, fontSize: "0.88rem" }}
                  >
                    {submittedQuestion}
                  </Text>
                </Box>
              </Stack>

              <Stack gap={6}>
                <Text c={COLORS.textColor} style={{ fontSize: "0.76rem" }}>PRIME AI</Text>
                <Box
                  style={{
                    backgroundColor: "#F6FAFF",
                    border: "1px solid rgba(17, 31, 64, 0.12)",
                    borderRadius: 12,
                    padding: "10px 12px",
                  }}
                >
                  <Text c={COLORS.headerBackground} mb={8} style={{ fontSize: "0.88rem" }}>
                    For a <b>20ft GP</b> Mumbai - Hamburg:
                  </Text>
                  <Text c="#57E6FF" style={{ fontSize: "0.88rem" }}>Rate: <b>USD 1240 / TEU</b></Text>
                  <Text c={COLORS.headerBackground} style={{ fontSize: "0.88rem" }}>Transit: <b>21 days</b></Text>
                  <Text c="#76F0C2" style={{ fontSize: "0.88rem" }}>Next sailing: <b>Apr 02, 2026</b></Text>
                  <Text c={COLORS.headerBackground} mt={8} style={{ fontSize: "0.88rem" }}>Shall I generate a formal quotation?</Text>
                </Box>
              </Stack>

              <Group gap={8} wrap="nowrap">
                <TextInput
                  value={question}
                  onChange={(event) => setQuestion(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleAsk();
                  }}
                  placeholder="Ask Prime anything..."
                  radius="md"
                  styles={{
                    root: { flex: 1 },
                    input: {
                      fontFamily: homeTypography.bodyFontFamily,
                      fontSize: "0.88rem",
                    },
                  }}
                />
                <Button
                  onClick={handleAsk}
                  bg={COLORS.portColor}
                  c="#00215F"
                  radius="md"
                  style={{
                    fontFamily: homeTypography.bodyFontFamily,
                    fontWeight: 700,
                  }}
                >
                  Ask
                </Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default PrimeAIDemoSection;

