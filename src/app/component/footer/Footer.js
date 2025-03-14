'use client';
import { COLORS } from '@/app/utils/COLORS';
import {
  BackgroundImage,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  Container,
  Anchor,
  Box,
} from '@mantine/core';
import {
  IconAt,
  IconBrandLinkedin,
  IconBrandTwitterFilled,
  IconPhone,
} from '@tabler/icons-react';
import React from 'react';

const Footer = () => {
  const service1 = [
    { title: 'Air Freight Forwarding', slug: 'air-freight-forwarding' },
    { title: 'Sea Freight Forwarding', slug: 'sea-freight-forwarding' },
    { title: 'Multimodal Transport', slug: 'multimodal-transport' },
    { title: 'Cross Country Trade', slug: 'cross-country-trade' },
    { title: 'Consolidation Services', slug: 'consolidation-services' },
    { title: 'Value Added Services', slug: 'value-added-services' },
    { title: 'Custom Clearing', slug: 'customs-clearance' },
  ];

  const service2 = [
    { title: 'Break Bulk Cargo Services', slug: 'break-bulk-cargo' },
    { title: 'ODC Project Cargo', slug: 'odc-project-cargo' },
    { title: 'Warehousing & Distribution', slug: 'warehousing-and-distribution' },
    { title: 'Exhibition Cargo', slug: 'exhibition-cargo' },
    { title: 'Chartering and Coastal Movements', slug: 'chartering-and-coastal-movements' },
    { title: 'First and Last-Mile Delivery', slug: 'first-and-last-mile-delivery' }
  ];

  return (
    <footer style={{ backgroundColor: '#111', color: 'white', padding: '50px 0' }}>
      <Container fluid px="7%">
        <Box mb={20}>
          <Flex align="center" gap="xs">
            <BackgroundImage src="/logo-pp.png" w={50} h={55} alt="PentagonPrime Logo" />
            <Title size={'md'} order={3} color="white">
              PentagonPrime
            </Title>
          </Flex>
        </Box>
        <Flex justify="space-between" wrap="wrap" gap="lg">
          <Stack w={300} spacing="xs">
            <Text size="sm" color="white">
              Pentagon Prime, a unit of Pentagon Group, provides logistics and freight forwarding services.
              We enable our clients to enhance efficiency with cost-effective solutions, connecting them seamlessly with the world.
            </Text>
            <Group>
              <IconBrandLinkedin size={22} />
              <IconBrandTwitterFilled size={22} />
            </Group>
          </Stack>

          <Stack spacing="xs">
            <Text fw={700} size="smx" style={{ textTransform: 'uppercase', color: '#666' }}>
              Services
            </Text>
            {service1.map((item, index) => (
              <Anchor
                key={index}
                href={`/service/${item.slug}`}
                style={{ color: COLORS.primaryColor }}
                underline={false}
              >
                <Text size="sm">{item.title}</Text>
              </Anchor>
            ))}
          </Stack>

          <Stack spacing="xs" mt={40}>
            {service2.map((item, index) => (
              <Anchor
                key={index}
                href={`/service/${item.slug}`}
                style={{ color: COLORS.primaryColor }}
                underline={false} // Remove underline if needed
              >
                <Text size="sm">{item.title}</Text>
              </Anchor>
            ))}
          </Stack>

          <Stack w={300} spacing="sm">
            <Text weight={700} size="smx" style={{ textTransform: 'uppercase', color: '#ccc' }}>
              Contact
            </Text>
            <Text size="sm" color="white">
              Unit No. 204, Satellite Silver, Marol Naka, Andheri Kurla Road, Andheri (East), Mumbai – 400059, India.
            </Text>
            <Group align="center" spacing="sm" onClick={() => window.open('tel:+912245966999')}>
              <IconPhone size={20} color="#0E53F2" />
              <Text size="sm" color="white">022 4596 6999</Text>
            </Group>
            <Group align="center" spacing="xs" onClick={() => window.open('mailto:pentagon@pentagonindia.net')}>
              <IconAt size={20} color="#0E53F2" />
              <Text size="sm" color="white">pentagon@pentagonindia.net</Text>
            </Group>
          </Stack>
        </Flex>

        <Text size="sm" mt={20} c={COLORS.textColor}>
          © 2024 Pentagon Group. All Rights Reserved.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
