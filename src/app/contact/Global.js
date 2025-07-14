'use client'

import {
  Box,
  Card,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconPhoneCall, IconPinnedFilled } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';

const Global = () => {
  const [locationData, setLocationData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'location',
          order: 'sys.createdAt',
        });
        setLocationData(res.items);
        // Set the first location as selected by default
        if (res.items.length > 0) {
          setSelectedPlace(res.items[0].fields.place);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };
    fetchData();
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const places = [
    { name: 'USA', x: '21%', y: '48%' },
    { name: 'Kenya', x: '62%', y: '62.5%' },
    { name: 'Dubai', x: '66%', y: '51%' },
    { name: 'New Delhi', x: '73.5%', y: '50%' },
    { name: 'Pune', x: '73%', y: '54%' },
    { name: 'Bangalore', x: '73.5%', y: '57%' },
    { name: 'Chennai', x: '75%', y: '57%' },
    { name: 'Vietnam', x: '83.5%', y: '57%' },
    { name: 'China', x: '85.5%', y: '51%' },
  ];

  const handlePlaceSelect = (placeName) => {
    setSelectedPlace(placeName);
  };

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Center tt={'uppercase'}>
        <Title size={isMobile ? 'lg' : 'xl'} fw={800} lh={'lgx2'}>
          Our <span style={{ color: COLORS.serviceColor }}> Global</span> Presence
        </Title>
      </Center>
      <Box pos="relative" w="100%" mx="auto">
        <Image
          src="/images/worldMap.png"
          alt="World Map"
          style={{ width: '100%', height: 'auto' }}
        />

        {/* Markers */}
        {places.map((place, idx) => (
          <Tooltip 
            key={idx} 
            label={place.name} 
            arrowSize={8} 
            bg={'white'} 
            c={COLORS.serviceColor} 
            fz={20} 
            fw={600} 
            withArrow
            events={{ hover: true, focus: true, touch: true }}
          >
            <Box
              onClick={() => handlePlaceSelect(place.name)}
              style={{
                position: 'absolute',
                left: place.x,
                top: place.y,
                transform: 'translate(-50%, -100%)',
                cursor: 'pointer',
              }}
            >
              <IconPinnedFilled 
                size={24}                                    
                stroke={1.5}                                
                color={selectedPlace === place.name ? COLORS.serviceColor : "#e84c4c"}                                  
              />
            </Box>
          </Tooltip>
        ))}
      </Box>
      <Grid columns={12} align={'center'} justify="center">
        {isMobile ? (
          <Carousel 
            mt={40} 
            align={'start'} 
            slideSize="80%" 
            height={'auto'} 
            w={'100%'} 
            slideGap="xs" 
            loop
            initialSlide={selectedPlace ? 
              locationData.findIndex(item => item.fields.place === selectedPlace) : 0}
            onSlideChange={(index) => {
              if (locationData[index]) {
                setSelectedPlace(locationData[index].fields.place);
              }
            }}
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
                <Card 
                  mih={'200px'} 
                  bg={selectedPlace === item.fields.place ? COLORS.serviceColor : '#F2F7FC'} 
                  radius={'32px'} 
                  p={30}
                  onClick={() => setSelectedPlace(item.fields.place)}
                  style={{
                    border: selectedPlace === item.fields.place ? `2px solid ${COLORS.serviceColor}` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Title 
                    size={'md'} 
                    fw={700} 
                    order={5}
                    c={selectedPlace === item.fields.place ? 'white' : 'inherit'}
                  >
                    {item?.fields?.place}
                  </Title>
                  <Text 
                    size='smx' 
                    mih={'100px'} 
                    c={selectedPlace === item.fields.place ? 'white' : COLORS.textColor} 
                    mt={20}
                  >
                    {item?.fields?.address}
                  </Text>
                  <Group align="center" gap={5}>
                    <IconPhoneCall 
                      size={14} 
                      color={selectedPlace === item.fields.place ? 'white' : COLORS.serviceColor} 
                    />
                    <Text 
                      size='smx'
                      c={selectedPlace === item.fields.place ? 'white' : 'inherit'}
                    >
                      {item?.fields?.number}
                    </Text>
                  </Group>
                </Card>
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          locationData.map((item) => (
            <GridCol key={item.sys.id} span={3}>
              <Card 
                mih={'200px'} 
                bg={selectedPlace === item.fields.place ? COLORS.serviceColor : '#F2F7FC'} 
                radius={'32px'} 
                p={30}
                onClick={() => setSelectedPlace(item.fields.place)}
                style={{
                  border: selectedPlace === item.fields.place ? `2px solid ${COLORS.serviceColor}` : 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Title 
                  size={'md'} 
                  fw={700} 
                  order={5}
                  c={selectedPlace === item.fields.place ? 'white' : 'inherit'}
                >
                  {item?.fields?.place}
                </Title>
                <Text 
                  size='smx' 
                  mih={'100px'} 
                  c={selectedPlace === item.fields.place ? 'white' : COLORS.textColor} 
                  mt={20}
                >
                  {item?.fields?.address}
                </Text>
                <Group align="center" gap={5}>
                  <IconPhoneCall 
                    size={14} 
                    color={selectedPlace === item.fields.place ? 'white' : COLORS.serviceColor} 
                  />
                  <Text 
                    size='smx'
                    c={selectedPlace === item.fields.place ? 'white' : 'inherit'}
                  >
                    {item?.fields?.number}
                  </Text>
                </Group>
              </Card>
            </GridCol>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Global;