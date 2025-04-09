import { Container, Grid, GridCol, Image, Text, Title } from '@mantine/core';
import { COLORS } from '../utils/COLORS';

const FeaturedBlog = ({ res }) => {

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Title size={'lg'} tt={'uppercase'}>Featured in the News</Title>
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
            <a
              href={item.fields.knowmore}
              style={{
                marginTop: '0px',
                color: COLORS.serviceColor,
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Read More
            </a>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedBlog;
