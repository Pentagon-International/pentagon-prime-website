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

  const quoteData = await client.getEntries({
    content_type: 'quote',
    order: 'sys.createdAt',
  });

  const {
    quote,
    authorName,
    role,
    companyName
  } = quoteData.items[0].fields;

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
              <Group gap={0}>
                <div style={{ backgroundImage: `url(${Images.quote})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '30px', height: '30px' }} />
                <Text mt={20} style={{ textWrap: 'balance', fontSize: '20px' }}>
                  {quote}
                </Text>
                <Flex w={'100%'} align={'flex-end'} justify={'space-between'}>
                  <Stack mt={20} gap={0}>
                    <Text size={'base'} fw={700}>{authorName}</Text>
                    <Text size={'sm'}>{role}</Text>
                  </Stack>
                  <Box bg={COLORS.primaryColor} p={'5px 10px'}>
                    <Text size={'sm'} c={COLORS.secondaryColor}>{companyName}</Text>
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
                <Title size={'lg'} tt={'uppercase'}>
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
