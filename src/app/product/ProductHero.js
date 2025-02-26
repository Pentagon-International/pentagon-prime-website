import {
  Box,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import Images from '../utils/image';
import { COLORS } from '../utils/COLORS';
import { theme } from '../utils/theme';
import { highlightText } from '../utils/highlightText';

const styles = {
  background: {
    backgroundImage: `url('${Images.product_hero}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    height: '100vh',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    top: 0,
    left: 0,
    textAlign: 'center',
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
};

const ProductHero = ({ title, icon, iconTitle }) => {
  return (
    <Box style={styles.background}>
      <Box style={styles.overlay} />
      <Container fluid px={'7%'} mx={0} py="70px" w={'100%'} h={'100%'} ta={'left'} display={'flex'} pos={'relative'} justify='center' style={{ zIndex: 2, flexDirection: 'column' }}>
        <Stack gap={20} pt={80}>
          <Group align='center' gap={10}>
            <Image radius={25} src={icon} w={40} h={40} alt="Sea Freight Forwarding" />
            <Text size='base' fw={700} c={COLORS.primaryColor}>{iconTitle}</Text>
          </Group>
          <Title lh={theme.lineHeights.xlx} fw={900} c={COLORS.primaryColor} tt={'uppercase'} style={{
            fontSize: theme.fontSizes.xxl
          }}>
            {highlightText(title)}
          </Title>
        </Stack>

      </Container>
    </Box>
  );
};

export default ProductHero;
