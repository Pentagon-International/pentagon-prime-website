import { Box, Container, Divider, Stack, Text } from "@mantine/core";
import React from "react";
import { COLORS } from "../utils/COLORS";

const HighlightContent = () => {
  return (
    <Container fluid px={"2%"} py={50} bg={COLORS.backgroundColor}>
      <Divider my="md" size="xs" color="#11111188" mt={30} />
      <Stack align="stretch" justify="center" w="100%" py="sm">
        <Text ta="center" fs="italic" fz={18} f2={500}>Operating since 2007 - part of a multi-vertical logistics group</Text>
        <Text ta="center" c="#0d52f3" fz={18} fw={800}>6 business verticals • 600+ team • 26+ locations • 5 countries</Text>
      </Stack>
    </Container>
  );
};

export default HighlightContent;
