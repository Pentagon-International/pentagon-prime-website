
import {
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';

const Ship = async ({ first_title, first_content, second_title, second_content }) => {
  const res = await client.getEntries({
    content_type: 'shipment',
    order: 'sys.createdAt',
  });
  return (
    <Container fluid px={'7%'} py={'10px'} mb={160}>
      <Stack gap={100}>
        <Flex direction={'column'}>
          <Title size={'lg'} tt={'uppercase'}>{highlightText(first_title)}</Title>
          <Text size='sm' c={COLORS.textColor} w={'40vw'}>
            {highlightText(first_content)}
          </Text>
          <Grid columns={3} gutter={90} mt={60}>
            {res.items.map((item) => (
              <GridCol key={item.sys.id} span={1}>
                <Image
                  src={item.fields.image?.fields?.file?.url}
                  alt={item.name}
                />
                <Text size="sm" fw={500} mt={20}>
                  {item.fields.title}
                </Text>
                <Text size='smx' mt={10} color="dimmed">
                  {item.fields.description}
                </Text>
              </GridCol>
            ))}
          </Grid>
        </Flex>

        <Flex direction={'column'}>
          <Title size={'lg'} tt={'uppercase'}>{highlightText(second_title)}</Title>
          <Text size='sm' c={COLORS.textColor} w={'40vw'}>
            {highlightText(second_content)}
          </Text>
          <Grid columns={3} gutter={90} mt={60}>
            {res.items.map((item) => (
              <GridCol key={item.sys.id} span={1}>
                <Image
                  src={item.fields.image?.fields?.file?.url}
                  alt={item.name}
                />
                <Text size="sm" fw={500} mt={20}>
                  {item.fields.title}
                </Text>
                <Text mt={10} size='smx' color="dimmed">
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
