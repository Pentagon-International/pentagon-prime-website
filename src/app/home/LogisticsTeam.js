// import { client } from '@/app/api/contentful';
// import { COLORS } from '@/app/utils/COLORS';
// import { highlightText } from '@/app/utils/highlightText';
// import {
//   Container,
//   Flex,
//   Grid,
//   GridCol,
//   Image,
//   Text,
//   Title,
//   Box,
// } from '@mantine/core';
// import React from 'react';

// const TeamMember = ({ image, title, description, reverse }) => {
//   const imageUrl = image ? `https:${image}` : '/placeholder.jpg'; 

//   return (
//     <Grid py={'xl'}>
//       {!reverse && (
//         <GridCol mt={'xs'} span={6}>
//           <Box pos="relative" w="100%">
//             <Image
//               src={imageUrl}
//               alt={title || 'Team Member'}
//               style={{
//                 position: 'relative',
//                 width: '90%',
//                 height: '250px',
//                 right : 0,
//                 borderRadius: '12px',
//                 objectFit: 'cover',
//                 zIndex: 1, 
//               }}
//             />
//             <Box
//               w={'80%'}
//               h={'300px'}
//               style={{
//                 position: 'absolute',
//                 backgroundColor: COLORS.globalCardBackground,
//                 top: '-51px',
//                 left: '-56px',
//                 bottom: '51px',
//                 borderRadius: '8px',
//                 zIndex: 0, 
//               }}
//             />
//           </Box>
//         </GridCol>
//       )}
//       <GridCol span={6}>
//         <Title textWrap="balance" tt="uppercase" fw={800} lh="lgx" size="lgx2" style={{ color: 'black' }}>
//           {highlightText(title)}
//         </Title>
//         <Text mt={10} size="sm" lh="sm">
//           {highlightText(description)}
//         </Text>
//       </GridCol>
//       {reverse && (
//         <GridCol mt={30} span={6}>
//            <Box pos="relative" w="100%">
//             <Image
//               src={imageUrl}
//               alt={title || 'Team Member'}
//               style={{
//                 position: 'relative',
//                 width: '90%',
//                 height: '300px',
//                 right : 0,
//                 borderRadius: '12px',
//                 objectFit: 'cover',
//                 zIndex: 1, 
//               }}
//             />
//             <Box
//               w={'80%'}
//               h={'300px'}
//               style={{
//                 position: 'absolute',
//                 backgroundColor: COLORS.globalCardBackground,
//                 top: '-51px',
//                 left: '-56px',
//                 bottom: '51px',
//                 borderRadius: '8px',
//                 zIndex: 0, 
//               }}
//             />
//           </Box>
//         </GridCol>
//       )}
//     </Grid>
//   );
// };

// const LogisticsTeam = async ({ title, content }) => {
//   const res = await client.getEntries({
//     content_type: 'logisticsTeam',
//     order: 'sys.createdAt',
//   });

//   return (
//     <Container fluid px={'7%'} py={'70px'}>
//       <Title size={'lg'} lh={'lgx2'} tt={'uppercase'} fw={800}>
//         {highlightText(title)}
//       </Title>
//       <Text size="sm" maw={'55%'} fw={500} c={COLORS.textColor}>
//         {highlightText(content)}
//       </Text>
//       <Flex style={{border : '1px solid red'}} wrap="wrap" align="center" mt="60px" justify="center" gap="md">
//         {res.items?.map((item, index) => {
//           const imageUrl = item.fields.logisticsTeamImage?.fields?.file?.url || item.fields.imageUrl || null;
//           return (
//             <TeamMember
//               key={index}
//               image={imageUrl}
//               title={item.fields.teamTitle}
//               description={item.fields.teamDescription}
//               reverse={index % 2 !== 0}
//             />
//           );
//         })}
//       </Flex>
//     </Container>
//   );
// };

// export default LogisticsTeam;


import { client } from '@/app/api/contentful';
import { COLORS } from '@/app/utils/COLORS';
import { highlightText } from '@/app/utils/highlightText';
import {
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Text,
  Title,
  Box,
} from '@mantine/core';
import React from 'react';

const TeamMember = ({ image, title, description, reverse }) => {
  const imageUrl = image ? `https:${image}` : '/placeholder.jpg';

  return (
    <Grid py={50} align="center">
      {!reverse && (
        <GridCol px={'xl'} span={6}>
          <Box pos="relative" w="90%" h="280px">
            <Box
              w={'100%'}
              h={'100%'}
              style={{
                position: 'absolute',
                backgroundColor: COLORS.globalCardBackground,
                borderRadius: '12px',
                zIndex: 0,
              }}
            />
            <Image
              src={imageUrl}
              alt={title || 'Team Member'}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
                position: 'relative',
                top : '51px',
                left : '56px',
                zIndex: 1,
              }}
            />
          </Box>
        </GridCol>
      )}
      <GridCol px={'xl'} span={6}>
        <Title tt="uppercase" fw={800} lh="lgx2" size="lg" style={{ color: 'black' }}>
          {highlightText(title)}
        </Title>
        <Text mt={10} c={COLORS.textColor} maw={'80%'}  size="base" lh="sm">
          {highlightText(description)}
        </Text>
      </GridCol>
      {reverse && (
        <GridCol px={'xl'} span={6}>
          <Box pos="relative" w="90%" h="280px">
            <Box
              w={'100%'}
              h={'100%'}
              style={{
                position: 'absolute',
                backgroundColor: COLORS.globalCardBackground,
                borderRadius: '12px',
                zIndex: 0,
              }}
            />
            <Image
              src={imageUrl}
              alt={title || 'Team Member'}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
                position: 'relative',
                top : '51px',
                left : '56px',
                zIndex: 1,
              }}
            />
          </Box>
        </GridCol>
      )}
    </Grid>
  );
};

const LogisticsTeam = async ({ title, content }) => {
  const res = await client.getEntries({
    content_type: 'logisticsTeam',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Title  size={'lg'} lh={'lgx2'} tt={'uppercase'} fw={800}>
        {highlightText(title)}
      </Title>
      <Text size="sm" maw={'55%'} fw={500} c={COLORS.textColor}>
        {highlightText(content)}
      </Text>
      <Flex wrap="wrap" align="center" mt="30px" justify="center" gap="md">
        {res.items?.map((item, index) => {
          const imageUrl = item.fields.logisticsTeamImage?.fields?.file?.url || item.fields.imageUrl || null;
          return (
            <TeamMember
              key={index}
              image={imageUrl}
              title={item.fields.teamTitle}
              description={item.fields.teamDescription}
              reverse={index % 2 !== 0}
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export default LogisticsTeam;
