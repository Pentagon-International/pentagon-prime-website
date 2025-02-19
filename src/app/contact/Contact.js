import { Container, Flex, Group, Image, Stack, Text, Title } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';

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
        <Stack p={50}>
          <Title size={'lg'} style={{ textTransform: 'uppercase' }}>Contact Us</Title>
          <Text size='smx' >
            Ready to begin your journey with Pentagon Prime, have a question, or
            need assistance? We're here to help.
          </Text>
          <Text size='sm' fw={700}>Headquarters</Text>
          <Text size='smx' tw="balance" maw={'55%'}>
            Unit No. 204 Satellite Silver, Marol Naka Andheri Kurla Road,
            Andheri (east) Mumbai, Maharashtra – 400059, India
          </Text>
          <Text size='sm' fw={700}>Phone & Email Address</Text>
          <Group>
            <IconPhone color="#0EC9F2" size={20} />
            <Text size='smx'>022 4596 6999</Text>
          </Group>
          <Group>
            <IconMail color="#0EC9F2" size={20} />
            <Text size='smx'>pentagon@pentagonindia.net</Text>
          </Group>
        </Stack>
        <Image src={'/images/pentagon.png'} alt="pentagon logo" />
      </Flex>
    </Container>
  );
};

export default Contact;
