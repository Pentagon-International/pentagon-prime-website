import { COLORS } from '@/app/utils/COLORS';
import {
  BackgroundImage,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  Container,
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
    'Air Freight Forwarding',
    'Sea Freight Forwarding',
    'Multimodal Transport',
    'Cross Country Trade',
    'Consolidation Services',
    'Value Added Services',
    'Custom Clearing',
  ];

  const service2 = [
    'Break Bulk Cargo Services',
    'ODC Project Cargo',
    'Warehousing & Distribution',
    'Exhibition Cargo',
    'Chartering and Coastal Movements',
    'First and Last-Mile Delivery',
  ];

  return (
    <footer
      style={{ backgroundColor: '#111', color: 'white', padding: '50px 0' }}
    >
      <Container fluid px="7%">
        <Flex justify="space-between" wrap="wrap" gap="lg">
          <Stack w={300} spacing="xs">
            <Flex align="center" gap="xs">
              <BackgroundImage
                src="/logo-pp.png"
                w={55}
                h={55}
                alt="PentagonPrime Logo"
              />
              <Title size={'md'} order={3} color="white">
                PentagonPrime
              </Title>
            </Flex>
            <Text size="sm" color="white">
              Pentagon Prime, a unit of Pentagon Group, provides logistics and
              freight forwarding services. We enable our clients to enhance
              efficiency with cost-effective solutions, connecting them
              seamlessly with the world.
            </Text>
            <Group>
              <IconBrandLinkedin size={22} />
              <IconBrandTwitterFilled size={22} />
            </Group>
          </Stack>

          {/* Services 1 */}
          <Stack spacing="xs">
            <Text
              weight={700}
              size="smx"
              style={{ textTransform: 'uppercase', color: '#ccc' }}
            >
              Services
            </Text>
            {service1.map((item, index) => (
              <Text key={index} size="sm" color="white">
                {item}
              </Text>
            ))}
          </Stack>

          <Stack spacing="xs">
            <Text
              weight={700}
              size="smx"
              style={{ textTransform: 'uppercase', color: '#ccc' }}
            >
              More Services
            </Text>
            {service2.map((item, index) => (
              <Text key={index} size="sm" color="white">
                {item}
              </Text>
            ))}
          </Stack>

          <Stack w={300} spacing="sm">
            <Text
              weight={700}
              size="smx"
              style={{ textTransform: 'uppercase', color: '#ccc' }}
            >
              Contact
            </Text>
            <Text size="sm" color="white">
              Unit No. 204, Satellite Silver, Marol Naka, Andheri Kurla Road,
              Andheri (East), Mumbai – 400059, India.
            </Text>
            <Group align='center' spacing="sm">
              <IconPhone size={20} color="#0E53F2" />
              <Text size="sm" color="white">
                022 4596 6999
              </Text>
            </Group>
            <Group align='center' spacing="xs">
              <IconAt size={20} color="#0E53F2" />
              <Text size="sm" color="white">
                pentagon@pentagonindia.net
              </Text>
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
