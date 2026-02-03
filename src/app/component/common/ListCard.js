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
  import { TYPOGRAPHY } from "@/app/utils/TYPOGRAPHY";
  import { theme } from "@/app/utils/theme";
  import { memo, useMemo } from "react";
  
  const ListCardItem = memo(({ item, index, isMobile }) => {
    const iconName = item?.fields?.icon || item?.fields?.icon;
    const IconComponent = useMemo(() => 
      (iconName && TablerIcons[iconName]) || TablerIcons.IconQuestionMark,
      [iconName]
    );
    
    const title = item?.fields?.service_title || item?.fields?.title;
    const description = item?.fields?.service_description || item?.fields?.description;
    
    const cardStyle = useMemo(() => ({
      flex: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }), []);

    return (
      <Card
        bg={"#FFF"}
        p="20px"
        radius={15}
        style={{...cardStyle, boxShadow:"0 3px 8px rgba(0, 0, 0, 0.3)"}}
      >
        <Stack gap="sm" justify="space-between" h="100%">
          {iconName && (
            <IconComponent
              size={42}
              stroke={1.6}
              color="#1E88E5"
            />
          )}
          {title && (
            <Title
              order={4}
              fw={700}
              size={TYPOGRAPHY.h4.mobile}
              mt={isMobile ? 0 : 20}
              lh="sm"
            >
              {title}
            </Title>
          )}
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
    );
  });

  function ListCard({
      listData = [],
      sectionTitle,
    }) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
      <Container fluid px="2%" py="40px" bg={COLORS.backgroundColor}>
        {/* Section Heading */}
        <Box>
          <Title
            tt="uppercase"
            c="#111f40"
            lh="md"
            mb={isMobile ? 20 : 30}
            ta="center"
            fw={800}
            size={isMobile ? TYPOGRAPHY.h4.mobile : TYPOGRAPHY.h4.desktop}
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
                {listData.map((item, index) => (
                    <Carousel.Slide key={index}>
                      <ListCardItem item={item} index={index} isMobile={isMobile} />
                    </Carousel.Slide>
                  ))}
              </Carousel>
            ) : (
              listData.map((item, index) => (
                  <GridCol
                    key={index}
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                    style={{ display: "flex" }}
                  >
                    <ListCardItem item={item} index={index} isMobile={isMobile} />
                  </GridCol>
                ))
            )}
          </Grid>
        </Box>
      </Container>
    );
  }
  
  export default memo(ListCard);
  