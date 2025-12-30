"use client";
import { ActionIcon, Autocomplete, Button, Center, Divider, Flex, Group, Modal, SegmentedControl, Stack, TextInput } from '@mantine/core';
import { IconArrowsDownUp, IconArrowsLeftRight, IconBox, IconMail, IconMapPin, IconPlane, IconSquareHalf } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../utils/COLORS';
import { TYPOGRAPHY } from '../utils/TYPOGRAPHY';
import { sendEnquiryEmail } from '../../../lib/sendEmail';
import { validation } from '../utils/validateInput';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import useTransportStore from '../store/transportStore';

const PortComponent = ({ transportData, modalOpened, setModalOpened, formHook, transport }) => {

  const { airData } = useTransportStore();

  const selectData = formHook?.values?.typeOfBooking === 'AIR' ? airData : transportData

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})

  const isMobile = useMediaQuery('(max-width: 768px)');
  const Icon = isMobile ? IconArrowsDownUp : IconArrowsLeftRight

  const notificationShownRef = useRef(false);
  const [isOriginDestinationSelected, setIsOriginDestinationSelected] = useState(false);

  useEffect(() => {
    if(formHook.values.destination && formHook.values.origin){
      setIsOriginDestinationSelected(true);
    }
  },[formHook.values.origin, formHook.values.destination])

  useEffect(() => {
    if (isOriginDestinationSelected) {
      notificationShownRef.current = true;
      notifications.show({
        title: 'Error',
        message: 'Origin and destination cannot be the same',
        color: 'red',
      });

      formHook.reset();

      setTimeout(() => {
        notificationShownRef.current = false;
      }, 1000);
    }
  }, [isOriginDestinationSelected]);

  useEffect(() => {
    if (transport === 'sea' && formHook?.values?.typeOfBooking === 'AIR') {
      formHook.setValues({
        ...formHook.values,
        origin: '',
        destination: '',
      });
    }
  }, [formHook?.values?.typeOfBooking, transport])


  const handleSubmit = async () => {
    setLoading(true);
    const fieldsToValidate = [
      { name: 'origin', label: 'Origin', required: true },
      { name: 'destination', label: 'Destination', required: true },
      { name: 'typeOfBooking', label: 'Type of Booking', required: true },
      { name: 'name', label: 'Name', required: true, validate: 'text', type: 'text' },
      { name: 'contact_number', label: 'Contact Number', required: true, validate: 'phone', type: 'phone' },
      { name: 'email', label: 'Email', required: true, validate: 'email', type: 'email' },
    ];
    const hasErrors = validation(formHook.values, fieldsToValidate, setErrors);

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      await sendEnquiryEmail(formHook.values);
      notifications.show({
        title: 'Success',
        message: 'Enquiry sent successfully',
        color: 'green',
        autoClose: 5000,
      })
      formHook.reset();
      setModalOpened(false);
      setErrors({});
    } catch (error) {
      console.log('Error sending email:', error);
    }

    setLoading(false);
  };


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
    formHook.setValues((prevValues) => ({
      ...prevValues,
      origin: prevValues.destination,
      destination: prevValues.origin,
    }));
  };

  return (
    <Modal padding={isMobile ? '20px' : '42px'} radius={'lg'} opened={modalOpened} centered onClose={() => {
      setModalOpened(false)
      setErrors({})
    }} title="You are just one step away!" size="xl" styles={{
      paddingBottom: '10px'
    }}>
      <Flex direction={isMobile ? 'column' : 'row'} justify='space-between' align='center'>
        <Autocomplete
          color={COLORS.secondaryColor}
          placeholder="Select Origin"
          size={isMobile ? "md" : "lg"}
          w={isMobile ? '100%' : '300px'}
          limit={5}
          // label="Origin"
          data={selectData}
          fw={500}
          styles={{
            input: {
              fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
            },
            option: {
              fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
            },
            label: {
              fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
            }
          }}
          radius="md"
          leftSection={<IconMapPin size={20} color={COLORS.secondaryColor} />}
          {...formHook.getInputProps('origin')}
          error={errors.origin}
        />
        <ActionIcon
          variant="default"
          size={28}
          radius="xl"
          bg={COLORS.secondaryColor}
          style={{ borderColor: COLORS.secondaryColor }}
          onClick={swapOriginDestination}
        >
          <Icon size={18} color={COLORS.primaryColor} />
        </ActionIcon>

        <Autocomplete
          color={COLORS.secondaryColor}
          placeholder="Select Destination"
          size={isMobile ? "md" : "lg"}
          // label="Destination"
          data={selectData}
          limit={5}
          w={isMobile ? '100%' : '300px'}
          fw={500}
          styles={{
            input: {
              fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
            },
            option: {
              fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
            },
            label: {
              fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
            }
          }}
          radius="md"
          leftSection={<IconMapPin size={20} color={COLORS.secondaryColor} />}
          {...formHook.getInputProps('destination')}
          error={errors.destination}
        />
      </Flex>
      <form onSubmit={formHook.onSubmit(handleSubmit)}>
        <Stack
          mt={'lg'}
          style={{
            border: `1px solid #ccc`,
            padding: isMobile ? '10px' : '20px',
            borderRadius: '12px'
          }}
        >
          <SegmentedControl
            name="typeOfBooking"
            onChange={(val) => {
              formHook.setFieldValue('typeOfBooking', val);
            }}
            fullWidth
            size={isMobile ? TYPOGRAPHY.button.small : TYPOGRAPHY.button.normal}
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

          <Flex mt={'sm'} direction={'column'} >
            <Flex w={'100%'} direction={isMobile ? 'column' : 'row'} align='center' gap={isMobile ? '10' : '30'} justify='space-between'>
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Full Name"
                size={isMobile ? "md" : "lg"}
                w={isMobile ? '100%' : '50%'}
                label="Name"
                withAsterisk
                styles={{
                  input: {
                    fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
                  },
                  label: {
                    fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
                  },
                  error: {
                    fontSize: isMobile ? TYPOGRAPHY.body.xsmall : TYPOGRAPHY.body.small,
                  }
                }}
                radius="md"
                {...formHook.getInputProps('name')}
                error={errors.name}
              />
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Mobile Number"
                size={isMobile ? "md" : "lg"}
                withAsterisk
                w={isMobile ? '100%' : '50%'}
                label="Mobile Number"
                radius="md"
                styles={{
                  input: {
                    fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
                  },
                  label: {
                    fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
                  },
                  error: {
                    fontSize: isMobile ? TYPOGRAPHY.body.xsmall : TYPOGRAPHY.body.small,

                  }
                }}
                {...formHook.getInputProps('contact_number')}
                error={errors.contact_number}
              />
            </Flex>
            <TextInput
              color={COLORS.portColor}
              placeholder="Enter Email Address"
              size={isMobile ? "md" : "lg"}
              withAsterisk
              label="Email"
              radius="md"
              styles={{
                input: {
                  fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
                },
                label: {
                  fontSize: isMobile ? TYPOGRAPHY.body.small : TYPOGRAPHY.body.normal,
                },
                error: {
                  fontSize: isMobile ? TYPOGRAPHY.body.xsmall : TYPOGRAPHY.body.small,
                }
              }}
              {...formHook.getInputProps('email')}
              error={errors.email}
            />
          </Flex>

        </Stack>

        <Button
          loading={loading}
          size='lg'
          type='submit'
          fs={'sm'}
          mt={'xl'}
          fullWidth
          radius={'md'}
          styles={{
            label: {
              fontSize: TYPOGRAPHY.button.large,
            },
          }}
          color={COLORS.serviceColor}
          leftSection={<IconMail stroke={1.5} size={20} />} >
          Get Quote
        </Button>
      </form>

    </Modal>
  );
};

export default PortComponent;
