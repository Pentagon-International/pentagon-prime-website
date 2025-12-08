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
  Image,
  SimpleGrid,
  Divider,
} from '@mantine/core';
import {
  IconAt,
  IconBrandLinkedin,
  IconPhone,
  IconMapPin,
  IconBrandInstagram,
  IconBrandFacebook,
} from '@tabler/icons-react';
import Images from "@/app/utils/image";
import React, { memo, useMemo, useCallback } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

const Footer = () => {
  // Reorganize services into 3 columns
  const services = useMemo(() => [
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
  ], []);

  const linkStyle = useMemo(() => ({
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#0E53F2',
      transform: 'translateX(5px)',
    }
  }), []);

  const isMobile = useMediaQuery('(max-width:768px)');

  const handleLinkedInClick = useCallback(() => {
    window.open('https://www.linkedin.com/company/pentagon-freight');
  }, []);

  const handleInstagramClick = useCallback(() => {
    window.open('https://www.instagram.com/pentagon_freight/');
  }, []);

  const handleFacebookClick = useCallback(() => {
    window.open('https://www.facebook.com/PentagonFreightSolutions/');
  }, []);

  const handleAddressClick = useCallback(() => {
    window.open('https://maps.google.com/?q=Satellite Silver, Marol Naka, Andheri Kurla Road, Andheri East, Mumbai');
  }, []);

  const handlePhoneClick = useCallback(() => {
    window.open('tel:+912245966999');
  }, []);

  const handleEmailClick = useCallback(() => {
    window.open('mailto:pentagon@pentagonindia.net');
  }, []);

  const mobileServices = useMemo(() => 
    [[...services[0], services[1][0], services[1][1]], [services[1][2], services[1][3], ...services[2]]],
    [services]
  );

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
              <Image src={Images.logo} alt="Logo" h={50} />
            </Flex>

            <Text color="white" lh={1.6} mb={20} style={{ fontSize: isMobile ? 12 : 15 }}>
              Pentagon Prime, a unit of Pentagon Group, provides logistics and freight forwarding services.
              We enable our clients to enhance efficiency with cost-effective solutions, connecting them seamlessly with the world.
            </Text>

            <Group>
              <Box
                style={{ cursor: 'pointer' }}
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', color: '#0E53F2' }
                }}
                onClick={handleLinkedInClick}
              >
                <IconBrandLinkedin size={22} />
              </Box>
              <Box
                style={{ cursor: 'pointer' }}
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', color: '#0E53F2' }
                }}
                onClick={handleInstagramClick}
              >
                <IconBrandInstagram size={22} />
              </Box>
              <Box
                style={{ cursor: 'pointer' }}
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', color: '#0E53F2' }
                }}
                onClick={handleFacebookClick}
              >
                <IconBrandFacebook size={22} />
              </Box>
            </Group>
          </Box>

          {/* Services - 3 Column Layout */}
          <Box style={{ flex: 3 }} pt={14}>
            <Group justify='space-between'>
              <Text fw={700} size="smx" style={{ textTransform: 'uppercase', color: '#666', width: '47%' }} mb={15}>
                Services
              </Text>
              {/* <Text fw={700} size="smx" style={{ textTransform: 'uppercase', color: '#666', width: '47%' }} mb={15}>
                Services
              </Text> */}
            </Group>

            {isMobile ?
              <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'xs', cols: 2 }]}>
                {mobileServices.map((column, colIndex) => (
                  <Stack key={colIndex} spacing={6}>
                    {column.map((item, index) => (
                      <Link
                        key={index}
                        href={`/service/${item.slug}`}
                        style={{ color: COLORS.primaryColor, textDecoration: 'none' }}
                      >
                        <Text
                          style={{
                            ...linkStyle,
                            lineHeight: 1.2,
                            padding: '2px 0',
                            fontSize: 12,
                            margin: 0,
                          }}
                          p={'0px'}
                          m={'0px'}
                        >
                          {item.title}
                        </Text>
                      </Link>
                    ))}
                  </Stack>
                ))}
              </SimpleGrid>
              :
              <SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'xs', cols: 1 }]}>
                {services.map((column, colIndex) => (
                  <Stack key={colIndex} spacing={6}>
                    {column.map((item, index) => (
                      <Link
                        key={index}
                        href={`/service/${item.slug}`}
                        style={{ color: COLORS.primaryColor, textDecoration: 'none' }}
                      >
                        <Text
                          style={{
                            ...linkStyle,
                            lineHeight: 1.2,
                            padding: '2px 0',
                            margin: 0,
                            fontSize: 15,
                          }}
                        >
                          {item.title}
                        </Text>
                      </Link>
                    ))}
                  </Stack>
                ))}
              </SimpleGrid>
            }
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
            align="flex-start"
            wrap="wrap"
            justify="space-between"
            mb={20}
          >
            <Group
              spacing="sm"
              align="flex-start"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  '& svg': { color: '#0EC9F2' }
                },
                maxWidth: 'none',
                flexShrink: 1
              }}
              onClick={handleAddressClick}
              style={{ cursor: 'pointer' }}
            >
              <IconMapPin size={18} color="#0EC9F2" style={{ flexShrink: 0, marginTop: 4 }} />
              <Text
                style={{ fontSize: isMobile ? 12 : 15 }}
              >
                Unit No. 204, Satellite Silver, Marol Naka, Andheri Kurla Road,
                Andheri (East), Mumbai – 400059, India.
              </Text>
            </Group>

            <Group
              spacing="sm"
              onClick={handlePhoneClick}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(5px)',
                  '& p': { color: '#0EC9F2' }
                },
                flexShrink: 0
              }}
              style={{ cursor: 'pointer' }}
            >
              <IconPhone size={18} color="#0EC9F2" />
              <Text style={{ fontSize: isMobile ? 12 : 15, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>022 4596 6999</Text>
            </Group>

            <Group
              spacing="sm"
              onClick={handleEmailClick}
              styles={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(5px)',
                  '& p': { color: '#0EC9F2' }
                },
                flexShrink: 0
              }}
              style={{ cursor: 'pointer' }}
            >
              <IconAt size={18} color="#0EC9F2" />
              <Text color="white" style={{ fontSize: isMobile ? 12 : 15, transition: 'color 0.3s ease', whiteSpace: 'nowrap' }}>pentagon@pentagonindia.net</Text>
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

export default memo(Footer);
