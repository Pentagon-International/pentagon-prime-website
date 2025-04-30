'use client'

import { ActionIcon, Alert, Anchor, Autocomplete, Button, Center, Checkbox, Container, FileButton, Flex, Grid, GridCol, Group, List, Modal, NumberInput, Radio, rem, ScrollArea, SegmentedControl, Select, Switch, Text, Textarea, TextInput, Title } from "@mantine/core";
import { IconArrowRight, IconArrowsDownUp, IconArrowsLeftRight, IconBox, IconCalendar, IconFiles, IconMapPin, IconPaperclip, IconPlane, IconPlus, IconSquareHalf, IconTrash, IconUpload } from "@tabler/icons-react";
import { COLORS } from "../utils/COLORS";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import useTransportStore from "../store/transportStore";
import { useEffect, useState } from "react";
import useCustomerRequestStore from "../store/customerRequestStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCallProtected } from "../api/api";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { imoClass } from "../utils/imoClass";
import { contSize, getContainerFields, options, types, TypesWithContainers } from "../tools/containerDetails";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { result } from "lodash";
import { useRouter } from "next/navigation";

const today = dayjs()

const ListAttachments = ({ data = [] }) => {
  // console.log("FILES : ", data)
  if (!data || data?.length === 0) {
    return null
  }

  return (
    <List
      center
      size='sm'
      spacing={'xs'}
      icon={<IconPaperclip style={{ width: rem(16), height: rem(16) }} />}
    >
      {data?.map((attachment, index) => {
        // console.log("attachment url : ",attachment?.url)
        attachment?.url ? (
          <List.Item key={index} py={'xs'}>
            <Anchor href={attachment.url} target='_blank' size='sm'>
              {attachment?.url?.split('/')?.pop()} 
            </Anchor>
          </List.Item>
        ) : null
      }
      )}
    </List>
  )
}


