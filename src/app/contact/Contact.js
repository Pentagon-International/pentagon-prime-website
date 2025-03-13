import { Container, Flex, Group, Image, Stack, Text, Title } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import Images from '../utils/image';

const Contact = () => {
  return (
    <Container fluid px={'7%'}>
      <Flex
        align={'center'}
        px={'auto'}
        justify={'space-between'}
        style={{
          color: 'white',
          height: '100vh',
        }}
      >
        <Stack p={15}>
          <Title size={'40px'} lh={'lgx2'} fw={800} tt={'uppercase'}>Contact Us</Title>
          <Text size='base' lh={'28px'} tw='balance' >
            Ready to begin your journey with Pentagon Prime, have a question, or
            need assistance? We're here to help.
          </Text>
          <Text size='base' fw={700}>Headquarters</Text>
          <Text size='sm' tw="balance" maw={'70%'}>
            Unit No. 204 Satellite Silver, Marol Naka Andheri Kurla Road,
            Andheri (east) Mumbai, Maharashtra – 400059, India
          </Text>
          <Text size='base' fw={700}>Phone & Email Address</Text>
          <Group>
            <IconPhone color="#0EC9F2" size={20} />
            <Text size='sm'>022 4596 6999</Text>
          </Group>
          <Group>
            <IconMail color="#0EC9F2" size={20} />
            <Text size='sm'>pentagon@pentagonindia.net</Text>
          </Group>
        </Stack>
        <Image h={'80%'} src={Images.contact_vector} alt="pentagon logo" />
      </Flex>
    </Container>
  );
};

export default Contact;
