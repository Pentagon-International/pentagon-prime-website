import {Center, Container, Grid, Text, Title} from '@mantine/core';
import { client } from '../api/contentful';
import ServiceCard from '../component/common/ServiceCard';

const Toolkit = async () => {
  const res = await client.getEntries({
    content_type: 'toolkit',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Center>
        <Title tt={'uppercase'}>Prime Toolkit</Title>
      </Center>
      <Center>
        <Text>
          This is how you can control business expenses & Reduce spending
        </Text>
      </Center>

      <Grid columns={9} mt="xl">
        {res.items?.map((item, index) => (
          <ServiceCard key={index} item={item} backgroundColor="#fff" />
        ))}
      </Grid>
    </Container>
  );
};

export default Toolkit;
