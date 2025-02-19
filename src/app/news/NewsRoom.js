import { Box, Container, Grid, GridCol, Text, Title } from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';

const NewsRoom = () => {
  return (
    <Box mt={70} style={{ minHeight: '100vh', backgroundColor: '#0E53F2' }}>
      <Container fluid px="7%" style={{ color: COLORS.primaryColor }}>
        <Grid columns={2} style={{ alignItems: 'start' }}>
          <GridCol
            span={1}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '100vh',
            }}
          >
            <Title tt="uppercase" size={'lg'}>
              Newsroom & Resources
            </Title>
            <Text mt={20} size="sm" maw={'70%'}>
              Our engineers are taking on huge and unique challenges: to start
              with, our teams are creating a data model that represents all the
              complexities of logistics in a way that’s true to reality, yet
              easy to understand and access.
            </Text>
          </GridCol>
          <GridCol span={1} pr={30} style={{ minHeight: '100vh' }}>
            <Box
              style={{
                height: '100%',
                width: '100%',
                backgroundImage: `url(${Images.newsRoom})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitMaskImage: `url(${Images.vector_p})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'top center',
                maskImage: `url(${Images.vector_p})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'bottom center',
                mixBlendMode: 'normal',
              }}
            />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsRoom;
