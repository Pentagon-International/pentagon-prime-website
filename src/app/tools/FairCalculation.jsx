import { Box, Grid, Title } from "@mantine/core";
import React, { useState } from "react";
import FairQuotation from "./FairQuotaion";
import FairEstimation from "./FairEstimation";
import { sumByCountSize } from "./sumByCountSize";
import { useForm } from "@mantine/form";
import { theme } from "../utils/theme";

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
    <>
      <Grid mb={theme?.lineHeights.lg}>
        <Grid.Col span={6}>
          <Title mb="lg" mt={'xl'}>Fare Calculation</Title>
          <FairQuotation
            onSubmit={handleQuotationSubmit}
            formHook={formHook}
            accordion={accordion}
            setAccordion={setAccordion}
          />
        </Grid.Col>

        <Grid.Col span={6}>
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
    </>
  );
};

export default FairCalculation;
