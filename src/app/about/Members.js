// import {
//   Card,
//   CardSection,
//   Center,
//   Container,
//   Flex,
//   Grid,
//   GridCol,
//   Group,
//   Image,
//   Stack,
//   Text,
//   Title,
// } from '@mantine/core';
// import { client } from '../api/contentful';
// import Images from '../utils/image';
// import { COLORS } from '../utils/COLORS';

// const Members = async () => {
//   const res = await client.getEntries({
//     content_type: 'members',
//     order: 'sys.createdAt',
//   });

//   return (
//     <Container fluid px={'7%'} my={200}>
//       <Center style={{ width: '100%', padding: '12px' }}>
//         <Card
//           bg={'#F2F7FC'}
//           padding="lg"
//           radius="lg"
//           style={{ width: '50%', height: 'auto' }}
//         >
//           <Grid cols={2} gutter="60" align="center" style={{ padding: '16px' }}>
//             <GridCol span={1}>
//               <CardSection>
//                 <Image
//                   src={Images.chairman}
//                   alt="PentagonPrime Logo"
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                   }}
//                 />
//               </CardSection>
//             </GridCol>
//             <GridCol span={1}>
//               <Stack spacing="lg">
//                 <Text size="base" fw={700}>
//                   Mr. Paresh Bhanushali
//                 </Text>
//                 <Text size="sm" c={COLORS.textColor}>
//                   Chairman and Managing Director
//                   <br /> Pentagon Group of Companies
//                 </Text>
//               </Stack>
//               <Stack spacing="sm">
//                 <Text size="base" fw={700}>
//                   Message from the Chairman
//                 </Text>
//                 <Text size="sm" c={COLORS.textColor}>
//                   “It is about the strive to keep growing… Once you get hold of
//                   that feeling, never let it go and just keep moving forward!”
//                 </Text>
//               </Stack>
//             </GridCol>
//           </Grid>
//         </Card>
//       </Center>
//       <Center my={30}>
//         <Title size={'40px'} fw={800} tt={'uppercase'} lh={'lgx2'} >Management Team</Title>
//       </Center>

//       <Grid columns={3} px={100}>
//         {res.items.map((item) => (
//           <GridCol key={item.sys.id} span={1}>
//             <Image
//               radius={'lg'}
//               style={{ width: '80%', height: '80%', objectFit: 'cover' }}
//               src={item.fields.image?.fields?.file?.url}
//               alt={item.name}
//             />
//             <Text fw={700} size='md' mt={'md'}>
//               {item.fields.name}
//             </Text>
//             <Text size='sm' c={COLORS.textColor}>{item.fields.role}</Text>
//           </GridCol>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Members;


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

const Members = async () => {
  const res = await client.getEntries({
    content_type: 'members',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} py={'lg'}>
      <Flex justify="center" align="center" style={{ width: '100%' }}>
        <Card
          bg={'#F2F7FC'}
          padding="lg"
          radius="lg"
          style={{
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <Grid gutter="60" align="center">
            <GridCol span={6}>
              <CardSection>
                <Image
                  src={Images.chairman}
                  alt="PentagonPrime Logo"
                  style={{
                    width: '80%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </CardSection>
            </GridCol>
            <GridCol span={6}>
              <Stack spacing="md">
                <Text size="base" fw={700}>
                  Mr. Paresh Bhanushali
                </Text>
                <Text size="sm" c={COLORS.textColor}>
                  Chairman and Managing Director
                  <br /> Pentagon Group of Companies
                </Text>
              </Stack>
              <Stack spacing="sm">
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
        <Title size={'40px'} fw={800} tt={'uppercase'} lh={'lgx2'}>
          Management Team
        </Title>
      </Flex>

      <Grid columns={3} px={100}>
        {res.items.map((item) => (
          <GridCol key={item.sys.id} span={1}>
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
        ))}
      </Grid>
    </Container>
  );
};

export default Members;
