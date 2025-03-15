import Images from '@/app/utils/image';
import { Box, Container, Divider, Flex, Group, Image, Text, Title } from '@mantine/core';
import React from 'react';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';

const desc = highlightText("Automation, AI, and real-time tracking optimize efficiency, reducing costs and delays.")
const desc2 = highlightText("The Prime Network ensures fast, scalable, and reliable international shipping.")

const PrimeNetwork = () => {
  return (
    <Container fluid px="7%" py="70px" my={40} pb={0} mb={0}>
      <Flex gap="md" wrap="nowrap" direction={'column'}>
        <Flex direction={'column'}>
          <Title tt="uppercase" tw="balance" fw={800}>
            SHIP OVER OUR <span style={{ color: COLORS.serviceColor }}>PRIME NETWORK</span>
          </Title>
          <Text c={COLORS.textColor} size="base" lh="sm" maw={'35%'} mt={14}>
            {desc}<br/>
            {desc2}
          </Text>
        </Flex>

        <Image
          src={Images.prime_network}
          alt="PentagonPrime Logo"
          h="auto"
          style={{
            position: 'relative',
            transform: 'translateY(-25%)',
            // top: '10px',
            // maxWidth: '100%',
            // height: 'auto',
          }}
        />
      </Flex>
      {/* <Divider mt={120} size="md" /> */}
    </Container>
  );
};

export default PrimeNetwork;
