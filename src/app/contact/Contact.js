'use client';
import { Container, Flex, Group, Image, Stack, Text, Title, Box } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import Images from '../utils/image';

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
          <Text size='base' lh={'28px'} tw='balance'>
            Ready to begin your journey with Pentagon Prime, have a question, or
            need assistance? We're here to help.
          </Text>
          <Text size='base' fw={700}>Headquarters</Text>
          <Text size='sm' tw="balance" maw={'70%'}>
            Unit No. 204 Satellite Silver, Marol Naka Andheri Kurla Road,
            Andheri (east) Mumbai, Maharashtra – 400059, India
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
        <Image h={'80%'} src={Images.contact_vector} alt="pentagon logo" />
      </Flex>
    </Container>
  );
};

export default Contact;