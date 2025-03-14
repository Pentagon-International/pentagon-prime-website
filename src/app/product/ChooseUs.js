import { Container, Divider, Grid, Title } from '@mantine/core';
import ServiceCard from '../component/common/ServiceCard';
import { client } from '../api/contentful';

const ChooseUs = async () => {
  const res = await client.getEntries({
    content_type: 'chooseus',
    order: 'sys.createdAt',
  });
  return (
    <Container fluid px={'7%'} py={'30px'}>
      <Title size={'lg'} tt={'uppercase'}>why choose us ?</Title>
      <Grid columns={9} mt="lg">
        {res.items?.map((item, index) => (
          <ServiceCard key={index} item={item} backgroundColor="#fff" border={'5px solid #D2E8FF'} />
        ))}
      </Grid>
      <Divider mt={'lg'} size={'md'} />
    </Container>
  );
};

export default ChooseUs;
