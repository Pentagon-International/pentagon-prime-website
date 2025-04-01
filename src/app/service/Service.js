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
import { useMediaQuery } from '@mantine/hooks';

export default function Service({ title, icon, iconTitle, content, backgroundImage }) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      style={{
        maxHeight: isMobile ? '100vh' : '60vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        marginTop: '60px',
        backgroundColor: '#111F40',
        color: '#FFF',
        position: 'relative',
      }}
    >
      <div style={{ 
        width: isMobile ? '100%' : '50%', 
        display: 'flex', 
        alignItems: 'flex-start',
        paddingTop: '100px',
        paddingBottom: isMobile ? '50px' : '100px'
      }}>
        <Stack 
          px={isMobile ? '6%' : '13%'} 
          spacing={isMobile ? 'sm' : 'xl'}
        >
          <Group align='center'>
            <Flex gap={'md'} align={'center'}>
              <Image src={icon || Images.sea_freight} alt="sea freight" w={35} h={35} radius={25} />
              <Title
                size={'base'}
                tt={'uppercase'}
                textWrap="balance"
                style={{ maxWidth: '100%' }}
              >
                {highlightText(title)}
              </Title>
            </Flex>
            <Text
              size="sm"
              style={{ maxWidth: '100%' }}
            >
              {highlightText(iconTitle)}
            </Text>
          </Group>
          <Text 
            size="smx" 
            lh={isMobile ? '20px' : '28px'}
            style={{ 
              maxWidth: '100%',
              whiteSpace: 'pre-wrap'
            }}
          >
            {highlightText(content)}
          </Text>
          {/* <Button 
            size={isMobile ? "md" : "xl"}
            radius={12} 
            fz={'sm'} 
            bg={COLORS.serviceColor} 
            w={'fit-content'} 
            onClick={() => router.push('/contact')}
          >
            Join Now
          </Button> */}
        </Stack>
      </div>

      <div style={{ 
        position: 'sticky',
        top: isMobile ? '60px' : '60px',
        width: isMobile ? '100%' : '50%',
        height: isMobile ? '60vw' : 'calc(60vh)',
        alignSelf: 'flex-start'
      }}>
        <BackgroundImage
          src={backgroundImage}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            right: 0,
            top: 0,
          }}
          fit={isMobile ? "cover" : "cover"}
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