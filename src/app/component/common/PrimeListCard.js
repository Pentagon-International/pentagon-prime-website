import { COLORS } from "@/app/utils/COLORS";
import { theme } from "@/app/utils/theme";
import { Card, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo } from "react";

const PrimeListCard = ({ item, backgroundColor, IconComponent, iconColor }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Card
      bg={backgroundColor}
      p="32px"
      shadow="md"
      radius={15}
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "3px solid #E0E0E0",
      }}
    >
      <Stack gap="sm" justify="space-between" h="100%">
        {/* Icon */}
        <IconComponent size={52} stroke={1.8} color="white" style={{backgroundColor: iconColor, padding: "8px", borderRadius: "8px"}} />

        {/* Title */}
        <Title
          order={4}
          fw={700}
          size="20px"
          mt={isMobile ? 0 : 20}
          c="rgb(0, 33, 95)"
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

export default memo(PrimeListCard);
