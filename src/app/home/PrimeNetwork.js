'use client'

import Images from '@/app/utils/image';
import { Box, Container, Divider, Flex, Group, Image, Text, Title } from '@mantine/core';
import React from 'react';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';

const desc = highlightText("Automation, AI, and real-time tracking optimize efficiency, reducing costs and delays.")
const desc2 = highlightText("The Prime Network ensures fast, scalable, and reliable international shipping.")

const PrimeNetwork = () => {

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Container fluid px="7%" py="70px" my={40} pb={0} mb={0}>
      <Flex gap="md" wrap="nowrap" direction={'column'}>
        <Flex direction={'column'}>
          <Title tt="uppercase" tw="balance" fw={800}>
            SHIP OVER OUR <span style={{ color: COLORS.serviceColor }}>PRIME NETWORK</span>
          </Title>
          <Text c={COLORS.textColor} size="base" lh="sm" maw={ isMobile ? '100%' : '35%'} mt={14}>
            {desc}<br/>
            {desc2}
          </Text>
        </Flex>

        <Image
          src={ isMobile ? Images.mob_prime_network : Images.prime_network}
          alt="PentagonPrime Logo"
          h="auto"
          mt={isMobile ? 70 : 0}
          style={{
            position: 'relative',
            transform: 'translateY(-25%)',
            // top: '10px',
            // maxWidth: '100%',
            // height: 'auto',
          }}
        />
      </Flex>
      <Divider mt={50} size="md" />
    </Container>
  );
};

export default PrimeNetwork;
