import { Container, Flex, Grid, GridCol, Image, Text, Title } from '@mantine/core';
import { COLORS } from '@/app/utils/COLORS';
import { TYPOGRAPHY } from '@/app/utils/TYPOGRAPHY';

const FeaturedBlog = ({ res }) => {

  return (
    <Container fluid px={'4%'} py={'70px'} bg={COLORS.backgroundColor}>
      <Title tt="uppercase" tw="balance" fw={800}>
        {/* <Title size={'lg'} tt={'uppercase'}> */}
        Featured articles</Title>
        <Grid columns={3} gutter={40} mt={30}>
          {res?.map((item) => (
            <GridCol
              key={item.sys.id}
              span={1}
              style={{ display: 'flex' }}
            >
              <Flex direction="column" flex={1} justify="space-between">
                <div>
                  <Image
                    src={item.fields.newsImage?.fields?.file?.url}
                    alt={item.name}
                    fit="cover"
                    mah={300}
                    mih={300}
                    style={{
                      borderRadius: '16px',
                      border: '1px solid #E0E0E0',
                    }}
                  />

                  <Text c="#999" fw={700} size="xs" mt={20} tt="uppercase">
                    {item.fields.newsName}
                  </Text>

                  <Text
                    c={COLORS.news_title}
                    tt="uppercase"
                    fw={700}
                    size="sm"
                  >
                    {item.fields.newsTitle}
                  </Text>
                </div>

                <Flex justify="flex-end">
                  <a
                    target='_blank'
                    href={item.fields.knowmore}
                    style={{
                      color: 'rgb(0, 33, 95)',
                      cursor: 'pointer',
                      fontSize: TYPOGRAPHY.caption.normal,
                    }}
                  >
                    Read More
                  </a>
                </Flex>
              </Flex>
            </GridCol>
          ))}
        </Grid>
    </Container>
  );
};

export default FeaturedBlog;
