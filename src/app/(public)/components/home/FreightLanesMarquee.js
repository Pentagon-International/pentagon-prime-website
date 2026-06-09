"use client";

import { Box, Container, Text, Title, Group } from "@mantine/core";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { COLORS } from "@/app/utils/COLORS";
import { useQuery } from "@tanstack/react-query";
import useTransportStore from "@/store/transportStore";
import useCustomerRequestStore from "@/store/customerRequestStore";
import getEmojiFlag from "@/app/utils/isoMap";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { homeTypography } from "./homeTypography";

const fetchTopLanes = async () => {
  const res = await fetch(
    "https://pulse.pentagonindia.net/api/quotation/top-origin-destination/",
  );
  if (!res.ok) throw new Error("Failed to fetch lanes");
  return res.json();
};

function LanePill({ item, onHoverStart, onHoverEnd, onLaneClick, compact }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <Group
      gap={compact ? 6 : 8}
      px={compact ? 12 : 20}
      py={compact ? 8 : 12}
      onMouseEnter={() => {
        setHovered(true);
        onHoverStart?.();
      }}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
        onHoverEnd?.();
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={() => onLaneClick?.(item)}
      style={{
        borderRadius: 999,
        background: "linear-gradient(90deg, #f0fbfd, #dcf8f7)",
        outline:
          hovered || active
            ? "2px solid rgb(0, 33, 95)"
            : "1px solid rgb(0, 33, 95)",
        cursor: "pointer",
        boxShadow:
          active || hovered
            ? "0 3px 8px rgba(0, 0, 0, 0.3)"
            : "0 2px 6px rgba(0, 0, 0, 0.3)",
        transform: hovered && !active ? "translateY(-1px)" : "translateY(0)",
        transition: "all 150ms ease-in-out",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      <Box
        style={{
          width: compact ? 6 : 8,
          height: compact ? 6 : 8,
          borderRadius: "50%",
          background: "#2563EB",
        }}
      />
      <Box
        style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 8 }}
      >
        <img
          src={`https://flagcdn.com/${getEmojiFlag(item?.origin_country)}.svg`}
          alt=""
          style={{ width: compact ? 18 : 24 }}
        />
        <Text size={compact ? "xs" : "sm"} fw={500} c="rgb(0, 33, 95)">
          {item.origin_name} ({item.origin_code})
        </Text>
      </Box>
      <IconArrowNarrowRight size={compact ? 14 : 16} color="rgb(0, 33, 95)" />
      <Box
        style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 8 }}
      >
        <img
          src={`https://flagcdn.com/${getEmojiFlag(item?.destination_country)}.svg`}
          alt=""
          style={{ width: compact ? 18 : 24 }}
        />
        <Text size={compact ? "xs" : "sm"} fw={500} c="rgb(0, 33, 95)">
          {item.destination_name} ({item.destination_code})
        </Text>
      </Box>
    </Group>
  );
}

function MarqueeRow({ items, reverse = false, onLaneClick, compact }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [distance, setDistance] = useState(0);
  const [paused, setPaused] = useState(false);

  const speed = 40; // px per second

  useLayoutEffect(() => {
    if (!trackRef.current) return;
    setDistance(trackRef.current.scrollWidth / 2);
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (paused || !distance) return;

    const moveBy = (delta / 1000) * speed;
    const currentX = x.get();

    let nextX = reverse ? currentX + moveBy : currentX - moveBy;

    if (!reverse && nextX <= -distance) nextX += distance;
    if (reverse && nextX >= 0) nextX -= distance;

    x.set(nextX);
  });

  return (
    <Box style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        ref={trackRef}
        style={{
          display: "flex",
          gap: compact ? 10 : 16,
          width: "max-content",
          padding: "6px 0",
          x,
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <LanePill
            key={`${item.origin_code}-${item.destination_code}-${idx}`}
            item={item}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
            onLaneClick={onLaneClick}
            compact={compact}
          />
        ))}
      </motion.div>
    </Box>
  );
}

