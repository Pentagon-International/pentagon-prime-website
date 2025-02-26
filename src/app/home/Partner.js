
// import { COLORS } from '@/app/utils/COLORS';
// import Images from '@/app/utils/image';
// import { Carousel, CarouselSlide } from '@mantine/carousel';
// import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';
// import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
// import React from 'react';
// import { client } from '../api/contentful';

// const styles = {
//   container: {
//     padding: '70px 7%',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     textTransform: 'uppercase',
//   },
//   carouselWrapper: {
//     marginTop: 50,
//     position: 'relative',
//   },
//   carouselSlide: {
//     width: '100%',
//     backgroundImage: `url(${Images.flight_blue})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '400px',
//     borderRadius: '10px',
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   testimonialBox: {
//     padding: '20px 30px',
//     borderRadius: '10px',
//     color: 'white',
//     maxWidth: '50%',
//     marginLeft: 'auto',
//     backdropFilter: 'blur(5px)',
//   },
// };

// const Partner = async ({ title, content }) => {

//   const res = await client.getEntries({
//     content_type: 'partners',
//     order: 'sys.createdAt',
//   });

//   return (
//     <Container fluid style={styles.container}>
//       <Flex style={styles.header}>
//         <Stack>
//           <Title size={'lg'} style={styles.title} fw={800}>{title}</Title>
//           <Text size='sm' fw={500}>
//             {content}
//           </Text>
//         </Stack>
//         <Button variant="outline" radius="md" fz={'sm'} size="lg" p={'16px 32px'} fw={700} color="#0E52F2">
//           Get In Touch
//         </Button>
//       </Flex>

//       <Box style={styles.carouselWrapper}>
//         <Carousel
//           slideSize="100%"
//           slideGap="xs"
//           controlsOffset="lg"
//           controlSize={32}
//           loop
//           dragFree={false}
//           align="start"
//           px={15}
//           nextControlIcon={<IconChevronRight size={24} color={COLORS.serviceColor} />}
//           previousControlIcon={<IconChevronLeft size={24} color={COLORS.serviceColor} />}
//         >
//           <CarouselSlide>
//             <Flex style={styles.carouselSlide}>
//               <Box style={styles.testimonialBox}>
//                 <Text size='sm' maw={'80%'} tw="balance">
//                   We sincerely appreciate your exceptional customer service,
//                   handling challenging issues, and the professional way you
//                   conduct business. Your cooperative spirit and attention to
//                   detail helped us streamline the process and achieve our goals.
//                   Thank you to the entire team for completing every shipment
//                   ahead of schedule and under budget.
//                 </Text>
//                 <Text size='sm' fw={700} c={COLORS.portColor} mt={20}>
//                   Hero MotoCorp
//                 </Text>
//               </Box>
//             </Flex>
//           </CarouselSlide>
//           <CarouselSlide>
//             <Flex style={styles.carouselSlide}>
//               <Box style={styles.testimonialBox}>
//                 <Text size='sm' maw={'80%'} tw="balance">
//                   We sincerely appreciate your exceptional customer service,
//                   handling challenging issues, and the professional way you
//                   conduct business. Your cooperative spirit and attention to
//                   detail helped us streamline the process and achieve our goals.
//                   Thank you to the entire team for completing every shipment
//                   ahead of schedule and under budget.
//                 </Text>
//                 <Text size='sm' fw={700} c={COLORS.portColor} mt={20}>
//                   Hero MotoCorp
//                 </Text>
//               </Box>
//             </Flex>
//           </CarouselSlide>
//         </Carousel>
//       </Box>
//     </Container>
//   );
// };

// export default Partner;


import { COLORS } from '@/app/utils/COLORS';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React from 'react';
import { client } from '../api/contentful';

const styles = {
  container: {
    padding: '70px 7%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'uppercase',
  },
  carouselWrapper: {
    marginTop: 50,
    position: 'relative',
  },
  carouselSlide: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  testimonialBox: {
    padding: '20px 30px',
    borderRadius: '10px',
    color: 'white',
    maxWidth: '50%',
    marginLeft: 'auto',
    backdropFilter: 'blur(5px)',
  },
};

const Partner = async ({ title, content }) => {
  const res = await client.getEntries({
    content_type: 'partners',
    order: 'sys.createdAt',
  });
  return (
    <Container fluid style={styles.container}>
      <Flex style={styles.header}>
        <Stack>
          <Title size={'lg'} style={styles.title} fw={800}>{title}</Title>
          <Text size='sm' fw={500}>
            {content}
          </Text>
        </Stack>
        <Button variant="outline" radius="md" fz={'sm'} size="lg" p={'16px 32px'} fw={700} color="#0E52F2">
          Get In Touch
        </Button>
      </Flex>

      <Box style={styles.carouselWrapper}>
        <Carousel
          slideSize="100%"
          slideGap="xs"
          controlsOffset="lg"
          controlSize={32}
          loop
          dragFree={false}
          align="start"
          px={15}
          nextControlIcon={<IconChevronRight size={24} color={COLORS.serviceColor} />}
          previousControlIcon={<IconChevronLeft size={24} color={COLORS.serviceColor} />}
        >
          {res.items.map((item, index) => (
            <CarouselSlide key={index}>
              <Flex
                style={{
                  ...styles.carouselSlide,
                  backgroundImage: `url(${item.fields.image.fields.file.url})`,
                }}
              >
                <Box style={styles.testimonialBox}>
                  <Text size='sm' maw={'80%'} tw="balance">
                    {item.fields.content}
                  </Text>
                  <Text size='sm' fw={700} c={COLORS.portColor} mt={20}>
                    {item.fields.shortvalue}
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
