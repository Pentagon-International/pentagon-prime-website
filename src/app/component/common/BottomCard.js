'use client';
import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

const BottomCard = ({ title, text, button }) => {
  const router = useRouter();

  const isMobile = useMediaQuery('(max-width: 768px)');

  const rootToWhatsApp = () => {
    const isAndroid = /android/i.test(navigator.userAgent);
  
    // console.log("Is Android:", isAndroid);
    const whatsappURL = isAndroid
      ? `intent://send/?phone=917400425960#Intent;scheme=smsto;package=com.whatsapp;end`
      : `https://wa.me/917400425960`;
  
    // window.location.href = whatsappURL;
      window.open(whatsappURL, '_blank');
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${Images.tradeCard_background2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: isMobile ? '2px' : '30px',
      }}
    >
      <Container fluid px="7%" py="lg">
        <Flex direction={isMobile ? 'column' : 'row'} align={'center'} justify={'space-between'}>
          <Stack>
            <Title ta={isMobile && 'center'} size={'lg'} tt={'uppercase'}>{title}</Title>
            <Text ta={isMobile && 'center'} size='sm' c={COLORS.textColor}>{text}</Text>
          </Stack>
          <Button mt={isMobile && '20px'} fz={'sm'} size='lg' fw={600} bg={COLORS.serviceColor}
            onClick={() => rootToWhatsApp()}
          >
            {button}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomCard;