import { Container, Grid, Title } from '@mantine/core';
import { client } from '@/lib/api/contentful';
import ServiceCard from '@/components/common/ServiceCard';

const Values = async () => {
  const res = await client.getEntries({
    content_type: 'values',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} my={90}>
      <Title size={'xl'} fw={800} lh={'lgx2'} tt={'uppercase'}>
        our <span style={{ color: '#0E53F2' }}>values</span>{' '}
      </Title>
      <Grid columns={9} mt="xl">
        {res.items?.map((item, index) => (
          <ServiceCard key={index} item={item} backgroundColor={'#F2F7FC'} />
        ))}
      </Grid>
    </Container>
  );
};

export default Values;
