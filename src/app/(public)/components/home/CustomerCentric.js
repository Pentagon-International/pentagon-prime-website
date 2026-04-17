"use client";
import { Box, Container, Divider, Grid, Text, Title } from "@mantine/core";
import { IconCircleCheck, IconCircleDashedCheck } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { customerCentricListData } from "@/app/utils/llistData";
import { COLORS } from "@/app/utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { highlightText } from "@/app/utils/highlightText";
import { homeTypography } from "./homeTypography";

const CustomerCentric = () => {
  const [listData, setListData] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setListData(customerCentricListData);
  }, []);
  return (
    <Container fluid px={"2%"} py={"70px"} bg={COLORS.backgroundColor}>
      <Title
        tt={"uppercase"}
        fw={800}
        mb={40}
        style={{
          fontFamily: homeTypography.headingFontFamily,
          fontSize: homeTypography.sectionTitle.fontSize,
          lineHeight: homeTypography.sectionTitle.lineHeight,
        }}
      >
        {highlightText("Built around you with a # customer-centric # approach")}
      </Title>
      <Grid
        gutter="xl"
        align="stretch"
        style={{ width: "100%" }}
        justify="center"
        columns={isMobile ? 6 : 12}
      >
        {listData?.map((item, index) => {
          return (
            <Grid.Col span={6} key={index}>
              <Box
                p="1rem"
                shadow="lg"
                style={{
                  height: "100px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "flex-start",
                  backgroundColor:"#FFF",
                  color: COLORS.textColor,
                  borderRadius: "16px",
                  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <IconCircleCheck stroke={2.5} color="rgb(0, 33, 95)" style={{width: "36px", flexShrink: 0, height: "36px"}} />
                <Text
                  ta="left"
                  fw={500}
                  dangerouslySetInnerHTML={{ __html: item.fields.description }}
                  style={{
                    fontFamily: homeTypography.bodyFontFamily,
                    fontSize: homeTypography.sectionSub.fontSize,
                    lineHeight: homeTypography.sectionSub.lineHeight,
                  }}
                />
              </Box>
              {/* {index<listData.length-1 && <span><Divider size="md" my="xs" w="70%" style={{justifySelf:"center", color:"#313131"}}  /></span> } */}
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CustomerCentric;
