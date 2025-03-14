import {
  Card,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons-react';
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
        <Title size={'xl'} fw={800} lh={'lgx2'}>
          Our <span style={{ color: COLORS.serviceColor }}> Global</span> Presence
        </Title>
      </Center>
      <Image src={Images.global} alt="global" />

      <Grid columns={12} align={'center'} justify="center">
        {res.items.map((item) => (
          <GridCol key={item.sys.id} span={3}>
            <Card mih={'200px'} bg={'#F2F7FC'} radius={'32px'} p={30}>
              <Title size={'md'} fw={700} order={5}>{item?.fields?.place}</Title>
              <Text size='smx' mih={'100px'} c={COLORS.textColor} mt={20}>
                {item?.fields?.address}
              </Text>
              <Group align="center" gap={5}>
                <IconPhoneCall size={14} color={COLORS.serviceColor} />
                <Text size='smx'>{item?.fields?.number}</Text>
              </Group>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
};

export default Global;
