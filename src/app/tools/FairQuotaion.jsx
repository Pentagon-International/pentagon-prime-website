import {
  Box,
  Button,
  Center,
  Grid,
  SegmentedControl,
  Select,
  Text,
  Group,
  Flex,
  GridCol,
} from "@mantine/core";

import React, { useState } from "react";
import { COLORS } from "../utils/COLORS";
import {
  IconPlane,
  IconSquareHalf,
  IconBox,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { apiCallProtected } from "../api/api";
import InputLoader from "./InputLoader";
import FairContainer from "./FairContainer";

const FairQuotation = ({ onSubmit, formHook, accordion, setAccordion }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [chargesList, setChargesList] = useState([]);

  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      typeOfBooking: "FCL",
      isDoorPickup: false,
      isOriginCustoms: false,
      isDoorDelivery: false,
      isDestinationCustoms: false,
      isDangerous: false,
      isInsurance: false,
    },
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("values -->", values);

      const body = {
        category: values.typeOfBooking,
        origin: {
          name: values.origin,
          port: values.originPort,
          code: values.originCode,
          // country: values.originCountry,
          // pickup: values.isDoorPickup,
          // customs: values.isOriginCustoms,
          // address: values.pickupAddress,
          // ready_date: values.cargoReadyDate,
          shipment_type: values.shipmentType,
        },
        destination: {
          name: values.destination,
          port: values.destinationPort,
          code: values.destinationCode,
          // country: values.destinationCountry,
          // delivery: values.isDoorDelivery,
          // customs: values.isDestinationCustoms,
          // address: values.deliveryAddress,
        },
        // cargo: {
        //   isDangerous: values.isDangerous,
        //   imo: values.imo,
        //   un_no: values.unNo,
        //   remarks: values.remarks,
        // },
        container_details: values.containers,
        // documents: values.documents || [],
        // agents: values.agents,
      };
      onSubmit(body);
    },
    validate: (values) => {
      const errors = {};
      if (!values.typeOfBooking) {
        errors.typeOfBooking = "Required";
      }

      return errors;
    },
  });

  const Label = ({ children }) => (
    <Text size="xs" fw={600} c={"gray"} display={"inline"}>
      {children}
    </Text>
  );

  const shipmentTypesQuery = useQuery({
    queryKey: ["shipment-types"],
    queryFn: async () => {
      const response = await apiCallProtected.get("/pentagon/incoTermsx");
      return response.data;
    },
    select: ({ data }) =>
      data?.map((item) => ({
        label: item.name,
        value: `${item.code}`,
      })),
    onSuccess: ({ data }) => {
      console.log("shipment types >>", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const portQuery = useQuery({
    queryKey: ["ports", values.typeOfBooking],
    queryFn: () => {
      return apiCallProtected.get("/flow/seaports");
    },
    cacheTime: 1000 * 60 * 60 * 24,
    select: (data) => {
      return data.data?.data?.map((item) => ({
        label: `${item.port_name} (${item.code}), ${item.city_name}, ${item.country_name}`,
        code: item.code,
        value: `${item.id}`,
        country_code: item.Country?.code,
      }));
    },
    onSuccess: (data) => {
      console.table(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const shippingQuery = useQuery({
    queryKey: ["shippingLine", values?.originPort, values?.destinationPort],
    queryFn: () =>
      apiCallProtected.get(
        `/pentagon/shippingline/${values?.originPort}/${values?.destinationPort}`
      ),
    enabled: Boolean(values?.originPort && values?.destinationPort),
    select: ({ data }) => {
      return data.data?.map((item) => ({
        ...item,
        label: `${item?.name}, ${item?.city}`,
        value: String(item?.id),
      }));
    },
  });
  const addContainerCallback = (containerValues) => {
    setFieldValue("containers", containerValues);
    close();
  };

  return (
    <Box style={{ maxHeight: "100vh" }}>
      <form onSubmit={handleSubmit}>
        <Grid gutter={"xl"} px={20} justify="center" align="center">
          <Grid.Col span={12}>
            <Text fw={500} mt={"md"} size="sm">
              Type of Booking
            </Text>
            <Flex align="center" justify="space-between" gap={10}>
              <SegmentedControl
                name="typeOfBooking"
                onChange={(val) => setFieldValue("typeOfBooking", val)}
                w={"65%"}
                size="sm"
                color={COLORS.primaryColor}
                defaultValue="FCL"
                value={values.typeOfBooking}
                data={[
                  {
                    value: "FCL",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconBox size={18} stroke={1.5} />
                        <span>FCL</span>
                      </Center>
                    ),
                  },
                  {
                    value: "LCL",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconSquareHalf size={18} stroke={1.5} />
                        <span>LCL</span>
                      </Center>
                    ),
                  },
                  {
                    value: "AIR",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconPlane size={18} stroke={1.5} />
                        <span>Air</span>
                      </Center>
                    ),
                  },
                ]}
              />

              {shipmentTypesQuery.isLoading ? (
                <InputLoader />
              ) : (
                <Select
                  size="sm"
                  clearable
                  searchable
                  required={true}
                  mt={-20}
                  onChange={(v) => setFieldValue("shipmentType", v)}
                  name={"shipmentType"}
                  label={<Label>Shipping Terms</Label>}
                  placeholder="Type of Shipment"
                  comboboxProps={{ shadow: "sm" }}
                  data={shipmentTypesQuery?.data}
                />
              )}
            </Flex>

            <Group mt={"sm"}>
              <Flex
                w={"100%"}
                gap={10}
                direction={"row"}
                justify={"space-between"}
                align={"center"}
              >
                {portQuery.isLoading ? (
                  <InputLoader />
                ) : (
                  <Select
                    name={"originPlace"}
                    placeholder="Choose Origin Port / City"
                    required
                    onChange={(v, opt) => {
                      setFieldValue("origin", opt.label);
                      setFieldValue(
                        "originCountry",
                        opt?.country_id || opt?.Country?.id
                      );
                      setFieldValue("originPort", v);
                      setFieldValue("originCode", opt.code);
                      setFieldValue("originCountryCode", opt.country_code);
                    }}
                    size="sm"
                    w={"50%"}
                    mt={"xs"}
                    clearable
                    searchable
                    label="Origin Port / City"
                    comboboxProps={{ shadow: "md" }}
                    data={portQuery.data || []}
                  />
                )}
                {portQuery.isLoading ? (
                  <InputLoader />
                ) : (
                  <Select
                    name={"destinationPlace"}
                    placeholder="Choose Destination Port / City"
                    required
                    onChange={(v, opt) => {
                      setFieldValue("destination", opt.label);
                      setFieldValue("destinationPort", v);
                      setFieldValue("destinationCode", opt.code);
                      setFieldValue("destinationCountryCode", opt.country_code);
                    }}
                    size="sm"
                    clearable
                    w={"50%"}
                    mt={"xs"}
                    searchable
                    label="Destination Port / City"
                    comboboxProps={{ shadow: "md" }}
                    data={portQuery.data || []}
                  />
                )}
              </Flex>
            </Group>

            <Flex mt={"sm"} direction={"column"}>
              <Text size="sm" fw={600}>
                Cargo
              </Text>
              <FairContainer
                data={values?.containers}
                submitCallback={addContainerCallback}
              />
            </Flex>

            <GridCol>
              {shippingQuery.isLoading ? (
                <InputLoader label={"Shipping Line"} />
              ) : (
                <Select
                  mt={"md"}
                  size="sm"
                  clearable
                  searchable
                  required
                  name={"shipper"}
                  label={
                    <Text size="xs" fw={600} c={"gray"}>
                      Shipping Line
                    </Text>
                  }
                  key={formHook.key("shippingLine")}
                  data={shippingQuery.data || []}
                  value={formHook.values.shippingLine?.value}
                  onChange={(_, option) => {
                    formHook.setFieldValue("shippingLine", option);
                    setChargesList([]);
                    // handlePricevalues(option?.value);
                  }}
                />
              )}
            </GridCol>
            <Button
              type="submit"
              onClick={() => {
                setAccordion(true);
              }}
              disabled={formHook.values.shippingLine?.value ? false : true}
              size="sm"
              mt={"sm"}
              fullWidth
              color={COLORS.primaryColor}
            >
              Fare Calculate
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
};

export default FairQuotation;
