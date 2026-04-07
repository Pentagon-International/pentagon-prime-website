"use client";

import {
  Accordion,
  Badge,
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
import { notifications } from "@mantine/notifications";
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
  const vesselSchedules = item.vessel_schedules ?? [];
  const currency = chargesList[0]?.currency_code ?? "USD";
  const fsBody = isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal;
  const fsSmall = isMobile ? TYPOGRAPHY.body.xsmall : TYPOGRAPHY.body.small;
  const fsCaption = TYPOGRAPHY.caption.small;
  const formatDate = (value) => {
    if (!value) return "—";
    // Keep YYYY-MM-DD as-is to avoid timezone shifting in Date parsing.
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    return String(value);
  };
  const getMinTransitScheduleSummary = (schedules) => {
    // "Nearest date" summary: pick the schedule with earliest `etd` (sail by).
    // If `etd` is missing for all, fall back to earliest `eta` (arrival).
    const candidates = (schedules ?? []).map((vs) => {
      const transit = vs?.transit_time ?? vs?.schedule?.transit_time ?? null;
      const sail = vs?.etd ?? vs?.schedule?.etd ?? null;
      const arrival = vs?.eta ?? vs?.schedule?.eta ?? null;
      const voyageNo = vs?.voyage_no ?? vs?.schedule?.voyage_no ?? null;
      const transitNum =
        transit == null || transit === "" ? null : Number(transit);
      return {
        transitRaw: transit,
        transitNum,
        sailStr: sail == null ? null : String(sail),
        sail,
        arrival,
        voyageNo,
        arrivalStr: arrival == null ? null : String(arrival),
      };
    });

    const validWithEtd = candidates.filter((c) => c.sailStr != null);
    const validWithEta = candidates.filter((c) => c.arrivalStr != null);

    const pickPool = validWithEtd.length > 0 ? validWithEtd : validWithEta;
    if (pickPool.length === 0) {
      return { transitDays: "—", sailBy: "—", arrival: "—" };
    }

    pickPool.sort((a, b) => {
      const aDate = (a.sailStr ?? a.arrivalStr) ?? "";
      const bDate = (b.sailStr ?? b.arrivalStr) ?? "";
      // YYYY-MM-DD sorts lexicographically.
      const cmp = aDate.localeCompare(bDate);
      if (cmp !== 0) return cmp;

      // Tie-break: prefer smallest transit if available.
      if (a.transitNum != null && b.transitNum != null) {
        return a.transitNum - b.transitNum;
      }
      if (a.transitNum != null) return -1;
      if (b.transitNum != null) return 1;
      return 0;
    });

    const chosen = pickPool[0];
    return {
      transitDays: chosen.transitRaw,
      sailBy: formatDate(chosen.sail),
      arrival: formatDate(chosen.arrival),
      voyageNo: chosen.voyageNo ?? "—",
    };
  };
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
              borderBottom: expandedId ? `1px solid rgba(0,0,0,0.2)` : "none",
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
                      backgroundColor: "rgba(0,33,95,0.9)",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgb(0,33,95)",
                      color: "#fff",
                      width: "100%",
                      maxWidth: "250px",
                    },
                    label: {
                      padding: 0,
                      paddingRight: "5px",
                    },
                  }}
                  onMouseEnter={(e)=>{
                    e.currentTarget.style.backgroundColor = "rgba(0,33,95,1)";
                  }}
                  onMouseLeave={(e)=>{
                    e.currentTarget.style.backgroundColor = "rgba(0,33,95,0.9)";
                  }}
                >
                  Rate & Schedule details
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
                        <IconPlaneTilt size={16} color={"rgb(0,33,95)"} />
                      ) : (
                        <IconShip size={16} color={"rgb(0,33,95)"} />
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

                    {vesselSchedules.length > 0 && (
                      <Flex gap="xs" wrap="wrap" align="center">
                        {(() => {
                          const summary = getMinTransitScheduleSummary(
                            vesselSchedules,
                          );
                          return (
                            <>
                              <Badge
                                radius="xl"
                                size={isMobile ? "sm" : "md"}
                                p={12}
                                px={16}
                                variant="light"
                                color="rgb(80,80,80)"
                              >
                                Transit: {summary.transitDays ?? "—"}d
                              </Badge>
                              <Badge
                                radius="xl"
                                size={isMobile ? "sm" : "md"}
                                p={12}
                                px={16}
                                variant="light"
                                color="rgb(0,33,95)"
                              >
                                Sail by: {summary.sailBy}
                              </Badge>
                              <Badge
                                radius="xl"
                                size={isMobile ? "sm" : "md"}
                                p={12}
                                px={16}
                                variant="light"
                                color="rgb(0,33,95)"
                              >
                                Arrival: {summary.arrival}
                              </Badge>
                            </>
                          );
                        })()}
                      </Flex>
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
            {vesselSchedules.length > 0 && (
              <Box mb="lg">
                <Text
                  fw={700}
                  c={COLORS.secondaryColor}
                  style={{ fontSize: fsBody }}
                  mb="sm"
                >
                  Vessel schedules ({vesselSchedules.length})
                </Text>
                <Flex direction="column" gap="md">
                  {vesselSchedules.map((vs, i) => {
                    const vesselName =
                      vs?.schedule?.vessel_name ?? vs?.vessel_name ?? "—";
                    const voyageNo = vs?.schedule?.voyage_no ?? "—";
                    const serviceName =
                      vs?.schedule?.service_name ??
                      vs?.schedule?.service_code ??
                      "—";
                    const etd = formatDate(vs?.etd);
                    const eta = formatDate(vs?.eta);
                    const transitDays =
                      vs?.transit_time ?? vs?.schedule?.transit_time ?? "—";
                    const direct = vs?.direct;
                    const cutOffDates = vs?.cut_off_dates ?? [];
                    const routings = vs?.routings ?? [];

                    return (
                      <Box
                        key={vs.schedule_id ?? `${i}-${vesselName}-${voyageNo}`}
                        style={{
                          border: "1px solid rgba(0,0,0,0.06)",
                          borderRadius: 12,
                          padding: rem(16),
                          backgroundColor: "rgba(0,33,95,0.02)",
                        }}
                      >
                        <Flex
                          justify="space-between"
                          align="flex-start"
                          gap="md"
                          wrap="wrap"
                        >
                          <Box style={{ minWidth: 260 }}>
                            <Text
                              fw={700}
                              c={COLORS.secondaryColor}
                              style={{ fontSize: fsBody }}
                            >
                              {vesselName}
                              {voyageNo && voyageNo !== "—" ? ` (${voyageNo})` : ""}
                            </Text>
                            <Text
                              size="sm"
                              c="dimmed"
                              style={{ fontSize: fsSmall }}
                            >
                              Service: {serviceName}
                            </Text>
                            <Text
                              size="sm"
                              c="dimmed"
                              style={{ fontSize: fsSmall }}
                            >
                              Sail by: {etd} | Arrival: {eta}
                            </Text>
                          </Box>

                          <Flex gap="xs" wrap="wrap" justify="flex-end">
                            <Badge
                              radius="xl"
                              size={isMobile ? "sm" : "md"}
                              variant="light"
                              color="rgb(0,33,95)"
                            >
                              Transit: {transitDays}d
                            </Badge>
                            <Badge
                              radius="xl"
                              size={isMobile ? "sm" : "md"}
                              variant="light"
                              color="rgb(0,33,95)"
                            >
                              Voyage: {vs?.schedule?.voyage_no ?? "—"}
                            </Badge>
                            <Badge
                              radius="xl"
                              size={isMobile ? "sm" : "md"}
                              variant="light"
                              color="rgb(80,80,80)"
                            >
                              Sail by: {etd}
                            </Badge>
                            <Badge
                              radius="xl"
                              size={isMobile ? "sm" : "md"}
                              variant="light"
                              color="rgb(80,80,80)"
                            >
                              Arrival: {eta}
                            </Badge>
                            {direct != null && (
                              <Badge
                                radius="xl"
                                size={isMobile ? "sm" : "md"}
                                variant="light"
                                color={
                                  direct
                                    ? "rgb(0,33,95)"
                                    : "rgb(100,100,100)"
                                }
                              >
                                {direct ? "Direct" : "Transshipment"}
                              </Badge>
                            )}
                          </Flex>
                        </Flex>

                        {cutOffDates.length > 0 && (
                          <Box mt="sm">
                            <Text
                              size="sm"
                              c="dimmed"
                              fw={600}
                              style={{ fontSize: fsCaption }}
                              mb={6}
                            >
                              Cut-off dates
                            </Text>
                            <Flex gap="xs" wrap="wrap">
                              {cutOffDates.map((cd, j) => (
                                <Badge
                                  key={j}
                                  radius="xl"
                                  size={isMobile ? "sm" : "md"}
                                  variant="light"
                                  color="rgb(100,100,100)"
                                >
                                  {cd?.name ?? "—"}
                                </Badge>
                              ))}
                            </Flex>
                          </Box>
                        )}

                        {routings.length > 0 && (
                          <Box mt="sm">
                            <Text
                              size="sm"
                              c="dimmed"
                              fw={600}
                              style={{ fontSize: fsCaption }}
                              mb={6}
                            >
                              Routings
                            </Text>
                            <Flex gap="xs" wrap="wrap">
                              {(() => {
                                const firstLeg = vs?.schedule ?? null;
                                const flowedLegs = [
                                  ...(firstLeg ? [firstLeg] : []),
                                  ...(Array.isArray(routings) ? routings : []),
                                ]
                                  .filter(Boolean)
                                  .sort((a, b) => {
                                    const ao = a?.order_id ?? 0;
                                    const bo = b?.order_id ?? 0;
                                    return ao - bo;
                                  });

                                return (
                                  <>
                                    {flowedLegs.slice(0, 6).map((r, j) => (
                                      <Badge
                                        key={j}
                                        radius="xl"
                                        size={isMobile ? "sm" : "md"}
                                        variant="light"
                                        color="rgb(100,100,100)"
                                      >
                                        {(r?.order_id ?? j) +
                                          ": " +
                                          (r?.origin_code ?? "—") +
                                          "→" +
                                          (r?.destination_code ?? "—") +
                                          " | Sail: " +
                                          formatDate(r?.etd) +
                                          " | Arrival: " +
                                          formatDate(r?.eta)}
                                      </Badge>
                                    ))}
                                    {flowedLegs.length > 6 && (
                                      <Badge
                                        radius="xl"
                                        size={isMobile ? "sm" : "md"}
                                        variant="light"
                                        color="rgb(100,100,100)"
                                      >
                                        +{flowedLegs.length - 6} more
                                      </Badge>
                                    )}
                                  </>
                                );
                              })()}
                            </Flex>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Flex>
              </Box>
            )}

            <Text
              fw={700}
              c={COLORS.secondaryColor}
              style={{ fontSize: fsBody }}
              mb="sm"
              mt={"lg"}
            >
              Charges ({chargesList.length})
            </Text>

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

  useEffect(() => {
    if (!tariffResult?.data?.length) return;

    const exchangeMessages = Array.from(
      new Set(
        tariffResult.data.flatMap((item) => {
          const charges = item.charges ?? item.tariff_charges ?? [];
          return charges
            .filter(
              (charge) =>
                charge?.currency_code &&
                String(charge.currency_code).toUpperCase() !== "USD" &&
                charge?.exchange_rate_message
            )
            .map((charge) => charge.exchange_rate_message);
        })
      )
    );

    exchangeMessages.forEach((message) => {
      notifications.show({
        color: "yellow",
        title: "Exchange rate notice",
        message,
        autoClose: 5000,
      });
    });
  }, [tariffResult]);

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
