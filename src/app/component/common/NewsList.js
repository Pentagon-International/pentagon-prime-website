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

  return (
    <Container fluid px="7%">
      <Title mb="xl" size="lg" fw={800}>
        NEWS & EVENTS
      </Title>

      <Grid
        columns={ITEMS_PER_VIEW}
        mt="xl"
        gutter="lg"
        style={styles.slideContainer}
      >
        {currentItems.map(({ sys, fields }) => (
          <GridCol span={1} key={sys.id}>
            <Flex
              gap={'md'}
              direction="column"
              h="100%"
              justify="space-between"
            >
              <Image
                src={fields.newsImage?.fields?.file?.url}
                alt={fields.newsName || 'News image'}
                fit="cover"
                style={{ borderRadius: '24px' }}
                mah={'250px'}
                mih={'250px'}
              />
              <Text color={COLORS.textColor} fw={700} size="xs" tt="uppercase">
                {fields.newsName}
              </Text>
              <Text fw={700} size="smx" style={styles.newsTitle}>
                {fields.newsTitle}
              </Text>

              <Flex align="center" gap={4} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <a
                  href={fields.knowmore}
                  style={styles.readMore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
                {/* <IconArrowRight
                  stroke={2}
                  color={COLORS.serviceColor}
                  size={16}
                  style={{ transform: 'translateY(1px)' }}
                /> */}
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
                      ? '#0E52F2'
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
    </Container>
  );
};

const styles = {
  newsTitle: {
    minHeight: '50px',
    color: '#121212'
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
  slideContainer: {
    transition: 'transform 0.3s ease-in-out',
  },
};

export default NewsList;
