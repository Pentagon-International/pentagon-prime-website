// 'use client';

// import { useState, useEffect } from 'react';
// import { COLORS } from '@/app/utils/COLORS';
// import { Carousel, CarouselSlide } from '@mantine/carousel';
// import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';
// import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
// import { useRouter } from 'next/navigation';
// import { client } from '../api/contentful';
// import { highlightText } from '../utils/highlightText';
// import { useMediaQuery } from '@mantine/hooks';

// const Partner = ({ title, content }) => {
//   const [partners, setPartners] = useState([]);
//   const router = useRouter();

//   const isMobile = useMediaQuery('(max-width:768px)')


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await client.getEntries({
//           content_type: 'partners',
//           order: 'sys.createdAt',
//         });
//         setPartners(res.items);
//       } catch (error) {
//         console.error('Error fetching partners:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Container px={'7%'} py={'70px'} fluid>
//       <Flex align={'center'} justify={'space-between'} direction={isMobile ? 'column' : 'row'}>
//         <Stack>
//           <Title size="lg" tt={'uppercase'} fw={800}>
//             {highlightText(title)}
//           </Title>
//           <Text size="sm" fw={500}>
//             {highlightText(content)}
//           </Text>
//         </Stack>
//         <Button fz={'sm'} variant="outline" size='lg' radius={'12px'} fw={600} c={COLORS.serviceColor}
//           fullWidth={isMobile ? true : false}
//           mt={isMobile ? 25 : 0}
//           onClick={() => router.push('/contact')}
//         >
//           Get In Touch
//         </Button>
//       </Flex>

//       <Box mt={50} pos={'relative'} p={20} w={'90%'} m={'0 auto'} >
//         <Carousel
//           slideSize="100%"
//           slideGap="xs"
//           controlsOffset={0}
//           controlSize={35}
//           dragFree={false}
//           containScroll="trimSnaps"
//           align="start"
//           nextControlIcon={<IconArrowNarrowRight style={{ backgroundColor: COLORS.primaryColor }} size={22} color={COLORS.secondaryColor} />}
//           previousControlIcon={<IconArrowNarrowLeft style={{ backgroundColor: COLORS.primaryColor }} size={22} color={COLORS.secondaryColor} />}
//         >
//           {partners.map((item, index) => (
//             <CarouselSlide key={index}>
//               <Flex
//                 w={'100%'}
//                 bgsz={'cover'}
//                 bgp={'center'}
//                 h={'350px'}
//                 align={'center'}
//                 pos={'relative'}
//                 style={{
//                   borderRadius: '54px',
//                   overflow: 'hidden',
//                   backgroundImage: `url(${item.fields.image.fields.file.url})`,
//                   transform: isMobile ? 'rotate(90deg)' : 'none',

//                 }}
//               >
//                 <Box p={20} c={COLORS.primaryColor} maw={'65%'} ml={'auto'} style={{
//                   borderRadius: '10px',
//                   backdropFilter: 'blur(5px)',
//                 }}>
//                   <Text size='16px' lh={'sm'} maw={'90%'} tw="balance">
//                     {highlightText(item.fields.content)}
//                   </Text>
//                   <Text size="base" fw={700} c={COLORS.portColor} mt={20}>
//                     {highlightText(item.fields.shortvalue)}
//                   </Text>
//                 </Box>
//               </Flex>
//             </CarouselSlide>
//           ))}
//         </Carousel>
//       </Box>
//     </Container>
//   );
// };

// export default Partner;




'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/app/utils/COLORS';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { client } from '../api/contentful';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';

const Partner = ({ title, content }) => {
  const [partners, setPartners] = useState([]);
  const router = useRouter();

  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'partners',
          order: 'sys.createdAt',
        });
        setPartners(res.items);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container px={'7%'} py={'70px'} fluid>
      <Flex align={'center'} justify={'space-between'} direction={isMobile ? 'column' : 'row'}>
        <Stack>
          <Title size="lg" tt={'uppercase'} fw={800}>
            {highlightText(title)}
          </Title>
          <Text size="sm" fw={500}>
            {highlightText(content)}
          </Text>
        </Stack>
        <Button
          fz={'sm'}
          variant="outline"
          size="lg"
          radius={'12px'}
          fw={600}
          c={COLORS.serviceColor}
          fullWidth={isMobile ? true : false}
          mt={isMobile ? 25 : 0}
          onClick={() => router.push('/contact')}
        >
          Get In Touch
        </Button>
      </Flex>

      <Box mt={50} pos={'relative'} p={20} w={'90%'} m={'0 auto'}>
        <Carousel
          slideSize="100%"
          slideGap="xs"
          controlsOffset={0}
          controlSize={35}
          dragFree={false}
          containScroll="trimSnaps"
          align="start"
          nextControlIcon={<IconArrowNarrowRight style={{ backgroundColor: COLORS.primaryColor }} size={22} color={COLORS.secondaryColor} />}
          previousControlIcon={<IconArrowNarrowLeft style={{ backgroundColor: COLORS.primaryColor }} size={22} color={COLORS.secondaryColor} />}
        >
          {partners.map((item, index) => (
            <CarouselSlide key={index}>
              <Flex
                w={'100%'}
                h={isMobile ? '100%' : '350px'}
                align={'center'}
                pos={'relative'}
                direction={isMobile ? 'column' : 'row'}
                className='border-2 border-amber-500'
                style={{
                  borderRadius: isMobile ? '22px' : '54px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Box
                  pos={'absolute'}
                  top={0}
                  left={0}
                  w={'100%'}
                  h={'100%'}
                  style={{
                    backgroundImage: `url(${item.fields.image.fields.file.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: isMobile ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
                <Box
                  p={20}
                  c={COLORS.primaryColor}
                  maw={'65%'}
                  ml={'auto'}
                  style={{
                    borderRadius: '10px',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1,
                  }}
                >
                  <Text size="16px" lh={'sm'} maw={'90%'} tw="balance">
                    {highlightText(item.fields.content)}
                  </Text>
                  <Text size="base" fw={700} c={COLORS.portColor} mt={20}>
                    {highlightText(item.fields.shortvalue)}
                  </Text>
                </Box>
              </Flex>
              
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default Partner;
