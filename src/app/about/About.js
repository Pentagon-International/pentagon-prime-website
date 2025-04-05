'use client'
import { Box, Container, Group, Image, Text, Title } from '@mantine/core';
import Images from '../utils/image';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';

const About = ({ title, content }) => {

  const isMobile = useMediaQuery('(max-width:768px)')


  return (
    <Box h={'100vh'} pos={'relative'} style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      <Container
        fluid
        px={'7%'}
        h="100%"
      >
        <Box w={'100%'} h={'100%'} pos={'relative'} style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          zIndex: 2,
        }}>
          <Box w={isMobile ? '100%' : '50%'} pr={'5%'} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            <Title
              size={isMobile ? '28px' : "40px"}
              textWrap="balance"
              tt="uppercase"
              style={{
                whiteSpace: 'pre-line',
                lineHeight: 1.2,
                color: '#000'
              }}
            >
              {highlightText(title)}
            </Title>
            <Text
              size='sm'
              style={{
                lineHeight: 1.6,
                maxWidth: isMobile ? '100%' : '90%',
                color: '#666'
              }}
            >
              {highlightText(content)}
            </Text>
          </Box>

          <Box pos={!isMobile && "absolute"} mt={isMobile && 50} top={isMobile ? 0 :'60px'} right={0} h="100%" w={isMobile ? "100%" : "60%"}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}>
            <Image
              w={isMobile ? "100%" : "100%"}
              h="auto"
              alt="PentagonPrime Logo"
              pos={'relative'}
              mr={isMobile ? 0 : '-16%'}
              src={Images.pentagon_line}
              fit="contain"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
