'use client'

import React from 'react';
import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconBrandParsinta } from '@tabler/icons-react';
import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import Trade from '../component/common/Trade';
import { highlightText } from '../utils/highlightText';
import { useRouter } from 'next/navigation';

const styles = {
  container: {
    background: 'linear-gradient(180deg, #0012E6 0%, #FFFFFF 100%)',
    color: 'white',
    padding: '4rem 2rem',
    paddingLeft: '0',
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    textAlign: 'left',
    padding: '0 2%'
  },

  highlightText: {
    color: COLORS.vision,
  },
};

const Vision = ({ title, content }) => {
  const router = useRouter();

  return (
    <Container fluid px={{ base: '5%', md: '7%' }} py="70px" style={styles.container}>
      <Trade />
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify={'center'} w={'100%'} gap="xl">
        <Group style={styles.imageWrapper}>
          <Image src={Images.vision} alt="PentagonPrime Logo" />
        </Group>
        <Flex direction="column" style={styles.textContainer}>
          <Title size={'xl'} tt={'uppercase'} lh={'xlx'} tw="balance" fw={900}>
            {highlightText(title)}
          </Title>
          <Text mt="md" maw={'75%'} lh={'sm'} size="sm">
            {highlightText(content)}
          </Text>
          <Group mt="lg" gap={'xl'}>
            <Button
              variant="filled"
              bg={COLORS.portColor}
              radius="md"
              size="lg"
              fz={'sm'}
              lh={'sm'}
              p={'18px 32px'}
              fw={700}
              onClick={() => router.push('/contact')}
            >
              Get in touch
            </Button>
            <UnstyledButton size={'sm'} className="unstyled-button">
              <Flex align="center" gap={8} className="unstyled-button">
                <IconBrandParsinta size={18} />
                <span>Watch Video</span>
              </Flex>
            </UnstyledButton>
          </Group>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Vision;
