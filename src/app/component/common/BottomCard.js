import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';

const BottomCard = ({ title, text, button }) => {
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
          <Button fz={'sm'} p={'24px 32px'} bg={COLORS.serviceColor} size="xl">
            {button}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomCard;
