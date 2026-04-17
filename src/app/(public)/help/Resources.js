import { Container, Flex, Grid, GridCol, Image, Text } from '@mantine/core';
import { client } from '@/lib/api/contentful';
import { COLORS } from '@/app/utils/COLORS';

const Resources = async () => {
  const res = await client.getEntries({
    content_type: 'resources',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Grid columns={3} gutter={'xl'}>
        {res.items.map((item) => (
          <GridCol key={item.sys.id} span={1}>
            <Flex
              bg={'#F2F7FC'}
              align={'center'}
              px={'xl'}
              justify={'space-between'}
              gap={20}
            >
              <Image
                p={10}
                src={item.fields.image?.fields?.file?.url}
                alt={item.name}
              />
              <Text size={'sm'} fw={700} c={COLORS.secondaryColor}>
                {item.fields.insurance_name}
              </Text>
              <Text size={'smx'} td={'underline'} c={COLORS.textColor}>Read</Text>
            </Flex>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
};

export default Resources;
