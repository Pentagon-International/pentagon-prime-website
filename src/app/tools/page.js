'use client'

import {
  NumberInput,
  Select,
  Group,
  Radio,
  Button,
  Box,
  Grid,
  Divider,
  Text,
  Title,
  GridCol,
  Container,
  Card,
  SegmentedControl,
  Flex,
  MultiSelect,
} from "@mantine/core";
import { useState } from "react";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import FairCalculation from "./FairCalculation";

const CbmCalc = () => {
  const [state, setState] = useState({
    unit: "cm",
    volumeUnit: "cubicMeter",
    length: 0,
    width: 0,
    height: 0,
    quantity: 1,
    grossWeight: 0,
    volumeCbm: 0,
    volumeCft: 0,
    weightKg: 0,
    weightLb: 0,
    volumetricWeightSea: 0,
    volumetricWeightAir: 0,
    container20ft: 0,
    container40ft: 0,
    container40ftHC: 0,
  });

  //const [opened, setOpened] = useState(false); // State to manage modal visibility
  const [showCalc, setShowCalc] = useState(false);

  const conversionFactorCubicFeet = 35.315;
  const volumetricDividerSea = 1000;
  const volumetricDividerAir = 6000;
  const lbConversion = 2.20462;

  const containerCapacities = {
    "20ft": 33,
    "40ft": 67,
    "40ftHC": 76,
  };

  const handleChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const calculateCBM = () => {
    const { length, width, height, quantity, grossWeight, unit } = state;

    if (length <= 0 || width <= 0 || height <= 0) {
      alert("Please enter valid dimensions (length, width, height).");
      return;
    }

    const conversionFactor =
      unit === "cm" ? 0.01 : unit === "inch" ? 0.0254 : 1;
    const lengthM = length * conversionFactor;
    const widthM = width * conversionFactor;
    const heightM = height * conversionFactor;

    const cbm = lengthM * widthM * heightM * quantity;
    const cft = cbm * conversionFactorCubicFeet;

    const weight = grossWeight * quantity;
    const volWeightSea = (cbm * 1000) / volumetricDividerSea;
    const volWeightAir = (cbm * 1000) / volumetricDividerAir;

    setState((prev) => ({
      ...prev,
      volumeCbm: cbm.toFixed(3),
      volumeCft: cft.toFixed(3),
      weightKg: weight,
      weightLb: (weight * lbConversion).toFixed(3),
      volumetricWeightSea: volWeightSea.toFixed(4),
      volumetricWeightAir: volWeightAir.toFixed(4),
      container20ft: (containerCapacities["20ft"] / cbm).toFixed(3),
      container40ft: (containerCapacities["40ft"] / cbm).toFixed(3),
      container40ftHC: (containerCapacities["40ftHC"] / cbm).toFixed(3),
    }));

    // Open the modal after calculation
    showCalc ? setShowCalc(false) : setShowCalc(true);

  };

  const {
    unit,
    volumeUnit,
    length,
    width,
    height,
    quantity,
    grossWeight,
    volumeCbm,
    volumeCft,
    weightKg,
    weightLb,
    volumetricWeightSea,
    volumetricWeightAir,
    container20ft,
    container40ft,
    container40ftHC,
  } = state;

  const [tools, setTools] = useState('CBM')
  const isMobile = useMediaQuery('(max-width:768px)')

  const [formData, setFormData] = useState({
    length: 0,
    width: 0,
    height: 0,
    quantity: 0,
    actualWeight: 0,
  });

  const [chargeableWeightSea, setChargeableWeightSea] = useState(null);
  const [chargeableWeightAir, setChargeableWeightAir] = useState(null);

  const [chargeSeaAmt, setChargeSeaAmt] = useState(null);
  const [chargeAirAmt, setChargeAirAmt] = useState(null);

  const [selectedCharges, setSelectedCharges] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const ratePerItem = [
    {
      rate: 1.5,
      per: "kg",
      currency: "USD",
      Symbol: "$",
    },
    {
      rate: 5,
      per: "kg",
      currency: "USD",
      Symbol: "$",
    },
  ];

  const additionalCharges = [
    { chargeType: "Fuel Surcharge", seaFreight: 5, airFreight: 10 },
    { chargeType: "Handling Charges", seaFreight: 0.2, airFreight: 0.1 },
    { chargeType: "Port Fees", seaFreight: 10, airFreight: 0 },
    { chargeType: "Security Surcharge", seaFreight: 0, airFreight: 3 },
    { chargeType: "Insurance Fee", seaFreight: 0, airFreight: 5 },
    { chargeType: "Overweight Surcharge", seaFreight: 0, airFreight: 0 },
    { chargeType: "Storage Fees", seaFreight: 1, airFreight: 1 },
    { chargeType: "Dimensional Surcharge", seaFreight: 0, airFreight: 0 },
  ];

  const calculateChargeableWeight = () => {
    const { length, width, height, quantity, actualWeight } = formData;

    const volumePerItem = (length * width * height) / 1000000;

    const totalVolume = volumePerItem * quantity;

    const chargeableSea = (totalVolume * 1000).toFixed(2);

    const chargeableAir = ((totalVolume * 1000) / 6).toFixed(2);

    const totalSeaAMt = chargeableSea * ratePerItem[0].rate;
    const totalAirAMt = chargeableAir * ratePerItem[1].rate;

    setChargeSeaAmt(totalSeaAMt.toFixed(2));
    setChargeAirAmt(totalAirAMt.toFixed(2));

    setChargeableWeightSea(chargeableSea);
    setChargeableWeightAir(chargeableAir);

    const calculateAdditionalCharges = () => {
      let totalSeaAdditionalCharges = 0;
      let totalAirAdditionalCharges = 0;

      selectedCharges.forEach((charge) => {
        const chargeData = additionalCharges.find(
          (c) => c.chargeType === charge
        );

        if (chargeData) {
          totalSeaAdditionalCharges += chargeData.seaFreight;
          totalAirAdditionalCharges += chargeData.airFreight;
        }
      });

      setChargeSeaAmt(
        (parseFloat(totalSeaAMt) + totalSeaAdditionalCharges).toFixed(2)
      );
      setChargeAirAmt(
        (parseFloat(totalAirAMt) + totalAirAdditionalCharges).toFixed(2)
      );
    };

    //hide/display calculation
    showCalc ? setShowCalc(false) : setShowCalc(true);
  };


  return (
    <Container fluid px="7%" h="100%" >
      <Grid mt={60}>
        <Grid.Col span={12} px={'lg'} py={'lg'} mt={'md'}>
          <Flex justify={'flex-end'}>
            <SegmentedControl
              onChange={(v) => {
                setTools(v)
              }}
              value={tools}
              data={['Fare Calculation', 'CBM', 'CWC']} />
          </Flex>
        </Grid.Col>
      </Grid>
      {tools == 'CBM' &&
        <Grid>
          <Grid.Col span={6} px={"lg"}>
            <Title mb="lg">CBM Calculator</Title>
            <Box>
              <Radio.Group
                value={volumeUnit}
                onChange={(value) => handleChange("volumeUnit", value)}
                label="Unit of Volume"
                color={COLORS.primaryColor}
                mb="lg"
              >
                <Group mt={"md"}>
                  <Radio value="cubicMeter" label="Cubic Meter" />
                  <Radio value="cubicFeet" label="Cubic Feet" />
                </Group>
              </Radio.Group>
            </Box>

            <Container mt={40}>
              <Select
                label="Unit of Measurement"
                value={unit}
                onChange={(value) => handleChange("unit", value)}
                data={["cm", "inch", "meter"]}
                placeholder="Select unit"
                mb="sm"
                hideControls
              />

              <Grid>
                <GridCol span={4}>
                  <NumberInput
                    label="Length"
                    placeholder="Enter length"
                    value={length}
                    onChange={(value) => handleChange("length", value)}
                    min={0}
                    mb="sm"
                    hideControls
                  />
                </GridCol>
                <GridCol span={4}>
                  <NumberInput
                    label="Width"
                    placeholder="Enter width"
                    value={width}
                    onChange={(value) => handleChange("width", value)}
                    min={0}
                    mb="sm"
                    hideControls
                  />
                </GridCol>
                <GridCol span={4}>
                  <NumberInput
                    label="Height"
                    placeholder="Enter height"
                    value={height}
                    onChange={(value) => handleChange("height", value)}
                    min={0}
                    mb="sm"
                    hideControls
                  />
                </GridCol>
              </Grid>

              <Grid>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Gross Weight"
                    value={grossWeight}
                    onChange={(value) => handleChange("grossWeight", value)}
                    mb="sm"
                    hideControls
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Quantity"
                    value={quantity}
                    onChange={(value) => handleChange("quantity", value)}
                    mb="sm"
                    hideControls
                  />
                </Grid.Col>
              </Grid>

              <Button
                mb={'md'}
                mt="lg"
                fullWidth
                onClick={calculateCBM}
              >
                {showCalc ? "Hide Calculate" : "Show Calculate"}
              </Button>
            </Container>
          </Grid.Col>
          {
            showCalc && <Grid.Col span={6}>
              <Box
                style={{
                  height: "10vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
              </Box>
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: COLORS.secondaryColor }}>
                <h2 mb="lg" style={{ color: COLORS.primaryColor }}>CBM Calculations</h2>
                <Text size="lg" weight={700} mb="xs" c={COLORS.primaryColor}>
                  Volume
                </Text>
                <Grid>
                  <Grid.Col span={6}>
                    <Text size="sm" c={COLORS.primaryColor}> {volumeCbm} m³</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" c={COLORS.primaryColor}>{volumeCft} ft³</Text>
                  </Grid.Col>
                </Grid>

                <Divider my="lg" style={{ borderColor: COLORS.primaryColor }} />

                <Text size="lg" weight={700} mb="xs" c={COLORS.primaryColor}>
                  Weight
                </Text>
                <Grid>
                  <Grid.Col span={6}>
                    <Text size="sm" c={COLORS.primaryColor}>{weightKg} Kg</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" c={COLORS.primaryColor}>{weightLb} Lb</Text>
                  </Grid.Col>
                </Grid>

                <Divider my="lg" style={{ borderColor: COLORS.primaryColor }} />

                <Text size="lg" weight={700} mb="xs" c={COLORS.primaryColor}>
                  Volumetric Weight
                </Text>
                <Grid>
                  <Grid.Col span={6}>
                    <Text size="sm" c={COLORS.primaryColor}>{volumetricWeightSea} Kg (Sea)</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" c={COLORS.primaryColor}>{volumetricWeightAir} Kg (Air)</Text>
                  </Grid.Col>
                </Grid>

                <Divider my="lg" style={{ borderColor: COLORS.primaryColor }} />

                <Text size="lg" weight={700} mb="xs" c={COLORS.primaryColor}>
                  Container Capacities
                </Text>
                <Text size="sm" c={COLORS.primaryColor}>20 Feet Container: {container20ft} items</Text>
                <Text size="sm" c={COLORS.primaryColor}>40 Feet Container: {container40ft} items</Text>
                <Text size="sm" c={COLORS.primaryColor}>40 Feet HC Container: {container40ftHC} items</Text>
              </Card>

            </Grid.Col>
          }

        </Grid>
      }
      {tools == 'CWC' &&
        <>
          <Grid>
            <Grid.Col span={6}>
              <h2 mb="lg">Chargeable Weight Calculator</h2>
              <Container mt={40}>
                <Grid>
                  <GridCol span={4}>
                    <NumberInput
                      label="Length (cm)"
                      placeholder="Enter length"
                      value={formData.length}
                      onChange={(value) => handleInputChange("length", value)}
                      min={0}
                      mb="sm"
                      hideControls
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <NumberInput
                      label="Width (cm)"
                      placeholder="Enter width"
                      value={formData.width}
                      onChange={(value) => handleInputChange("width", value)}
                      min={0}
                      mb="sm"
                      hideControls
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <NumberInput
                      label="Height (cm)"
                      placeholder="Enter height"
                      value={formData.height}
                      onChange={(value) => handleInputChange("height", value)}
                      min={0}
                      mb="sm"
                      hideControls
                    />
                  </GridCol>
                </Grid>

                <Grid mt={12}>
                  <Grid.Col span={4}>
                    <NumberInput
                      label="Quantity"
                      value={formData.quantity}
                      onChange={(value) => handleInputChange("quantity", value)}
                      min={0}
                      step={1}
                      hideControls
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <NumberInput
                      label="Actual Weight (Kg)"
                      value={formData.actualWeight}
                      onChange={(value) => handleInputChange("actualWeight", value)}
                      min={0}
                      step={0.1}
                      hideControls
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <MultiSelect
                      data={additionalCharges.map((charge) => ({
                        value: charge.chargeType,
                        label: charge.chargeType,
                      }))}
                      label="Additional Charges"
                      value={selectedCharges}
                      onChange={setSelectedCharges}
                      clearable
                      searchable
                    />
                  </Grid.Col>
                </Grid>
                <Grid mt={12}>
                  <Grid.Col span={12}>
                    <Button
                      onClick={calculateChargeableWeight}
                      fullWidth
                    >
                      {showCalc ? "Hide Calculate" : "Show Calculate"}
                    </Button>
                  </Grid.Col>
                </Grid>
              </Container>
            </Grid.Col>
            {showCalc && (
              <Grid.Col span={6}>
                <Box
                  style={{
                    height: "10vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                ></Box>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ backgroundColor: COLORS.secondaryColor }}
                >
                  <h2 mb="lg" style={{ color: COLORS.primaryColor }}>
                    Chargeable Weight
                  </h2>
                  <Group direction="column" spacing="xs" mt={"xl"} align="center">
                    <Text size="lg" c={COLORS.primaryColor}>
                      Chargeable Weight for Sea Freight: {chargeableWeightSea} kg -
                      {ratePerItem[0].Symbol} {chargeSeaAmt}
                    </Text>
                    <Text size="lg" c={COLORS.primaryColor}>
                      Chargeable Weight for Air Freight: {chargeableWeightAir} kg -
                      {ratePerItem[1].Symbol} {chargeAirAmt}
                    </Text>
                  </Group>
                </Card>
              </Grid.Col>
            )}
          </Grid>
        </>
      }
      {
        tools == 'Fare Calculation' && 
        <FairCalculation />
      }
    </Container>
  );
};

export default CbmCalc;