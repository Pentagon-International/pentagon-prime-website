'use client'

import {
  Card,
  CardSection,
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { client } from '../api/contentful';
import Images from '../utils/image';
import { COLORS } from '../utils/COLORS';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';

const Members = () => {


  const [members, setMembers] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'members',
          order: 'sys.createdAt',
        });
        setMembers(res.items);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };
    fetchData();

  }, [])

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container fluid px={'7%'} py={'lg'} my={90}>
      <Flex direction={isMobile ? 'column' : 'row'} justify="center" align="center" style={{ width: '100%' }}>
        <Card
          bg={'#F2F7FC'}
          padding="lg"
          radius="lg"
          style={{
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <Grid gutter="60" dir={isMobile ? 'column' : 'row'} align="center">
            <GridCol span={isMobile ? 12 : 6}>
              <CardSection>
                <Image
                  src={Images.chairman}
                  alt="PentagonPrime Logo"
                  style={{
                    width: isMobile ? '100%' : '80%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </CardSection>
            </GridCol>
            <GridCol span={isMobile ? 12 : 6}>
              <Stack spacing="md">
                <Text size="base" fw={700}>
                  Mr. Paresh Bhanushali
                </Text>
                <Text size="sm" c={COLORS.textColor}>
                  Chairman and Managing Director
                  <br /> Pentagon Group of Companies
                </Text>
              </Stack>
              <Stack spacing="md" mt={'md'}>
                <Text size="base" fw={700}>
                  Message from the Chairman
                </Text>
                <Text size="sm" tw='balance' c={COLORS.textColor}>
                  “It is about the strive to keep growing… Once you get hold of
                  that feeling, never let it go and just keep moving forward!”
                </Text>
              </Stack>
            </GridCol>
          </Grid>
        </Card>
      </Flex>

      <Flex justify="center" my={50}>
        <Title size={isMobile ? '30px' : '40px'} fw={800} tt={'uppercase'} lh={'lgx2'}>
          Management Team
        </Title>
      </Flex>

      <Grid columns={3} px={isMobile ? 0 : 100}>
        {
          isMobile ? (
            <Carousel align={'start'} slideSize="70%" height={'auto'} w={'100%'} slideGap="xs" loop
              styles={{
                controls: {
                  display: 'none',
                  visibility: 'hidden',
                  opacity: 0,
                  pointerEvents: 'none',
                }
              }}
            >
              {members.map((item) => (
                <Carousel.Slide w={'100%'} key={item.sys.id}>
                  <GridCol w={'100%'} span={12}>
                    <Image
                      radius={'lg'}
                      w={'100%'}
                      h={'100%'}
                      src={item.fields.image?.fields?.file?.url}
                      alt={item.fields.name}
                    />
                    <Text fw={700} size="md" mt={'md'}>
                      {item.fields.name}
                    </Text>
                    <Text size="sm" c={COLORS.textColor}>
                      {item.fields.role}
                    </Text>
                  </GridCol>
                </Carousel.Slide>
              ))}
            </Carousel>
          ) :

            members.map((item) => (
              <GridCol key={item.sys.id} span={1} mb={'xl'}>
                <Image
                  radius={'lg'}
                  style={{ width: '80%', height: '80%', objectFit: 'cover' }}
                  src={item.fields.image?.fields?.file?.url}
                  alt={item.fields.name}
                />
                <Text fw={700} size="md" mt={'md'}>
                  {item.fields.name}
                </Text>
                <Text size="sm" c={COLORS.textColor}>
                  {item.fields.role}
                </Text>
              </GridCol>
            ))
        }
      </Grid>
    </Container>
  );
};

export default Members;