export default function FreightLanesMarquee() {
  const router = useRouter();

  // ── Breakpoints ───────────────────────────────────────────────────────────
  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-lanes"],
    queryFn: fetchTopLanes,
  });

  const { seaData, airData, airPortMap, seaPortMap } = useTransportStore();
  const { setFormValues, setMapOrigin, setMapDestination, setMapLoading } =
    useCustomerRequestStore();

  const handleLaneClick = useCallback(
    (item) => {
      const originOpt =
        seaData?.find((o) => o.code === item.origin_code) ||
        airData?.find((o) => o.code === item.origin_code);
      const destOpt =
        seaData?.find((o) => o.code === item.destination_code) ||
        airData?.find((o) => o.code === item.destination_code);
      if (!originOpt || !destOpt) return;

      const fromSea =
        seaData?.some((o) => o.code === item.origin_code) &&
        seaData?.some((o) => o.code === item.destination_code);
      const transportData = fromSea ? seaData : airData;
      const activeTransport = fromSea ? "sea" : "air";
      const typeOfBooking = fromSea ? "FCL" : "AIR";

      const formDataToStore = {
        typeOfBooking,
        activeTransport,
        origin: {
          origin: originOpt.value,
          port: originOpt.value,
          name: originOpt.name,
          code: originOpt.code,
          country: originOpt.country,
          city: originOpt.city || originOpt.name || "",
        },
        destination: {
          destination: destOpt.value,
          port: destOpt.value,
          name: destOpt.name,
          code: destOpt.code,
          country: destOpt.country,
          city: destOpt.city || destOpt.name || "",
        },
        code: "",
        memoizedTransportData: transportData,
      };
      setFormValues(formDataToStore);
      console.log("formstore----------------------", formDataToStore);
      setMapOrigin({
        name: originOpt.name,
        code: originOpt.code,
        country: originOpt.country,
        city: originOpt.city || originOpt.name || "",
      });
      setMapDestination({
        name: destOpt.name,
        code: destOpt.code,
        country: destOpt.country,
        city: destOpt.city || destOpt.name || "",
      });
      setMapLoading(true);
      setTimeout(() => router.push("/customer-request-form/"), 50);
    },
    [
      seaData,
      airData,
      setFormValues,
      setMapOrigin,
      setMapDestination,
      setMapLoading,
      router,
    ],
  );

  const getPortName = (code) => {
    return airPortMap[code] || seaPortMap[code] || null;
  };

  // Convert API → string lanes (ONLY valid ones) — unchanged logic
  const lanes =
    data?.data
      ?.filter((item) => {
        const originExists =
          airPortMap[item.origin_code] || seaPortMap[item.origin_code];
        const destinationExists =
          airPortMap[item.destination_code] ||
          seaPortMap[item.destination_code];
        return originExists && destinationExists;
      })
      .map((item) => {
        const origin = getPortName(item.origin_code);
        const destination = getPortName(item.destination_code);
        return {
          origin_code: origin.code,
          destination_code: destination.code,
          origin_name: origin.name,
          destination_name: destination.name,
          origin_city: origin.city,
          destination_city: destination.city,
          origin_country: origin.country,
          destination_country: destination.country,
        };
      }) || [];

  const total = lanes.length;

  // On mobile show 2 rows, tablet/desktop show 3 rows — unchanged split logic
  const rowCount = 3;
  const perRow = Math.ceil(total / rowCount);
  const lanesRow1 = lanes.slice(0, perRow);
  const lanesRow2 = lanes.slice(perRow, perRow * 2);
  const lanesRow3 = lanes.slice(perRow * 2, total);

  // compact pills on mobile/tablet
  const compact = isMobile || isTablet;

  return (
    <Box
      py={isMobile ? 48 : 80}
      style={{ backgroundColor: COLORS.backgroundColor }}
    >
      <Container maw={1600} px={isMobile ? 16 : 20}>
        <Text
          ta="center"
          fw={600}
          c="blue.6"
          style={{
            letterSpacing: isMobile ? 1 : 2,
            fontFamily: homeTypography.bodyFontFamily,
            fontSize: homeTypography.sectionSub.fontSize,
            lineHeight: homeTypography.sectionSub.lineHeight,
          }}
          mb={8}
        >
          INDIA-LED GLOBAL FREIGHT NETWORK
        </Text>

        <Title
          ta="center"
          order={isMobile ? 3 : 2}
          c="rgb(0, 33, 95)"
          mb={isMobile ? 28 : 48}
          style={{
            fontFamily: homeTypography.headingFontFamily,
            fontSize: homeTypography.sectionTitle.fontSize,
            lineHeight: homeTypography.sectionTitle.lineHeight,
          }}
        >
          Seamless Import & Export Cargo Operations
        </Title>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 14 : 24,
          }}
        >
          <MarqueeRow
            items={lanesRow1}
            onLaneClick={handleLaneClick}
            compact={compact}
          />
          <MarqueeRow
            items={lanesRow2}
            reverse
            onLaneClick={handleLaneClick}
            compact={compact}
          />
          {/* 3rd row only on tablet and above */}
          {lanesRow3.length > 0 && (
            <MarqueeRow
              items={lanesRow3}
              onLaneClick={handleLaneClick}
              compact={compact}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}
