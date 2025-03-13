
import { Container, Grid, Group, Image, Text, Title } from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import ServiceCard from '../component/common/ServiceCard';
import { highlightText } from '../utils/highlightText';

const Retail = async ({ first_title, first_content, second_title, second_content }) => {
  const res = await client.getEntries({
    content_type: 'itworks',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'}>
      <Group h={'90vh'} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
        <Title size={'lg'} fw={800} lh={'lgx2'} tt={'uppercase'} tw="balance">
          {highlightText(first_title)}
        </Title>
        <Text size='sm' mt={10} c={COLORS.textColor} w={'35vw'}>
          {highlightText(first_content)}
        </Text>
        <Image src={Images.prime_network} w={'75%'} mx={'auto'} alt="prime_network" />
      </Group>
      <Group mb={120} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
        <Title size={'lg'} fw={800} mt={10} tt={'uppercase'} textWrap="balance">
          {highlightText(second_title)}
        </Title>
        <Text size='sm' c={COLORS.textColor}>
          {highlightText(second_content)}
        </Text>
        <Grid mt="xl">
          {res.items.map((item) => (
            <ServiceCard key={item.sys.id} item={item} backgroundColor={'#fff'} />
          ))}
        </Grid>
      </Group>
    </Container>
  );
};

export default Retail;
