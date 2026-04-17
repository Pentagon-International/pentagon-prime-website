import { Center, Container, Grid, Text, Title } from '@mantine/core';
import { client } from '@/lib/api/contentful';
import ServiceCard from '@/components/common/ServiceCard';
import { highlightText } from '@/app/utils/highlightText';
import { TYPOGRAPHY } from '@/app/utils/TYPOGRAPHY';

const Toolkit = async ({ title, content }) => {
  const res = await client.getEntries({
    content_type: 'toolkit',
    order: 'sys.createdAt',
  });

  const anchorText = 'Learn More';

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Center>
        <Title size={TYPOGRAPHY.h2.desktop} fw={800} lh={'lgx2'} tt={'uppercase'}>{highlightText(title)}</Title>
      </Center>
      <Center>
        <Text size='sm'>
          {highlightText(content)}
        </Text>
      </Center>

      <Grid columns={9} mt="xl">
        {res.items?.map((item, index) => (
          <ServiceCard key={index} item={item} backgroundColor="#fff" border={'2px solid #D2E8FF'} anchorText={anchorText} />
        ))}
      </Grid>
    </Container>
  );
};

export default Toolkit;
