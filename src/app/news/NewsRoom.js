import { Box, Container, Grid, GridCol, Text, Title } from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import { highlightText } from '../utils/highlightText';

const NewsRoom = ({ title, content }) => {
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
            <Title tt="uppercase" size={'39px'} fw={800} lh={'lgx2'}>
              {highlightText(title)}
            </Title>
            <Text mt={20} size="base" >
              {highlightText(content)}
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
