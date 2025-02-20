import {
  Box,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import Images from '../utils/image';

const styles = {
  background: {
    backgroundImage: `url('${Images.product_hero}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 7%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  title: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: `'Montserrat', sans-serif`,
  },
  highlight: {
    color: '#0EC9F2',
  },
};

const ProductHero = () => {
  return (
    <Box style={styles.background}>
      <Box style={styles.overlay} />
      <Container fluid px={'7%'} py={'70px'} style={styles.content}>
        <Group>
          <Image src={Images.sea_freight} alt="Sea Freight Forwarding" />
          <Text size='sm' color="white">Sea Freight Forwarding</Text>
        </Group>
        <Grid columns={3} mt={20}>
          <GridCol span={1.8}>
            <Title size={'xl'} tw='balance' style={styles.title}>
              Manage all your
              <span style={styles.highlight}>sea freight forwarding</span>{' '}
              requirements with us.
            </Title>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductHero;
