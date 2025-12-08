"use client";
import {
    Container,
    Box,
    Title,
    Grid,
    GridCol,
    Card,
    Text,
    Stack,
  } from "@mantine/core";
  import * as TablerIcons from "@tabler/icons-react";
  import { Carousel } from "@mantine/carousel";
  import { highlightText } from "@/app/utils/highlightText";    
  import { useMediaQuery } from "@mantine/hooks";
  import { COLORS } from "@/app/utils/COLORS";
  import { theme } from "@/app/utils/theme";
  
  export default function ListCard({
      listData = [],
      sectionTitle,
    }) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
      <Container fluid px="7%" py="70px">
        {/* Section Heading */}
        <Box mt={20}>
          <Title
            tt="uppercase"
            c="#111f40"
            lh="md"
            mb={isMobile ? 20 : 30}
            ta="center"
            fw={800}
            size={isMobile ? "20px" : "28px"}
          >
            {highlightText(sectionTitle)}
          </Title>
  
          {/* Responsive Grid or Carousel */}
          <Grid columns={9} mt="lg" gutter="lg" w="100%">
            {isMobile ? (
              <Carousel
                align="start"
                slideSize="70%"
                slideGap="lg"
                loop
                w="100%"
                styles={{
                  controls: { display: "none" },
                  slide: {
                    display: "flex",
                    alignItems: "stretch",
                  },
                }}
              >
                {listData.map((item, index) => {
                  const iconName = item?.fields.icon;
                  const IconComponent =
                    (iconName && TablerIcons[iconName]) ||
                    TablerIcons.IconQuestionMark;
  
                  const title = item?.fields.service_title || item?.fields.title;
                  const description =
                    item?.fields.service_description || item?.fields.description;
  
                  return (
                    <Carousel.Slide key={index}>
                      <Card
                        bg={"#F2F7FC"}
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
                          {/* ICON (Only if exists) */}
                          {iconName && (
                            <IconComponent
                              size={42}
                              stroke={1.6}
                              color="#1E88E5"
                            />
                          )}
  
                          {/* TITLE (Only if exists) */}
                          {title && (
                            <Title
                              order={4}
                              fw={700}
                              size="20px"
                              mt={isMobile ? 0 : 20}
                              lh="sm"
                            >
                              {title}
                            </Title>
                          )}
  
                          {/* DESCRIPTION (Only if exists) */}
                          {description && (
                            <Text
                              c="gray"
                              lh="sm"
                              size="sm"
                              style={{
                                flexGrow: 1,
                              }}
                            >
                              {description}
                            </Text>
                          )}
                        </Stack>
                      </Card>
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
            ) : (
              listData.map((item, index) => {
                const iconName = item.fields.icon;
                const IconComponent =
                  (iconName && TablerIcons[iconName]) ||
                  TablerIcons.IconQuestionMark;
  
                const title = item.fields.service_title || item.fields.title;
                const description =
                  item.fields.service_description || item.fields.description;
  
                return (
                  <GridCol
                    key={index}
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                    style={{ display: "flex" }}
                  >
                    <Card
                      bg={"#F2F7FC"}
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
                        {/* ICON */}
                        {iconName && (
                          <IconComponent
                            size={42}
                            stroke={1.6}
                            color="#1E88E5"
                          />
                        )}
  
                        {/* TITLE */}
                        {title && (
                          <Title
                            order={4}
                            fw={700}
                            size="20px"
                            mt={isMobile ? 0 : 20}
                            lh="sm"
                          >
                            {title}
                          </Title>
                        )}
  
                        {/* DESCRIPTION */}
                        {description && (
                          <Text
                            c="gray"
                            lh="sm"
                            size="sm"
                            style={{
                              flexGrow: 1,
                            }}
                          >
                            {description}
                          </Text>
                        )}
                      </Stack>
                    </Card>
                  </GridCol>
                );
              })
            )}
          </Grid>
        </Box>
      </Container>
    );
  }
  