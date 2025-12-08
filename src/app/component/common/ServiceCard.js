import { COLORS } from "@/app/utils/COLORS";
import { theme } from "@/app/utils/theme";
import {
  Anchor,
  Card,
  Flex,
  GridCol,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo, useCallback } from "react";

const ServiceCard = ({ item, backgroundColor, border, anchorText }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClick = useCallback(() => {
    if (item?.fields?.knowmore) {
      window.location.href = item.fields.knowmore;
    }
  }, [item?.fields?.knowmore]);

  const handleMouseEnter = useCallback((e) => {
    e.currentTarget.style.outline = "3px solid rgb(0, 33, 95)";
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.outline = "none";
  }, []);

  return (
    <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={item.sys.id}>
      <Card
        onClick={handleClick}
        bg={backgroundColor}
        display={"flex"}
        direction={"column"}
        justify={"flex-start"}
        p={"25px"}
        shadow="md"
        radius={20}
        h={isMobile ? "200px" : "250px"}
        style={{ cursor: "pointer"}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Flex
          align={"center"}
          display={"flex"}
          mb={"10px"}
          w={"fit-content"}
          style={{ border: border || "none", borderRadius: "12px" }}
        >
          <Image
            src={
              item.fields.service_icon?.fields?.file?.url ||
              item.fields.image?.fields?.file?.url
            }
            width={45}
            height={45}
            mah={45}
            alt={item.fields.service_title || item.fields.title}
          />
        </Flex>
        <Group>
          <Title
            tw="balance"
            display={"flex"}
            align={"center"}
            fw={700}
            size={theme.fontSizes.base}
            order={4}
            mt={20}
          >
            {item.fields.service_title || item.fields.title}
          </Title>
          <Text
            tw="balance"
            lh={"sm"}
            size="sm"
            style={{ flexGrow: 1 }}
          >
            {item.fields.service_description || item.fields.description}
          </Text>
        </Group>
        
        {/* {item.fields?.knowmore && (
          <Flex
            align="center"
            gap={4}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Anchor
              href={item.fields.knowmore}
              target="_blank"
              c={COLORS.serviceColor}
              fw={500}
              pt={"10px"}
              mt={"auto"}
              display={"flex"}
              alignitems={"center"}
              size="xs"
              underline="hover"
            >
              {anchorText}
            </Anchor>
          </Flex>
        )} */}
      </Card>
    </GridCol>
  );
};

export default memo(ServiceCard);
