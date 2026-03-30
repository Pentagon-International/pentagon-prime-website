'use client';
import { client } from '@/app/api/contentful';
import { COLORS } from '@/app/utils/COLORS';
import { TYPOGRAPHY } from '@/app/utils/TYPOGRAPHY';
import { highlightText } from '@/app/utils/highlightText';
import {
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Text,
  Title,
  Box,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';

const TeamMember = ({ image, title, description, reverse }) => {
  const imageUrl = image ? `https:${image}` : '/placeholder.jpg';
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Grid py={isMobile ? 30 : 50} align="center" w={'100%'} gutter="xl">
      <GridCol px={!isMobile && 'xl'} span={isMobile ? 12 : 6} order={!isMobile && reverse ? 2 : 1}>
        <Box pos="relative" w={isMobile ? "100%" : "90%"} h="280px">
          <Box
            w={'100%'}
            h={'100%'}
            style={{
              position: 'absolute',
              backgroundColor: COLORS.globalCardBackground,
              borderRadius: '12px',
              zIndex: 0,
            }}
          />
          <Image
            src={imageUrl}
            alt={title || 'Team Member'}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              position: 'absolute',
              zIndex: 1,
              boxShadow:"0 3px 8px rgba(0, 0, 0, 0.3)"
            }}
          />
        </Box>
      </GridCol>
      <GridCol px={!isMobile && 'xl'} span={isMobile ? 12 : 6} order={reverse ? 1 : 2}>
        <Title tt="uppercase" fw={800} lh={isMobile ? "md" : "lgx2"} size={isMobile ? "md" : "lg"} style={{ color: 'black' }}>
          {highlightText(title)}
        </Title>
        <Text mt={10} c={COLORS.textColor} maw={isMobile ? '100%' : '80%'} size="base" lh="sm">
          {highlightText(description)}
        </Text>
      </GridCol>
    </Grid>
  );
};

const LogisticsTeam = ({ title, content }) => {
  const [teamData, setTeamData] = useState([]);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'logisticsTeam',
          order: 'sys.createdAt',
        });
        setTeamData(res.items || []);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <Container fluid px={'2%'} py={'50px'} bg={COLORS.backgroundColor}>
      <Title size={isMobile ? TYPOGRAPHY.h5.desktop : 'lg'} lh={isMobile ? 'md' : 'lgx2'} tt={'uppercase'} fw={800}>
        {highlightText(title)}
      </Title>
        <Text size={isMobile ? TYPOGRAPHY.body.small : "sm"} lh={isMobile ? "md" : "sm"} py={'sm'} maw={isMobile ? '80%' : '55%'} c={COLORS.textColor}>
          {highlightText(content)}
        </Text>
        <Flex wrap="wrap" align="center" mt="30px" justify="center" gap="md">
          {teamData?.map((item, index) => {
            const fields = item?.fields || {};
            const imageUrl =
              fields.logisticsTeamImage?.fields?.file?.url || fields.imageUrl || null;

            return (
              <TeamMember
                key={index}
                image={imageUrl}
                title={fields.teamTitle}
                description={fields.teamDescription}
                reverse={index % 2 !== 0}
              />
            );
          })}
        </Flex>
    </Container>
  );
};

export default LogisticsTeam;
