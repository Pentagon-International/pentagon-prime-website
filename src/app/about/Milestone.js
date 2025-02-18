import {Container, Text, Title} from '@mantine/core';
import {client} from '../api/contentful';
import MilestoneTimeline from './MilestoneTimeLine';

const Milestone = async () => {
  const res = await client.getEntries({
    content_type: 'milestone',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} mt={50}>
      <Title style={{textTransform: 'uppercase'}}>Milestone</Title>
      <Text mt={20} w={'30%'}>
        Our journey continues, and we invite you to be part of this exciting
        evolution in content creation.
      </Text>
      <MilestoneTimeline milestones={res.items} />
    </Container>
  );
};

export default Milestone;
