import { Flex, Text } from "@mantine/core";
import { COLORS } from "../utils/COLORS";

const options = ["GC", "OT", "REEF", "FR", "FB", "TANK"];
const contSize = [
  {
    label: `20 GP`,
    value: `20GP`,
    isShow: ["GC", "OT", "REEF", "FR", "FB", "TANK"],
  },
  {
    label: `40 GP`,
    value: `40GP`,
    isShow: ["GC", "OT", "REEF", "FR", "FB"],
  },
  {
    label: `40 HC`,
    value: `40HC`,
    isShow: ["GC"],
  },
  {
    label: `45 HC`,
    value: `45HC`,
    isShow: ["GC"],
  },
];
const dimension = {
  data: [
    {
      label: "M",
      isShow: ["OT", "FR", "FB"],
    },
    {
      label: "CM",
      isShow: ["OT", "FR", "FB"],
    },
    {
      label: "INCH",
      isShow: ["OT", "FR", "FB"],
    },
  ],
  isVisible: ["OT", "FR", "FB"],
};
const types = {
  TEXT: "text",
  NUMBER: "number",
  CHECKBOX: "check",
  OPTIONS: "options",
  DROPDOWN: "dropdown",
};

const weightInputOptions = {
  min: 1,
  max: 29,
  required: true,
  clampBehavior: "strict",
};

const lengthInputOptions = {
  min: 1,
  max: 9999,
  required: true,
  clampBehavior: "strict",
};

const getContainerFields = (type, dimension) => {
  console.log("TYPE", type, dimension);
  switch (type) {
    case "GC":
    case "TANK":
      return [
        {
          label: `Count`,
          type: types.NUMBER,
          options: lengthInputOptions,
        },
        {
          label: `Weight (mt)`,
          type: types.NUMBER,
          options: weightInputOptions,
        },
      ];
    case "OT":
    case "FB":
      return [
        {
          label: `Length(${dimension})`,
          type: types.NUMBER,
          options: lengthInputOptions,
        },
        {
          label: `Height(${dimension})`,
          type: types.NUMBER,
          options: lengthInputOptions,
        },
        {
          label: `Width(${dimension})`,
          type: types.NUMBER,
          options: lengthInputOptions,
        },
        {
          label: `Weight (mt)`,
          type: types.NUMBER,
          options: weightInputOptions,
        },
      ];
    case "REEF":
      return [
        {
          label: "Weight (mt)",
          type: types.NUMBER,
          options: weightInputOptions,
        },
        {
          label: "Temp (°C)",
          type: types.NUMBER,
        },
        {
          label: "Humidity (%)",
          type: types.NUMBER,
        },
        {
          label: "Cargo Values ($)",
          type: types.NUMBER,
        },
        {
          label: "Ventilation",
          type: types.OPTIONS,
          value: "open",
          options: [
            { label: "Open", value: "open" },
            { label: "Closed", value: "closed" },
          ],
        },
      ];
    case "FR":
      return [
        {
          label: `Length(${dimension})`,
          type: types.NUMBER,
          options: lengthInputOptions,
        },
        {
          label: `Height(${dimension})`,
          type: types.NUMBER,
          options: lengthInputOptions,
        },
        {
          label: `Width(${dimension})`,
          type: types.NUMBER,
          options: lengthInputOptions,
        },
        {
          label: `Weight (mt)`,
          type: types.NUMBER,
          options: weightInputOptions,
        },
        {
          label: "In-gauge",
          type: types.CHECKBOX,
        },
      ];
    default:
      return undefined;
  }
};

const changeDimensions = (list, dimension, oldValue) => {
  return list.map((item) => {
    return {
      ...item,
      size: item.size,
      fields: item?.fields?.map((field) => ({
        ...field,
        label: field.label.replace(oldValue, `(${dimension})`),
      })),
    };
  });
};

export const ContainerTypePill = ({ name = "GC", onClick, isActive }) => {
  return (
    <Flex
      onClick={onClick}
      align={"center"}
      justify={"center"}
      p={8}
      style={{
        border: "1px solid lightgray",
        borderRadius: 4,
        width: 85,
        backgroundColor: isActive ? COLORS.portColor : COLORS.white,
        cursor: "pointer",
      }}
    >
      <Text c={isActive ? COLORS.white : COLORS.greyfont} fw={500} size="xs">
        {name}
      </Text>
    </Flex>
  );
};

const TypesWithContainers = ["GC", "OT", "REEF", "FB", "FR", "TANK"];

export {
  options,
  contSize,
  dimension,
  types,
  weightInputOptions,
  lengthInputOptions,
  getContainerFields,
  changeDimensions,
  TypesWithContainers,
};
