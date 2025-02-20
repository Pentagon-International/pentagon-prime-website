import React from 'react';
import {
  Box,
  Button,
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

const styles = {
  container: {
    background: 'linear-gradient(180deg, #0012E6 0%, #FFFFFF 100%)',
    color: 'white',
    padding: '4rem 2rem',
    paddingLeft: 0,
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '50%',
    margin: 0,
  },
  textContainer: {
    flex: 1,
    textAlign: 'left',
    padding: '0 5%'
  },
  title: {
    lineHeight: '1.2',
    fontWeight: 900,
    fontFamily: `'Montserrat', sans-serif`,
  },
  highlightText: {
    color: COLORS.vision,
  },
  unstyledButton: {
    color: 'rgba(58, 62, 119, 1)',
    fontWeight: 600,
    fontSize: '14px'
  },
};

const CTAButton = ({ children, onClick, variant = 'filled' }) => (
  <Button
    radius="md"
    size="sm"
    fz={'smx'}
    color={variant === 'filled' ? COLORS.portColor : 'transparent'}
    onClick={onClick}
  >
    {children}
  </Button>
);

const Vision = () => {
  return (
    <Box style={styles.container}>
      <Trade />
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify={'center'} gap="xl">
        <Group style={styles.imageWrapper}>
          <Image src={Images.vision} alt="PentagonPrime Logo" />
        </Group>
        <Flex direction="column" style={styles.textContainer}>
          <Title size={'lg'} tw="balance" style={styles.title}>
            VISION 20240 - POWERING{' '}
            <span style={styles.highlightText}>GREEN LOGISTICS WORLDWIDE</span>
          </Title>
          <Text mt="md" maw={'75%'} size="sm">
            Carry the message of sustainability and green logistics (solar,
            energy movements worldwide). Green logistics options include
            solar-powered and nuclear-powered transport solutions.
          </Text>
          <Group mt="lg" gap={'xl'}>
            <CTAButton>Get in Touch</CTAButton>
            <UnstyledButton size={'sm'} style={styles.unstyledButton}>
              <Flex align="center" gap={8}>
                <IconBrandParsinta size={18} />
                <span style={{ ...styles.unstyledButton }}>Watch Video</span>
              </Flex>
            </UnstyledButton>
          </Group>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Vision;
