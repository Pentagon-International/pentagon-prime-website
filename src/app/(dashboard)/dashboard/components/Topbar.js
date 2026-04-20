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
      <Box className="live-chip">
        <Box className="live-dot" />
        Live
      </Box>
      <Text className="time-chip" id="clock">
        {clockText}
      </Text>
      <Box className="user-chip">
        <Avatar className="user-avatar" radius="md" size={"sm"} color={"#fff"}>
          TS
        </Avatar>
        <Text className="user-name">Tata Steel Ltd.</Text>
      </Box>
    </Box>
  );
}
