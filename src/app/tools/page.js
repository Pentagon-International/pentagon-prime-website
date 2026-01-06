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
import { useEffect, useState } from "react";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import FairCalculation from "./FairCalculation";
import { theme } from "../utils/theme";

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

    // if (length <= 0 || width <= 0 || height <= 0) {
    //   alert("Please enter valid dimensions (length, width, height).");
    //   return;
    // }

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

  useEffect(() => {
    calculateCBM()
  },
    [volumeUnit, unit, length, width, height, grossWeight, quantity])

  useEffect(() => {
    calculateChargeableWeight()
  },
    [formData.length, formData.width, formData.height, formData.quantity, formData.actualWeight, selectedCharges])

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
    <Container fluid px="2%" h="100%" >
      <Grid mt={60}>
        <Grid.Col span={12} px={0} py={'lg'} mt={'md'}>
          <Flex justify={'flex-start'}>
            <SegmentedControl
              onChange={(v) => {
                setTools(v)
              }}
              value={tools}
              data={[
                // 'Fare Calculation',
                'CBM', 'CWC']} />
          </Flex>
        </Grid.Col>
      </Grid>
      {tools == 'CBM' &&
        <>
          <Grid mb={theme?.lineHeights.lg}>
            <Grid.Col span={7}>
              <Title mb="lg" mt={'xl'}>Cubic Meter Calculator</Title>
              <Box mb={'md'}>
                <Radio.Group
                  value={volumeUnit}
                  onChange={(value) => handleChange("volumeUnit", value)}
                  label="Unit of Volume"
                  color={COLORS.primaryColor}
                >
                  <Group mt={'sm'}>
                    <Radio value="cubicMeter" label="Cubic Meter" />
                    <Radio value="cubicFeet" label="Cubic Feet" />
                  </Group>
                </Radio.Group>
              </Box>

              <Container p={0} mt={0}>
                <Select
                  label="Unit of Measurement"
                  value={unit}
                  onChange={(value) => handleChange("unit", value)}
                  data={["cm", "inch", "meter"]}
                  placeholder="Select unit"
                  mb="sm"
                />

                <Grid>
                  <GridCol span={4}>
                    <NumberInput
                      label="Length"
                      placeholder="Enter length"
                      value={length}
                      onChange={(value) => handleChange("length", value)}
                      min={0}
                      // mb="sm"
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
                      // mb="sm"
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
                      // mb="sm"
                      hideControls
                    />
                  </GridCol>
                </Grid>

                <Grid>
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Gross Weight"
                      value={grossWeight}
                      placeholder="Enter gross weight"
                      onChange={(value) => handleChange("grossWeight", value)}
                      hideControls
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Quantity"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(value) => handleChange("quantity", value)}
                      hideControls
                    />
                  </Grid.Col>
                </Grid>

                {/* <Button
                mb={'md'}
                mt="lg"
                fullWidth
                onClick={calculateCBM}
                color={COLORS.contactBackground}
              >
                {showCalc ? "Hide Calculate" : "Show Calculate"}
              </Button> */}
              </Container>
            </Grid.Col>
            <Grid.Col span={5}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
              </Box>
              <Card shadow="sm" py="md" px={'xl'} radius="md" withBorder style={{ backgroundColor: COLORS.contactBackground }} ta={'center'} mt={'xl'}>
                {/* <h2 mb="lg" style={{ color: COLORS.primaryColor }}>CBM Calculations</h2> */}
                {/* <Text mb="md" size="lg" style={{ color: COLORS.primaryColor }}>
                  Cubic Meter
                </Text> */}
                <Group direction="column" spacing="xs" mt={'sm'} align="center" justify={'center'}>
                  <Text c={COLORS.primaryColor} size="sm" w={'100%'} ta={'left'} fw={800}>
                    Volume
                  </Text>
                  <Grid w={'80%'}>
                    <Grid.Col span={6}>
                      <Text c={COLORS.primaryColor} size={'sm'}> {volumeCbm} m³</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c={COLORS.primaryColor} size={'sm'}>{volumeCft} ft³</Text>
                    </Grid.Col>
                  </Grid>

                  <Text c={COLORS.primaryColor} size="sm" w={'100%'} ta={'left'} mt={'xs'} fw={800}>
                    Weight
                  </Text>
                  <Grid w={'80%'}>
                    <Grid.Col span={6} size={'sm'}>
                      <Text c={COLORS.primaryColor} size={'sm'}>{weightKg} Kg</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c={COLORS.primaryColor} size={'sm'}>{weightLb} Lb</Text>
                    </Grid.Col>
                  </Grid>

                  <Text c={COLORS.primaryColor} size="sm" w={'100%'} ta={'left'} mt={'xs'} fw={800}>
                    Volumetric Weight
                  </Text>
                  <Grid w={'80%'}>
                    <Grid.Col span={6}>
                      <Text c={COLORS.primaryColor} size={'sm'}>Sea</Text>
                      <Text c={COLORS.primaryColor} size={'sm'}>{volumetricWeightSea} Kg</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c={COLORS.primaryColor} size={'sm'}>Air</Text>
                      <Text c={COLORS.primaryColor} size={'sm'}>{volumetricWeightAir} Kg </Text>
                    </Grid.Col>
                  </Grid>

                  <Text c={COLORS.primaryColor} size="sm" w={'100%'} ta={'left'} fw={800}>
                    Container Capacities
                  </Text>
                  <Grid w={'80%'}>
                    <Grid.Col span={6}>
                      <Grid m={0} p={0}>
                        <Grid.Col span={8} px={0}>
                          <Text c={COLORS.primaryColor} ta={'left'} size={'sm'}>20 Feet </Text>
                        </Grid.Col>
                        <Grid.Col span={4} px={0}>
                          <Text c={COLORS.primaryColor} ta={'right'} size={'sm'}>:</Text>
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c={COLORS.primaryColor} ta={'right'} size={'sm'}>{container20ft == 'Infinity' ? 0 : container20ft} items</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Grid m={0} p={0}>
                        <Grid.Col span={8} px={0}>
                          <Text c={COLORS.primaryColor} ta={'left'} size={'sm'}>40 Feet </Text>
                        </Grid.Col>
                        <Grid.Col span={4} px={0}>
                          <Text c={COLORS.primaryColor} ta={'right'} size={'sm'}>:</Text>
                        </Grid.Col>
                      </Grid>
                      {/* <Text c={COLORS.primaryColor} ta={'right'} >40 Feet </Text> */}
                    </Grid.Col>
                    <Grid.Col span={6}>
                      {console.log("container40ft : ", container40ft)}
                      <Text c={COLORS.primaryColor} ta={'right'} size={'sm'}>{container40ft == 'Infinity' ? 0 : container40ft} items</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Grid m={0} p={0}>
                        <Grid.Col span={10} px={0}>
                          <Text c={COLORS.primaryColor} ta={'left'} size={'sm'}>40 Feet HC</Text>
                        </Grid.Col>
                        <Grid.Col span={2} px={0}>
                          <Text c={COLORS.primaryColor} ta={'right'} size={'sm'}>:</Text>
                        </Grid.Col>
                      </Grid>
                      {/* <Text c={COLORS.primaryColor} ta={'left'}>40 Feet HC</Text> */}
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c={COLORS.primaryColor} ta={'right'} size={'sm'}>{container40ftHC == 'Infinity' ? 0 : container40ftHC} items</Text>
                    </Grid.Col>
                  </Grid>
                </Group>
              </Card>

            </Grid.Col>
          </Grid>
        </>
      }
      {tools == 'CWC' &&
        <Box h={'100%'}>
          <Grid mt={'xl'} justify={'flex-start'} >
            <Grid.Col span={7}>
              {/* <Container > */}
              <Grid justify={'flex-start'} >
                <GridCol span={12}>
                  <Title mb="lg">Chargeable Weight Calculator</Title>
                </GridCol>
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
                <Grid.Col span={6}>
                  <NumberInput
                    label="Quantity"
                    value={formData.quantity}
                    onChange={(value) => handleInputChange("quantity", value)}
                    min={0}
                    step={1}
                    hideControls
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <NumberInput
                    label="Actual Weight (Kg)"
                    value={formData.actualWeight}
                    onChange={(value) => handleInputChange("actualWeight", value)}
                    min={0}
                    step={0.1}
                    hideControls
                  />
                </Grid.Col>

                <Grid.Col span={12}>
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
                    hidePickedOption
                  />
                </Grid.Col>
              </Grid>
              {/* <Grid mt={12}> */}
                {/* <Grid.Col span={12}> */}
                  {/* <Button
                      // onClick={calculateChargeableWeight}
                      // fullWidth
                      // color={COLORS.contactBackground}
                      mt={isMobile && '20px'} fz={'sm'} size='lg' fw={600} bg={COLORS.serviceColor}
                      onClick={calculateChargeableWeight} fullWidth
                    >
                      {showCalc ? "Hide Calculate" : "Show Calculate"}
                    </Button> */}
                {/* </Grid.Col> */}
              {/* </Grid> */}
              {/* </Container> */}
            </Grid.Col>
            {/* {showCalc && ( */}
            <Grid.Col span={5}>
              <Box
                style={{
                  // height: "10vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              ></Box>
              <Card
                shadow="sm"
                padding="xl"
                radius="md"
                withBorder
                // mt={'xl'}
                h={'100%'}
                style={{ backgroundColor: COLORS.contactBackground, display: 'flex', alignItems: 'center' }}
              >
                {/* <Text mb="md" size="lg" style={{ color: COLORS.primaryColor }}>
                  Chargeable Weight
                </Text> */}
                <Flex align={'center'} h={'100%'}>
                  <Group direction="column" spacing="xs" mt={'sm'} align="center" justify={'center'}>
                    <Text c={COLORS.primaryColor} size="sm" w={'100%'} ta={'left'} fw={800}>
                      Chargeable Weight for Sea Freight
                    </Text>
                    <Text c={COLORS.primaryColor} w={'100%'}  size="sm" ta={'left'}>
                      {chargeableWeightSea} kg - {ratePerItem[0].Symbol} {chargeSeaAmt}
                    </Text>
                    <Text c={COLORS.primaryColor} size="sm" mt={'xl'} w={'100%'} ta={'left'} fw={800}>
                      Chargeable Weight for Air Freight
                    </Text>
                    <Text c={COLORS.primaryColor} size="sm" ta={'left'} w={'100%'}>
                      {chargeableWeightAir} kg -  {ratePerItem[1].Symbol} {chargeAirAmt}
                    </Text>
                  </Group>
                </Flex>
              </Card>
            </Grid.Col>
            {/* )} */}
          </Grid>
        </Box>
      }
      {/* {
        tools == 'Fare Calculation' &&
        <FairCalculation />
      } */}
    </Container>
  );
};

export default CbmCalc;