'use client'
import { Container, Title, Text, SimpleGrid, Image, Box, Group, Grid, Flex } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { apiCallProtected } from '../api/api';
import { COLORS } from '../utils/COLORS';
import { useMediaQuery } from '@mantine/hooks';

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

const ShipTerms = () => {


  const shipmentTermsQuery = useQuery({
    queryKey: ["shipment-types"],
    queryFn: async () => {
      const response = await apiCallProtected.get("/pentagon/incoTerms");
      return response.data;
    },
    select: ({ data }) => {
      return data?.map((item) => ({
        label: item.name,
        logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg'
      }))
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Container fluid px="7%" py="70px">
      <Title size={isMobile ? '22px' : 'lg'} lh={isMobile ? 'md' : 'lgx2'} tt={'uppercase'} fw={800} ta="center">
        {/* <Title size="lg" tt="uppercase" ta="center"> */}
        SHIPPING TERMS
      </Title>
      <Text mt={10} size="sm" ta="center" c={COLORS.textColor}>
        Shipping terms, Track shipment, View rates, Get schedules
      </Text>

      <SimpleGrid
        mt="80px"
        cols={{ base: 1, sm: 2, md: 3, lg: 3 }}
        spacing={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
      >
        {shipmentTermsQuery?.data?.map((item) => (
          <Box
            key={item.id}
            p="md"
            bg="#F2F7FC"
            style={{ borderRadius: 8 }}
          >
            <Grid>
              <Grid.Col span={2}>
                <Image
                  src={item.logo}
                  alt={item.name}
                  radius="md"
                  fit="contain"
                  // withPlaceholder
                  style={{
                    height: 50,
                    width: 50,
                  }}
                />
              </Grid.Col>
              <Grid.Col span={10} >
                <Flex align={'center'} h={'100%'}>
                  <Text tw="balance"
                    c={COLORS.textColor}
                    lh={"sm"}
                    size="sm"
                    style={{ flexGrow: 1 }}>
                    {/* <Text size="xs" fw={500}> */}
                    {item.label}
                  </Text>
                </Flex>
              </Grid.Col>
            </Grid>
          </Box>
        ))}
      </SimpleGrid>
    </Container >
  );
};

export default ShipTerms;
