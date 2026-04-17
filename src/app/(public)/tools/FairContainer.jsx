// import {
//   ActionIcon,
//   Box,
//   Button,
//   Checkbox,
//   Flex,
//   Grid,
//   GridCol,
//   Group,
//   NumberInput,
//   Radio,
//   ScrollArea,
//   Select,
//   Text,
// } from "@mantine/core";
// import React, { useEffect, useState } from "react";
// import {
//   changeDimensions,
//   ContainerTypePill,
//   contSize,
//   getContainerFields,
//   options,
//   types,
//   TypesWithContainers,
// } from "./containerDetails";
// import { COLORS } from "@/app/utils/COLORS";
// import { IconTrash } from "@tabler/icons-react";
// import { IconPlus } from "@tabler/icons-react";

// const FairContainer = ({
//   data = {
//     // commodity: null,
//     type: undefined,
//     // dimension: "M",
//     // hsCode: null,
//     // hsCode2: null,
//     // hs1: null,
//     // hs2: null,
//     weight: null,
//     size: "20GP",
//     containerCount: null,
//     list: [],
//   },
//   defaultSize = `20GP`,
//   submitCallback = () => null,
// }) => {
//   const [activeType, setActiveType] = useState(data?.type || "GC");
//   const [activeSize, setActiveSize] = useState(defaultSize);
//   const [selectedSize, setSelectedSize] = useState([]);
//   const [activeDimension, setActiveDimension] = useState(
//     data?.dimension || "M"
//   );
//   const [containerList, setContainerList] = useState({
//     // commodity: data?.commodity,
//     type: data?.type,
//     // dimension: data?.dimension || "M",
//     weight: data?.weight || null,
//     // hsCode: data?.hsCode || null,
//     // hsCode2: data?.hsCode2 || null,
//     // hs1: data?.hs1 || null,
//     // hs2: data?.hs2 || null,
//     size: data?.size || null,
//     containerCount: data?.containerCount || null,
//     list: data?.list || [],
//   });

//   useEffect(() => {
//     if (TypesWithContainers.includes(activeType)) {
//       if (containerList.type !== activeType) {
//         const d = getContainerFields(activeType, activeDimension);
//         setContainerList((ct) => ({
//           ...ct,
//           type: activeType,
//           dimension: activeDimension,
//           list: [
//             {
//               size: activeSize,
//               fields: d,
//             },
//           ],
//         }));
//       } else {
//         const newList = changeDimensions(
//           containerList.list,
//           activeDimension,
//           `(${containerList.dimension})`
//         );
//         setContainerList((ct) => ({
//           ...ct,
//           type: activeType,
//           dimension: activeDimension,
//           list: newList,
//         }));
//       }
//     } else {
//       setContainerList((ct) => ({
//         ...ct,
//         type: activeType,
//         dimension: activeDimension,
//         list: [],
//       }));
//     }
//   }, [activeType, activeDimension]);

//   const addNewContainer = () => {
//     setContainerList((st) => {
//       const newContainer = getContainerFields(st.type, st.dimension);
//       return {
//         ...st,
//         list: [
//           ...st.list,
//           {
//             size: activeSize,
//             fields: newContainer,
//           },
//         ],
//       };
//     });
//   };

//   const removeContainer = (containerNo) => {
//     const filter = selectedSize.filter((_, index) => containerNo !== index);
//     setSelectedSize(filter);
//     setContainerList((st) => {
//       const list = [...st.list];
//       list.splice(containerNo, 1);
//       return {
//         ...st,
//         list: list,
//       };
//     });
//   };

//   const handleFields = (containerNo, fieldPosition) => (event) => {
//     setContainerList((st) => {
//       const l = st.list;
//       const curField = l[containerNo].fields[fieldPosition];
//       if (curField.type === types.NUMBER) {
//         l[containerNo].fields[fieldPosition].value = event;
//       }
//       if (curField.type === types.OPTIONS) {
//         l[containerNo].fields[fieldPosition].value = event;
//       }
//       if (curField.type === types.CHECKBOX) {
//         l[containerNo].fields[fieldPosition].checked = event.target.checked;
//       }
//       if (curField.type === types.DROPDOWN) {
//         l[containerNo].fields[fieldPosition].value = event;
//       }
//       return {
//         ...st,
//         list: l,
//       };
//     });
//   };

