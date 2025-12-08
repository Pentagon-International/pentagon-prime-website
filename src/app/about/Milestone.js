'use client'

import { Container, Text, Title } from '@mantine/core';
import { client } from '../api/contentful';
import MilestoneTimeline from './MilestoneTimeLine';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';

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
      <Title tt={'uppercase'} fw={800} lh={'lgx2'} size={  isMobile ? '28px' : '40px'}>{highlightText("#Our story #: Leadership & Milestones")}</Title>
                {/* <Text c={COLORS.textColor} size="base" lh="sm" maw={ isMobile ? '100%' : '80%'} mt={14}> */}
      <Text size='md' mt={20} fw={800}>Founded in 2007</Text>
      <Text size='base' c={COLORS.textColor} mt={5} ta='justify'  lh="sm" mb={isMobile && 50} w={ !isMobile ? '100%' : '90%'} style={{textIndent: "5rem", textAlign: "justify", whiteSpace: "pre-line", }}>
        Pentagon Group has grown into a multi-vertical logistics platform operating across Asia, Africa & USA. Over the years, we expanded into consolidation services with our own LCL console boxes, NVOCC operations with our own dry and reefer containers, customs licensing, and digital logistics tools - becoming a single trusted partner for complex global trade.
      </Text>
      <MilestoneTimeline milestones={milestoneData} />
    </Container>
  );
};

export default Milestone;
