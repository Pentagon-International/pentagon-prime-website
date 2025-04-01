'use client';
import { useEffect, useState, useMemo, memo, useCallback, useRef } from 'react';
import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import {
  ActionIcon,
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowNarrowRight,
  IconArrowsDownUp,
  IconArrowsLeftRight,
  IconMapPin,
  IconPlaneInflight,
  IconShip,
} from '@tabler/icons-react';
import { highlightText } from '../utils/highlightText';
import { useQuery } from '@tanstack/react-query';
import { apiCallProtected } from '../api/api';
import { useForm } from '@mantine/form';
import PortComponent from '../component/PortComponent';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import useTransportStore from '../store/transportStore';


// Memoized TransportOption component to prevent re-renders
const TransportOption = memo(({ type, icon, activeTransport, onClick }) => (
  <Group
    style={type === activeTransport ? styles.groupstyle : { cursor: 'pointer' }}
    onClick={() => onClick(type)}
    gap={10}
  >
    {icon}
    <Text size="sm" lh="xs" fw={500}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Text>
  </Group>
));

const Hero = ({ title, content }) => {
  const [activeTransport, setActiveTransport] = useState('sea');
  const [transportData, setTransportData] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const Icon = isMobile ? IconArrowsDownUp : IconArrowsLeftRight

  const formHook = useForm({
    initialValues: {
      origin: '',
      destination: '',
      name: '',
      contact_number: '',
      email: '',
      typeOfBooking: 'FCL',
    },
  });

  const { seaData, airData, setSeaData, setAirData } = useTransportStore();

  const { data: seaPortData } = useQuery({
    queryKey: [`seaPortData`],
    queryFn: async () => {
      const response = await apiCallProtected.get(`pentagon/seaPortData`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    select: (data) =>
      data?.data?.map((item) => ({
        label: item.name,
        value: String(item.id),
      })) || [],
  });

  const { data: airPortData } = useQuery({
    queryKey: [`airPortData`],
    queryFn: async () => {
      const response = await apiCallProtected.get(`pentagon/airPortData`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    select: (data) =>
      data?.data?.map((item) => ({
        label: item.name,
        value: String(item.id),
      })) || [],
  });

  // Memoize transport data based on active transport
  const memoizedTransportData = useMemo(() => {
    return activeTransport === 'sea' ? seaData : airData;
  }, [activeTransport, seaData, airData]);


  const notificationShownRef = useRef(false);

  useEffect(() => {
    if (
      formHook.values.origin &&
      formHook.values.destination &&
      formHook.values.origin === formHook.values.destination &&
      !notificationShownRef.current
    ) {
      notifications.show({
        title: 'Error',
        message: 'Origin and destination cannot be the same',
        color: 'red',
      });

      notificationShownRef.current = true;
      formHook.reset();

      setTimeout(() => {
        notificationShownRef.current = false;
      }, 1000);
    }
  }, [formHook.values.origin, formHook.values.destination]);


  useEffect(() => {
    if (seaPortData) setSeaData(seaPortData || [])
    if (airPortData) setAirData(airPortData || [])
  }, [seaPortData, airPortData])

  // Optimized swap function
  const swapOriginDestination = useCallback(() => {
    formHook.setValues((prevValues) => ({
      ...prevValues,
      origin: prevValues.destination,
      destination: prevValues.origin,
    }));
  }, []);

  const isFormValid = formHook.values.origin && formHook.values.destination;

  return (
    <Box style={styles.heroContainer}>
      <Container fluid px={'7%'} mt={80} py="60px" style={{ height: '100vh', margin: '0 auto' }}>
        {
          !isMobile && (
            <Box style={styles.overlayContainer}>
              <Image src={Images.pentagon_freight} style={{ ...styles.overlayImage, width: '60%' }} h={!isMobile && 745}/>
            </Box>
          )
        }
        <Stack h={'100%'} gap={0} justify="flex-start">
          <Title
            c={COLORS.primaryColor}
            style={{ zIndex: 100 }}
            fw={900}
            order={1}
            lh={isMobile ? 'md' : 'xl'}
            tt="uppercase"
            size={isMobile ? '32px' : '48px'}
          >
            {highlightText(title)}
          </Title>
          <Text lh={ isMobile ? "md" : "lgx"} size={isMobile ? '15px' : '19px'} maw={isMobile ? '80%' : '40%'} fw={400} mt={15}>
            {highlightText(content)}
          </Text>
          <Box h={'100%'}>
            <Stack mt={isMobile ? '15%' : '4.25%'} gap={0} w={isMobile ? '100%' : '45%'}
              p={isMobile ? 20 : 25}
              style={styles.transportOptions} >
              <Flex gap={20} >
                <TransportOption
                  type="sea"
                  icon={<IconShip size={20} color={COLORS.primaryColor} />}
                  activeTransport={activeTransport}
                  onClick={setActiveTransport}
                />
                <TransportOption
                  type="air"
                  icon={<IconPlaneInflight size={20} color={COLORS.primaryColor} />}
                  activeTransport={activeTransport}
                  onClick={setActiveTransport}
                />
              </Flex>
              <Flex direction="column">
                <form>
                  <Flex direction={isMobile ? 'column' : 'row'} w={'100%'} align='center' gap={isMobile ? 0 : '30'} justify='space-between'>
                    <Autocomplete
                      placeholder="Select Origin"
                      size="lg"
                      w={isMobile ? '100%' : '45%'}
                      limit={5}
                      data={memoizedTransportData}
                      className='custom-placeholder'
                      radius="md"
                      styles={{
                        input: {
                          fontSize: '18px',
                          backgroundColor: '#ffffff45',
                          color: '#fff',
                          "::placeholder": {
                            color: "#fff",
                            opacity: 1,
                          },
                        },
                        option: {
                          fontSize: '16px',
                          color: '#000'
                        },
                        dropdown: {
                          color: '#fff',
                        },
                        label: {
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#fff',
                        },
                      }}
                      classNames={{
                        input: 'autocomplete-input',
                      }}
                      autoComplete="off"
                      leftSection={<IconMapPin size={20} color={COLORS.primaryColor} />}
                      {...formHook.getInputProps('origin')}
                    />
                    <ActionIcon
                      variant="default"
                      size={32}
                      radius="xl"
                      bg={COLORS.secondaryColor}
                      style={{ borderColor: COLORS.secondaryColor }}
                      onClick={swapOriginDestination}
                      styles={{
                        root: {
                          alignItems: isMobile ? 'center' : 'flex-end'
                        }
                      }}
                    >
                      <Icon size={20} color={COLORS.primaryColor} />
                    </ActionIcon>

                    <Autocomplete
                      placeholder="Select Destination"
                      size="lg"
                      limit={5}
                      data={memoizedTransportData}
                      radius="md"
                      w={isMobile ? '100%' : '45%'}
                      styles={{
                        input: {
                          fontSize: '18px',
                          backgroundColor: '#ffffff45',
                          color: '#fff'
                        },
                        item: {
                          fontSize: '18px',
                        },
                        option: {
                          fontSize: '16px',
                          color: '#000'
                        },
                        dropdown: {
                          color: '#fff',
                        },
                        label: {
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#fff',
                        },
                      }}
                      classNames={{
                        input: 'autocomplete-input',
                      }}
                      autoComplete="off"
                      leftSection={<IconMapPin size={20} color={COLORS.primaryColor} />}
                      {...formHook.getInputProps('destination')}
                    />
                  </Flex>
                  <Button
                    fullWidth
                    mt={30}
                    size='lg'
                    fw={600}
                    // disabled={!isFormValid}
                    styles={{
                      label: {
                        fontSize: '16px',

                      },
                    }}
                    bg={'##CDF6FF'}
                    c={COLORS.primaryColor}
                    onClick={() => isFormValid && setModalOpened(true)}
                  >
                    Get Quote
                  </Button>
                </form>
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* Port Modal Component */}
      <PortComponent
        transportData={memoizedTransportData}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        formHook={formHook}
        transport={activeTransport}
      />
    </Box>
  );
};

export default Hero;

const styles = {
  heroContainer: {
    backgroundImage: `url(${Images.hero})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    minHeight: '100vh',
    position: 'relative',
    overflowY: 'hidden',
    top: 0,
    left: 0,
  },
  overlayContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayImage: {
    position: 'absolute',
    top: '-100px',
    left: '75%',
    transform: 'translate(-50% , 10%)',
    width: '45%',
    objectFit: 'contain',
    zIndex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  transportOptions: {
    borderRadius: '24px',
    backgroundColor: `#0000004d`,
    gap: '12px',
  },
  groupstyle: {
    backgroundColor: COLORS.secondaryColor,
    padding: '10px 16px',
    borderRadius: '10px',
  },
};
