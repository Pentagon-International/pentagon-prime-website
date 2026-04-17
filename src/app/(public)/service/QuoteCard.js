'use client'
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
import { client } from '@/lib/api/contentful';
import { COLORS } from '@/app/utils/COLORS';
import { TYPOGRAPHY } from '@/app/utils/TYPOGRAPHY';
import Images from '@/app/utils/image';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const QuoteCard = () => {
  const [serviceData, setServiceData] = useState([]);
  const [quoteData, setQuoteData] = useState({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'logisticsTrade',
          order: 'sys.createdAt',
        });

        const quoteRes = await client.getEntries({
          content_type: 'quote',
          order: 'sys.createdAt',
        });
        setServiceData(res.items || []);
        const {
          quote,
          authorName,
          role,
          companyName
        } = quoteRes.items[0].fields;
        setQuoteData({
          quote,
          authorName,
          role,
          companyName
        } || {});
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
    fetchServiceData();
  }, []);

  return (
    <Box mt={70} style={{ backgroundColor: '#111F40' }}>
      <Container fluid px={"2%"} py="lg">
        {isMobile ? (
          <Box>
            <div style={{ backgroundImage: `url(${Images.quote})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '30px', height: '30px' }} />
            <Text mt={20} style={{ textWrap: 'balance', fontSize: isMobile ? TYPOGRAPHY.body.normal : TYPOGRAPHY.h5.desktop, color: "white" }}>
              {quoteData?.quote}
            </Text>
            <Flex w={'100%'} align={'flex-end'} justify={'space-between'}>
              <Stack mt={20} gap={0}>
                <Text size={'base'} fw={700} c={'white'}>{quoteData?.authorName}</Text>
                <Text size={'sm'} c={'white'}>{quoteData?.role}</Text>
              </Stack>
              {/* <Box bg={COLORS.primaryColor} p={'5px 10px'}>
                <Text size={'sm'} c={COLORS.secondaryColor}>{quoteData?.companyName}</Text>
              </Box> */}
            </Flex>
            <Image src={Images.ship} alt="ship" mt={isMobile ? 'xl' : 'md'} />

            <Grid mt={30} mb={100} gutter={30} w={'100%'} justify='space-between' align={'center'}>
              {serviceData.map((item) => (
                <Grid.Col key={item.sys.id} span={6}>
                  <Stack gap={5} align='center' key={item.sys.id}>
                    <Title size={'lg'} tt={'uppercase'} c={'white'}>
                      {item.fields.tradeValue}
                    </Title>
                    <Text size={'xs'} c={'white'}>{item.fields.tradeName}</Text>
                  </Stack>
                </Grid.Col>
              ))}
            </Grid>
          </Box>
        ) : (
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
                  <Text mt={20} style={{ textWrap: 'balance', fontSize: TYPOGRAPHY.h5.desktop }}>
                    {quoteData?.quote}
                  </Text>
                  <Flex w={'100%'} align={'flex-end'} justify={'space-between'}>
                    <Stack mt={20} gap={0}>
                      <Text size={'base'} fw={700}>{quoteData?.authorName}</Text>
                      <Text size={'sm'}>{quoteData?.role}</Text>
                    </Stack>
                    <Box bg={COLORS.primaryColor} p={'5px 10px'}>
                      <Text size={'sm'} c={COLORS.secondaryColor}>{quoteData?.companyName}</Text>
                    </Box>
                  </Flex>
                </Group>
              </GridCol>
              <GridCol span={1}>
                <Image src={Images.ship} alt="ship" />
              </GridCol>
            </Grid>

            {/* {isMobile ? (

            ) : ( */}
            <Flex mt={50} align={'center'} justify={'space-between'} >
              {serviceData.map((item) => (
                <Stack gap={0} key={item.sys.id} w={isMobile ? '50%' : ''}>
                  <Title size={'lg'} tt={'uppercase'}>
                    {item.fields.tradeValue}
                  </Title>
                  <Text size={'sm'}>{item.fields.tradeName}</Text>
                </Stack>
              ))}
            </Flex>
            {/* )} */}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default QuoteCard;
