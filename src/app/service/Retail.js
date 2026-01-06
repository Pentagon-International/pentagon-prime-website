'use client'
import { Container, Divider, Flex, Grid, Group, Image, Text, Title } from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import ServiceCard from '../component/common/ServiceCard';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState, memo, useMemo } from 'react';
import { Carousel } from '@mantine/carousel';

const Retail = ({ first_title, first_content, second_title, second_content, illustration }) => {
  const [serviceData, setServiceData] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const imageSrc = useMemo(() => 
    isMobile ? Images.mob_prime_network : illustration,
    [isMobile, illustration]
  );

  const imageStyle = useMemo(() => ({
    position: 'relative',
    maxWidth: !isMobile && '50%',
  }), [isMobile]);

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
    // <Container fluid px={isMobile ? '6%' : '7%'}>
    //   <Group h={isMobile ? '' : '90vh'} mt={isMobile ? 'xl' : 0} style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'flex-start', justifyContent: isMobile && 'center' }}>
    //     <Flex justify={'center'} direction={'column'} h={'100%'}> 
    //       <Title size={'lg'} fw={800} lh={'lgx2'} tt={'uppercase'} tw="balance" w={!isMobile && '40%'} >
    //         {highlightText(first_title)}
    //       </Title>
    //       <Text size='sm' mt={10} c={COLORS.textColor} w={isMobile ? '100%' : '50%'} lh={isMobile ? '24px' : ''}>
    //         {highlightText(first_content)}
    //       </Text>
    //     </Flex>
    //     <Image src={isMobile ? Images.mob_prime_network : Images.pentagon_zig_zag} w={isMobile ? '100%' : '50%'} mx={'auto'} alt="prime_network" />
    //   </Group>
    <Container fluid px="2%" py="70px" my={40} pb={0} >
      <Flex gap="md" wrap="nowrap" direction={isMobile ? 'column' : 'row'} >
        <Flex direction={'column'} >
          <Title tt="uppercase" fw={800}>
            {highlightText(first_title)}
          </Title>          
          <Text size={18} c={COLORS.textColor} lh="sm"  maw={ isMobile ? '100%' : '90%'} mt={'lg'} >
            {highlightText(first_content)}
          </Text>
        </Flex>

        <Image
          src={imageSrc}
          alt="prime_network"
          h={isMobile ? "auto" : "auto"}
          w={isMobile ? "100%" : "40%"}
          mt={isMobile ? 70 : 0}
          fit={'contain'}
          style={imageStyle}
        />
      </Flex>
    </Container>
  );
};

export default memo(Retail);
