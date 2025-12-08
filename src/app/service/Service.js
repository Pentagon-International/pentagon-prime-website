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
import { memo, useMemo } from 'react';

function Service({ title, icon, iconTitle, content, backgroundImage }) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const containerStyle = useMemo(() => ({
    minHeight: isMobile ? '100vh' : '80vh',
    maxHeight: isMobile ? '100vh' : '80vh',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    marginTop: '60px',
    backgroundColor: '#111F40',
    color: '#FFF',
    position: 'relative',
  }), [isMobile]);

  const leftSectionStyle = useMemo(() => ({
    width: isMobile ? '100%' : '50%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '100px',
    paddingBottom: isMobile ? '50px' : '100px'
  }), [isMobile]);

  const rightSectionStyle = useMemo(() => ({
    position: 'sticky',
    top: isMobile ? '60px' : '60px',
    width: isMobile ? '100%' : '50%',
    height: isMobile ? '60vw' : 'calc(80vh)',
    alignSelf: 'flex-start'
  }), [isMobile]);

  const backgroundImageStyle = useMemo(() => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: 0,
    top: 0,
  }), []);

  const overlayStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }), []);
  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <Stack
          px={isMobile ? '6%' : '13%'}
          spacing={isMobile ? 'sm' : 'xl'}
        >
          <Group align='center'>
            <Flex gap={'md'} align={'center'}>
              <Image src={icon || Images.sea_freight} alt="sea freight" w={35} h={35} radius={25} />
              <Title tt="uppercase" size={'28px'} fw={800} lh={'lgx2'}>
                {highlightText(title)}
              </Title>
            </Flex>
            <Text
              // ta={'justify'}
              size="md"
              style={{ maxWidth: '100%' }}
              dangerouslySetInnerHTML={{ __html: iconTitle }}
            />
          </Group>
          <Text
            fs={'italic'}
            size="sm"
            lh={isMobile ? '20px' : '28px'}
            style={{
              maxWidth: '100%',
              whiteSpace: 'pre-wrap'
            }}
            // ta={'justify'}
            dangerouslySetInnerHTML={{ __html: content }}
          />
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

      <div style={rightSectionStyle}>
        <BackgroundImage
          src={backgroundImage}
          style={backgroundImageStyle}
          fit={isMobile ? "cover" : "cover"}
          alt="sea freight"
        />
        <div style={overlayStyle} />
      </div>
    </div>
  );
}

export default memo(Service);