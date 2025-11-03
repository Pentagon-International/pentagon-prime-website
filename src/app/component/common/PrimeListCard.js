import { COLORS } from "@/app/utils/COLORS";
import { theme } from "@/app/utils/theme";
import { Card, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

const PrimeListCard = ({ item, backgroundColor, IconComponent }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Card
      bg={backgroundColor}
      p="20px"
      radius={15}
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack gap="sm" justify="space-between" h="100%">
        {/* Icon */}
        <IconComponent size={42} stroke={1.6} color="#1E88E5" />

        {/* Title */}
        <Title
          order={4}
          fw={700}
          size={theme.fontSizes.base}
          mt={isMobile ? 0 : 20}
          lh="sm"
        >
          {item.fields.service_title || item.fields.title}
        </Title>

        {/* Description */}
        <Text
          c={COLORS.textColor}
          lh="sm"
          size="sm"
          style={{
            flexGrow: 1,
          }}
        >
          {item.fields.service_description || item.fields.description}
        </Text>
      </Stack>
    </Card>
  );
};

export default PrimeListCard;
