"use client";

import { Box, Container, Text, Title, Group } from "@mantine/core";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const lanesRow1 = [
  "Shanghai → Mundra",
  "Qingdao → Mundra",
  "Shenzhen → Nhava Sheva",
  "Ningbo → Mundra",
  "Jawaharlal Nehru → Mombasa",
];

const lanesRow2 = [
  "Qingdao → Jawaharlal Nehru (Nhava Sheva)",
  "Ningbo Pt → Jawaharlal Nehru",
  "Busan → Chennai",
  "Ho Chi Minh → Mundra",
  "Qingdao → Mundra",
];

const lanesRow3 = [
  "Jawaharlal Nehru → Jebel Ali",
  "Mundra → New York",
  "Mundra → Rotterdam",
  "Chennai → Singapore",
  "Qingdao → Mundra",
];

function LanePill({ item, onHoverStart, onHoverEnd }) {
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
      style={{
        borderRadius: 999,
        background: "#EFF6FF",
        outline:
          hovered || active
            ? "2px solid rgb(0, 33, 95)"
            : "1px solid rgb(0, 33, 95)",
        cursor: "pointer",
        boxShadow: active
          ? "0 4px 12px rgba(0, 33, 95, 0.35)"
          : hovered
            ? "0 6px 18px rgba(0, 33, 95, 0.25)"
            : "none",
        transform: hovered && !active ? "translateY(-1px)" : "translateY(0)",
        transition: "all 150ms ease",
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
      <Text size="sm" fw={500} c="rgb(0, 33, 95)">
        {item}
      </Text>
    </Group>
  );
}

function MarqueeRow({ items, reverse = false }) {
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
            key={`${item}-${idx}`}
            item={item}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
          />
        ))}
      </motion.div>
    </Box>
  );
}

export default function FreightLanesMarquee() {
  return (
    <Box
      py={80}
      style={{
        backgroundColor: "#EFF6FF",
      }}
    >
      <Container size="xl">
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
          <MarqueeRow items={lanesRow1} />
          <MarqueeRow items={lanesRow2} reverse />
          <MarqueeRow items={lanesRow3} />
        </Box>
      </Container>
    </Box>
  );
}
