"use client";

import {
  Box,
  Card,
  CardSection,
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { client } from "../api/contentful";
import Images from "../utils/image";
import { COLORS } from "../utils/COLORS";
import { TYPOGRAPHY } from "../utils/TYPOGRAPHY";
import { useEffect, useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { theme } from "../utils/theme";
import { highlightText } from "../utils/highlightText";
import { IconX } from "@tabler/icons-react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: "members",
          order: "fields.order",
        });
        setMembers(res.items);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (item) => {
    setSelectedItem(item);
    open();
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Container fluid px={"2%"} py={"lg"} my={0} bg={COLORS.backgroundColor}>
      <Flex justify="center" py={50}>
        <Title
          tt={"uppercase"}
          fw={800}
          lh={"lgx2"}
          size={isMobile ? TYPOGRAPHY.h2.mobile : TYPOGRAPHY.h2.desktop}
        >
          {/* <Title size={isMobile ? '30px' : '40px'} fw={800} tt={'uppercase'} lh={'lgx2'}> */}
          {highlightText("Message from the # chairman #")}
        </Title>
      </Flex>
      <Flex
        direction={isMobile ? "column" : "row"}
        justify="center"
        align="center"
        style={{ width: "100%" }}
      >
        <Card
          bg={"#FCFCFC"}
          padding="lg"
          radius="lg"
          style={{
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <Grid
            gutter="60"
            columns={12}
            dir={isMobile ? "column" : "row"}
            align="center"
          >
            <Grid.Col span={isMobile ? 12 : 4} pr={0}>
              <CardSection>
                <Image
                  src={Images.chairman}
                  alt="PentagonPrime Logo"
                  style={{
                    width: isMobile ? "100%" : "80%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </CardSection>
            </Grid.Col>
            <Grid.Col
              span={isMobile ? 12 : 8}
              pl={isMobile ? 20 : 0}
              pr={isMobile ? 20 : 65}
            >
              <Stack spacing="md">
                <Text
                  size={20}
                  lh={"md"}
                  mt={-10}
                  tw="balance"
                  c={COLORS.textColor}
                  ta={"justify"}
                >
                  "We started with a single aim - to make trade easier! Today,
                  Pentagon Group combines disciplined operations with practical
                  digital tools to deliver visibility, predictability, and
                  sustainable choices. As the world shifts to green energy,
                  logistics must follow: we're building tech-enabled green
                  logistics that safely and efficiently move renewable-energy
                  supply chains. Our goal is simple: a comprehensive,
                  low-friction solution that makes booking cargo as easy as
                  booking a flight."
                </Text>
              </Stack>
              <Flex>
                {/* <Grid mt={'md'}>
                <Grid.Col span={4} p={0}>
                  <Text size="md" fw={700} ta={'right'}>
                    -
                  </Text>
                </Grid.Col>
                <Grid.Col span={8} p={0}>
                  <Text size="md" fw={700} ta={'right'}>
                    Mr. Paresh Bhanushali
                  </Text>
                </Grid.Col>
                <Grid.Col span={4} p={0}>
                  <></>
                </Grid.Col>
                <Grid.Col span={8} p={0} mt={'xs'}>
                  <Text size="sm" c={COLORS.textColor}>
                    Chairman and Managing Director
                    <br />Pentagon Group of Companies
                  </Text>
                </Grid.Col>
              </Grid> */}
                <Stack spacing="md" mt={"xl"}>
                  <Text size={theme?.fontSizes?.lg} c="rgb(0, 33, 95)" fw={700}>
                    Paresh Bhanushali
                  </Text>
                  <Text size={20} mt={-10} c={COLORS.textColor} lh={1.5}>
                    <b>Chairman & Managing Director</b>
                    <br />
                    <i>Pentagon Group of Companies</i>
                  </Text>
                </Stack>
              </Flex>
            </Grid.Col>
          </Grid>
        </Card>
      </Flex>
      <Box mb={50}>
        <Title
          tt={"uppercase"}
          lh={isMobile ? "md" : "lgx2"}
          fw={800}
          mb={30}
          mt={50}
          ta="center"
          size={isMobile ? TYPOGRAPHY.h4.mobile : TYPOGRAPHY.h3.desktop}
        >
          {highlightText("Our # people # & technology")}
        </Title>
        <Text
          c={COLORS.textColor}
          lh={1.6}
          style={{
            textIndent: "5rem",
            textAlign: "justify",
            whiteSpace: "pre-line",
          }}
        >
          Our strength is the combination of specialist teams and a
          product-driven mindset. Operations, customs, engineering & project
          teams collaborate closely with IT to transform processes into platform
          features - enabling faster decisions and dependable execution.
        </Text>
      </Box>
      <Flex justify="center" my={50}>
        <Title
          size={isMobile ? TYPOGRAPHY.h2.mobile : TYPOGRAPHY.h2.desktop}
          fw={800}
          tt={"uppercase"}
          lh={"lgx2"}
          c="rgb(0, 33, 95)"
        >
          CORE Team
        </Title>
      </Flex>

      <Grid
        columns={3}
        gutter="xl"
        px={isMobile ? 0 : 40}
        justify="start"
        align="center"
      >
        {isMobile ? (
          <Carousel
            align={"start"}
            slideSize="70%"
            height={"auto"}
            w={"100%"}
            slideGap="xs"
            loop
            styles={{
              controls: {
                display: "none",
                visibility: "hidden",
                opacity: 0,
                pointerEvents: "none",
              },
            }}
          >
            {members.map((item) => (
              <Carousel.Slide w={"100%"} key={item.sys.id}>
                <GridCol w={"100%"} span={12}>
                  <Image
                    onClick={() => handleOpen(item)}
                    radius={"lg"}
                    w={"100%"}
                    h={"100%"}
                    src={item.fields.image?.fields?.file?.url}
                    alt={item.fields.name}
                    style={{
                      cursor: "pointer",
                      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <Text fw={700} size="md" mt={"md"}>
                    {item.fields.name}
                  </Text>
                  <Text size="sm" c={COLORS.textColor}>
                    {item.fields.role}
                  </Text>
                </GridCol>
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          members.map((item) => (
            <GridCol
              key={item.sys.id}
              span={1}
              mb={"xl"}
              px={isMobile ? 0 : 20}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                onClick={() => handleOpen(item)}
                style={{
                  cursor: "pointer",
                  width: "80%",
                  maxHeight: "450px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  transition: "all 0.5s ease",
                  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Image
                  style={{ maxHeight: "450px", transition: "all 0.5s ease" }}
                  src={item.fields.image?.fields?.file?.url}
                  alt={item.fields.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.scale = "1.05";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.scale = "1";
                  }}
                />
              </Box>
              <Text fw={700} size="md" mt={"md"}>
                {item.fields.name}
              </Text>
              <Text size="sm" fw={500} c={COLORS.textColor}>
                {item.fields.role}
              </Text>
            </GridCol>
          ))
        )}
      </Grid>

      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<Text fw={600} c="#111F40" ta="left">View Detail</Text>}
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
        size="60vw"
      >
        <Box mt={"xl"} style={{ display: "flex", gap: "16px" }}>
          <Box
            style={{
              width: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              radius={"lg"}
              w={"250px"}
              src={selectedItem?.fields.image?.fields?.file?.url}
              alt={selectedItem?.fields.name}
              style={{ boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)" }}
            />
          </Box>
          <Box
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text fw={700} size="md">
              {selectedItem?.fields.name}
            </Text>
            <Text size="sm" c={COLORS.textColor}>
              {selectedItem?.fields.role}
            </Text>
            <Text
              c={COLORS.textColor}
              mt="md"
              style={{
                textIndent: "3rem",
                paddingTop: "8px",
                lineHeight: 1.6,
                textAlign: "justify",
              }}
              size={TYPOGRAPHY.body.large}
            >
              {selectedItem?.fields.description || "No description available"}
            </Text>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Members;
