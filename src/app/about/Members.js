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
import { theme } from '../utils/theme';

const Members = () => {


  const [members, setMembers] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'members',
          order: 'fields.order',
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
    <Container fluid px={'7%'} pb={'lg'} my={0}>
      <Flex justify="center" my={50}>
      <Title tt={'uppercase'} fw={800} lh={'lgx2'} size={  isMobile ? '28px' : '40px'}>
        {/* <Title size={isMobile ? '30px' : '40px'} fw={800} tt={'uppercase'} lh={'lgx2'}> */}
          Message from the chairman
        </Title>
      </Flex>
      <Flex direction={isMobile ? 'column' : 'row'} justify="center" align="center" style={{ width: '100%' }}>
        <Card
          bg={'#F2F7FC'}
          padding="lg"
          radius="lg"
          style={{
            maxWidth: '1000px',
            width: '100%',
          }}
        >
          <Grid gutter="60" dir={isMobile ? 'column' : 'row'} align="center">
            <GridCol span={isMobile ? 12 : 5} pr={0}>
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
            <GridCol span={isMobile ? 12 : 7} pl={0} pr={65} >
              <Stack spacing="md">
                <Text size={theme?.fontSizes?.lgx} lh={'md'} mt={-10} tw='balance' fs={'italic'} c={COLORS.textColor} ta={'justify'}>
                  “It is about the strive to keep growing. Once you get hold of
                  that feeling, never let it go and just keep moving forward!”
                </Text>
              </Stack>
              <Flex>
                {/* <Grid mt={'md'}>
                <Grid.Col span={4} p={0}>
                  <Text size="md" fw={700} ta={'right'}>
                    -
                  </Text>
                </Grid.Col>
                <Grid.Col span={8} p={0}>
                  <Text size="md" fw={700} ta={'right'}>
                    Mr. Paresh Bhanushali
                  </Text>
                </Grid.Col>
                <Grid.Col span={4} p={0}>
                  <></>
                </Grid.Col>
                <Grid.Col span={8} p={0} mt={'xs'}>
                  <Text size="sm" c={COLORS.textColor}>
                    Chairman and Managing Director
                    <br />Pentagon Group of Companies
                  </Text>
                </Grid.Col>
              </Grid> */}
                <Stack spacing="md" mt={'xl'}>
                  <Text size={theme?.fontSizes?.lgx} fw={600} >
                    Paresh Bhanushali
                  </Text>
                  <Text size={theme?.fontSizes?.md} mt={-10} c={COLORS.textColor} lh={1.5}>
                    Chairman and Managing Director
                    <br />Pentagon Group of Companies
                  </Text>
                </Stack>
              </Flex>

            </GridCol>
          </Grid>
        </Card>
      </Flex>

      <Flex justify="center" my={50}>
        <Title size={isMobile ? '30px' : '40px'} fw={800} tt={'uppercase'} lh={'lgx2'}>
          OUR Team
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
