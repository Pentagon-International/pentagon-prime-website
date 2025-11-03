'use client'

import { Container, Text, Title } from '@mantine/core';
import { client } from '../api/contentful';
import MilestoneTimeline from './MilestoneTimeLine';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { COLORS } from '../utils/COLORS';

const Milestone = () => {

  const [milestoneData, setMilestoneData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'milestone',
          order: 'fields.year',
        });
        setMilestoneData(res.items);
      } catch (error) {
        console.error('Error fetching milestone:', error);
      }
    };
    fetchData();
  }, [])

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container fluid px={'7%'}>
      <Title tt={'uppercase'} fw={800} lh={'lgx2'} size={  isMobile ? '28px' : '40px'}>Our story: Leadership & Milestones</Title>
                {/* <Text c={COLORS.textColor} size="base" lh="sm" maw={ isMobile ? '100%' : '80%'} mt={14}> */}
      
      <Text size='base' c={COLORS.textColor} mt={20} lh="sm" mb={isMobile && 50} w={ isMobile ? '100%' : '90%'}>
        Founded in 2007, Pentagon Group has grown into a multi-vertical logistics platform with operations across Asia and Africa. We’ve expanded capabilities organically to include consolidation services, NVOCC operations, digital logistics (Pentafox/Pulse), and professional customs licensing, all designed to give customers a single trusted partner for complex trade.
      </Text>
      <MilestoneTimeline milestones={milestoneData} />
    </Container>
  );
};

export default Milestone;
