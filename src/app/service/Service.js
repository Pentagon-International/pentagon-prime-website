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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '60px',
        backgroundColor: '#111F40',
        color: '#FFF',
        position: 'relative',
      }}
    >
      <div style={{ 
        width: '50%', 
        display: 'flex', 
        alignItems: 'flex-start',
        paddingTop: '100px',
        paddingBottom: '100px'
      }}>
        <Stack 
          px={'13%'} 
          spacing="xl"
        >
          <Group align='center'>
            <Image src={icon || Images.sea_freight} alt="sea freight" w={35} h={35} radius={25} />
            <Text 
              size="sm"
              style={{ maxWidth: '100%' }}
            >
              {highlightText(iconTitle)}
            </Text>
          </Group>
          <Title
            size={'lg'}
            tt={'uppercase'}
            textWrap="balance"
            style={{ maxWidth: '100%' }}
          >
            {highlightText(title)}
          </Title>
          <Text 
            size="smx" 
            lh={'28px'}
            style={{ 
              maxWidth: '100%',
              whiteSpace: 'pre-wrap'
            }}
          >
            {highlightText(content)}
          </Text>
          <Button 
            size="xl" 
            radius={12} 
            fz={'sm'} 
            bg={COLORS.serviceColor} 
            w={'fit-content'} 
            onClick={() => router.push('/contact')}
          >
            Join Now
          </Button>
        </Stack>
      </div>

      <div style={{ 
        position: 'sticky',
        top: '60px',
        width: '50%',
        height: 'calc(100vh - 60px)',
        alignSelf: 'flex-start'
      }}>
        <BackgroundImage
          src={Images.port}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            right: 0,
            top: 0,
          }}
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