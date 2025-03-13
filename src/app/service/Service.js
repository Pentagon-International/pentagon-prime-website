'use client';

import {
  BackgroundImage,
  Button,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { theme } from '../utils/theme';
import { highlightText } from '../utils/highlightText';
import Images from '../utils/image';
import { useRouter } from 'next/navigation';

export default function Service({ title, icon, iconTitle, content, backgroundImage }) {
  const router = useRouter();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '40px',
        backgroundColor: '#111F40',
        color: '#FFF',
      }}
    >
      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack p={100}>
          <Group align='center' style={{ zIndex: 10 }} >
            <Image radius={25} src={icon || Images.sea_freight} w={40} h={40} alt="sea freight" />
            <Text size="sm" >
              {highlightText(iconTitle)}
            </Text>
          </Group>
          <Title
            style={{
              zIndex: 10,
              fontSize: theme.fontSizes.xxl,
              fontWeight: 900,
              maxWidth: '140vw', 
              border : '1px solid red'
            }}
            lh={theme.lineHeights.xxl}
            tt={'uppercase'}
            textWrap="balance"
          >
            {highlightText(title)}
          </Title>

          <Text tw='balance' size="sm" px={'auto'} lh={'sm'}>
            {highlightText(content)}
          </Text>
          <Button size="xl" radius={12} mt={10} fz={'sm'} bg={COLORS.serviceColor} w={'fit-content'} onClick={() => router.push('/contact')}>
            Join Now
          </Button>
        </Stack>
      </div>
      <div style={{ position: 'relative', width: '50%', height: '100vh' }}>
        <BackgroundImage
          src={backgroundImage || Images.service}
          w={'100%'}
          h={'100%'}
          fit="cover"
          alt="sea freight"
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      </div>
    </div>
  );
}
