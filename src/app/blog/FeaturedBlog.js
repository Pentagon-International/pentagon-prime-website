import { Container, Flex, Grid, GridCol, Image, Text, Title } from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { TYPOGRAPHY } from '../utils/TYPOGRAPHY';

const FeaturedBlog = ({ res }) => {

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Title tt="uppercase" tw="balance" fw={800}>
        {/* <Title size={'lg'} tt={'uppercase'}> */}
        Featured articles</Title>
      <Grid columns={3} gutter={'xl'} mt={30}>
        {res?.length && res?.map((item) => (
          <GridCol key={item.sys.id} span={1}>
            <Image src={item.fields.newsImage?.fields?.file?.url} alt={item.name}
              fit="cover"
              // style={{ borderRadius: '24px' }}
              mah={'250px'}
              mih={'250px'}
            />
            <Text c="#999" fw={700} size="xs" mt={20} tt="uppercase">
              {item.fields.newsName}
            </Text>
            <Text
              c={COLORS.news_title}
              tt={'uppercase'}
              fw={700} size="sm" maw={'100%'}
            >
              {item.fields.newsTitle}
            </Text>
            {/* <Text size='smx' fw={600} mt={10}>{item.fields.description}</Text> */}
            <Flex w={'100%'} justify={'flex-end'}>
              <a
                href={item.fields.knowmore}
                style={{
                  marginTop: '0px',
                  color: COLORS.serviceColor,
                  // textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: TYPOGRAPHY.caption.normal,
                }}
              >
                Read More
              </a>
            </Flex>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedBlog;
