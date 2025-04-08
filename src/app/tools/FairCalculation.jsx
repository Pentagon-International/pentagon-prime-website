import { Box, Grid, Title } from "@mantine/core";
import React, { useState } from "react";
import FairQuotation from "./FairQuotaion";
import FairEstimation from "./FairEstimation";
import { sumByCountSize } from "./sumByCountSize";
import { useForm } from "@mantine/form";

const FairCalculation = () => {
  const [quotationData, setQuotationData] = useState(null);
  const [accordion, setAccordion] = useState(false);

  const handleQuotationSubmit = (data) => {
    const containerList = sumByCountSize(data?.container_details?.list);

    const updatedData = {
      ...data,
      container_details: {
        ...data.container_details,
        list: containerList,
      },
    };
    setQuotationData(updatedData);
  };

  const formHook = useForm({
    initialValues: {
      shippingLine: null,
      gstIncluded: false,
    },
  });


  return (
    <Grid>
      <Grid.Col span={5}>
        <Title mb="lg">Fare Calculation</Title>

        <Box
          bg={"gray.0"}
          style={{
            borderRadius: 8,
            border: "1px dashed #E2E8F0",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FairQuotation
            onSubmit={handleQuotationSubmit}
            formHook={formHook}
            accordion={accordion}
            setAccordion={setAccordion}
          />
        </Box>
      </Grid.Col>

      <Grid.Col span={7}>
        <Box
          style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FairEstimation
            data={quotationData}
            formHook={formHook}
            accordion={accordion}
            setAccordion={setAccordion}
          />
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default FairCalculation;
