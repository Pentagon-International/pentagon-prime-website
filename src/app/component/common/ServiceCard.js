
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
import React from "react";

const ServiceCard = ({ item, backgroundColor, border, anchorText }) => {

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <GridCol
      span={{ base: 12, md: 3 }}
      key={item.sys.id}
    >
      <Card
        bg={backgroundColor}
        display={"flex"}
        direction={"column"}
        justify={"flex-start"}
        p={'25px'}
        radius={20}
        h={isMobile ? "200px" : "250px"}
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
        {isMobile ? <Stack w={"100%"}>
          <Title
            tw="balance"
            display={"flex"}
            fw={700}
            size={theme.fontSizes.base}
            order={4}
            mt={isMobile ? 0 : 20}
          >
            {item.fields.service_title || item.fields.title}
          </Title>
          <Text
            tw="balance"
            c={COLORS.textColor}
            lh={"sm"}
            size="sm"
            style={{ flexGrow: 1 }}
          >
            {item.fields.service_description || item.fields.description}
          </Text>
        </Stack> : <Group>
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
            c={COLORS.textColor}
            lh={"sm"}
            size="sm"
            style={{ flexGrow: 1 }}
          >
            {item.fields.service_description || item.fields.description}
          </Text>
        </Group>}
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

export default ServiceCard;