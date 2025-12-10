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
import useTransportStore from '../store/transportStore';

const ACinfo = () => {

  const isMobile = useMediaQuery('(max-width:768px)')
  const [modalOpened, setModalOpened] = useState(false);

  const { seaData } = useTransportStore();

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
              <Title size={isMobile ? '28px' : '32px'} fw={800} lh={'lgx2'} tt={'uppercase'} textWrap="balance">
                Additional Contact Information
              </Title>
              <List c={COLORS.textColor} p={isMobile ? '10px 20px' : '0px 0px'} style={{
                lineHeight: theme.lineHeights.lgx2,
                fontSize: theme.fontSizes.sm
              }}>
                <ListItem lh={'28px'}>
                  For media inquiries please email{' '}
                  <span
                    onClick={() => window.open('mailto:pentagon@pentagonindia.net')}
                    style={{
                      textDecoration: 'underline', cursor: 'pointer', color: "rgb(0, 33, 95)"
                    }}>
                    press@pentagonprime.com
                  </span>
                </ListItem>
                <ListItem lh={'28px'}>
                  Interested in becoming a partner?{' '}
                  <span style={{
                    textDecoration: 'underline', cursor: 'pointer', color: "rgb(0, 33, 95)"
                  }}
                    onClick={() => setModalOpened(true)}
                  >

                    Submit an enquiry.
                  </span>
                </ListItem>
                <ListItem lh={'28px'}>
                  Have a security issue?{' '}
                  <span
                    onClick={() => window.open('mailto:pentagon@pentagonindia.net')}
                    style={{
                      textDecoration: 'underline', cursor: 'pointer', color: "rgb(0, 33, 95)"
                    }}
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
        transportData={seaData}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        formHook={formHook}
        transport={'sea'}
      />
    </Box>
  );
};

export default ACinfo;