//   const handleSizeChange = (i, v) => {
//     setActiveSize(v);
//     setContainerList((st) => {
//       return {
//         ...st,
//         size: v,
//         list: st.list?.map((item, index) => {
//           if (index === i) {
//             item.size = v;
//           }
//           return item;
//         }),
//       };
//     });
//   };

//   useEffect(() => {
//     submitCallback(containerList);
//   }, [containerList]);

//   return (
//     <Grid>
//       <Grid.Col span={8}>
//         <Select
//           name={"Cargo Type"}
//           placeholder="Choose cargo type"
//           required
//           onChange={(v) => {
//             console.log("ITEM : ", v)
//             setActiveType(v)
//           }}
//           searchable
//           label="Cargo Type"
//           data={options || []}
//         />
//         {/* {options.map((item, i) => {
//             return (
//               <ContainerTypePill
//                 key={i}
//                 isActive={item === activeType}
//                 onClick={() => {
//                   setActiveType(item);
//                 }}
//                 name={item}
//               />
//             );
//           })} */}
//       </Grid.Col>


//       {/* {dimension?.isVisible.includes(activeType) ? (
//         <>
//           <Text mt={20} size="sm" fw={500}>
//             Dimension
//           </Text>
//           <Flex>
//             {dimension?.data.map((item) => {
//               return item?.isShow.includes(activeType) ? (
//                 <ContainerTypePill
//                   isActive={item.label == activeDimension}
//                   onClick={() => setActiveDimension(item.label)}
//                   name={item.label}
//                 />
//               ) : null;
//             })}
//           </Flex>
//         </>
//       ) : null} */}
//       <Grid.Col span={4}>
//         {/* <Flex align={'flex-end'} h={'100%'}> */}
//           {selectedSize.length - 1 < contSize.length && (
//             <Button
//               mt={37}
//               w={'100%'}
//               variant="subtle"
//               onClick={addNewContainer}
//               leftSection={<IconPlus size={20} />}
//             > Add Container
//             </Button>
//           )}
//         {/* </Flex> */}
//       </Grid.Col>
//       {/* <Flex justify={"flex-end"}>
//         {selectedSize.length - 1 < contSize.length && (
//           <Button
//             // color={COLORS.primaryColor}
//             variant="lig"
//             size="xs"
//             onClick={addNewContainer}
//             leftSection={<IconPlus />}
//           >
//             Add Container
//           </Button>
//         )}
//       </Flex> */}

