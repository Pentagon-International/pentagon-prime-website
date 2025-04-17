import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiCallProtected } from "../api/api";
import {
  Button,
  Checkbox,
  Grid,
  Group,
  Text,
} from "@mantine/core";
import {
  EstimateFormCalculation,
  SummarySection,
} from "./EstimateFormCalculation";
import { IconRefresh } from "@tabler/icons-react";
import { COLORS } from "../utils/COLORS";

const FairEstimation = ({ data, formHook, accordion, setAccordion }) => {
  const [avarageAmount, setAvarageAmount] = useState(null);

  useEffect(() => {
    if (!formHook.values.shippingLine?.value) {
      setAccordion(false);
    }
  }, [formHook?.values?.shippingLine?.value]);

  const pricingTypeQuery = useQuery({
    queryKey: ["pricingTypes", formHook?.values?.shippingLine?.value],
    queryFn: () =>
      apiCallProtected.get(
        `/pentagon/shippingpricing/carrier/${formHook.values.shippingLine?.value}`
      ),
    enabled: Boolean(formHook?.values?.shippingLine?.value),
    select: (data) => {
      return data?.data?.data?.map((option) => ({
        ...option,
        label: option.charge_name,
        value: option.charge_name,
      }));
    },
  });

  const refetchAPi = () => {
    pricingTypeQuery.refetch();
  };

  return (
    <Grid px={20}>
      <Grid.Col>
        <Group justify="flex-end">
          <Checkbox
            label="Include GST"
            checked={formHook.values.gstIncluded}
            labelPosition="left"
            onChange={(e) => {
              formHook.setFieldValue("gstIncluded", e.target.checked);
            }}
          />
          <Button
            variant="outline"
            onClick={() => refetchAPi()}
            style={{
              border: "none",
              "&:hover": {
                border: "none",
              },
            }}
          ><IconRefresh /></Button>
        </Group>
      </Grid.Col>

      {/* <Grid.Col bg={COLORS?.contactBackground} style={{ borderRadius: 8 }}>
        <EstimateFormCalculation
          quoteData={data}
          chargesList={pricingTypeQuery.data || []}
          chargesMasterList={pricingTypeQuery.data || []}
          gstIncluded={formHook.values.gstIncluded}
          accordion={accordion}
          setAvarageAmount={setAvarageAmount}
          loading={pricingTypeQuery.isLoading}
        />
      </Grid.Col> */}

      <Grid.Col style={{ borderRadius: 4 }} c={'white'}>
        <SummarySection
          accordion={accordion}
          includeTax={formHook.values.gstIncluded}
          avarageAmount={avarageAmount}
          quoteData={data}
          chargesList={pricingTypeQuery.data || []}
          chargesMasterList={pricingTypeQuery.data || []}
          gstIncluded={formHook.values.gstIncluded}
          setAvarageAmount={setAvarageAmount}
          loading={pricingTypeQuery.isLoading}
        />
      </Grid.Col>
    </Grid>
  );
};

export default FairEstimation;
