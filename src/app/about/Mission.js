'use client'

import { Box, Container, Flex, Text, Title, BackgroundImage } from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { client } from '../api/contentful';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const Mission = () => {

  const [visionData, setVisionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'visionMission',
        });
        setVisionData(res.items);
      } catch (error) {
        console.error('Error fetching vision mission:', error);
      }
    };

    fetchData();
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container fluid px={'7%'} py={'50px'}>
      <Flex direction={'column'} gap={'xl'}>
        {visionData.map((item, index) => (
          <BackgroundImage
            key={index}
            src={isMobile ? item.fields.mobImage.fields.file.url : item.fields.image.fields.file.url}
            radius="30px"
            h={isMobile ? 'auto' : "350px"}
            style={{
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              c={COLORS.primaryColor}
              maw={isMobile ? '100%' : '60%'}
              ml={'auto'}
              mt={isMobile ? '70%' : 0}
              mb={isMobile && 50}
              p={isMobile ? '20px 10px' : '20px 30px'}
              style={{
                borderRadius: '10px',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Title fw={800} size={'lg'} tt={'uppercase'} c={COLORS.portColor}>
                {item.fields.title}
              </Title>
              <Text size="base" lh={'30px'} fw={400} tw="balance" w={isMobile ? '100%' : '80%'} mt={20}>
                {item.fields.content}
              </Text>
            </Box>
          </BackgroundImage>
        ))}
      </Flex>
    </Container>
  );
};

export default Mission;
