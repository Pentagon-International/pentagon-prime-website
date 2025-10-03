'use client';
import React, { useState } from 'react';
import {
  ActionIcon,
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { COLORS } from '@/app/utils/COLORS';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';

const ITEMS_PER_VIEW = 3;

const NewsList = ({ newsItems }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < newsItems.length - ITEMS_PER_VIEW) {
      setStartIndex(startIndex + 1);
    }
  };

  const currentItems = newsItems.slice(startIndex, startIndex + ITEMS_PER_VIEW);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container fluid px="7%" py={'70px'}>
      <Title mb="xl" size="lg" fw={800}>
        NEWS & EVENTS
      </Title>

      {
        isMobile ? (
          <>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <Carousel align={'start'} slideSize="80%" height={'auto'} w={'100%'} slideGap="xs" loop
              styles={{
                controls: {
                  display: 'none',
                  visibility: 'hidden',
                  opacity: 0,
                  pointerEvents: 'none',
                },
              }}
            >
              {currentItems.map(({ sys, fields }) => (
                <Carousel.Slide key={sys.id}>
                  <Flex
                    direction="column"
                    h="100%"
                    justify="space-between"
                    style={{
                      columnGap: '10px',
                      rowGap: '5px'
                    }}
                  >
                    <Image
                      src={fields.newsImage?.fields?.file?.url}
                      alt={fields.newsName || 'News image'}
                      fit="cover"
                      style={{ borderRadius: '24px' }}
                      mah={'250px'}
                      mih={'250px'}
                    />
                    <Text c="#999" fw={700} size="xs" mt={10} tt="uppercase">
                      {fields.newsName}
                    </Text>
                    <Text fw={700} size="sm" maw={'72%'} c={COLORS.news_title}>
                      {fields.newsTitle}
                    </Text>
                    <Text fw={700} size="xs" c={COLORS.news_title}>
                      {fields.newsDate}
                    </Text>
                  </Flex>
                </Carousel.Slide>
              ))}
            </Carousel>
          </>
        )
          :
          <>

            <Grid
              columns={ITEMS_PER_VIEW}
              mt="xl"
              gutter="lg"
            >
              {currentItems.map(({ sys, fields }) => (
                <GridCol span={1} key={sys.id} component={Link} href={fields.knowmore} target="_blank">
                  <Flex
                    direction="column"
                    h="100%"
                    justify="space-between"
                    style={{
                      columnGap: '10px',
                      rowGap: '5px'
                    }}
                  >
                    <Image
                      src={fields.newsImage?.fields?.file?.url}
                      alt={fields.newsName || 'News image'}
                      fit="cover"
                      style={{ borderRadius: '24px' }}
                      mah={'250px'}
                      mih={'250px'}
                    />
                    <Text c="#999" fw={700} size="xs" mt={10} tt="uppercase">
                      {fields.newsName}
                    </Text>
                    <Text fw={700} size="sm" maw={'72%'} c={COLORS.news_title}>
                      {fields.newsTitle}
                    </Text>

                    <Flex align="center" gap={4} style={[styles.readMore, { display: 'inline-flex', alignItems: 'center' }]}>
                      Read more
                    </Flex>
                  </Flex>
                </GridCol>
              ))}
            </Grid>

            <Flex align="center" justify="space-between" mt="xl" gap="md">
              <ActionIcon
                size="lg"
                variant="default"
                radius="xl"
                onClick={handlePrev}
                disabled={startIndex === 0}
              >
                <IconArrowLeft size={24} />
              </ActionIcon>

              <Flex align="center" gap="xs">
                {[...Array(Math.ceil(newsItems.length / ITEMS_PER_VIEW))].map(
                  (_, index) => (
                    <span
                      key={index}
                      style={{
                        ...styles.paginationDot,
                        backgroundColor:
                          index === Math.floor(startIndex / ITEMS_PER_VIEW)
                            ? '#46DABE'
                            : '#F3F3F3',
                      }}
                    />
                  )
                )}
              </Flex>

              <ActionIcon
                size="lg"
                variant="default"
                radius="xl"
                onClick={handleNext}
                disabled={startIndex >= newsItems.length - ITEMS_PER_VIEW}
              >
                <IconArrowRight size={24} />
              </ActionIcon>
            </Flex>

          </>
      }


    </Container>
  );
};

const styles = {
  sliderWrapper: {
    overflow: 'hidden',
    width: '100%',
    padding: '0 2%',
  },
  readMore: {
    color: COLORS.serviceColor,
    fontWeight: 400,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: 'inline-block',
  },
};

export default NewsList;
