"use client";

import {
  Accordion,
  Box,
  Button,
  Container,
  Flex,
  rem,
  ScrollArea,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconAnchor,
  IconBuilding,
  IconShip,
  IconAlertCircle,
  IconClock,
  IconPlaneTilt,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useCustomerRequestStore from "../../store/customerRequestStore";
import { COLORS } from "../../utils/COLORS";
import { TYPOGRAPHY } from "../../utils/TYPOGRAPHY";
import useTransportStore from "@/app/store/transportStore";
import getEmojiFlag from "@/app/utils/isoMap";

const ROUTE_LINE_COLOR = COLORS.pointerBackground;

function TariffCardBlock({ item, index, expandedId, onExpand, isMobile }) {
  const { airPortMap, seaPortMap } = useTransportStore();
  const accordionValue = `rate-${item.carrier_code ?? item.tariff_id ?? index}`;
  const carrierName =
    item.carrier_name ?? item.tariff_charges?.[0]?.carrier_name ?? "Carrier";
  const carrierCode =
    item.carrier_code ?? item.tariff_charges?.[0]?.carrier_code ?? "";
  const price =
    item.overall_total ?? item.per_container_rate ?? item.total_rate ?? 0;
  const chargesList = item.charges ?? item.tariff_charges ?? [];
  const currency = chargesList[0]?.currency_code ?? "USD";
  const fsBody = isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal;
  const fsSmall = isMobile ? TYPOGRAPHY.body.xsmall : TYPOGRAPHY.body.small;
  const fsCaption = TYPOGRAPHY.caption.small;
  const getPortDetails = (code) => {
    return airPortMap[code] || seaPortMap[code] || null;
  };
  const originDetails = getPortDetails(item.origin_code);
  const destinationDetails = getPortDetails(item.destination_code);
  return (
    <Box
      mb="lg"
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        borderRadius: "16px",
      }}
    >
      {/* Accordion below card — Rate details + charges table */}
      <Accordion
        value={expandedId}
        onChange={(v) => onExpand(v || null)}
        styles={{
          root: { marginTop: 0 },
          item: {
            backgroundColor: COLORS.accordian_background,
            borderRadius: "16px",
            border: `1px solid rgba(0,0,0,0.06)`,
            overflow: "hidden",
          },
          control: {
            padding: `${rem(12)} ${rem(16)}`,
            fontSize: fsBody,
            color: COLORS.secondaryColor,
            fontWeight: 600,
          },
          panel: {
            padding: rem(16),
            backgroundColor: "#fff",
            borderTop: `1px solid rgba(0,0,0,0.06)`,
          },
        }}
      >
        <Accordion.Item value={accordionValue}>
          {/* Card — no accordion inside */}
          <Box
            p="lg"
            style={{
              backgroundColor: "white",
              borderRadius: expandedId
                ? "16px 16px 0px 0px"
                : "16px 16px 16px 16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Header: Carrier + ID */}
            <Flex justify="space-between" align="center" gap="md" mb="md">
              <Flex align="center" gap="sm" style={{ flex: 1 }}>
                <Box
                  style={{
                    width: rem(40),
                    height: rem(40),
                    borderRadius: rem(8),
                    background: "transparent",
                    border: `1px solid rgb(0,33,95)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item?.service === "AIR" ? (
                    <IconPlaneTilt size={22} color={COLORS.contactBackground} />
                  ) : (
                    <IconShip size={22} color={COLORS.contactBackground} />
                  )}
                </Box>
                {carrierName || carrierCode ? (
                  <Text
                    fw={600}
                    style={{ fontSize: fsBody }}
                    c={COLORS.secondaryColor}
                  >
                    {carrierName}
                    {carrierCode ? ` (${carrierCode})` : ""}
                  </Text>
                ) : (
                  <Tooltip
                    label="Carrier to be nominated, not yet determined at the moment of booking"
                    multiline
                    w={260}
                    withArrow
                    arrowSize={8}
                    arrowOffset={12}
                    arrowRadius={2}
                    position="top"
                    color="dark"
                    styles={{
                      tooltip: {
                        backgroundColor: "#071A44", // dark navy like your image
                        color: "#ffffff",
                        fontSize: "14px",
                        padding: "12px 16px",
                        borderRadius: "8px",
                      },
                    }}
                  >
                    <Text
                      fw={600}
                      style={{ fontSize: fsBody, cursor: "pointer" }}
                      c={COLORS.secondaryColor}
                    >
                      Carrier TBN
                    </Text>
                  </Tooltip>
                )}
              </Flex>
              <Flex style={{ alignItems: "center", gap: 10 }}>
                <Accordion.Control
                  styles={{
                    control: {
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgb(0,33,95)",
                      width: "100%",
                      maxWidth: "250px",
                    },
                    label: {
                      padding: 0,
                      paddingRight: "5px",
                    },
                  }}
                >
                  Rate details
                </Accordion.Control>
                {/* 
                <Text size="xs" c="dimmed" fw={600} w={180} ta={"right"}>
                  CODE: {item.tariff_code ?? index}
                </Text> */}
              </Flex>
            </Flex>
            <Flex
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: 40,
              }}
            >
              <Box style={{ flex: 1 }}>
                {/* Origin / Destination row */}
                <Flex
                  justify="space-between"
                  align="flex-start"
                  gap="md"
                  mb="sm"
                  direction={{ base: "column", xs: "row" }}
                >
                  <Box
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <img
                      src={`https://flagcdn.com/${getEmojiFlag(originDetails.country)}.svg`}
                      alt=""
                      style={{ height: 20 }}
                    />
                    <Text
                      fw={600}
                      style={{
                        fontSize: isMobile
                          ? TYPOGRAPHY.h6.mobile
                          : TYPOGRAPHY.h6.desktop,
                      }}
                      c="rgb(0,33,95)"
                    >
                      {originDetails.name},{" "}
                      {getEmojiFlag(originDetails.country).toUpperCase()}
                    </Text>
                  </Box>
                  <Box
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <img
                      src={`https://flagcdn.com/${getEmojiFlag(destinationDetails.country)}.svg`}
                      alt=""
                      style={{ height: 20 }}
                    />
                    <Text
                      fw={600}
                      style={{
                        fontSize: isMobile
                          ? TYPOGRAPHY.h6.mobile
                          : TYPOGRAPHY.h6.desktop,
                      }}
                      c="rgb(0,33,95)"
                    >
                      {destinationDetails.name},{" "}
                      {getEmojiFlag(destinationDetails.country).toUpperCase()}
                    </Text>
                  </Box>
                </Flex>

                {/* Route line */}
                <Flex align="center" mt="xs" mb={4}>
                  <Box
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: ROUTE_LINE_COLOR,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "50%",
                        padding: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconAnchor size={20} color={COLORS.textColor} />
                    </Box>
                    <Box
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "50%",
                        padding: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconAnchor size={20} color={COLORS.textColor} />
                    </Box>
                  </Box>
                </Flex>
                <Text
                  size="xs"
                  c="dimmed"
                  style={{ fontSize: fsCaption }}
                  my="md"
                >
                  {item.origin_name} ({item.origin_code}) →{" "}
                  {item.destination_name} ({item.destination_code})
                </Text>

                {/* Price + Pre-book and tags row */}
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  wrap="wrap"
                  gap="lg"
                  align={{ base: "stretch", sm: "center" }}
                  justify="space-between"
                >
                  <Flex gap="sm" wrap="wrap" align="center">
                    <Box
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: `${rem(6)} ${rem(12)}`,
                        borderRadius: rem(24),
                        backgroundColor: COLORS.globalCardBackground,
                      }}
                    >
                      {item.service === "AIR" ? (
                        <IconPlaneTilt size={24} color={COLORS.serviceColor} />
                      ) : (
                        <IconShip size={24} color={COLORS.serviceColor} />
                      )}

                      <Text
                        size="sm"
                        fw={500}
                        style={{ fontSize: fsSmall }}
                        c={COLORS.secondaryColor}
                      >
                        {item.service}
                      </Text>
                    </Box>
                    {item.days_remaining != null && (
                      <Box
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: `${rem(6)} ${rem(12)}`,
                          borderRadius: rem(24),
                          backgroundColor: COLORS.accordian_background,
                        }}
                      >
                        <IconClock size={24} color={COLORS.textColor} />
                        <Text
                          size="sm"
                          fw={500}
                          style={{ fontSize: fsSmall }}
                          c={COLORS.textColor}
                        >
                          {item.days_remaining} days
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </Flex>
              </Box>
              <Flex
                direction="column"
                align={{ base: "stretch", sm: "flex-end" }}
                gap="xs"
                style={{ flex: "0 0 auto" }}
              >
                <Text
                  fw={700}
                  style={{
                    fontSize: isMobile
                      ? TYPOGRAPHY.h4.mobile
                      : TYPOGRAPHY.h4.desktop,
                  }}
                  c={COLORS.secondaryColor}
                >
                  {currency}{" "}
                  {Number(price).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Text>
                <Text size="sm" c="dimmed" style={{ fontSize: fsCaption }}>
                  {item?.service === "FCL" ? "per container" : item?.service === "LCL" ? "per cbm" : "per kg"}
                </Text>
                {/* <Button
                  size={isMobile ? "md" : "lg"}
                  radius="md"
                  style={{
                    backgroundColor: COLORS.contactBackground,
                    color: COLORS.primaryColor,
                    fontSize: isMobile
                      ? TYPOGRAPHY.button.small
                      : TYPOGRAPHY.button.normal,
                  }}
                  onClick={() => {}}
                >
                  Pre-book
                </Button> */}
              </Flex>
            </Flex>
          </Box>

          <Accordion.Panel>
            {chargesList.length > 0 ? (
              <ScrollArea type="auto">
                <Table
                  striped
                  withTableBorder
                  withColumnBorders
                  style={{ fontSize: fsSmall }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Charge</Table.Th>
                      <Table.Th>Unit</Table.Th>
                      <Table.Th>Rate</Table.Th>
                      <Table.Th>Minimum</Table.Th>
                      <Table.Th>Currency</Table.Th>
                      <Table.Th>Carrier</Table.Th>
                      {/* <Table.Th>Type</Table.Th> */}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {chargesList.map((ch, i) => (
                      <Table.Tr key={i}>
                        <Table.Td>{ch.charge_name ?? "—"}</Table.Td>
                        <Table.Td>{ch.unit ?? "—"}</Table.Td>
                        <Table.Td>{ch.rate ?? "—"}</Table.Td>
                        <Table.Td>{ch.minimum ?? "—"}</Table.Td>
                        <Table.Td>{ch.currency_code ?? "—"}</Table.Td>
                        <Table.Td>
                          {ch.carrier_name ?? "—"}
                          {ch.carrier_code ? ` (${ch.carrier_code})` : ""}
                        </Table.Td>
                        {/* <Table.Td>{ch.charge_type ?? "—"}</Table.Td> */}
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            ) : (
              <Text size="sm" c="dimmed" style={{ fontSize: fsSmall }}>
                No charges listed.
              </Text>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}

export default function TariffResultsPage() {
  const router = useRouter();
  const { tariffResult, clearTariffResult } = useCustomerRequestStore();
  const [expandedId, setExpandedId] = useState(null);
  const isMobile =
    typeof window !== "undefined" ? useMediaQuery("(max-width: 768px)") : false;

  useEffect(() => {
    if (!tariffResult?.data?.length) {
      router.replace("/customer-request-form");
      return;
    }
  }, [tariffResult, router]);

  const handleBackToForm = () => {
    clearTariffResult();
    router.push("/customer-request-form");
  };

  const handleGoHome = () => {
    clearTariffResult();
    router.push("/");
  };

  if (!tariffResult?.data?.length) {
    return null;
  }

  const data = tariffResult.data;
  const fsBody = isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal;
  const fsCaption = TYPOGRAPHY.caption.small;

  return (
    <Box style={{ backgroundColor: COLORS.backgroundColor }}>
      <Container
        fluid
        px="4%"
        py="70px"
        style={{
          zIndex: 0,
          minHeight: "100vh",
          background:
            'linear-gradient(rgba(8,20,50,.4),rgba(8,20,50,.6)), url("https://images.unsplash.com/photo-1670121180583-39ab653a071c?w=1920")',
          backgroundSize: "cover",
          backgroundPosition: "right center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Flex w="100%" maw={1400} direction="column" style={{ flex: 1 }}>
          <Box
            py="lg"
            px={isMobile ? "md" : "xl"}
            mt={"lg"}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              flex: 1,
            }}
          >
            <Text
              component="h2"
              fw={700}
              style={{
                margin: 0,
                fontSize: isMobile
                  ? TYPOGRAPHY.h3.mobile
                  : TYPOGRAPHY.h3.desktop,
                color: COLORS.secondaryColor,
              }}
            >
              Tariff charges
            </Text>
            <Text
              size="sm"
              style={{
                marginBottom: 16,
                color: COLORS.textColor,
                fontSize: fsCaption,
              }}
            >
              The following tariff(s) match your route and service. Review the
              charges below.
            </Text>

            {data.map((item, index) => (
              <TariffCardBlock
                key={item.tariff_id ?? index}
                item={item}
                index={index}
                expandedId={expandedId}
                onExpand={setExpandedId}
                isMobile={isMobile}
              />
            ))}

            <Flex mt="xl" gap="sm" wrap="wrap">
              <Button
                variant="filled"
                radius="md"
                size={isMobile ? "md" : "lg"}
                onClick={handleBackToForm}
                styles={{
                  root: {
                    background: "linear-gradient(135deg,#00d2ff,#005bea)",
                    border: "none",
                  },
                  label: {
                    fontSize: isMobile
                      ? TYPOGRAPHY.button.small
                      : TYPOGRAPHY.button.normal,
                    color: "#fff",
                  },
                }}
              >
                Back to form
              </Button>
              <Button
                variant="default"
                radius="md"
                size={isMobile ? "md" : "lg"}
                onClick={handleGoHome}
                styles={{
                  root: {
                    background: "rgba(255,255,255,.15)",
                    border: "1px solid rgba(255,255,255,.3)",
                    color: "#fff",
                  },
                  label: {
                    fontSize: isMobile
                      ? TYPOGRAPHY.button.small
                      : TYPOGRAPHY.button.normal,
                  },
                }}
              >
                Go home
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
