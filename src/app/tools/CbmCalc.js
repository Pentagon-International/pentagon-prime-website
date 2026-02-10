"use client";

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
  Popover,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import FairCalculation from "./FairCalculation";
import { theme } from "../utils/theme";
import { IconChevronDown } from "@tabler/icons-react";

/* cbm.html design styles */
const panelStyle = {
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: "22px",
  border: "1px solid rgba(255,255,255,.2)",
  boxShadow: "0 25px 50px rgba(0,0,0,.45)",
  overflow: "hidden",
  color: "#fff",
};
const headerImgStyle = (bgUrl) => ({
  height: "190px",
  backgroundImage: `url('${bgUrl}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
});
const headerImgOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.6))",
};
const contentStyle = { padding: "16px 32px" };
const inputStyles = {
  input: {
    minHeight: "46px",
    border: "none",
    borderRadius: "14px",
    background: "rgba(255,255,255,.15)",
    color: "#fff",
    fontSize: "14px",
  },
  label: {
    color: "rgba(255,255,255,.9)",
    fontSize: "13px",
    marginBottom: "6px",
  },
};
const statStyle = {
  width: "100%",
  background: "rgba(0,0,0,.32)",
  borderRadius: "16px",
  padding: "8px 16px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "4px",
  fontSize: "16px",
};

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
  const handleGrossWeight = (value) => {
    handleChange("grossWeight", value);

    if (weightUnit === "kg") {
      handleChange("weightKg", value);
      handleChange("weightLb", (value * lbConversion).toFixed(3));
    } else {
      handleChange("weightKg", (value / lbConversion).toFixed(3));
      handleChange("weightLb", value);
    }
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

    const weight =
      weightUnit === "kg"
        ? grossWeight * quantity
        : (grossWeight / lbConversion) * quantity;

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

  const load20ft =
    parseFloat(volumeCbm) > 0
      ? Math.min(100, (parseFloat(volumeCbm) / 33) * 100)
      : 0;
  const load40ft =
    parseFloat(volumeCbm) > 0
      ? Math.min(100, (parseFloat(volumeCbm) / 67) * 100)
      : 0;
  const load40ftHC =
    parseFloat(volumeCbm) > 0
      ? Math.min(100, (parseFloat(volumeCbm) / 76) * 100)
      : 0;

  const [tools, setTools] = useState("CBM");
  const isMobile = useMediaQuery("(max-width:768px)");

  const [formData, setFormData] = useState({
    length: 0,
    width: 0,
    height: 0,
    quantity: 0,
    actualWeight: 0,
  });

  const [chargeableWeightSea, setChargeableWeightSea] = useState(null);
  const [chargeableWeightAir, setChargeableWeightAir] = useState(null);
  const [weightUnit, setWeightUnit] = useState("kg"); // kg or lb

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
    calculateCBM();
  }, [
    volumeUnit,
    unit,
    length,
    width,
    height,
    grossWeight,
    quantity,
    weightUnit,
  ]);

  useEffect(() => {
    calculateChargeableWeight();
  }, [
    formData.length,
    formData.width,
    formData.height,
    formData.quantity,
    formData.actualWeight,
    selectedCharges,
  ]);

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
          (c) => c.chargeType === charge,
        );

        if (chargeData) {
          totalSeaAdditionalCharges += chargeData.seaFreight;
          totalAirAdditionalCharges += chargeData.airFreight;
        }
      });

      setChargeSeaAmt(
        (parseFloat(totalSeaAMt) + totalSeaAdditionalCharges).toFixed(2),
      );
      setChargeAirAmt(
        (parseFloat(totalAirAMt) + totalAirAdditionalCharges).toFixed(2),
      );
    };

    //hide/display calculation
    showCalc ? setShowCalc(false) : setShowCalc(true);
  };

  return (
    <Box
      component="div"
      style={{
        minHeight: "100vh",
        background:
          'linear-gradient(rgba(8,20,50,.55),rgba(8,20,50,.85)), url("https://images.unsplash.com/photo-1670121180583-39ab653a071c?w=1920")',
        backgroundSize: "cover",
        backgroundPosition: "top",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 40px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Box
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          flex:1,
          flexDirection: "column",
        }}
      >
        <Flex mb="md" mt={70} justify={"space-between"} align={"center"}>
          <Title mb={0} style={{ color: "#fff", fontSize: "20px" }}>
            {tools == "CBM"
              ? "Cubic Meter Calculator"
              : "Chargeable Weight Calculator"}
          </Title>
          <SegmentedControl
            onChange={(v) => setTools(v)}
            value={tools}
            size="xs"
            data={["CBM", "CWC"]}
            styles={{
              root: { background: "rgba(255,255,255,.15)" },
              indicator: {
                background: "linear-gradient(135deg,#00d2ff,#005bea)",
              },
              label: { color: "#fff" },
            }}
          />
        </Flex>

        {tools == "CBM" && (
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "28px",
            }}
          >
            {/* LEFT PANEL - CBM Form */}
            <Box style={panelStyle}>
              {/* <Box style={{ position: "relative" }}>
                <div style={headerImgStyle("https://images.pexels.com/photos/753331/pexels-photo-753331.jpeg")} />
                <div style={headerImgOverlay} />
              </Box> */}
              <Box style={contentStyle}>
                <Text
                  component="h2"
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Freight CBM Calculator
                </Text>
                <Text
                  size="sm"
                  style={{
                    marginTop: "2px",
                    color: "rgba(255,255,255,.85)",
                    fontSize: "14px",
                  }}
                >
                  Enterprise Logistics Volume & Container Optimization
                </Text>

                <Box mb="xs" mt="sm">
                  <Radio.Group
                    value={volumeUnit}
                    onChange={(value) => handleChange("volumeUnit", value)}
                    label={
                      <span
                        style={{
                          color: "rgba(255,255,255,.9)",
                          fontSize: "13px",
                        }}
                      >
                        Unit of Volume
                      </span>
                    }
                  >
                    <Group mt="xs">
                      <Radio
                        value="cubicMeter"
                        label={
                          <span style={{ color: "#fff" }}>Cubic Meter</span>
                        }
                        color="gray"
                      />
                      <Radio
                        value="cubicFeet"
                        label={
                          <span style={{ color: "#fff" }}>Cubic Feet</span>
                        }
                        color="gray"
                      />
                    </Group>
                  </Radio.Group>
                </Box>

                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "12px",
                    marginTop: "12px",
                  }}
                >
                  <Box style={{ gridColumn: "span 3" }}>
                    <Select
                      label="Unit of Measurement"
                      value={unit}
                      onChange={(value) => handleChange("unit", value)}
                      data={["cm", "inch", "meter"]}
                      placeholder="Select unit"
                      styles={{
                        input: inputStyles.input,
                        label: inputStyles.label,
                      }}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      label="Length"
                      placeholder="Enter length"
                      value={length}
                      onChange={(value) => handleChange("length", value)}
                      min={0}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      label="Width"
                      placeholder="Enter width"
                      value={width}
                      onChange={(value) => handleChange("width", value)}
                      min={0}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      label="Height"
                      placeholder="Enter height"
                      value={height}
                      onChange={(value) => handleChange("height", value)}
                      min={0}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      value={grossWeight}
                      label="Gross Weight"
                      onChange={(value) => handleGrossWeight(value)}
                      placeholder="Enter gross weight"
                      hideControls
                      styles={{
                        ...inputStyles,
                        input: {
                          minHeight: "46px",
                          border: "none",
                          borderRadius: "14px",
                          background: "rgba(255,255,255,.15)",
                          color: "#fff",
                          fontSize: "14px",
                          paddingRight: "60px", // space for select + icon
                        },
                      }}
                      rightSectionWidth={45}
                      rightSection={
                        <Select
                          value={weightUnit}
                          onChange={(v) => setWeightUnit(v || "kg")}
                          clearable={false}
                          data={[
                            { label: "KG", value: "kg" },
                            { label: "LB", value: "lb" },
                          ]}
                          required
                          size="xs"
                          rightSectionWidth={20} // make space for arrow
                          styles={{
                            wrapper: {
                              width: "100%",
                            },
                            input: {
                              height: "46px",
                              border: "none",
                              borderRadius: "0px 14px 14px 0px",
                              background: "transparent",
                              color: "#fff",
                              fontSize: "13px",
                              paddingLeft: 6,
                              paddingRight: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              cursor: "pointer",
                            },
                            rightSection: {
                              pointerEvents: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                            },
                            dropdown: {
                              minWidth: "100px",
                              backgroundColor: "#FFF",
                              border: "1px solid rgba(255,255,255,.2)",
                            },
                          }}
                        />
                      }
                    />
                  </Box>

                  <Box>
                    <NumberInput
                      label="Quality / Pallets"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(value) => handleChange("quantity", value)}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* RIGHT PANEL - CBM Summary */}
            <Box style={panelStyle}>
              {/* <Box style={{ position: "relative" }}>
                <div style={headerImgStyle("https://images.pexels.com/photos/3338019/pexels-photo-3338019.jpeg")} />
                <div style={headerImgOverlay} />
              </Box> */}
              <Box style={contentStyle}>
                <Text
                  component="h2"
                  style={{
                    margin: "0 0 18px 0",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Shipment Summary
                </Text>

                <Text
                  component="h3"
                  mt={"sm"}
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Volume
                </Text>

                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <Box style={statStyle}>
                    <strong style={{ fontSize: "20px", color: "#fff" }}>
                      {Number(volumeCbm).toFixed(2)} m³
                    </strong>
                  </Box>
                  <Box style={statStyle}>
                    <strong style={{ fontSize: "20px", color: "#fff" }}>
                      {Number(volumeCft).toFixed(2)} ft³
                    </strong>
                  </Box>
                </Box>

                <Text
                  component="h3"
                  mt={"sm"}
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Weight
                </Text>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <Box style={statStyle}>
                    <strong style={{ fontSize: "20px", color: "#fff" }}>
                      {Number(weightKg).toFixed(2)} Kg
                    </strong>
                  </Box>
                  <Box style={statStyle}>
                    <strong style={{ fontSize: "20px", color: "#fff" }}>
                      {Number(weightLb).toFixed(2)} Lb
                    </strong>
                  </Box>
                </Box>

                <Text
                  component="h3"
                  mt={"sm"}
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Volumetric Weight
                </Text>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <Box
                    style={{ ...statStyle, justifyContent: "space-between" }}
                  >
                    <span>Air</span>
                    <strong style={{ fontSize: "20px", color: "#fff" }}>
                      {Number(volumetricWeightAir).toFixed(2)} Kg
                    </strong>
                  </Box>
                  <Box
                    style={{ ...statStyle, justifyContent: "space-between" }}
                  >
                    <span>Sea</span>
                    <strong style={{ fontSize: "20px", color: "#fff" }}>
                      {Number(volumetricWeightSea).toFixed(2)} Kg
                    </strong>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.5fr 1.5fr",
                    gap: "12px",
                    marginTop: "32px",
                  }}
                >
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#fff",
                      }}
                    >
                      <span>20ft Container Load</span>
                      <span>{load20ft.toFixed(0)}%</span>
                    </Box>
                    <Box
                      style={{
                        height: "10px",
                        background: "rgba(255,255,255,.25)",
                        borderRadius: "20px",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        style={{
                          height: "100%",
                          width: `${load20ft}%`,
                          background: "linear-gradient(90deg,#00e0ff,#0072ff)",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    style={{
                      ...statStyle,
                      marginBottom: 0,
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,.85)",
                      }}
                    >
                      20ft items
                    </span>
                    <strong style={{ fontSize: "16px" }}>
                      {container20ft == "Infinity" ? 0 : Number(container20ft).toFixed(2)}
                    </strong>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.5fr 1.5fr",
                    gap: "12px",
                    marginTop: "12px",
                  }}
                >
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#fff",
                      }}
                    >
                      <span>40ft Container Load</span>
                      <span>{load40ft.toFixed(0)}%</span>
                    </Box>
                    <Box
                      style={{
                        height: "10px",
                        background: "rgba(255,255,255,.25)",
                        borderRadius: "20px",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        style={{
                          height: "100%",
                          width: `${load40ft}%`,
                          background: "linear-gradient(90deg,#00e0ff,#0072ff)",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    style={{
                      ...statStyle,
                      marginBottom: 0,
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,.85)",
                      }}
                    >
                      40ft items
                    </span>
                    <strong style={{ fontSize: "16px" }}>
                      {container40ft == "Infinity" ? 0 : Number(container40ft).toFixed(2)}
                    </strong>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.5fr 1.5fr",
                    gap: "12px",
                    marginTop: "12px",
                  }}
                >
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#fff",
                      }}
                    >
                      <span>40ft HC Container Load</span>
                      <span>{load40ftHC.toFixed(0)}%</span>
                    </Box>
                    <Box
                      style={{
                        height: "10px",
                        background: "rgba(255,255,255,.25)",
                        borderRadius: "20px",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        style={{
                          height: "100%",
                          width: `${load40ftHC}%`,
                          background: "linear-gradient(90deg,#00e0ff,#0072ff)",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    style={{
                      ...statStyle,
                      marginBottom: 0,
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,.85)",
                      }}
                    >
                      40ft HC items
                    </span>
                    <strong style={{ fontSize: "16px" }}>
                      {container40ftHC == "Infinity" ? 0 : Number(container40ftHC).toFixed(2)}
                    </strong>
                  </Box>
                </Box>

                {/* <Box mt="sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <Box style={{ ...statStyle, marginBottom: 0, justifyContent:"space-between" }}>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,.85)" }}>20ft items</span>
                    <strong style={{ fontSize: "16px" }}>{container20ft == "Infinity" ? 0 : container20ft}</strong>
                  </Box>
                  <Box style={{ ...statStyle, marginBottom: 0, justifyContent:"space-between" }}>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,.85)" }}>40ft items</span>
                    <strong style={{ fontSize: "16px" }}>{container40ft == "Infinity" ? 0 : container40ft}</strong>
                  </Box>
                  <Box style={{ ...statStyle, marginBottom: 0,justifyContent:"space-between" }}>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,.85)" }}>40ft HC items</span>
                    <strong style={{ fontSize: "16px" }}>{container40ftHC == "Infinity" ? 0 : container40ftHC}</strong>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Box>
        )}
        {tools == "CWC" && (
          <Box
            style={{
              flex: 1,
              height: "100%",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "28px",
            }}
          >
            {/* LEFT PANEL - CWC Form */}
            <Box style={{...panelStyle, flex:1}} >
              {/* <Box style={{ position: "relative" }}>
                <div style={headerImgStyle("https://images.pexels.com/photos/753331/pexels-photo-753331.jpeg")} />
                <div style={headerImgOverlay} />
              </Box> */}
              <Box style={contentStyle}>
                <Text
                  component="h2"
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Chargeable Weight Calculator
                </Text>
                <Text
                  size="sm"
                  style={{
                    color: "rgba(255,255,255,.85)",
                    fontSize: "14px",
                  }}
                >
                  Sea & Air Freight Chargeable Weight
                </Text>

                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "12px",
                    marginTop: "8px",
                  }}
                >
                  <Box>
                    <NumberInput
                      label="Length (cm)"
                      placeholder="Enter length"
                      value={formData.length}
                      onChange={(value) => handleInputChange("length", value)}
                      min={0}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      label="Width (cm)"
                      placeholder="Enter width"
                      value={formData.width}
                      onChange={(value) => handleInputChange("width", value)}
                      min={0}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      label="Height (cm)"
                      placeholder="Enter height"
                      value={formData.height}
                      onChange={(value) => handleInputChange("height", value)}
                      min={0}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      label="Quality / Pallets"
                      value={formData.quantity}
                      onChange={(value) => handleInputChange("quantity", value)}
                      min={0}
                      step={1}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box>
                    <NumberInput
                      label="Actual Weight (Kg)"
                      value={formData.actualWeight}
                      onChange={(value) =>
                        handleInputChange("actualWeight", value)
                      }
                      min={0}
                      step={0.1}
                      hideControls
                      styles={inputStyles}
                    />
                  </Box>
                  <Box style={{ gridColumn: "span 2" }}>
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
                      // hidePickedOption
                      styles={inputStyles}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* RIGHT PANEL - CWC Results */}
            <Box style={panelStyle}>
              {/* <Box style={{ position: "relative" }}>
                <div style={headerImgStyle("https://images.pexels.com/photos/3338019/pexels-photo-3338019.jpeg")} />
                <div style={headerImgOverlay} />
              </Box> */}
              <Box style={contentStyle}>
                <Text
                  component="h2"
                  style={{
                    margin: "0 0 18px 0",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  Chargeable Weight Summary
                </Text>

                <Box style={{ ...statStyle, justifyContent: "space-between" }}>
                  <span
                    style={{ fontSize: "14px", color: "rgba(255,255,255,.85)" }}
                  >
                    Chargeable Weight for Sea Freight
                  </span>
                  <strong style={{ fontSize: "18px", color: "#fff" }}>
                    {chargeableWeightSea} kg - {ratePerItem[0].Symbol}
                    {chargeSeaAmt}
                  </strong>
                </Box>
                <Box
                  style={{
                    ...statStyle,
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <span
                    style={{ fontSize: "14px", color: "rgba(255,255,255,.85)" }}
                  >
                    Chargeable Weight for Air Freight
                  </span>
                  <strong style={{ fontSize: "18px", color: "#fff" }}>
                    {chargeableWeightAir} kg - {ratePerItem[1].Symbol}
                    {chargeAirAmt}
                  </strong>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {/* {
          tools == 'Fare Calculation' &&
          <FairCalculation />
        } */}
      </Box>
    </Box>
  );
};

export default CbmCalc;
