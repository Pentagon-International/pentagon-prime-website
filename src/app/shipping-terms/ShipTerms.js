"use client";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Image,
  Box,
  Group,
  ScrollArea,
  Modal,
  Button,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { apiCallProtected } from "../api/api";
import { COLORS } from "../utils/COLORS";
import { TYPOGRAPHY } from "../utils/TYPOGRAPHY";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import description from "./shipTermDescription";

const ShipTerms = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const shipmentTermsQuery = useQuery({
    queryKey: ["shipment-types"],
    queryFn: async () => {
      const response = await apiCallProtected.get(
        "/pentagon/shippingTerms_data"
      );
      return response.data;
    },
    select: ({ data }) => {
      return data?.map((item) => ({
        label: item.category,
        terms: item.content,
        logo: "https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg",
      }));
    },
  });
  console.log("ShipTerms?.data :: :: :::: ", shipmentTermsQuery?.data);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleOpen = (term) => {
    setSelectedTerm(term);
    open();
  };

  return (
    <Container fluid px="2%" py="70px">
      <Title
        size={isMobile ? TYPOGRAPHY.h5.desktop : "lg"}
        lh={isMobile ? "md" : "lgx2"}
        tt={"uppercase"}
        fw={800}
        ta="center"
      >
        SHIPPING TERMS
      </Title>
      <Text mt={10} size="sm" ta="center" c={COLORS.textColor}>
        Shipping terms, Track shipment, View rates, Get schedules
      </Text>

      <SimpleGrid
        mt="40px"
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
      >
        {shipmentTermsQuery?.data?.map((group) => (
          <Box
            key={group.label}
            style={{
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              maxHeight: "245px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Sticky Header */}
            <Box
              p="md"
              bg="#F2F7FC"
              style={{
                borderBottom: "1px solid #e0e0e0",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <Group>
                <Image
                  src={group.logo}
                  alt={group.label}
                  radius="md"
                  fit="contain"
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
                <Text fw={700} size="md" c={COLORS.textColor}>
                  {group.label}
                </Text>
              </Group>
            </Box>

            {/* Scrollable Content */}
            <ScrollArea style={{ flex: 1, padding: "0 16px" }}>
              {group?.terms?.map((term, index) => (
                <Box
                  key={index}
                  py="xs"
                  style={{
                    borderBottom:
                      index < group.terms.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                  }}
                >
                  <Button
                    p={0}
                    c={COLORS.textColor}
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => handleOpen(term)}
                  >
                    {term.name}
                  </Button>
                </Box>
              ))}
            </ScrollArea>
          </Box>
        ))}
      </SimpleGrid>

      {/* Single Modal */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={
          <Text fw={800} size={TYPOGRAPHY.h5.desktop} lh={1.4} c="#111F40" ta="left">
            {selectedTerm?.name}
          </Text>
        }
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 3,
        }}
        closeButtonProps={{
          icon: <IconX size={24} stroke={2} color={COLORS.textColor} />,
        }}
        radius={10}
        styles={{
          content: {
            padding: "15px",
          },
        }}
        size="45vw"
      >
        <Text
          c={COLORS.textColor}
          style={{
            textIndent: "3rem",
            paddingTop: "8px",
            lineHeight: 1.6,
            textAlign: "justify",
          }}
          size={TYPOGRAPHY.body.large}
        >
          {description?.[selectedTerm?.name] || "No description available"}
        </Text>
      </Modal>
    </Container>
  );
};

export default ShipTerms;