//       <ScrollArea  mah={250} mih={0} type="always" w={'100%'}>
//         {containerList?.list?.map((item, i) => {
//           if (!item) return null;
//           return (
//             <Grid w={'100%'} p={'xs'}>
//               {/* <Grid.Col span={1}>
//                 <Flex justify={'center'} align={'center'} h={'100%'}>
//                 <Text size="sm" w={'100%'} ta={'center'} >{i+1}</Text>
//                 </Flex>
//               </Grid.Col> */}
//               <Grid.Col span={3}>
//                 <Select
//                   label={"Container Size"}
//                   w={'auto'}
//                   data={contSize}
//                   value={item.size}
//                   onChange={(v) => handleSizeChange(i, v)}
//                   required
//                 />
//               </Grid.Col>
//               {item?.fields?.map((field, j, arr) => {
//                 const inputSize = arr.length > 2 ? 'auto' : "auto";
//                 if (field.type === types.DROPDOWN) {
//                   return (
//                     <Grid.Col span={3}>
//                       <Select
//                         key={j}
//                         size="xs"
//                         w={inputSize}
//                         label={field.label}
//                         value={field.value}
//                         onChange={handleFields(i, j)}
//                         {...(field.options || {})}
//                       />
//                     </Grid.Col>
//                   );
//                 }
//                 if (field.type === types.NUMBER) {
//                   return (
//                     <Grid.Col span={3}>
//                       <NumberInput
//                         key={j}
//                         w={inputSize}
//                         hideControls
//                         label={field.label}
//                         value={field.value}
//                         onChange={handleFields(i, j)}
//                         {...(field.options || {})}
//                       />
//                     </Grid.Col>
//                   );
//                 }
//                 if (field.type === types.CHECKBOX) {
//                   return (
//                     <Grid.Col span={3}>
//                       <Flex h={'100%'} align={'center'}>
//                         <Checkbox
//                           size="sm"
//                           key={j}
//                           label={field.label}
//                           checked={field.checked}
//                           onChange={handleFields(i, j)}
//                         />
//                       </Flex>
//                     </Grid.Col>
//                   );
//                 }
//                 if (field.type === types.OPTIONS) {
//                   return (
//                     // <Flex key={field.label} direction={"column"} mt={"sm"}>
//                     //   <Text size="xs">{field.label}</Text>
//                     //   <Flex>
//                     //     {field.options?.map((option) => (
//                     //       <ContainerTypePill
//                     //         key={option.value}
//                     //         isActive={option.value === field.value}
//                     //         name={option.label}
//                     //         onClick={() => handleFields(i, j)(option.value)}
//                     //       />
//                     //     ))}
//                     //   </Flex>
//                     // </Flex>
//                     <Grid.Col span={3}>
//                       <Radio.Group
//                         // value={volumeUnit}
//                         onChange={(value) => handleFields(value)}
//                         label="Unit of Volume"
//                         color={COLORS.primaryColor}
//                       >
//                         <Group justify={'space-between'} p={'sm'}>
//                           {field.options?.map((option) => (
//                             // <ContainerTypePill
//                             //   key={option.value}
//                             //   isActive={option.value === field.value}
//                             //   name={option.label}
//                             //   onClick={() => handleFields(i, j)(option.value)}
//                             // />
//                             <Radio value={option.value} label={option.label} />
//                           ))}
//                         </Group>
//                       </Radio.Group>
//                     </Grid.Col>
//                   );
//                 }
//               })}
//               <Grid.Col span={1}>
//                 <Flex align={'center'} mt={40}>
//                   <ActionIcon
//                     variant={'subtle'}
//                     color={"red"}
//                     onClick={() => {
//                       removeContainer(i)
//                     }}
//                   >
//                     <IconTrash stroke={1.5} size={30} />
//                   </ActionIcon>
//                 </Flex>

//               </Grid.Col>
//             </Grid>
//             // <Box p={"xs"} bg={i % 2 ? "#f9f9f9" : COLORS.white} key={i}>
//             //   <Flex
//             //     wrap={"nowrap"}
//             //     direction={"row"}
//             //     justify={"space-between"}
//             //     align={"center"}
//             //   >
//             //     <Text size="sm" fw={500} mr={20} mt={20} ml={-4}>
//             //       {i + 1}
//             //     </Text>
//             //     <Select
//             //       label={"Container Size"}
//             //       w={'auto'}
//             //       mr={20}
//             //       data={contSize}
//             //       value={item.size}
//             //       onChange={(v) => handleSizeChange(i, v)}
//             //       required
//             //     />
//             //     {item?.fields?.map((field, j, arr) => {
//             //       const inputSize = arr.length > 2 ? 'auto' : "auto";
//             //       if (field.type === types.DROPDOWN) {
//             //         return (
//             //           <Select
//             //             key={j}
//             //             size="xs"
//             //             w={inputSize}
//             //             label={field.label}
//             //             value={field.value}
//             //             onChange={handleFields(i, j)}
//             //             {...(field.options || {})}
//             //           />
//             //         );
//             //       }
//             //       if (field.type === types.NUMBER) {
//             //         return (
//             //           <NumberInput
//             //             key={j}
//             //             w={inputSize}
//             //             mr={20}
//             //             hideControls
//             //             label={field.label}
//             //             value={field.value}
//             //             onChange={handleFields(i, j)}
//             //             {...(field.options || {})}
//             //           />
//             //         );
//             //       }
//             //       if (field.type === types.CHECKBOX) {
//             //         return (
//             //           <Checkbox
//             //             size="xs"
//             //             ml={5}
//             //             mt={20}
//             //             key={j}
//             //             label={field.label}
//             //             checked={field.checked}
//             //             onChange={handleFields(i, j)}
//             //           />
//             //         );
//             //       }
//             //       if (field.type === types.OPTIONS) {
//             //         return (
//             //           <Flex key={field.label} direction={"column"} mt={"sm"}>
//             //             <Text size="xs">{field.label}</Text>
//             //             <Flex>
//             //               {field.options?.map((option) => (
//             //                 <ContainerTypePill
//             //                   key={option.value}
//             //                   isActive={option.value === field.value}
//             //                   name={option.label}
//             //                   onClick={() => handleFields(i, j)(option.value)}
//             //                 />
//             //               ))}
//             //             </Flex>
//             //           </Flex>
//             //         );
//             //       }
//             //     })}

