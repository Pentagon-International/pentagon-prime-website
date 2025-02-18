import {Container, Grid, GridCol, Image, Text, Title} from '@mantine/core';
import { client } from '../api/contentful';
import { COLORS } from '../utils/COLORS';

const FeaturedNews = async () => {
  const res = await client.getEntries({
    content_type: 'featuredNews',
    order: 'sys.createdAt',
  });

  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Title tt={'uppercase'}>Featured in the News</Title>
      <Grid columns={3} gutter={'xl'} mt={30}>
        {res.items.map((item) => (
          <GridCol key={item.sys.id} span={1}>
            <Image src={item.fields.image?.fields?.file?.url} alt={item.name} />
            <Text
              c={COLORS.textColor}
              tt={'uppercase'}
              size="16px"
              fw={500}
              mt={20}
            >
              {item.fields.title}
            </Text>
            <Text mt={10}>{item.fields.description}</Text>
            <a
              href={item.fields.knowmore}
              style={{
                marginTop: '20px',
                color: COLORS.serviceColor,
                textDecoration: 'underline',
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

export default FeaturedNews;