const CustomerRequestForm = (data = {
  type: undefined,
  weight: null,
  size: "20GP",
  containerCount: null,
  list: [],
},
  defaultSize = `20GP`,
  submitCallback = () => null,
) => {

  const { formValues } = useCustomerRequestStore();
  const { seaData, airData, setSeaData, setAirData } = useTransportStore();
  const selectData = formValues?.typeOfBooking === 'air' ? airData : seaData
  const router = useRouter();

  // console.log('selectData', selectData)

  // console.log("👆🏻👆🏻👆🏻👆🏻👆🏻 : ", selectData)
  console.log("...formValues : ", { ...formValues })
  const form = useForm({
    mode: 'controlled',

    initialValues: {
      typeofShipment: '',
      // ...formValues 
      result: [
        {
          origin: formValues?.origin || {},
          destination: formValues?.destination || {},
          cargo: {
            isDangerous: false,
          },
          unNo: null,
          imo: null,
          agents: [
            "55bf1d1d-66ad-4726-8d72-8b39308792e1"
          ],
          stackable: true,
        }
      ]
      // stackable : true
    },
    // validateInputOnChange: true,
    // validate: {
    //   customer_name: (value) => (value ? null : 'Customer name is required'),
    //   contact_number: (value) =>
    //     value && /^\d{10}$/.test(value) ? null : 'Valid contact number is required',
    //   email: (value) => value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Valid email is required',
    //   typeofShipment: (value) => (value ? null : 'Type of shipment is required'),
    // },
  });

  console.log("form.values : ", form?.values)
  const [errors, setErrors] = useState({})
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const CustomTitle = () => (
    <Flex align={"center"} gap={20}>
      <div style={{ fontSize: 18 }}> Add Cargo Details </div>
    </Flex>
  );

  const Icon = isMobile ? IconArrowsDownUp : IconArrowsLeftRight


  const [containerList, setContainerList] = useState({
    commodity: data?.commodity,
    type: data?.type,
    dimension: data?.dimension || "M",
    weight: data?.weight || null,
    hsCode: data?.hsCode || null,
    hsCode2: data?.hsCode2 || null,
    hs1: data?.hs1 || null,
    hs2: data?.hs2 || null,
    size: data?.size || null,
    containerCount: data?.containerCount || null,
    list: data?.list || [],
  });


  const CodeCategory = useQuery({
    queryKey: ["hs-code-category"],
    queryFn: async () => {
      const response = await apiCallProtected.get("/pentagon/hscode");
      return response.data;
    },
    select: (data) => {
      return data?.data?.map((item) => ({
        label: `${item.code} - ${item.description}`,
        value: item.category,
      }))
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // console.log("CodeCategory : ", CodeCategory)

  const HsCodeQuery = useQuery({
    queryKey: ["Hs-code", containerList.hs1],
    queryFn: async () => apiCallProtected.get(`/pentagon/categories/h2/${containerList.hs1}`),
    select: (data) => {
      // console.log("containerList.hs1 : ", containerList.hs1)
      return data.data?.map((item) => ({
        label: `${item.code} - ${item.description}`,
        value: `${item.code}`,
      }))
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: containerList?.hsCode ? true : false,
  });

  const [activeType, setActiveType] = useState(data?.type || "GC");
  const [activeSize, setActiveSize] = useState(defaultSize);
  const [selectedSize, setSelectedSize] = useState([]);
  const [activeDimension, setActiveDimension] = useState(
    data?.dimension || "M"
  );

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

  const salesPersonQuery = useQuery({
    queryKey: ['sales-person-query'],
    queryFn: () => apiCallProtected.get('/pentagon/salesPerson'),
    select: ({ data }) => {
      return data.data?.map((salesperson) => ({
        value: `${salesperson.id}`,
        label: salesperson.username,
      }));
    },
  });


  const shipmentTermsQuery = useQuery({
    queryKey: ["shipment-types"],
    queryFn: async () => {
      const response = await apiCallProtected.get("/pentagon/incoTerms");
      return response.data;
    },
    select: ({ data }) => {
      return data?.map((item) => ({
        label: item.name,
        value: item.name
      }))
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const segmantData = [
    {
      value: 'FCL',
      label: (
        <Center style={{ gap: 10 }}>
          <IconBox size={20} stroke={1.5} />
          <span>FCL</span>
        </Center>
      ),
    },
    {
      value: 'LCL',
      label: (
        <Center style={{ gap: 10 }}>
          <IconSquareHalf size={20} stroke={1.5} />
          <span>LCL</span>
        </Center>
      ),
    },
    {
      value: 'AIR',
      label: (
        <Center style={{ gap: 10 }}>
          <IconPlane size={20} stroke={1.5} />
          <span>Air</span>
        </Center>
      ),
    },
  ]

  const swapOriginDestination = () => {
    const currentOrigin = form?.values?.result?.[0]?.origin;
    const currentDestination = form?.values?.result?.[0]?.destination;

    if (!currentOrigin || !currentDestination) {
      console.error("Origin or Destination is missing");
      return;
    }

    form.setValues((prevValues) => {
      const updatedResult = [
        {
          ...prevValues.result[0],
          origin: {
            ...currentDestination,
            origin: currentDestination.destination,
            shipment_type: currentOrigin.shipment_type, // Keep shipment_type from origin
            ready_date: currentOrigin.ready_date, // Keep ready_date from origin
            pickup: currentOrigin.pickup, // Keep pickup from origin
          },
          destination: {
            ...currentOrigin,
            destination: currentOrigin.origin,
            delivery: currentDestination.delivery, // Keep delivery from destination
            customs: currentDestination.customs, // Keep customs from destination
            address: currentDestination.address, // Keep address from destination
          },
        },
      ];

      return {
        ...prevValues,
        result: updatedResult,
      };
    });

  };

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
  }, [containerList]);

  const fileUpload = useMutation({
    mutationFn: data =>
      apiCallProtected.post('/pentagon/file/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-client-secret': 'jwooF70KzT/gssKNwJVnr522+MaomDhgpocmcvF6ek2e7rI9he9m7guYU6i0OkoQkxu5DHjBgcVVUIgzl9bf0xnBLIgFh69x/uVfJWExIlLcgpLoNwlABxxhXFQmA/0H'
        }
      }),
    onSuccess: (values) => {
      try {

        form.setValues((prevValues) => {
          const existingDocuments = prevValues?.result?.[0]?.documents || [];
          const updatedResult = [
            {
              ...prevValues?.result?.[0],
              documents: [
                ...existingDocuments,
                {
                  category: prevValues?.category,
                  url: values?.data?.data?.url,
                },
              ],
            },
          ];

          return {
            ...prevValues,
            result: updatedResult,
          };
        });
      } catch (e) {
        console.log(e);
      }
    },
    onError: error => {
      console.error('Upload Error >> ', error)
      notifications.show({
        message: 'Try again later.',
        color: 'red',
        title: 'Unable to upload!'
      })
    }
  })

  // useEffect(() => {
  //   console.log('Form values updated:', form.values);
  // }, [form.values]);



  const submitCustomerRequest = useMutation({
    mutationFn: (data) => apiCallProtected.post('/pentagon/createQuote', data, {
      headers: {
        'x-client-secret': 'jwooF70KzT/gssKNwJVnr522+MaomDhgpocmcvF6ek2e7rI9he9m7guYU6i0OkoQkxu5DHjBgcVVUIgzl9bf0xnBLIgFh69x/uVfJWExIlLcgpLoNwlABxxhXFQmA/0H'
        // 'Content-Type': 'multipart/form-data'
      }
    }),
    onSuccess: (res) => {
      router.push('/submitted');
    },
    onError: (error) => {
    },
    onSettled: () => {
    }
  });

  // Ensure formHook is not null before accessing its methods
  // if (!formHook) {
  //   return <div>Loading...</div>; // Show a loading state if formHook is not available yet
  // }

  const handleSubmit = (values) => {
    const validationErrors = form.validate();
    if (!validationErrors.hasErrors) {
      console.log('Form submitted with values:', values);
      submitCustomerRequest.mutate(form.values);
      router.push('/submitted');
    } else {
      console.log('Validation errors:', validationErrors.errors);
    }
  };

  const handleFileUpload = category => files => {
    // console.log("HITTTTT")
    const fileObj = new FormData()

    // console.log('>>>>', fileObj)
    fileObj?.append('file', files[0])
    fileUpload.mutate(fileObj, {

    })
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Container
          fluid px={'7%'} py={'70px'}
        >
          {/* <Title tt="uppercase" tw="balance" fw={800}> Featured articles </Title> */}
          <Title mb="lg" mt={'xl'} tt="uppercase" tw="balance" fw={800}>Fare Calculation</Title>

          <Grid px={'13%'}>
            <Grid.Col span={isMobile ? 12 : 5}>
              <Select
                withAsterisk
                label={'Origin'}
                color={COLORS.secondaryColor}
                placeholder="Select Origin"
                size={isMobile ? "md" : "lg"}
                limit={5}
                data={selectData}
                fw={500}
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  }
                }}
                radius="md"
                value={form?.values?.result?.[0]?.origin?.origin}
                leftSection={<IconMapPin size={20} color={COLORS.secondaryColor} />}
                onChange={(origin, value) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          origin: {
                            ...prevValues.result[0]?.origin,
                            origin: value?.value,
                            port: value?.value,
                            name: value?.label,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
              />
            </Grid.Col>
            <Grid.Col span={isMobile ? 12 : 2}>
              <Flex w={'100%'} h={'100%'} justify={'center'} align={'center'}>
                <ActionIcon
                  mt={32}
                  withAsterisk
                  variant="default"
                  size={28}
                  radius="xl"
                  bg={COLORS.secondaryColor}
                  style={{ borderColor: COLORS.secondaryColor }}
                  onClick={swapOriginDestination}
                >
                  <Icon size={18} color={COLORS.primaryColor} />
                </ActionIcon>
              </Flex>
            </Grid.Col>
            <Grid.Col span={isMobile ? 12 : 5} >
              <Select
                label={'Destination'}
                withAsterisk
                color={COLORS.secondaryColor}
                placeholder="Select Destination"
                size={isMobile ? "md" : "lg"}
                data={selectData}
                limit={5}
                fw={500}
                value={form?.values?.result?.[0]?.destination?.destination}
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  }
                }}
                radius="md"
                leftSection={<IconMapPin size={20} color={COLORS.secondaryColor} />}
                onChange={(destination, value) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          destination: {
                            ...prevValues.result[0]?.destination,
                            destination: value?.value,
                            name: value?.label,
                            port: value?.value,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text size="sm" fw={500} mb={3} mt={'xs'}>
                Type of Booking
              </Text>
              <SegmentedControl
                name="typeofBooking"
                // onChange={(val) => {
                //   form.setFieldValue('typeOfBooking', val);
                // }}
                key={form.key('typeofBooking')}
                {...form.getInputProps('typeofBooking')}
                onChange={((typeofBooking) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    typeofBooking: typeofBooking,
                    category: typeofBooking
                  }));
                })}
                fullWidth
                size={isMobile ? '12px' : "14px"}
                radius={'md'}
                color={'#CDF6FF'}
                defaultValue="FCL"
                data={segmantData}
                styles={{
                  indicator: {
                    backgroundColor: '#CDF6FF',
                  },
                  innerLabel: {
                    color: COLORS.secondaryColor
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={isMobile ? 12 : 6}>
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Full Name"
                size={isMobile ? "md" : "lg"}
                label="Name"
                withAsterisk
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  }
                }}
                radius="md"
                key={form.key('customer_name')}
                {...form.getInputProps('customer_name')}
              />
            </Grid.Col>
            <Grid.Col span={isMobile ? 12 : 6}>
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Mobile Number"
                size={isMobile ? "md" : "lg"}
                withAsterisk
                label="Mobile Number"
                radius="md"
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',

                  }
                }}
                key={form.key('contact_number')}
                {...form.getInputProps('contact_number')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Email Address"
                size={isMobile ? "md" : "lg"}
                withAsterisk
                label="Email"
                radius="md"
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  }
                }}
                key={form.key('email')}
                {...form.getInputProps('email')}
              // error={errors.email}
              />
            </Grid.Col>
            {/* <Grid.Col span={isMobile ? 12 : 6}>
            <Select
              withAsterisk
              label="Select a Sales Person"
              placeholder="Sales Person Name"
              size={isMobile ? "md" : "lg"}
              withScrollArea={false}
              data={salesPersonQuery?.data || []}
              // onChange={(v, opt) => formHook?.setFieldValue('referred_by', v)}
              // value={(formHook.values.referred_by || '').toString()}
              searchable
              clearable
              comboboxProps={{ shadow: 'md' }}
              key={form.key('referred_by')}
              {...form.getInputProps('referred_by')}
              styles={{
                dropdown: { maxHeight: 200, overflowY: 'auto' },
                option: {
                  fontSize: isMobile ? '14px' : '16px',
                },
                input: {
                  fontSize: isMobile ? '14px' : '16px',
                },
                label: {
                  fontSize: isMobile ? '14px' : '16px',
                },
                error: {
                  fontSize: isMobile ? '12px' : '14px',
                }
              }}
              radius="md"
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 6}>
            <TextInput
              color={COLORS.portColor}
              placeholder="Enter Reference"
              size={isMobile ? "md" : "lg"}
              // w={isMobile ? '100%' : '50%'}
              label="Reference"
              withAsterisk
              styles={{
                input: {
                  fontSize: isMobile ? '14px' : '16px',
                },
                label: {
                  fontSize: isMobile ? '14px' : '16px',
                },
                error: {
                  fontSize: isMobile ? '12px' : '14px',
                }
              }}
              radius="md"
              {...form.getInputProps('reference')}
              key={form.key('reference')}
              error={errors.name}
            />
          </Grid.Col> */}
            <Grid.Col span={isMobile ? 12 : 6}>
              <Select
                withAsterisk
                label="Type of Shipment"
                placeholder="Select Type of Shipment"
                size={isMobile ? "md" : "lg"}
                withScrollArea={false}
                data={shipmentTermsQuery?.data || []}
                searchable
                clearable
                comboboxProps={{ shadow: 'md' }}
                onChange={(shipment_type) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          origin: {
                            ...prevValues.result[0]?.origin,
                            shipment_type: shipment_type,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                styles={{
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  }
                }}
                radius="md"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DateInput
                size={isMobile ? "md" : "lg"}
                name={'cargoReadyDate'}
                onChange={(ready_date) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          origin: {
                            ...prevValues.result[0]?.origin,
                            ready_date: new Date(ready_date)
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                radius="md"
                styles={{
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  calendarHeaderLevel: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  weekday: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  },
                  calendarHeader: {
                    fontSize: isMobile ? '12px' : '16px',
                  },
                }}
                label='Cargo Ready Date'
                placeholder='select date'
                withAsterisk
                valueFormat='DD/MM/YYYY'
                minDate={today.add(1, 'day').toDate()}
                maxDate={today.add(1, 'year').toDate()}
                rightSection={<IconCalendar stroke={1.5} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Switch
                mt={'md'}
                mb={'md'}
                // key={form.key('pickup')}
                // {...form.getInputProps('pickup')}
                onChange={(pickup) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          origin: {
                            ...prevValues.result[0]?.origin,
                            pickup: pickup.currentTarget.checked,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                name={'pickup'}
                size='sm'
                labelPosition='left'
                label='Door Pickup ?'
                description='Local charges included (BL fee, document charges & terminal handling charges). Enable this to enter pickup address below'
                styles={{
                  body: {
                    justifyContent: 'space-between'
                  },
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  },
                  description: {
                    fontSize: isMobile ? '14px' : '14px',
                  }
                }}
              // checked = {form?.values?.result[0]?.origin?.pickup}
              // checked={form.values.pickup}
              />
              <TextInput
                name={'pickupAddress'}
                disabled={!form?.values?.result?.[0]?.origin?.pickup || false}
                // label='Pickup Address'
                size={isMobile ? "md" : "lg"}
                placeholder="Enter Pickup Address"
                radius="md"
                onChange={(address) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          origin: {
                            ...prevValues.result[0]?.origin,
                            address: address.target.value,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  }
                }}
              />
            </Grid.Col>
            {/* {form?.values?.pickup === true ? ( */}
            {/* <Grid.Col span={6}> */}

            {/* </Grid.Col> */}
            {/* )
            : <Grid.Col span={6}></Grid.Col>} */}
            {/* <Grid.Col span={6}></Grid.Col> */}
            <Grid.Col span={6}>
              <Switch
                mt={'md'}
                mb={'md'}
                onChange={(delivery) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          destination: {
                            ...prevValues.result[0]?.destination,
                            delivery: delivery.currentTarget.checked,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                size='sm'
                description='Local charges included (BL fee, document charges & terminal handling charges). Enable this to enter delivery address below'
                labelPosition='left'
                label='Door Delivery ?'
                styles={{
                  body: {
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    // display: 'flex',
                    // height: '100%'
                  },
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  },
                  description: {
                    fontSize: isMobile ? '14px' : '14px',
                  }
                }}
              />
              <TextInput
                disabled={!form?.values?.result?.[0]?.destination?.delivery || false}
                // label='Delivery Address'
                placeholder="Enter Door Delivery"
                size={isMobile ? "md" : "lg"}
                radius="md"
                onChange={(address) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          destination: {
                            ...prevValues.result[0]?.destination,
                            address: address.target.value,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Switch
                mt={'md'}
                mb={'md'}
                name={'isOriginCustoms'}
                size='sm'
                labelPosition='left'
                label='Origin Customs ?'
                onChange={(customs) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          origin: {
                            ...prevValues.result[0]?.origin,
                            customs: customs.currentTarget.checked,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                styles={{
                  body: {
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  },
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  },
                  description: {
                    fontSize: isMobile ? '14px' : '14px',
                  }
                }}
              />
            </Grid.Col>
            {/* {form?.values?.pickup === true ? ( */}
            {/* <Grid.Col span={6}>
              
            </Grid.Col> */}
            <Grid.Col span={6}>
              <Switch
                size='sm'
                name='isDestinationCustoms'
                labelPosition='left'
                label='Destination Customs ?'
                mt={'md'}
                mb={'md'}
                onChange={(customs) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          destination: {
                            ...prevValues.result[0]?.destination,
                            customs: customs.currentTarget.checked,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                // key={form.key('destination_customs')}
                // {...form.getInputProps('destination_customs')}
                styles={{
                  body: {
                    justifyContent: 'space-between'
                  },
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  },
                  description: {
                    fontSize: isMobile ? '14px' : '14px',
                  }
                }}
                checked={form.values.customs}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Switch
                size='sm'
                name='isInsurance'
                labelPosition='left'
                label='Insurance Covered?'
                description='Insurance covered ( Provided by Pentagon Prime Global )'
                mt={'md'}
                mb={'md'}
                onChange={(customs) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          isInsurance: customs.currentTarget.checked,
                        },
                      ]
                      : [],
                  }));
                }}
                styles={{
                  body: {
                    justifyContent: 'space-between'
                  },
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  },
                  description: {
                    fontSize: isMobile ? '14px' : '14px',
                  }
                }}
                checked={form.values.isInsurance}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Radio.Group
                onChange={(isDangerous) => {
                  // console.log("isDangerous : ", isDangerous)
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          cargo: {
                            ...prevValues.result[0]?.cargo,
                            isDangerous: isDangerous == 'd' ? true : false,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
                label="Unit of Volume"
                withAsterisk
                color={COLORS.primaryColor}
                mb="lg"
              >
                <Group mt={"md"} justify="space-around">
                  <Radio value="nd" label="Non-Hazardous" />
                  <Radio value="d" label="Hazardous" />
                </Group>
              </Radio.Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                fullWidth
                onClick={open}
                leftSection={<IconPlus />}
              >
                Add Cargo Details {form?.values?.result?.[0]?.container_details
                  ? `(${form?.values?.result?.[0]?.container_details?.type} - ${form?.values?.result?.[0]?.container_details?.list?.length ||
                  form?.values?.result?.[0]?.container_details?.containerCount
                  })`
                  : ''}
              </Button>
            </Grid.Col>
            {
              form?.values?.result?.[0]?.cargo?.isDangerous ? (
                <>
                  <Grid.Col span={6}>
                    <Select
                      withAsterisk
                      label="IMO class"
                      placeholder="Sales IMO class"
                      size={isMobile ? "md" : "lg"}
                      withScrollArea={false}
                      data={imoClass || []}
                      searchable
                      clearable
                      comboboxProps={{ shadow: 'md' }}
                      // key={form.key('imo')}
                      // {...form.getInputProps('imo')}
                      onChange={(imo) => {
                        form.setValues((prevValues) => ({
                          ...prevValues,
                          result: prevValues.result
                            ? [
                              {
                                ...prevValues.result[0],
                                imo: imo
                              },
                            ]
                            : [],
                        }));
                      }}
                      styles={{
                        dropdown: { maxHeight: 200, overflowY: 'auto' },
                        option: {
                          fontSize: isMobile ? '14px' : '16px',
                        },
                        input: {
                          fontSize: isMobile ? '14px' : '16px',
                        },
                        label: {
                          fontSize: isMobile ? '14px' : '16px',
                        },
                        error: {
                          fontSize: isMobile ? '12px' : '14px',
                        }
                      }}
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      value={form?.values?.unNo}
                      size={isMobile ? "md" : "lg"}
                      label='UN No'
                      placeholder="Enter UN No"
                      radius="md"
                      onChange={(unNo) => {
                        form.setValues((prevValues) => ({
                          ...prevValues,
                          result: prevValues.result
                            ? [
                              {
                                ...prevValues.result[0],
                                unNo: unNo?.target?.value
                              },
                            ]
                            : [],
                        }));
                      }}
                      styles={{
                        input: {
                          fontSize: isMobile ? '14px' : '16px',
                        },
                        label: {
                          fontSize: isMobile ? '14px' : '16px',
                        },
                        error: {
                          fontSize: isMobile ? '12px' : '14px',
                        }
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <FileButton
                      name='msds'
                      accept='image/png,image/jpeg,application/pdf'
                      onChange={handleFileUpload('msds')}
                      multiple
                    >
                      {props => (
                        <Button
                          fullWidth
                          variant='outline'
                          loading={fileUpload?.isLoading}
                          leftSection={<IconUpload stroke={1.5} />}
                          {...props}
                        >
                          Upload MSDS
                        </Button>
                      )}
                    </FileButton>
                  </Grid.Col>

                </>) : (
                <>
                  <Grid.Col>
                    <FileButton
                      name='docs'
                      accept='image/png,image/jpeg,application/pdf'
                      onChange={handleFileUpload('docs')}
                      multiple
                    >
                      {props => (
                        <Button
                          fullWidth
                          variant='outline'
                          loading={fileUpload?.isLoading}
                          leftSection={<IconFiles stroke={1.5} />}
                          {...props}
                        >
                          Upload Relevant Documents
                        </Button>
                      )}
                    </FileButton>
                  </Grid.Col>
                </>
              )
            }
            <ErrorBoundary
              fallback={
                <Alert
                  my={'sm'}
                  variant='light'
                  color='red'
                  title={'Something went wrong!'}
                />
              }
            >
              <ListAttachments data={form?.values?.result?.[0]?.documents} />
            </ErrorBoundary>
            <Grid.Col>
              <Textarea
                // size={36}
                label="Remarks"
                // h={100}
                radius="md"
                // minRows={isMobile ? 3 : 10}
                {...form.getInputProps('unNo')}
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                    height: 100
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  }
                }}
                // onChange={(v) => {
                //   setportList((st) => ({
                //     ...st,
                //     remarks: v?.target?.value,
                //   }));
                //   if (form.getValues()?.cargo?.remarks) {
                //     form.setFieldValue('cargo.remarks', v?.target?.value);
                //   }
                // }}
                onChange={(remarks) => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          cargo: {
                            ...prevValues.result[0]?.cargo,
                            remarks: remarks.target.value,
                          },
                        },
                      ]
                      : [],
                  }));
                }}
              />

            </Grid.Col>
            <Grid.Col span={12}>
              <Flex justify={'flex-end'} w={'100%'} align={'center'} gap={'md'}>
                <Button size="sm" variant="outline" color="red" radius={'8px'}>
                  Cancel
                </Button>
                <Button t={30}
                  // size='lg'
                  fw={600}
                  radius={'8px'}
                  styles={{
                    label: {
                      fontSize: '16px',

                    },
                  }}
                  bg={'##CDF6FF'}
                  c={COLORS.primaryColor}
                  type='submit'
                >
                  Submit
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>


        <Modal opened={opened}
          onClose={close} size="70%" title={<CustomTitle />} centered
        // onClose={handleClose}
        >
          <Grid gutter="sm">
            <Grid.Col span={6}>
              <Select
                withAsterisk
                size={isMobile ? "md" : "lg"}
                placeholder="Choose cargo type"
                required
                onChange={(v) => {
                  setActiveType(v)
                }}
                searchable
                label="Cargo Type"
                value={activeType}
                data={options || []}
                radius="md"
                styles={{
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: { fontSize: isMobile ? '14px' : '16px' },
                  input: { fontSize: isMobile ? '14px' : '16px' },
                  label: { fontSize: isMobile ? '14px' : '16px' },
                  error: { fontSize: isMobile ? '12px' : '14px' }
                }}
              />
            </Grid.Col>

            <Grid.Col span={isMobile ? 12 : 6}>
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Commodity"
                size={isMobile ? "md" : "lg"}
                label="Commodity"
                // onChange={(commodity) => {
                //   form.setValues((prevValues) => ({
                //     ...prevValues,
                //     result: prevValues.result
                //       ? [
                //         {
                //           ...prevValues.result[0],
                //           container_details: {
                //             ...prevValues.result[0]?.container_details,
                //             commodity: commodity.target.value,
                //           },
                //         },
                //       ]
                //       : [],
                //   }));
                // }}
                withAsterisk
                styles={{
                  input: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  label: {
                    fontSize: isMobile ? '14px' : '16px',
                  },
                  error: {
                    fontSize: isMobile ? '12px' : '14px',
                  }
                }}
                radius="md"
                value={containerList.commodity}
                onChange={(e) => {
                  setContainerList((st) => ({ ...st, commodity: e.target.value }))
                }
                }
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                withAsterisk
                label="HS Code Category"
                placeholder="Select HS Code Category"
                size={isMobile ? "md" : "lg"}
                withScrollArea={false}
                data={CodeCategory?.data || []}
                searchable
                clearable
                comboboxProps={{ shadow: 'md' }}
                styles={{
                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                  option: { fontSize: isMobile ? '14px' : '16px' },
                  input: { fontSize: isMobile ? '14px' : '16px' },
                  label: { fontSize: isMobile ? '14px' : '16px' },
                  error: { fontSize: isMobile ? '12px' : '14px' }
                }}
                radius="md"
                // onChange={(value) => setSelectedCategory(value)}
                // onChange={(hsCode) => {
                //   form.setValues((prevValues) => ({
                //     ...prevValues,
                //     result: prevValues.result
                //       ? [
                //         {
                //           ...prevValues.result[0],
                //           container_details: {
                //             ...prevValues.result[0]?.container_details,
                //             hsCode: hsCode,
                //           },
                //         },
                //       ]
                //       : [],
                //   }));
                // }}
                value={containerList.hs1}
                onChange={(v, opt) => {
                  setContainerList((st) => ({
                    ...st,
                    hsCode: opt?.label,
                    hs1: v,
                  }));
                }}
              />
            </Grid.Col>

            {containerList.hs1 && HsCodeQuery.data?.length ? (
              <Grid.Col span={6}>
                <Select
                  withAsterisk
                  label="HS Code"
                  size={isMobile ? "md" : "lg"}
                  withScrollArea={false}
                  data={HsCodeQuery?.data || []}
                  placeholder="Select HS Code"
                  // disabled={!selectedCategory}
                  styles={{
                    dropdown: { maxHeight: 200, overflowY: 'auto' },
                    option: { fontSize: isMobile ? '14px' : '16px' },
                    input: { fontSize: isMobile ? '14px' : '16px' },
                    label: { fontSize: isMobile ? '14px' : '16px' },
                    error: { fontSize: isMobile ? '12px' : '14px' }
                  }}
                  radius="md"
                  value={containerList.hs2}
                  onChange={(v, opt) =>
                    setContainerList((st) => ({
                      ...st,
                      hsCode2: opt?.label,
                      hs2: v,
                    }))
                  }
                />
              </Grid.Col>
            ) : null}

            <ScrollArea mah={250} mih={0} type="always" w="100%">
              <Grid.Col span={12}>

                <Flex justify="space-between" align="center" mb="xs">
                  <Text size="sm" fw={500}>
                    Containers
                  </Text>

                  {selectedSize.length - 1 < contSize.length && (
                    <Button
                      size="sm"
                      variant="subtle"
                      onClick={addNewContainer}
                      leftSection={<IconPlus size={16} />}
                    >
                      Add Container
                    </Button>
                  )}
                </Flex>

                {containerList?.list?.map((item, i) => {
                  if (!item) return null;
                  return (
                    <Grid key={i} w="100%" p="xs">
                      <Grid.Col span={3}>
                        <Select
                          label="Container Size"
                          w="auto"
                          data={contSize}
                          value={item.size}
                          onChange={(v) => handleSizeChange(i, v)}
                          required
                          styles={{
                            dropdown: { maxHeight: 200, overflowY: 'auto' },
                            option: { fontSize: isMobile ? '14px' : '16px' },
                            input: { fontSize: isMobile ? '14px' : '16px' },
                            label: { fontSize: isMobile ? '14px' : '16px' },
                            error: { fontSize: isMobile ? '12px' : '14px' }
                          }}
                          radius="md"
                          size={isMobile ? "md" : "sm"}
                        />
                      </Grid.Col>

                      {item?.fields?.map((field, j, arr) => {
                        const inputSize = arr.length > 2 ? 'auto' : 'auto';

                        if (field.type === types.DROPDOWN) {
                          return (
                            <Grid.Col span={3} key={j}>
                              <Select
                                w={inputSize}
                                label={field.label}
                                value={field.value}
                                onChange={handleFields(i, j)}
                                {...(field.options || {})}
                                styles={{
                                  dropdown: { maxHeight: 200, overflowY: 'auto' },
                                  option: { fontSize: isMobile ? '14px' : '16px' },
                                  input: { fontSize: isMobile ? '14px' : '16px' },
                                  label: { fontSize: isMobile ? '14px' : '16px' },
                                  error: { fontSize: isMobile ? '12px' : '14px' }
                                }}
                                radius="md"
                                size={isMobile ? "md" : "sm"}
                              />
                            </Grid.Col>
                          );
                        }

                        if (field.type === types.NUMBER) {
                          return (
                            <Grid.Col span={3} key={j}>
                              <NumberInput
                                w={inputSize}
                                hideControls
                                label={field.label}
                                value={field.value}
                                onChange={handleFields(i, j)}
                                {...(field.options || {})}
                                styles={{
                                  option: { fontSize: isMobile ? '14px' : '16px' },
                                  input: { fontSize: isMobile ? '14px' : '16px' },
                                  label: { fontSize: isMobile ? '14px' : '16px' },
                                  error: { fontSize: isMobile ? '12px' : '14px' }
                                }}
                                radius="md"
                                size={isMobile ? "md" : "sm"}
                              />
                            </Grid.Col>
                          );
                        }

                        if (field.type === types.CHECKBOX) {
                          return (
                            <Grid.Col span={2} key={j} mt={44}>
                              <Flex h="100%" alignItems="center">
                                <Checkbox
                                  size="sm"
                                  label={field.label}
                                  checked={field.checked}
                                  onChange={handleFields(i, j)}
                                />
                              </Flex>
                            </Grid.Col>
                          );
                        }

                        if (field.type === types.OPTIONS) {
                          return (
                            <Grid.Col span={3} key={j}>
                              <Radio.Group
                                onChange={(value) => handleFields(i, j, value)}
                                label="Unit of Volume"
                                color={COLORS.primaryColor}
                              >
                                <Group justify="space-between" p="sm">
                                  {field.options?.map((option) => (
                                    <Radio value={option.value} label={option.label} key={option.value} />
                                  ))}
                                </Group>
                              </Radio.Group>
                            </Grid.Col>
                          );
                        }
                      })}

                      <Grid.Col span={1}>
                        <Flex align="center" mt={40}>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => removeContainer(i)}
                          >
                            <IconTrash stroke={1.5} size={30} />
                          </ActionIcon>
                        </Flex>
                      </Grid.Col>
                    </Grid>
                  );
                })}

              </Grid.Col>
            </ScrollArea>

            <Grid.Col span={12}>
              <Button
                rightSection={<IconArrowRight size={18} />}
                radius="md"
                size="sm"
                // mt="md"
                // styles={{
                //   root: {
                //     backgroundColor: '#2d8a92',
                //     '&:hover': {
                //       backgroundColor: '#246e73',
                //     },
                //   },
                // }}
                onClick={() => {
                  form.setValues((prevValues) => ({
                    ...prevValues,
                    result: prevValues.result
                      ? [
                        {
                          ...prevValues.result[0],
                          container_details: {
                            ...prevValues.result[0]?.container_details,
                            ...containerList,
                          },
                        },
                      ]
                      : [],
                  }));
                  close();
                }}
              >
                Add
              </Button>
            </Grid.Col>
          </Grid>
        </Modal>
      </form>
    </>
  );
};

export default CustomerRequestForm;