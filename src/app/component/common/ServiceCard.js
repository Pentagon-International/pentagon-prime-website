"use client";
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
import React, { memo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "./LoadingContext";
import { homeTypography } from "@/app/home/homeTypography";

const ServiceCard = ({ item, backgroundColor, border, anchorText }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { startLoading } = useLoading();
  const knowmoreRef = useRef(item?.fields?.knowmore);

  // Update ref when knowmore changes
  React.useEffect(() => {
    knowmoreRef.current = item?.fields?.knowmore;
  }, [item?.fields?.knowmore]);

  const handleClick = useCallback(() => {
    const knowmore = knowmoreRef.current;
    if (knowmore) {
      startLoading();
      router.push(knowmore);
    }
  }, [router, startLoading]);

  const handleMouseEnter = useCallback((e) => {
    e.currentTarget.style.border = "2px solid rgb(0, 33, 95)";
    e.currentTarget.style.backgroundColor = "rgb(0, 33, 95)";
    e.currentTarget.style.color = "#FFF";
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.border = "2px solid #E0E0E0";
    e.currentTarget.style.backgroundColor = "#FFF";
    e.currentTarget.style.color = "#000";
  }, []);

  return (
    <GridCol span={{ base: 12, sm: 4.5, md: 3 }} key={item.sys.id}>
      <Card
        onClick={handleClick}
        bg={backgroundColor}
        display={"flex"}
        direction={"column"}
        justify={"flex-start"}
        p={"25px"}
        shadow="md"
        radius={20}
        h={isMobile ? "240px" : "250px"}
        style={{ cursor: "pointer", border:"2px solid #E0E0E0", transition:"all 0.5s ease"}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Flex
          align={"center"}
          justify={"center"}
          display={"flex"}
          mb={"10px"}
          style={{ border: border || "none", borderRadius: "8px", backgroundColor: "#FFF", padding: "8px", width: "60px", height: "60px" }}
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
            style={{
              fontFamily: homeTypography.headingFontFamily,
              fontSize: "1.1rem",
            }}
          >
            {item.fields.service_title || item.fields.title}
          </Title>
          <Text
            tw="balance"
            lh={"sm"}
            size="sm"
            style={{
              flexGrow: 1,
              fontFamily: homeTypography.bodyFontFamily,
              fontSize: homeTypography.sectionSub.fontSize,
            }}
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
