'use client';

import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

const BottomCard = ({ title, text, button }) => {

  const router = useRouter();
  return (
    <Box
      mt={20}
      style={{
        backgroundImage: `url(${Images.tradeCard_background2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '30px',
      }}
    >
      <Container fluid px="7%" py="lg">
        <Flex align={'center'} justify={'space-between'}>
          <Stack>
            <Title size={'lg'} tt={'uppercase'}>{title}</Title>
            <Text size='sm' c={COLORS.textColor}>{text}</Text>
          </Stack>
          <Button fz={'sm'} size='lg' fw={600} bg={COLORS.serviceColor}
            onClick={() => router.push('/contact')}
          >
            {button}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomCard;
