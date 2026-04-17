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
import Images from '@/app/utils/image';
import { COLORS } from '@/app/utils/COLORS';
import { theme } from '@/app/utils/theme';
import { highlightText } from '@/app/utils/highlightText';

const styles = {
  background: {
    backgroundImage: `url('${Images.port}')`,
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
      <Container 
        fluid 
        px={'7%'} 
        mx={0} 
        w={'100%'} 
        h={'100%'} 
        pos={'relative'} 
        style={{ 
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Stack gap={20} style={{ width: '100%' }}>
          <Group align='center' gap={10}>
            <Image radius={25} src={icon} w={40} h={40} alt="Sea Freight Forwarding" />
            <Text size='base' fw={700} c={COLORS.primaryColor}>{iconTitle}</Text>
          </Group>
          <Title 
            lh={theme.lineHeights.xlx} 
            fw={900} 
            c={COLORS.primaryColor} 
            tt={'uppercase'} 
            style={{
              fontSize: theme.fontSizes.xxl,
              textAlign: 'left'
            }}
          >
            {highlightText(title)}
          </Title>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductHero;
