import { Box, Container, Divider, Stack, Text } from "@mantine/core";
import React from "react";

const HighlightContent = () => {
  return (
    <Container fluid px={"2%"} pb={"30px"}>
      <Divider my="md" size="sm" />
      <Stack align="stretch" justify="center" w="100%" py="sm">
        <Text ta="center" fs="italic" fz={20}>Operating since 2007 - part of a multi-vertical logistics group</Text>
        <Text ta="center" c="#0d52f3" fz={20} fw={800}>6 business verticals • 600+ team • 26+ locations • 5 countries</Text>
      </Stack>
    </Container>
  );
};

export default HighlightContent;
