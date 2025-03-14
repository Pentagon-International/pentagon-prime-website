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
  SimpleGrid,
  Divider,
} from '@mantine/core';
import {
  IconAt,
  IconBrandLinkedin,
  IconBrandTwitterFilled,
  IconPhone,
  IconMapPin,
  IconBrandInstagram,
  IconBrandFacebook,
} from '@tabler/icons-react';
import React from 'react';

const Footer = () => {
  // Reorganize services into 3 columns
  const services = [
    [
      { title: 'Air Freight Forwarding', slug: 'air-freight-forwarding' },
      { title: 'Sea Freight Forwarding', slug: 'sea-freight-forwarding' },
      { title: 'Multimodal Transport', slug: 'multimodal-transport' },
      { title: 'Cross Country Trade', slug: 'cross-country-trade' },
    ],
    [
      { title: 'Consolidation Services', slug: 'consolidation-services' },
      { title: 'Value Added Services', slug: 'value-added-services' },
      { title: 'Custom Clearing', slug: 'customs-clearance' },
      { title: 'Break Bulk Cargo Services', slug: 'break-bulk-cargo' },
    ],
    [
      { title: 'ODC Project Cargo', slug: 'odc-project-cargo' },
      { title: 'Warehousing & Distribution', slug: 'warehousing-and-distribution' },
      { title: 'Exhibition Cargo', slug: 'exhibition-cargo' },
      { title: 'First and Last-Mile Delivery', slug: 'first-and-last-mile-delivery' },
    ]
  ];

  const linkStyle = {
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#0E53F2',
      transform: 'translateX(5px)',
    }
  };

  return (
    <footer style={{ backgroundColor: '#111', color: 'white', padding: '50px 0' }}>
      <Container fluid px="7%">
        {/* Top Section: Services on left, Company info on right */}
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          justify="space-between" 
          gap={{ base: 40, md: 60 }}
          mb={50}
        >
          {/* Company Info */}
          <Box style={{ flex: 2 }}>
            <Flex align="center" gap="xs" mb={20}>
              <BackgroundImage src="/logo-pp.png" w={50} h={55} alt="PentagonPrime Logo" />
              <Title size={'md'} order={3} color="white">
                PentagonPrime
              </Title>
            </Flex>
            
            <Text size="sm" color="white" lh={1.6} mb={20}>
              Pentagon Prime, a unit of Pentagon Group, provides logistics and freight forwarding services.
              We enable our clients to enhance efficiency with cost-effective solutions, connecting them seamlessly with the world.
            </Text>
            
            <Group>
              <Box 
                sx={{ 
                  cursor: 'pointer', 
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', color: '#0E53F2' }
                }}
                onClick={() => window.open('https://www.linkedin.com/company/pentagon-freight')}
              >
                <IconBrandLinkedin size={22} />
              </Box>
              <Box 
                sx={{ 
                  cursor: 'pointer', 
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', color: '#0E53F2' }
                }}
                onClick={() => window.open('https://www.instagram.com/pentagon_freight/')}
              >
                <IconBrandInstagram size={22} />
              </Box>
              <Box 
                sx={{ 
                  cursor: 'pointer', 
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', color: '#0E53F2' }
                }}
                onClick={() => window.open('https://www.facebook.com/PentagonFreightSolutions/')}
              >
                <IconBrandFacebook size={22} />
              </Box>
            </Group>
          </Box>

          {/* Services - 3 Column Layout */}
          <Box style={{ flex: 3 }}>
            <Text fw={700} size="smx" style={{ textTransform: 'uppercase', color: '#666' }} mb={15}>
              Services
            </Text>
            
            <SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'xs', cols: 1 }]}>
              {services.map((column, colIndex) => (
                <Stack key={colIndex} spacing={6}>
                  {column.map((item, index) => (
                    <Anchor
                      key={index}
                      href={`/service/${item.slug}`}
                      style={{ color: COLORS.primaryColor }}
                      underline={false}
                      sx={{
                        ...linkStyle,
                        lineHeight: 1.2,
                        padding: '2px 0',
                      }}
                    >
                      <Text 
                        size="sm" 
                        style={{ 
                          lineHeight: 1.2,
                          margin: 0
                        }}
                      >
                        {item.title}
                      </Text>
                    </Anchor>
                  ))}
                </Stack>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        <Divider color="rgba(255,255,255,0.1)" my={30} />

        {/* Contact Section - Below */}
        <Box>
          <Text fw={700} size="smx" style={{ textTransform: 'uppercase', color: '#666' }} mb={15}>
            Contact
          </Text>
          
          <Flex 
            direction="row" 
            gap="xl" 
            align="center"
            wrap="wrap"
            justify="flex-start"
            mb={20}
          >
            <Group 
              spacing="sm" 
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  '& svg': { color: '#0E53F2' }
                },
                maxWidth: 'none',
                flexShrink: 1
              }}
              onClick={() => window.open('https://maps.google.com/?q=Satellite Silver, Marol Naka, Andheri Kurla Road, Andheri East, Mumbai')}
              style={{ cursor: 'pointer' }}
            >
              <IconMapPin size={18} color="#0E53F2" style={{ flexShrink: 0 }} />
              <Text 
                size="sm" 
                color="white"
                style={{ whiteSpace: 'nowrap' }}
              >
                Unit No. 204, Satellite Silver, Marol Naka, Andheri Kurla Road, Andheri (East), Mumbai – 400059, India.
              </Text>
            </Group>
            
            <Group 
              spacing="sm" 
              onClick={() => window.open('tel:+912245966999')}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(5px)',
                  '& p': { color: '#0E53F2' }
                },
                flexShrink: 0
              }}
            >
              <IconPhone size={18} color="#0E53F2" />
              <Text size="sm" color="white" style={{ transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>022 4596 6999</Text>
            </Group>
            
            <Group 
              spacing="sm" 
              onClick={() => window.open('mailto:pentagon@pentagonindia.net')}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(5px)',
                  '& p': { color: '#0E53F2' }
                },
                flexShrink: 0
              }}
            >
              <IconAt size={18} color="#0E53F2" />
              <Text size="sm" color="white" style={{ transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>pentagon@pentagonindia.net</Text>
            </Group>
          </Flex>
        </Box>

        <Text size="sm" mt={40} c={COLORS.textColor}>
          © 2024 Pentagon Group. All Rights Reserved.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