//             //     {/* {i > 0 ? ( */}
//             //     <ActionIcon
//             //       variant="light"
//             //       size={"md"}
//             //       mt={20}
//             //       color={"red"}
//             //       onClick={() => removeContainer(i)}
//             //     >
//             //       <IconTrash stroke={1.5} size={20} />
//             //     </ActionIcon>
//             //     {/* ) : (
//             //       <ActionIcon
//             //         variant="light"
//             //         size={"lg"}
//             //         mt={20}
//             //         color="teal"
//             //       >
//             // </ActionIcon>
//             //     )} */}
//             //   </Flex>
//             // </Box>
//           );
//         })}
//       </ScrollArea>
//     </Grid >
//   );
// };

// export default FairContainer;


import {
  ActionIcon,
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  NumberInput,
  Radio,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  changeDimensions,
  getContainerFields,
  options,
  types,
  TypesWithContainers,
  contSize,
} from "./containerDetails";
import { COLORS } from "@/app/utils/COLORS";
import { IconTrash, IconPlus } from "@tabler/icons-react";

const FairContainer = ({
  data = {},
  defaultSize = "20GP",
  submitCallback = () => null,
  type = "FCL", // Default to FCL if not specified
}) => {
  // Initialize state based on type
  const initialState = {
    type: data?.type || "GC",
    weight: data?.weight || null,
    size: data?.size || defaultSize,
    containerCount: data?.containerCount || null,
    list: data?.list || [],
    // LCL/AIR specific fields
    no_of_packages: data?.no_of_packages || "",
    gross_weight: data?.gross_weight || "",
    volume: data?.volume || "",
  };

  const [state, setState] = useState(initialState);
  const [activeType, setActiveType] = useState(initialState.type);
  const [activeSize, setActiveSize] = useState(initialState.size);
  const [selectedSize, setSelectedSize] = useState([]);
  const [activeDimension] = useState("M"); // Removed unused dimension state

  // Initialize FCL container on first render if type is FCL
  useEffect(() => {
    if (type === "FCL" && TypesWithContainers.includes(activeType) && state.list.length === 0) {
      const d = getContainerFields(activeType, activeDimension);
      setState(prev => ({
        ...prev,
        type: activeType,
        list: [{
          size: activeSize,
          fields: d,
        }],
      }));
    }
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (type === "FCL" && TypesWithContainers.includes(activeType)) {
      if (state.type !== activeType) {
        const d = getContainerFields(activeType, activeDimension);
        setState(prev => ({
          ...prev,
          type: activeType,
          list: [{
            size: activeSize,
            fields: d,
          }],
        }));
      }
    }
  }, [activeType, activeDimension, type]);

  useEffect(() => {
    submitCallback(state);
  }, [state]);

  const addNewContainer = () => {
    if (type !== "FCL") return;

    setState(prev => {
      const newContainer = getContainerFields(prev.type, activeDimension);
      return {
        ...prev,
        list: [
          ...prev.list,
          {
            size: activeSize,
            fields: newContainer,
          },
        ],
      };
    });
  };

  const removeContainer = (containerNo) => {
    if (type !== "FCL") return;

    setState(prev => {
      const list = [...prev.list];
      list.splice(containerNo, 1);
      return { ...prev, list };
    });

    const filter = selectedSize.filter((_, index) => containerNo !== index);
    setSelectedSize(filter);
  };

  const handleFields = (containerNo, fieldPosition) => (event) => {
    if (type !== "FCL") return;

    setState(prev => {
      const l = [...prev.list];
      const curField = l[containerNo].fields[fieldPosition];

      if (curField.type === types.NUMBER) {
        l[containerNo].fields[fieldPosition].value = event;
      } else if (curField.type === types.OPTIONS || curField.type === types.DROPDOWN) {
        l[containerNo].fields[fieldPosition].value = event;
      } else if (curField.type === types.CHECKBOX) {
        l[containerNo].fields[fieldPosition].checked = event.target.checked;
      }

      return { ...prev, list: l };
    });
  };

  const handleSizeChange = (i, v) => {
    if (type !== "FCL") return;

    setActiveSize(v);
    setState(prev => ({
      ...prev,
      size: v,
      list: prev.list.map((item, index) =>
        index === i ? { ...item, size: v } : item
      ),
    }));
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target?.value ?? e;
    setState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Grid>
      <Grid.Col span={8}>
        <Select
          name="Cargo Type"
          placeholder="Choose cargo type"
          required
          onChange={setActiveType}
          searchable
          label="Cargo Type"
          data={options || []}
          value={activeType}
        />
      </Grid.Col>

      {type === "FCL" ? (
        <>
          <Grid.Col span={4}>
            {selectedSize.length - 1 < contSize.length && (
              <Button
                mt={37}
                w='100%'
                variant="subtle"
                onClick={addNewContainer}
                leftSection={<IconPlus size={20} />}
              >
                Add Container
              </Button>
            )}
          </Grid.Col>

          <ScrollArea mah={250} mih={0} type="always" w='100%'>
            {state.list?.map((item, i) => (
              <Grid w='100%' p='xs' key={i}>
                <Grid.Col span={3}>
                  <Select
                    label="Container Size"
                    w='auto'
                    data={contSize}
                    value={item.size}
                    onChange={(v) => handleSizeChange(i, v)}
                    required
                  />
                </Grid.Col>

                {item?.fields?.map((field, j) => (
                  <Grid.Col span={3} key={j}>
                    {field.type === types.DROPDOWN && (
                      <Select
                        size="xs"
                        w='auto'
                        label={field.label}
                        value={field.value}
                        onChange={handleFields(i, j)}
                        {...(field.options || {})}
                      />
                    )}
                    {field.type === types.NUMBER && (
                      <NumberInput
                        w='auto'
                        hideControls
                        label={field.label}
                        value={field.value}
                        onChange={handleFields(i, j)}
                        {...(field.options || {})}
                      />
                    )}
                    {field.type === types.CHECKBOX && (
                      <Flex h='100%' align='center'>
                        <Checkbox
                          size="sm"
                          label={field.label}
                          checked={field.checked}
                          onChange={handleFields(i, j)}
                        />
                      </Flex>
                    )}
                    {field.type === types.OPTIONS && (
                      <Radio.Group
                        onChange={handleFields(i, j)}
                        label="Unit of Volume"
                        color={COLORS.primaryColor}
                      >
                        <Group justify='space-between' p='sm'>
                          {field.options?.map((option) => (
                            <Radio
                              key={option.value}
                              value={option.value}
                              label={option.label}
                            />
                          ))}
                        </Group>
                      </Radio.Group>
                    )}
                  </Grid.Col>
                ))}

                <Grid.Col span={1}>
                  <Flex align='center' mt={40}>
                    <ActionIcon
                      variant='subtle'
                      color="red"
                      onClick={() => removeContainer(i)}
                    >
                      <IconTrash stroke={1.5} size={30} />
                    </ActionIcon>
                  </Flex>
                </Grid.Col>
              </Grid>
            ))}
          </ScrollArea>
        </>
      ) : (
        <>
          <Grid.Col span={6}>
            <TextInput
              color={COLORS.portColor}
              placeholder="Enter No of Packages"
              label="No of Packages"
              withAsterisk
              value={state.no_of_packages}
              onChange={handleInputChange('no_of_packages')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              color={COLORS.portColor}
              placeholder="Enter Gross Weight"
              label="Gross Weight (Kgs)"
              withAsterisk
              value={state.gross_weight}
              onChange={handleInputChange('gross_weight')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              color={COLORS.portColor}
              placeholder={type === "LCL" ? "Enter Volume" : "Enter Volume Weight"}
              label={type === "LCL" ? "Volume (CBM)" : "Volume Weight (Kgs)"}
              withAsterisk
              value={state.volume}
              onChange={handleInputChange('volume')}
            />
          </Grid.Col>
        </>
      )}
    </Grid>
  );
};

export default FairContainer;