'use client'
import {
  Box,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  List,
  ListItem,
  Title,
} from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import { theme } from '../utils/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PortComponent from '../component/PortComponent';
import { apiCallProtected } from '../api/api';

const ACinfo = () => {

  const isMobile = useMediaQuery('(max-width:768px)')
  const [modalOpened, setModalOpened] = useState(false);
  const [activeTransport, setActiveTransport] = useState('sea');
  const [transportData, setTransportData] = useState([]);

  const { data } = useQuery({
    queryKey: [`${activeTransport}PortData`],
    queryFn: async () => {
      const response = await apiCallProtected.get(`pentagon/${activeTransport}PortData`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    select: (data) =>
      data?.data?.map((item) => ({
        label: item.name,
        value: String(item.id),
      })) || [],
  });

  console.log(data);




  // Memoize the transport data to avoid unnecessary re-renders
  const memoizedTransportData = useMemo(() => data || [], [data]);

  useEffect(() => {
    if (data && transportData !== data) {
      setTransportData(data);
    }
  }, [data]);



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

  return (
    <Box bg={'#E9EEF4'}>
      <Container fluid px={'7%'} pt={'70px'}>
        <Grid columns={12}>
          <GridCol span={isMobile ? 12 : 6}>
            <Group>
              <Title size={isMobile ? 'lg' : 'lgx'} fw={800} lh={'lgx2'} tt={'uppercase'} textWrap="balance">
                Additional Contact Information
              </Title>
              <List c={COLORS.textColor} p={isMobile ? '10px 20px' : '20px 50px'} style={{
                lineHeight: theme.lineHeights.lgx2,
                fontSize: theme.fontSizes.sm
              }}>
                <ListItem>
                  For media inquiries please email{' '}
                  <span
                    onClick={() => window.open('mailto:pentagon@pentagonindia.net')}
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    press@pentagonprime.com
                  </span>
                </ListItem>
                <ListItem>
                  Interested in becoming a partner?{' '}
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => setModalOpened(true)}
                  >

                    Submit an enquiry.
                  </span>
                </ListItem>
                <ListItem>
                  Have a security issue?{' '}
                  <span
                    onClick={() => window.open('mailto:pentagon@pentagonindia.net')}
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Tell us about it here.
                  </span>
                </ListItem>
              </List>
            </Group>
          </GridCol>
          <GridCol span={isMobile ? 12 : 6}>
            <Image src={Images.contact} alt="contact" />
          </GridCol>
        </Grid>
      </Container>

      <PortComponent
        transportData={memoizedTransportData}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        formHook={formHook}
      />
    </Box>
  );
};

export default ACinfo;
