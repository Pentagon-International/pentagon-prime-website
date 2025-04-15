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
    <Container fluid px={'7%'} my={150}>
      <Title tt={'uppercase'} fw={800} lh={'lgx2'} size={  isMobile ? '28px' : '40px'}>Milestone</Title>
                {/* <Text c={COLORS.textColor} size="base" lh="sm" maw={ isMobile ? '100%' : '80%'} mt={14}> */}
      
      <Text size='base' c={COLORS.textColor} mt={20} lh="sm" mb={isMobile && 50} w={ isMobile ? '100%' : '40%'}>
        Our journey continues, and we invite you to be part of this exciting
        evolution in content creation.
      </Text>
      <MilestoneTimeline milestones={milestoneData} />
    </Container>
  );
};

export default Milestone;
