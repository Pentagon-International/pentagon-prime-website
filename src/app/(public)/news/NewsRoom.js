import { Box, Container, Grid, GridCol, Text, Title } from '@mantine/core';
import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import { highlightText } from '@/app/utils/highlightText';

const NewsRoom = ({ title, content }) => {
  return (
    <Box mt={60} style={{ maxHeight: '80vh', backgroundColor: '#0E53F2', overflow: 'hidden' }}>
      <Container fluid px="2%" style={{ color: COLORS.primaryColor }}>
        <Grid columns={2} style={{ alignItems: 'start' }}>
          <GridCol
            span={1}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxHeight: '80vh',
            }}
          >
            {/* <Title tt="uppercase" size={'39px'} fw={800} lh={'lgx2'}>
              {highlightText(title)}
            </Title> */}
            <Text mt={20} size="md" >
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
