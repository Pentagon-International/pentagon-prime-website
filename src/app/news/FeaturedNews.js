import { Container, Grid, GridCol, Image, Text, Title } from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { TYPOGRAPHY } from '../utils/TYPOGRAPHY';

const FeaturedNews = ({res}) => {

  return (
    <Container fluid px={'4%'} py={'70px'}>
      <Title size={'lg'} tt={'uppercase'}>Featured in the News</Title>
      <Grid columns={3} gutter={'xl'} mt={30}>
        {res.items.map((item) => (
          <GridCol key={item.sys.id} span={1}>
            <Image src={item.fields.image?.fields?.file?.url} radius={'md'} alt={item.name} />
            <Text
              c={COLORS.textColor}
              tt={'uppercase'}
              size="sm"
              fw={500}
              mt={20}
            >
              {item.fields.title}
            </Text>
            <Text size='smx' fw={600} mt={10}>{item.fields.description}</Text>
            <a
              href={item.fields.knowmore}
              style={{
                marginTop: '20px',
                color: 'rgb(0, 33, 95)',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: TYPOGRAPHY.caption.normal,
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
