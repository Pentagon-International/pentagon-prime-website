'use client'
import { Container, Title, Text, SimpleGrid, Image, Box, Group } from '@mantine/core';
import React from 'react';
import { COLORS } from '../utils/COLORS';
import { TYPOGRAPHY } from '../utils/TYPOGRAPHY';
import { useMediaQuery } from '@mantine/hooks';

const dummyData = [
  { id: 1, name: 'Airline 1', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 2, name: 'Airline 2', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 3, name: 'Airline 3', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 4, name: 'Airline 4', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 5, name: 'Airline 5', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 6, name: 'Airline 6', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 7, name: 'Airline 7', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 8, name: 'Airline 8', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
  { id: 9, name: 'Airline 9', logo: 'https://icon2.cleanpng.com/20180330/qhw/avco3de5b.webp' },
];


const Airlines = () => {
  const isMobile = useMediaQuery('(max-width:768px)')
  return (
    <Container fluid px="2%" py="70px">
      {/* <Title size="lg" tt="uppercase" ta="center"> */}
      <Title size={isMobile ? TYPOGRAPHY.h5.desktop : 'lg'} lh={isMobile ? 'md' : 'lgx2'} tt={'uppercase'} fw={800} ta="center">
        AIR LINES
      </Title>
      <Text mt={10} size="sm" ta="center" c={COLORS.textColor}>
        Air lines, Track shipment, View rates, Get schedules
      </Text>

      <SimpleGrid
        mt="80px"
        cols={{ base: 1, sm: 2, md: 3, lg: 3 }}
        spacing={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
      >
        {dummyData.map((item) => (
          <Box
            key={item.id}
            p="md"
            bg="#F2F7FC"
            style={{ borderRadius: 8 }}
          >
            <Group align="center" justify="flex-start">
              <Image
                src={item.logo}
                alt={item.name}
                radius="md"
                fit="contain"
                withPlaceholder
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text size="sm" fw={500}>
                {item.name}
              </Text>
            </Group>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Airlines;
