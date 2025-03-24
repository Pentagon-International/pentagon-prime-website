'use client'
import { Container, Grid, Group, Image, Text, Title } from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import ServiceCard from '../component/common/ServiceCard';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';

const Retail = ({ first_title, first_content, second_title, second_content }) => {
  const [serviceData, setServiceData] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'itworks',
          order: 'sys.createdAt',
        });
        setServiceData(res.items || []);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
    fetchServiceData();
  }, []);

  return (
    <Container fluid px={isMobile ? '6%' : '7%'}>
      <Group h={isMobile ? '' : '90vh'} mt={isMobile ? 'xl' : 0} style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Title size={'lg'} fw={800} lh={'lgx2'} tt={'uppercase'} tw="balance">
          {highlightText(first_title)}
        </Title>
        <Text size='sm' mt={10} c={COLORS.textColor} w={isMobile ? '100%' : '35vw'} lh={isMobile ? '24px' : ''}>
          {highlightText(first_content)}
        </Text>
        <Image src={isMobile ? Images.mob_prime_network : Images.prime_network} w={isMobile ? '100%' : '75%'} mx={'auto'} alt="prime_network" />
      </Group>
      <Group mb={120} mt={isMobile ? '100px' : 0} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Title size={'lg'} fw={800} mt={10} tt={'uppercase'} textWrap="balance">
          {highlightText(second_title)}
        </Title>
        <Text size='sm' c={COLORS.textColor}>
          {highlightText(second_content)}
        </Text>
        <Grid mt="xl" w={"100%"}>
          {isMobile ? (
            <Carousel slideSize="80%" height={250} w={'100%'} align={'start'} loop slideGap="md" withControls={false}>
              {serviceData.map((item) => (
                <Carousel.Slide key={item.sys.id}>
                  <ServiceCard item={item} backgroundColor={'#fff'} isMobile={isMobile} />
                </Carousel.Slide>
              ))}
            </Carousel>
          ) :
            serviceData.map((item) => (
              <ServiceCard key={item.sys.id} item={item} backgroundColor={'#fff'} />
            ))
          }
        </Grid>
      </Group>
    </Container>
  );
};

export default Retail;
