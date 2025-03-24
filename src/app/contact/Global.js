'use client'

import {
  Card,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';

const Global = () => {

  const [locationData, setLocationData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'location',
          order: 'sys.createdAt',
        });
        setLocationData(res.items);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };
    fetchData();
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Center tt={'uppercase'}>
        <Title size={isMobile ? 'lg' : 'xl'} fw={800} lh={'lgx2'}>
          Our <span style={{ color: COLORS.serviceColor }}> Global</span> Presence
        </Title>
      </Center>
      <Image src={Images.global} alt="global" />

      <Grid columns={12} align={'center'} justify="center">

        {
          isMobile ? (
            <Carousel mt={40} align={'start'} slideSize="80%" height={'auto'} w={'100%'} slideGap="xs" loop
              styles={{
                controls: {
                  display: 'none',
                  visibility: 'hidden',
                  opacity: 0,
                  pointerEvents: 'none',
                }
              }}
            >
              {locationData.map((item) => (
                <Carousel.Slide key={item.sys.id}>
                  <Card mih={'200px'} bg={'#F2F7FC'} radius={'32px'} p={30}>
                    <Title size={'md'} fw={700} order={5}>{item?.fields?.place}</Title>
                    <Text size='smx' mih={'100px'} c={COLORS.textColor} mt={20}>
                      {item?.fields?.address}
                    </Text>
                    <Group align="center" gap={5}>
                      <IconPhoneCall size={14} color={COLORS.serviceColor} />
                      <Text size='smx'>{item?.fields?.number}</Text>
                    </Group>
                  </Card>
                </Carousel.Slide>
              ))}
            </Carousel>
          )
            :
            locationData.map((item) => (
              <GridCol key={item.sys.id} span={3}>
                <Card mih={'200px'} bg={'#F2F7FC'} radius={'32px'} p={30}>
                  <Title size={'md'} fw={700} order={5}>{item?.fields?.place}</Title>
                  <Text size='smx' mih={'100px'} c={COLORS.textColor} mt={20}>
                    {item?.fields?.address}
                  </Text>
                  <Group align="center" gap={5}>
                    <IconPhoneCall size={14} color={COLORS.serviceColor} />
                    <Text size='smx'>{item?.fields?.number}</Text>
                  </Group>
                </Card>
              </GridCol>
            ))
        }

      </Grid>
    </Container>
  );
};

export default Global;
