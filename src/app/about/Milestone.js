import { Container, Text, Title } from '@mantine/core';
import { client } from '../api/contentful';
import MilestoneTimeline from './MilestoneTimeLine';

  const Milestone = async () => {
    const res = await client.getEntries({
      content_type: 'milestone',
      order: 'fields.year',
    });

    return (
      <Container fluid px={'7%'} my={150}>
        <Title tt={'uppercase'} fw={800} lh={'lgx2'} size={'40px'}>Milestone</Title>
        <Text size='base' mt={20} w={'40%'}>
          Our journey continues, and we invite you to be part of this exciting
          evolution in content creation.
        </Text>
        <MilestoneTimeline milestones={res.items} />
      </Container>
    );
  };

  export default Milestone;
