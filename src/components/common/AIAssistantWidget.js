"use client";

import { useMemo, useState } from "react";
import { ActionIcon, Badge, Box, Button, Card, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconRobot, IconSend2, IconX } from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";

const quickActions = ["Sea Quote", "Track", "Air Rates", "HS Code"];

const AIAssistantWidget = () => {
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState("");

  const panelStyle = useMemo(
    () => ({
      position: "fixed",
      right: 24,
      bottom: 124,
      width: 320,
      height:400,
      maxWidth: "calc(100vw - 32px)",
      zIndex: 1001,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.22)",
      border: "1px solid rgba(14, 201, 242, 0.25)",
      overflow: "hidden",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between"
    }),
    []
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
    []
  );

  return (
    <>
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
            <ActionIcon variant="subtle" color="gray" onClick={() => setOpened(false)}>
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
        onClick={() => setOpened((prev) => !prev)}
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

