"use client";
import { Box, Container, Divider, Grid, Text, Title } from "@mantine/core";
import { IconCircleCheck, IconCircleDashedCheck } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { customerCentricListData } from "../utils/llistData";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { highlightText } from "../utils/highlightText";

const CustomerCentric = () => {
  const [listData, setListData] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setListData(customerCentricListData);
  }, []);
  return (
    <Container fluid px={"7%"} py={"70px"}>
      <Title
        tt={"uppercase"}
        lh={isMobile ? "md" : "lgx2"}
        fw={800}
        mb={40}
        size={isMobile ? "20px" : "34px"}
      >
        {highlightText("Built around you with a # customer-centric # approach")}
      </Title>
      <Grid
        gutter="xl"
        align="stretch"
        style={{ width: "100%" }}
        justify="center"
      >
        {listData?.map((item, index) => {
          return (
            <Grid.Col span={12} key={index}>
              <Box
                p="1rem"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "flex-start",
                  backgroundColor:"#F2F7FC",
                  color: "#313131",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px lightgray",
                }}
              >
                <IconCircleCheck size={40} stroke={2.5} color="green" />
                <Text ta="left" fz={20} fw={500}>{item.fields.description}</Text>
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
