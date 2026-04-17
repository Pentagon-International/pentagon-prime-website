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
      }}
    >
      <Container fluid px="2%" py="lg">
        <Flex direction={isMobile ? 'column' : 'row'} align={'center'} gap={20} justify={'space-between'}>
          <Stack>
            <Title ta={isMobile && 'center'} size={'lg'} tt={'uppercase'}>{title}</Title>
            <Text ta={isMobile && 'center'} size='sm' c={COLORS.textColor}>{text}</Text>
          </Stack>
          <Button style={{width: 'fit-content', flexShrink: 0}} fz={'sm'} size='lg' fw={600} bg={COLORS.serviceColor}
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