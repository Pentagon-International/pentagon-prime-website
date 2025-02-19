import {
  Box,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';

const QuoteCard = async () => {
  const res = await client.getEntries({
    content_type: 'logisticsTrade',
    order: 'sys.createdAt',
  });

  return (
    <Box mt={70} style={{ backgroundColor: '#111F40' }}>
      <Container fluid px="7%" py="lg">
        <Stack px={'10%'} py={'5%'} c={COLORS.primaryColor}>
          <Grid
            gutter={'10%'}
            columns={2}
            align={'center'}
            justify={'space-between'}
          >
            <GridCol span={1}>
              <Group>
                <Text size={'sm'} style={{ textWrap: 'balance' }}>
                  Flexport strategically places inventory close to our customer
                  demand, allowing us to deliver our shoes in 3 days or less
                  without our own operations team being involved. This has been
                  an absolute game-changer for the Kizik business.
                </Text>
                <Flex w={'100%'} align={'center'} justify={'space-between'}>
                  <Stack mt={20} gap={0}>
                    <Text size={'smx'} fw={700}>Jason Lee</Text>
                    <Text size={'xs'}>COO,Kizik</Text>
                  </Stack>
                  <Box bg={COLORS.primaryColor} p={5}>
                    <Text size={'sm'} c={COLORS.secondaryColor}>Kizik</Text>
                  </Box>
                </Flex>
              </Group>
            </GridCol>
            <GridCol span={1}>
              <Image src={Images.ship} alt="ship" />
            </GridCol>
          </Grid>

          <Flex mt={50} align={'center'} justify={'space-between'}>
            {res.items.map((item) => (
              <Stack gap={0} key={item.sys.id}>
                <Title size={'lg'} style={{ textTransform: 'uppercase' }} tt={'uppercase'}>
                  {item.fields.tradeValue}
                </Title>
                <Text size={'sm'}>{item.fields.tradeName}</Text>
              </Stack>
            ))}
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default QuoteCard;
