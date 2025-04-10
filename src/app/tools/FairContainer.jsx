import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  NumberInput,
  Select,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  changeDimensions,
  ContainerTypePill,
  contSize,
  getContainerFields,
  options,
  types,
  TypesWithContainers,
} from "./containerDetails";
import { COLORS } from "../utils/COLORS";
import { IconTrash } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

const FairContainer = ({
  data = {
    // commodity: null,
    type: undefined,
    // dimension: "M",
    // hsCode: null,
    // hsCode2: null,
    // hs1: null,
    // hs2: null,
    weight: null,
    size: "20GP",
    containerCount: null,
    list: [],
  },
  defaultSize = `20GP`,
  submitCallback = () => null,
}) => {
  const [activeType, setActiveType] = useState(data?.type || "GC");
  const [activeSize, setActiveSize] = useState(defaultSize);
  const [selectedSize, setSelectedSize] = useState([]);
  const [activeDimension, setActiveDimension] = useState(
    data?.dimension || "M"
  );
  const [containerList, setContainerList] = useState({
    // commodity: data?.commodity,
    type: data?.type,
    // dimension: data?.dimension || "M",
    weight: data?.weight || null,
    // hsCode: data?.hsCode || null,
    // hsCode2: data?.hsCode2 || null,
    // hs1: data?.hs1 || null,
    // hs2: data?.hs2 || null,
    size: data?.size || null,
    containerCount: data?.containerCount || null,
    list: data?.list || [],
  });

  useEffect(() => {
    if (TypesWithContainers.includes(activeType)) {
      if (containerList.type !== activeType) {
        const d = getContainerFields(activeType, activeDimension);
        setContainerList((ct) => ({
          ...ct,
          type: activeType,
          dimension: activeDimension,
          list: [
            {
              size: activeSize,
              fields: d,
            },
          ],
        }));
      } else {
        const newList = changeDimensions(
          containerList.list,
          activeDimension,
          `(${containerList.dimension})`
        );
        setContainerList((ct) => ({
          ...ct,
          type: activeType,
          dimension: activeDimension,
          list: newList,
        }));
      }
    } else {
      setContainerList((ct) => ({
        ...ct,
        type: activeType,
        dimension: activeDimension,
        list: [],
      }));
    }
  }, [activeType, activeDimension]);

  const addNewContainer = () => {
    setContainerList((st) => {
      const newContainer = getContainerFields(st.type, st.dimension);
      return {
        ...st,
        list: [
          ...st.list,
          {
            size: activeSize,
            fields: newContainer,
          },
        ],
      };
    });
  };

  const removeContainer = (containerNo) => {
    const filter = selectedSize.filter((_, index) => containerNo !== index);
    setSelectedSize(filter);
    setContainerList((st) => {
      const list = [...st.list];
      list.splice(containerNo, 1);
      return {
        ...st,
        list: list,
      };
    });
  };

  const handleFields = (containerNo, fieldPosition) => (event) => {
    setContainerList((st) => {
      const l = st.list;
      const curField = l[containerNo].fields[fieldPosition];
      if (curField.type === types.NUMBER) {
        l[containerNo].fields[fieldPosition].value = event;
      }
      if (curField.type === types.OPTIONS) {
        l[containerNo].fields[fieldPosition].value = event;
      }
      if (curField.type === types.CHECKBOX) {
        l[containerNo].fields[fieldPosition].checked = event.target.checked;
      }
      if (curField.type === types.DROPDOWN) {
        l[containerNo].fields[fieldPosition].value = event;
      }
      return {
        ...st,
        list: l,
      };
    });
  };

  const handleSizeChange = (i, v) => {
    setActiveSize(v);
    setContainerList((st) => {
      return {
        ...st,
        size: v,
        list: st.list?.map((item, index) => {
          if (index === i) {
            item.size = v;
          }
          return item;
        }),
      };
    });
  };

  useEffect(() => {
    submitCallback(containerList);
  }, []);

  return (
    <Grid>
      <Grid.Col span={8}>
        <Select
          name={"Cargo Type"}
          placeholder="Choose cargo type"
          required
          onChange={(v) => {
            setActiveType(v)
          }}
          searchable
          label="Cargo Type"
          data={options || []}
        />
        {/* {options.map((item, i) => {
            return (
              <ContainerTypePill
                key={i}
                isActive={item === activeType}
                onClick={() => {
                  setActiveType(item);
                }}
                name={item}
              />
            );
          })} */}
      </Grid.Col>


      {/* {dimension?.isVisible.includes(activeType) ? (
        <>
          <Text mt={20} size="sm" fw={500}>
            Dimension
          </Text>
          <Flex>
            {dimension?.data.map((item) => {
              return item?.isShow.includes(activeType) ? (
                <ContainerTypePill
                  isActive={item.label == activeDimension}
                  onClick={() => setActiveDimension(item.label)}
                  name={item.label}
                />
              ) : null;
            })}
          </Flex>
        </>
      ) : null} */}
      <Grid.Col span={4}>
        <Flex align={'flex-end'} h={'100%'}>
          {selectedSize.length - 1 < contSize.length && (
            <Button
              variant="subtle"
              // size="xs"
              justify="flex-end"
              onClick={addNewContainer}
              leftSection={<IconPlus />}
            > Add Container
            </Button>
          )}
        </Flex>
      </Grid.Col>
      {/* <Flex justify={"flex-end"}>
        {selectedSize.length - 1 < contSize.length && (
          <Button
            // color={COLORS.primaryColor}
            variant="lig"
            size="xs"
            onClick={addNewContainer}
            leftSection={<IconPlus />}
          >
            Add Container
          </Button>
        )}
      </Flex> */}

      {containerList?.list?.map((item, i) => {
        if (!item) return null;
        return (
          <Box p={"xs"} bg={i % 2 ? "#f9f9f9" : COLORS.white} key={i}>
            <Flex
              wrap={"nowrap"}
              direction={"row"}
              justify={"space-between"}
              align={"center"}
            >
              <Text size="sm" fw={500} mr={20} mt={20} ml={-4}>
                {i + 1}
              </Text>
              <Select
                label={"Container Size"}
                w={'auto'}
                mr={20}
                data={contSize}
                value={item.size}
                onChange={(v) => handleSizeChange(i, v)}
                required
              />
              {item?.fields?.map((field, j, arr) => {
                const inputSize = arr.length > 2 ? 'auto' : "auto";
                if (field.type === types.DROPDOWN) {
                  return (
                    <Select
                      key={j}
                      size="xs"
                      w={inputSize}
                      label={field.label}
                      value={field.value}
                      onChange={handleFields(i, j)}
                      {...(field.options || {})}
                    />
                  );
                }
                if (field.type === types.NUMBER) {
                  return (
                    <NumberInput
                      key={j}
                      w={inputSize}
                      mr={20}
                      hideControls
                      label={field.label}
                      value={field.value}
                      onChange={handleFields(i, j)}
                      {...(field.options || {})}
                    />
                  );
                }
                if (field.type === types.CHECKBOX) {
                  return (
                    <Checkbox
                      size="xs"
                      ml={5}
                      mt={20}
                      key={j}
                      label={field.label}
                      checked={field.checked}
                      onChange={handleFields(i, j)}
                    />
                  );
                }
                if (field.type === types.OPTIONS) {
                  return (
                    <Flex key={field.label} direction={"column"} mt={"sm"}>
                      <Text size="xs">{field.label}</Text>
                      <Flex>
                        {field.options?.map((option) => (
                          <ContainerTypePill
                            key={option.value}
                            isActive={option.value === field.value}
                            name={option.label}
                            onClick={() => handleFields(i, j)(option.value)}
                          />
                        ))}
                      </Flex>
                    </Flex>
                  );
                }
              })}

              {/* {i > 0 ? ( */}
              <ActionIcon
                variant="light"
                size={"md"}
                mt={20}
                color={"red"}
                onClick={() => removeContainer(i)}
              >
                <IconTrash stroke={1.5} size={20} />
              </ActionIcon>
              {/* ) : (
                <ActionIcon
                  variant="light"
                  size={"lg"}
                  mt={20}
                  color="teal"
                ></ActionIcon>
              )} */}
            </Flex>
          </Box>
        );
      })}
    </Grid>
  );
};

export default FairContainer;
