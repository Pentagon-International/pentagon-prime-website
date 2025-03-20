'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/app/utils/COLORS';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { client } from '../api/contentful';
import { highlightText } from '../utils/highlightText';

const Partner = ({ title, content }) => {
  const [partners, setPartners] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'partners',
          order: 'sys.createdAt',
        });
        setPartners(res.items);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid style={styles.container}>
      <Flex style={styles.header}>
        <Stack>
          <Title size="lg" style={styles.title} fw={800}>
            {highlightText(title)}
          </Title>
          <Text size="sm" fw={500}>
            {highlightText(content)}
          </Text>
        </Stack>
        <Button fz={'sm'} variant="outline" size='lg' radius={'12px'} fw={600} c={COLORS.serviceColor}
          onClick={() => router.push('/contact')}
        >
          Get In Touch
        </Button>
      </Flex>

      <Box style={styles.carouselWrapper}>
        <Carousel
          slideSize="100%"
          slideGap="xs"
          controlsOffset={0}
          controlSize={35}
          dragFree={false}
          containScroll="trimSnaps"
          align="start"
          nextControlIcon={<IconArrowNarrowRight style={{ backgroundColor: COLORS.primaryColor }} size={22} color={COLORS.secondaryColor} />}
          previousControlIcon={<IconArrowNarrowLeft style={{ backgroundColor: COLORS.primaryColor }} size={22} color={COLORS.secondaryColor} />}
        >
          {partners.map((item, index) => (
            <CarouselSlide key={index}>
              <Flex
                style={{
                  ...styles.carouselSlide,
                  backgroundImage: `url(${item.fields.image.fields.file.url})`,
                }}
              >
                <Box style={styles.testimonialBox}>
                  <Text size='16px' lh={'sm'} maw={'90%'} tw="balance">
                    {highlightText(item.fields.content)}
                  </Text>
                  <Text size="base" fw={700} c={COLORS.portColor} mt={20}>
                    {highlightText(item.fields.shortvalue)}
                  </Text>
                </Box>
              </Flex>
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default Partner;

// Styles remain unchanged
const styles = {
  container: {
    padding: '70px 7%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'uppercase',
  },
  carouselWrapper: {
    marginTop: 50,
    position: 'relative',
    padding: '20px',
    width: '90%',
    margin: '0 auto',
    marginTop: '20px',
  },
  carouselSlide: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '350px',
    borderRadius: '54px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  testimonialBox: {
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    maxWidth: '65%',
    marginLeft: 'auto',
    backdropFilter: 'blur(5px)',
  },
};
