 'use client'

import {
  BackgroundImage,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Images from '../utils/image';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';
import { useRouter } from 'next/navigation';

export default function Service({ title, icon, iconTitle, content, backgroundImage }) {

  const router = useRouter();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '70px',
        backgroundColor: '#111F40',
        color: '#FFF',
      }}
    >
      <div style={{ width: '50%', overflowY: 'visible', display: 'flex', alignItems: 'center' }}>
        <Stack px={'20%'} py={'100px'}>
          <Group align='center'>
            <Image src={icon || Images.sea_freight} alt="sea freight" w={35} h={35} radius={25} />
            <Text w={'50vw'} style={{ overflowY: 'visible', zIndex: 10 }} size="sm">{highlightText(iconTitle)}</Text>
          </Group>
          <Title
            style={{ overflowY: 'visible', zIndex: 10 }}
            w={'55vw'}
            size={'lg'}
            tt={'uppercase'}
            textWrap="balance"
          >
            {highlightText(title)}
          </Title>
          <Text size="smx" maw={'55vw'} w={'30vw'} lh={'28px'}>
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
