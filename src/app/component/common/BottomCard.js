import {COLORS} from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import {Box, Button, Container, Flex, Stack, Text, Title} from '@mantine/core';

const BottomCard = ({title, text, button}) => {
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
            <Title style={{textTransform: 'uppercase'}}>{title}</Title>
            <Text>{text}</Text>
          </Stack>
          <Button bg={COLORS.serviceColor} size="lg">
            {button}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomCard;
