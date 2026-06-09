 "use client";
import { useEffect, useState } from "react";
import { Avatar, Box, Text } from "@mantine/core";

function getClockText() {
  const d = new Date();
  return `${d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} · ${d.toLocaleTimeString(
    "en-IN",
    { hour: "2-digit", minute: "2-digit" },
  )}`;
}

export default function Topbar() {
  const [clockText, setClockText] = useState("—");

  useEffect(() => {
    setClockText(getClockText());
    const interval = setInterval(() => setClockText(getClockText()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="nav-right">
      <Text fz={12} fw={600} c="#000" bg="#FFD700" p={4} style={{borderRadius: 8}}>
        ! Demo Mode
      </Text>
      <Box className="live-chip">
        <Box className="live-dot" />
        <Text className="time-chip" id="clock">
          {clockText}
        </Text>
      </Box>
      <Box className="user-chip">
        <Avatar className="user-avatar" radius="md" size={"sm"} color={"#fff"}>
          AC
        </Avatar>
        <Text className="user-name">ABC Corporation</Text>
      </Box>
    </Box>
  );
}
