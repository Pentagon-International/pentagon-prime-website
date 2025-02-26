import Images from '@/app/utils/image';
import { Container, Divider, Flex, Image, Title } from '@mantine/core';
import React from 'react';
import { COLORS } from '../utils/COLORS';

const PrimeNetwork = () => {
  return (
    <Container fluid px="7%" py="70px">
      <Flex posistion="relative" justify="space-between" gap="md" wrap="nowrap">
        <Title tt="uppercase" tw="balance" miw={'30%'} fw={800}>
          SHIP OVER OUR <span style={{ color: COLORS.serviceColor }}>PRIME NETWORK</span>
        </Title>
        <Image
          src={Images.prime_network}
          alt="PentagonPrime Logo"
          h="auto"
          style={{
            position: 'relative',
            transform: 'translateX(-25%)',
            top: '10px',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Flex>
      <Divider mt="xl" size="md" />
    </Container>
  );
};

export default PrimeNetwork;
