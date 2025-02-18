import {
  Card,
  CardSection,
  Center,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {client} from '../api/contentful';
import Images from '../utils/image';
import {COLORS} from '../utils/COLORS';

const Members = async () => {
  const res = await client.getEntries({
    content_type: 'members',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} my={100}>
      <Center style={{width: '100%', padding: '12px'}}>
        <Card
          bg={'#F2F7FC'}
          padding="lg"
          radius="md"
          style={{width: '50%', height: 'auto'}}
        >
          <Flex gap="60" style={{padding: '16px'}}>
            <div style={{width: '30%', flexShrink: 0}}>
              <CardSection>
                <Image
                  src={Images.chairman}
                  alt="PentagonPrime Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
              </CardSection>
            </div>
            <Group style={{width: '65%'}}>
              <Stack spacing="lg">
                <Text size="24px" weight={700}>
                  Mr. Paresh Bhanushali
                </Text>
                <Text size="sm" c={COLORS.textColor}>
                  Chairman and Managing Director
                  <br /> Pentagon Group of Companies
                </Text>
              </Stack>
              <Stack spacing="lg">
                <Text size="24px" weight={700}>
                  Message from the Chairman
                </Text>
                <Text size="md" c={COLORS.textColor}>
                  “It is about the strive to keep growing… Once you get hold of
                  that feeling, never let it go and just keep moving forward!”
                </Text>
              </Stack>
            </Group>
          </Flex>
        </Card>
      </Center>
      <Center my={30}>
        <Title style={{textTransform: 'uppercase'}}>Management Team</Title>
      </Center>

      <Grid columns={3} px={100}>
        {res.items.map((item) => (
          <GridCol key={item.sys.id} span={1}>
            <Image
              radius={'lg'}
              style={{width: '80%', height: '80%', objectFit: 'cover'}}
              src={item.fields.image?.fields?.file?.url}
              alt={item.name}
            />
            <Text fw={700} mt={'md'}>
              {item.fields.name}
            </Text>
            <Text c={COLORS.textColor}>{item.fields.role}</Text>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
};

export default Members;
