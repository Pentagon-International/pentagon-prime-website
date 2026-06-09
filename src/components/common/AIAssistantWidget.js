"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActionIcon, Badge, Box, Button, Card, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconRobot, IconSend2, IconX } from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";

const quickActions = ["Sea Quote", "Track", "Air Rates", "HS Code"];
const REOPEN_DELAY_MS = 10000;

const PROMPT_BUBBLES = [
  "Need a freight quote? Ask Prime!",
  "Track your shipment in seconds — chat with Prime!",
  "Looking for air or sea rates? I can help.",
  "Not sure about HS codes? Ask Prime anytime.",
  "Want transit times for your route? Tap to ask Prime.",
  "Book smarter — get instant logistics answers here.",
];

const getRandomBubbleText = () =>
  PROMPT_BUBBLES[Math.floor(Math.random() * PROMPT_BUBBLES.length)];

const AIAssistantWidget = () => {
  const [opened, setOpened] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [input, setInput] = useState("");
  const reopenTimerRef = useRef(null);

  const clearReopenTimer = () => {
    if (reopenTimerRef.current) {
      clearTimeout(reopenTimerRef.current);
      reopenTimerRef.current = null;
    }
  };

  const showPromptBubble = useCallback(() => {
    setBubbleText(getRandomBubbleText());
    setBubbleVisible(true);
    setOpened(false);
  }, []);

  const scheduleBubbleReopen = () => {
    clearReopenTimer();
    reopenTimerRef.current = setTimeout(() => {
      showPromptBubble();
      reopenTimerRef.current = null;
    }, REOPEN_DELAY_MS);
  };

  const openChat = () => {
    clearReopenTimer();
    setBubbleVisible(false);
    setOpened(true);
  };

  const dismissBubble = () => {
    setBubbleVisible(false);
    scheduleBubbleReopen();
  };

  const handleClose = () => {
    setOpened(false);
    scheduleBubbleReopen();
  };

  const handleToggle = () => {
    if (opened) {
      handleClose();
      return;
    }
    openChat();
  };

  useEffect(() => {
    showPromptBubble();
    return clearReopenTimer;
  }, [showPromptBubble]);

  const panelStyle = useMemo(
    () => ({
      position: "fixed",
      right: 24,
      bottom: 124,
      width: 320,
      height: 400,
      maxWidth: "calc(100vw - 32px)",
      zIndex: 1001,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.22)",
      border: "1px solid rgba(14, 201, 242, 0.25)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }),
    [],
  );

  const bubbleStyle = useMemo(
    () => ({
      position: "fixed",
      right: 78,
      bottom: 82,
      maxWidth: 260,
      zIndex: 1001,
      backgroundColor: "#fff",
      color: COLORS.secondaryColor,
      borderRadius: 16,
      padding: "12px 36px 12px 14px",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.18)",
      border: "1px solid rgba(14, 201, 242, 0.35)",
      cursor: "pointer",
    }),
    [],
  );

  const launcherStyle = useMemo(
    () => ({
      position: "fixed",
      right: 20,
      bottom: 74,
      zIndex: 1002,
      boxShadow: "0 8px 24px rgba(14, 201, 242, 0.35)",
      border: "2px solid rgba(255,255,255,0.9)",
    }),
    [],
  );

  return (
    <>
      {bubbleVisible && !opened && (
        <Box style={bubbleStyle} onClick={openChat} role="button" tabIndex={0}>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            aria-label="Dismiss prompt"
            onClick={(event) => {
              event.stopPropagation();
              dismissBubble();
            }}
            style={{ position: "absolute", top: 6, right: 6 }}
          >
            <IconX size={14} />
          </ActionIcon>
          <Text size="xs" fw={600} lh={1.4}>
            {bubbleText}
          </Text>
          <Box
            style={{
              position: "absolute",
              right: -8,
              bottom: 18,
              width: 14,
              height: 14,
              backgroundColor: "#fff",
              borderRight: "1px solid rgba(14, 201, 242, 0.35)",
              borderBottom: "1px solid rgba(14, 201, 242, 0.35)",
              transform: "rotate(-45deg)",
            }}
          />
        </Box>
      )}

      {opened && (
        <Card radius="lg" p={0} bg="rgb(10, 28, 74)" style={panelStyle}>
          <Group justify="space-between" px="md" py="sm" style={{ borderBottom: "1px solid rgba(14, 201, 242, 0.2)" }}>
            <Group gap="sm">
              <ActionIcon radius="xl" color="cyan" variant="filled" size={32}>
                <IconRobot size={17} />
              </ActionIcon>
              <Stack gap={0}>
                <Text c="white" fw={700} size="sm">Prime AI Assistant</Text>
                <Group gap={6}>
                  <Badge radius="xl" color="teal" variant="filled" size="xs">Online</Badge>
                  <Text c="cyan.3" size="xs">Replies instantly</Text>
                </Group>
              </Stack>
            </Group>
            <ActionIcon variant="subtle" color="gray" onClick={handleClose}>
              <IconX size={16} />
            </ActionIcon>
          </Group>

          <Stack p="sm" gap="xs">
            <Box
              style={{
                border: "1px solid rgba(14, 201, 242, 0.3)",
                borderRadius: 12,
                padding: "10px",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              <Text c="gray.0" fw={600} mb={6} size="sm">
                Hi! I&apos;m Prime - Pentagon&apos;s AI assistant.
              </Text>
              <Text c="gray.3" size="xs">I can help with quotes, tracking, HS code classification, and transit lookups.</Text>
            </Box>

            <Group gap={8}>
              {quickActions.map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  radius="xl"
                  size="compact-xs"
                  color="cyan"
                  onClick={() => setInput(item)}
                >
                  {item}
                </Button>
              ))}
            </Group>
          </Stack>

          <Group p="sm" gap={8} wrap="nowrap" style={{ borderTop: "1px solid rgba(14, 201, 242, 0.18)" }}>
            <TextInput
              placeholder="Ask Prime anything..."
              value={input}
              onChange={(event) => setInput(event.currentTarget.value)}
              styles={{
                root: { flex: 1 },
                input: { fontSize: "0.86rem" },
              }}
            />
            <ActionIcon color="cyan" variant="filled" size={36} radius="md">
              <IconSend2 size={16} />
            </ActionIcon>
          </Group>
        </Card>
      )}

      <ActionIcon
        onClick={handleToggle}
        style={launcherStyle}
        color="cyan"
        radius={50}
        size={45}
      >
        <IconRobot size={24} color={COLORS.headerBackground} />
      </ActionIcon>
    </>
  );
};

export default AIAssistantWidget;
