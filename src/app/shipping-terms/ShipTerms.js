'use client'
import { Container, Title, Text, SimpleGrid, Image, Box, Group, Grid, Flex, ScrollArea } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { apiCallProtected } from '../api/api';
import { COLORS } from '../utils/COLORS';
import { useMediaQuery } from '@mantine/hooks';

const ShipTerms = () => {
  const shipmentTermsQuery = useQuery({
    queryKey: ["shipment-types"],
    queryFn: async () => {
      const response = await apiCallProtected.get("/pentagon/shippingTerms_data");
      return response.data;
    },
    select: ({ data }) => {
      return data?.map((item) => ({
        label: item.category,
        terms: item.content,
        logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg'
      }))
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log("ShipTerms?.data :: :: :::: ", shipmentTermsQuery?.data);

  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Container fluid px="7%" py="70px">
      <Title size={isMobile ? '22px' : 'lg'} lh={isMobile ? 'md' : 'lgx2'} tt={'uppercase'} fw={800} ta="center">
        SHIPPING TERMS
      </Title>
      <Text mt={10} size="sm" ta="center" c={COLORS.textColor}>
        Shipping terms, Track shipment, View rates, Get schedules
      </Text>

      <SimpleGrid h={2000}
        mt="40px"
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
      >
        {shipmentTermsQuery?.data?.map((group) => (
          <Box
            key={group.label}
            style={{
              borderRadius: 8,
              border: '1px solid #e0e0e0',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Sticky Header */}
            <Box
              p="md"
              bg="#F2F7FC"
              style={{
                borderBottom: '1px solid #e0e0e0',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}
            >
              <Group>
                <Image
                  src={group.logo}
                  alt={group.label}
                  radius="md"
                  fit="contain"
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
                <Text fw={700} size="md" c={COLORS.textColor}>
                  {group.label}
                </Text>
              </Group>
            </Box>

            {/* Scrollable Content */}
            <ScrollArea style={{ flex: 1, padding: '0 16px' }} >
              {group?.terms?.map((term, index) => (
                <Box
                  key={index}
                  py="xs"
                  style={{
                    borderBottom: index < group.terms.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}
                >
                  <Text size="sm" c={COLORS.textColor}>
                   {term.name}
                  </Text>
                </Box>
              ))}
            </ScrollArea>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ShipTerms;