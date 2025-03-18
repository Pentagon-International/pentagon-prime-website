import { ActionIcon, Autocomplete, Button, Center, Divider, Flex, Group, Modal, SegmentedControl, Stack, TextInput } from '@mantine/core';
import { IconArrowsLeftRight, IconBox, IconMail, IconMapPin, IconPlane, IconSquareHalf } from '@tabler/icons-react';
import React, { useState } from 'react';
import { COLORS } from '../utils/COLORS';
import { sendEnquiryEmail } from '../../../lib/sendEmail';
import { validation } from '../utils/validateInput';
import { notifications } from '@mantine/notifications';

const PortComponent = ({ transportData, modalOpened, setModalOpened, formHook }) => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})

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
    <Modal padding={'42px'} radius={'lg'} opened={modalOpened} centered onClose={() => {
      setModalOpened(false)
      setErrors({})
    }} title="You are just one step away!" size="xl" styles={{
      paddingBottom: '10px'
    }}>
      <Flex justify='space-between' align='center'>
        <Autocomplete
          color={COLORS.secondaryColor}
          placeholder="Select Origin"
          size="lg"
          w={'300px'}
          label="Origin"
          data={transportData}
          fw={500}
          styles={{
            input: {
              fontSize: '16px',
            },
            option: {
              fontSize: '16px',
            },
            label: {
              fontSize: '16px',
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
          mt={'30'}
          bg={COLORS.secondaryColor}
          style={{ borderColor: COLORS.secondaryColor }}
          onClick={swapOriginDestination}
        >
          <IconArrowsLeftRight size={18} color={COLORS.primaryColor} />
        </ActionIcon>

        <Autocomplete
          color={COLORS.secondaryColor}
          placeholder="Select Destination"
          size="lg"
          label="Destination"
          data={transportData}
          w={'300px'}
          fw={500}
          styles={{
            input: {
              fontSize: '16px',
            },
            option: {
              fontSize: '16px',
            },
            label: {
              fontSize: '16px',
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
            padding: '20px',
            borderRadius: '12px'
          }}
        >
          <SegmentedControl
            name="typeOfBooking"
            onChange={(val) => {
              formHook.setFieldValue('typeOfBooking', val);
            }}
            fullWidth
            size="14px"
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
            <Flex w={'100%'} align='center' gap={'30'} justify='space-between'>
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Full Name"
                size="lg"
                w={'50%'}
                label="Name"
                withAsterisk
                styles={{
                  input: {
                    fontSize: '16px',
                  },
                  label: {
                    fontSize: '16px',
                  },
                  error: {
                    fontSize: '14px',
                  }
                }}
                radius="md"
                {...formHook.getInputProps('name')}
                error={errors.name}
              />
              <TextInput
                color={COLORS.portColor}
                placeholder="Enter Mobile Number"
                size="lg"
                withAsterisk
                w={'50%'}
                label="Mobile Number"
                radius="md"
                styles={{
                  input: {
                    fontSize: '16px',
                  },
                  label: {
                    fontSize: '16px',
                  },
                  error: {
                    fontSize: '14px',
                  }
                }}
                {...formHook.getInputProps('contact_number')}
                error={errors.contact_number}
              />
            </Flex>
            <TextInput
              color={COLORS.portColor}
              placeholder="Enter Email Address"
              size="lg"
              withAsterisk
              label="Email"
              radius="md"
              styles={{
                input: {
                  fontSize: '16px',
                },
                label: {
                  fontSize: '16px',
                },
                error: {
                  fontSize: '14px',
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
              fontSize: '16px',
            },
          }}
          color={COLORS.serviceColor}
          leftSection={<IconMail stroke={1.5} size={20} />} >
          Get Quote
        </Button>
      </form>

    </Modal >
  );
};

export default PortComponent;
