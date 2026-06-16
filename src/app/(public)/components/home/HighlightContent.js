import { Box, Container, Divider, Stack, Text } from "@mantine/core";
import React from "react";
import { COLORS } from "@/app/utils/COLORS";
import { homeTypography } from "./homeTypography";

const HighlightContent = () => {
  return (
    <Container fluid px={"2%"} py={50} bg={COLORS.backgroundColor} style={{ fontFamily: homeTypography.bodyFontFamily }}>
      <Divider my="md" size="xs" color="#11111188" mt={30} />
      <Stack align="stretch" justify="center" w="100%" py="sm">
        <Text
          ta="center"
          fs="italic"
          f2={500}
          style={{
            fontFamily: homeTypography.bodyFontFamily,
            fontSize: homeTypography.sectionSub.fontSize,
            lineHeight: homeTypography.sectionSub.lineHeight,
          }}
        >
          Operating since 2007 - part of a multi-vertical logistics group
        </Text>
        <Text
          ta="center"
          c="#0d52f3"
          fw={800}
          style={{
            fontFamily: homeTypography.bodyFontFamily,
            fontSize: homeTypography.sectionSub.fontSize,
            lineHeight: homeTypography.sectionSub.lineHeight,
          }}
        >
          6 business verticals • 600+ team • 12+ locations • 6 countries
        </Text>
      </Stack>
    </Container>
  );
};

export default HighlightContent;
