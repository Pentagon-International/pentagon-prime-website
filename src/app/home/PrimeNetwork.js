'use client'

import Images from '@/app/utils/image';
import { AspectRatio, Box, Container, Divider, Flex, Group, Image, Text, Title } from '@mantine/core';
import React from 'react';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';

// const desc = highlightText("Automation, AI, and real-time tracking optimize efficiency, reducing costs and delays.")
// const desc2 = highlightText("As a logistics tech company, the Prime Network ensures fast, scalable, and reliable international shipping leveraging innovative solutions that redefine the logistics landscape.")

// Automation, AI, and real-time tracking seamlessly drive efficiency, lowering costs and reducing delays. As a logistics tech company, the Prime Network ensures fast, scalable, and reliable international shipping leveraging innovative solutions that redefine the logistics landscape.

const PrimeNetwork = ({content}) => {

  const title = content[0]?.fields?.title
  const description = content[0]?.fields?.description

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Container fluid px="2%" py="70px" mt={20} pb={0} mb={80}>
      <Flex gap="md" wrap="nowrap" direction={isMobile ? 'column' : 'row'}>
        <Flex direction={'column'}>
          <Title tt="uppercase" tw="balance" fw={800}>
          {highlightText(title)}
          </Title>
          <Text c={COLORS.textColor} size="base" lh="sm" maw={ isMobile ? '100%' : '80%'} mt={14}>
          {highlightText(description)}
          </Text>
        </Flex>

        <Image
          src={ isMobile ? Images.mob_prime_network : Images.pentagon_zig_zag}
          alt="PentagonPrime Logo"
          h={isMobile ? "auto" : "auto"}
          w={isMobile ? "100%" : "40%"}
          mt={isMobile ? 70 : 0}
          fit={'contain'}
          style={{
            position: 'relative',
            // transform: 'translateY(-50%)',
            // top: '10px',
            maxWidth: !isMobile && '50%',
            // height: '10%',
          }}
        />
      </Flex>
    </Container>
  );
};

export default PrimeNetwork;
