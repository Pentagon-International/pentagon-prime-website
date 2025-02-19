
import {
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';

const Ship = async () => {
  const res = await client.getEntries({
    content_type: 'shipment',
    order: 'sys.createdAt',
  });
  return (
    <Container fluid px={'7%'} py={'30px'}>
      <Stack gap={50}>
        <Flex direction={'column'}>
          <Title size={'lg'} tt={'uppercase'}>Ship Anywhere</Title>
          <Text size='smx' c={COLORS.textColor} w={'40vw'}>
            Instantly price and book both international and domestic freight in
            one central location. Plus, add any additional services including
            customs clearance, cargo insurance, and supply chain financing. We
            provide transparent pricing and enable visibility across your entire
            supply chain.
          </Text>
          <Grid columns={3} gutter={'xl'} mt={30}>
            {res.items.map((item) => (
              <GridCol key={item.sys.id} span={1}>
                <Image
                  src={item.fields.image?.fields?.file?.url}
                  alt={item.name}
                />
                <Text size="sm" fw={500} mt={20}>
                  {item.fields.title}
                </Text>
                <Text size='xs' mt={10} color="dimmed">
                  {item.fields.description}
                </Text>
              </GridCol>
            ))}
          </Grid>
        </Flex>

        <Flex direction={'column'}>
          <Title size={'lg'} tt={'uppercase'}>Ship Everywhere</Title>
          <Text size='smx' c={COLORS.textColor} w={'40vw'}>
            Instantly price and book both international and domestic freight in
            one central location. Plus, add any additional services including
            customs clearance, cargo insurance, and supply chain financing. We
            provide transparent pricing and enable visibility across your entire
            supply chain.
          </Text>
          <Grid columns={3} gutter={'xl'} mt={30}>
            {res.items.map((item) => (
              <GridCol key={item.sys.id} span={1}>
                <Image
                  src={item.fields.image?.fields?.file?.url}
                  alt={item.name}
                />
                <Text size="sm" fw={500} mt={20}>
                  {item.fields.title}
                </Text>
                <Text mt={10} size='xs' color="dimmed">
                  {item.fields.description}
                </Text>
              </GridCol>
            ))}
          </Grid>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Ship;
