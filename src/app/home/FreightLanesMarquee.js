"use client";

import { Box, Container, Text, Title, Group } from "@mantine/core";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { COLORS } from "../utils/COLORS";
import { useQuery } from "@tanstack/react-query";
import useTransportStore from "../store/transportStore";
import useCustomerRequestStore from "../store/customerRequestStore";
import getEmojiFlag from "../utils/isoMap";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const fetchTopLanes = async () => {
  const res = await fetch(
    "https://pulse.pentagonindia.net/api/quotation/top-origin-destination/",
  );
  if (!res.ok) throw new Error("Failed to fetch lanes");
  return res.json();
};

function LanePill({ item, onHoverStart, onHoverEnd, onLaneClick }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <Group
      gap={8}
      px={20}
      py={12}
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
        background: "linear-gradient(90deg, #f0fbfd, #dcf8f7 )",
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
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#2563EB",
        }}
      />
      <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
          src={`https://flagcdn.com/${getEmojiFlag(item?.origin_country)}.svg`}
          alt=""
          style={{ width: 24 }}
        />
        <Text size="sm" fw={500} c="rgb(0, 33, 95)">
          {item.origin_name} ({item.origin_code})
        </Text>
      </Box>
      <IconArrowNarrowRight color="rgb(0, 33, 95)" />
      <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
          src={`https://flagcdn.com/${getEmojiFlag(item?.destination_country)}.svg`}
          alt=""
          style={{ width: 24 }}
        />
        <Text size="sm" fw={500} c="rgb(0, 33, 95)">
          {item.destination_name} ({item.destination_code})
        </Text>
      </Box>
    </Group>
  );
}

function MarqueeRow({ items, reverse = false, onLaneClick }) {
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

    // 🔁 wrap seamlessly
    if (!reverse && nextX <= -distance) {
      nextX += distance;
    }
    if (reverse && nextX >= 0) {
      nextX -= distance;
    }

    x.set(nextX);
  });

  return (
    <Box style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
          padding: "10px 0",
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
          />
        ))}
      </motion.div>
    </Box>
  );
}

export default function FreightLanesMarquee() {
  const router = useRouter();
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

  // Convert API → string lanes (ONLY valid ones)
  const lanes =
    data?.data
      ?.filter((item) => {
        const originExists =
          airPortMap[item.origin_code] || seaPortMap[item.origin_code]
        const destinationExists =
          airPortMap[item.destination_code] ||
          seaPortMap[item.destination_code]

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
  const perRow = Math.ceil(total / 3);
  const lanesRow1 = lanes.slice(0, perRow);
  const lanesRow2 = lanes.slice(perRow, perRow * 2);
  const lanesRow3 = lanes.slice(perRow * 2, total);

  return (
    <Box
      py={80}
      style={{
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <Container maw={1300} px={20}>
        <Text
          ta="center"
          size="xs"
          fw={600}
          c="blue.6"
          style={{ letterSpacing: 2 }}
          mb={8}
        >
          INDIA-LED GLOBAL FREIGHT NETWORK
        </Text>

        <Title ta="center" order={2} c="rgb(0, 33, 95)" mb={48}>
          Seamless Import & Export Cargo Operations
        </Title>

        <Box style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <MarqueeRow items={lanesRow1} onLaneClick={handleLaneClick} />
          <MarqueeRow items={lanesRow2} reverse onLaneClick={handleLaneClick} />
          <MarqueeRow items={lanesRow3} onLaneClick={handleLaneClick} />
        </Box>
      </Container>
    </Box>
  );
}
