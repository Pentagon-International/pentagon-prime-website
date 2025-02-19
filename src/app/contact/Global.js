
import {
  Card,
  Center,
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
import { IconPhone, IconPhoneCall } from '@tabler/icons-react';
import React from 'react';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';

const Global = async () => {
  const res = await client.getEntries({
    content_type: 'location',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Center tt={'uppercase'}>
        <Title>
          Our <span style={{ color: COLORS.serviceColor }}> Global</span> Presence
        </Title>
      </Center>
      <Image src={Images.global} alt="global" />

      <Grid columns={12} align={'center'} justify="center">
        {res.items.map((item) => (
          <GridCol key={item.sys.id} span={3}>
            <Card bg={'#F2F7FC'} radius={'32px'} p={25}>
              <Title size={'sm'} order={5}>{item?.fields?.place}</Title>
              <Text size='smx' c={COLORS.textColor} mt={20}>
                {item?.fields?.address}
              </Text>
              <Group mt={20} align="center">
                <IconPhoneCall size={14} color={COLORS.serviceColor} />
                <Text size='xs'>{item?.fields?.number}</Text>
              </Group>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
};

export default Global;
