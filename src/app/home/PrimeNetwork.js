import Images from '@/app/utils/image';
import {Container, Divider, Flex, Image, Title} from '@mantine/core';
import React from 'react';

const PrimeNetwork = () => {
  return (
    <Container fluid px="7%" py="70px">
      <Flex position="relative" justify="center" gap="md">
        <Title tt="uppercase" textWrap="balance">
          SHIP OVER OUR <span style={{color: '#0E52F2'}}>PRIME NETWORK</span>
        </Title>
        <Image
          src={Images.prime_network}
          alt="PentagonPrime Logo"
          style={{
            position: 'relative',
            transform: 'translateX(-15%)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Flex>
      <Divider mt="xl" size={'md'} />
    </Container>
  );
};

export default PrimeNetwork;
