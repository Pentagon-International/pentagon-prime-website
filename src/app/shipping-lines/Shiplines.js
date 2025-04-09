import { Container, Title, Text, SimpleGrid, Image, Box, Group } from '@mantine/core';
import React from 'react';

const dummyData = [
  { id: 1, name: 'Shipline 1', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 2, name: 'Shipline 2', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 3, name: 'Shipline 3', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 4, name: 'Shipline 4', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 5, name: 'Shipline 5', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 6, name: 'Shipline 6', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 7, name: 'Shipline 7', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 8, name: 'Shipline 8', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
  { id: 9, name: 'Shipline 9', logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg' },
];

const ShipLines = () => {
  return (
    <Container fluid px="7%" py="70px">
      <Title size="lg" tt="uppercase" ta="center">
        SHIPPING LINES
      </Title>
      <Text mt={10} size="sm" ta="center" c="dimmed">
        Air lines, Track shipment, view rates, get schedules
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

export default ShipLines;
