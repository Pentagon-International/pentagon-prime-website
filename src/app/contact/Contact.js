'use client';
import { Container, Flex, Group, Image, Stack, Text, Title, Box } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import Images from '../utils/image';
import { useMediaQuery } from '@mantine/hooks';

const Contact = () => {
  const actionStyle = {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: '8px 12px',
    margin: '-8px -12px', // Offset padding to maintain layout
    borderRadius: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(14, 201, 242, 0.1)',
      transform: 'translateX(5px)',
      '& .icon': {
        transform: 'scale(1.1)',
      },
      '& .text': {
        color: '#0EC9F2',
      }
    }
  };

  const isMobile = useMediaQuery('(max-width : 768px)')

  return (
    <Container fluid px={'7%'}>
      <Flex
        align={isMobile ? 'flex-start' : 'center'}
        direction={isMobile ? 'column-reverse' : 'row'}
        px={'auto'}
        justify={isMobile ? 'center' : 'space-between'}
        style={{
          color: 'white',
          height: '100vh',
        }}
      >
        <Stack p={isMobile ? 0 : 15} >
          <Title size={isMobile ? '26px' : '40px'} lh={'lgx2'} fw={800} tt={'uppercase'}>Contact Us</Title>
          <Text size={isMobile ? 'sm' : 'base'} lh={'28px'} tw='balance'>
            Ready to begin your journey with Pentagon Prime, have a question, or
            need assistance? <br />We're here to help.
          </Text>
          <Text size={isMobile ? '18px' : 'base'} fw={700}>Headquarters</Text>
          <Text size='sm' tw="balance" maw={isMobile ? '100%' : '70%'}>
            Unit No. 204 Satellite Silver, Marol Naka Andheri Kurla Road,
            <br />Andheri (East) Mumbai, Maharashtra – 400059, India
          </Text>
          <Text size='base' fw={700}>Phone & Email Address</Text>

          <Box style={actionStyle} onClick={() => window.open('tel:02245966999')}>
            <Group gap={10}>
              <IconPhone
                color="#0EC9F2"
                size={20}
                className="icon"
                style={{ transition: 'transform 0.3s ease' }}
              />
              <Text
                size='sm'
                className="text"
                style={{ transition: 'color 0.3s ease' }}
              >
                022 4596 6999
              </Text>
            </Group>
          </Box>

          <Box style={actionStyle} onClick={() => window.open('mailto:pentagon@pentagonindia.net')}>
            <Group gap={10}>
              <IconMail
                color="#0EC9F2"
                size={20}
                className="icon"
                style={{ transition: 'transform 0.3s ease' }}
              />
              <Text
                size='sm'
                className="text"
                style={{ transition: 'color 0.3s ease' }}
              >
                pentagon@pentagonindia.net
              </Text>
            </Group>
          </Box>
        </Stack>
        <Image h={isMobile ? '35%' : '80%'} fit='contain' src={Images.contact_vector} alt="pentagon logo" />
      </Flex>
    </Container>
  );
};

export default Contact;