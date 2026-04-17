'use client'

import Images from '@/app/utils/image';
import { AspectRatio, Box, Container, Divider, Flex, Group, Image, Text, Title } from '@mantine/core';
import React from 'react';
import { COLORS } from '@/app/utils/COLORS';
import { highlightText } from '@/app/utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';
import { homeTypography } from "./homeTypography";

// const desc = highlightText("Automation, AI, and real-time tracking optimize efficiency, reducing costs and delays.")
// const desc2 = highlightText("As a logistics tech company, the Prime Network ensures fast, scalable, and reliable international shipping leveraging innovative solutions that redefine the logistics landscape.")

// Automation, AI, and real-time tracking seamlessly drive efficiency, lowering costs and reducing delays. As a logistics tech company, the Prime Network ensures fast, scalable, and reliable international shipping leveraging innovative solutions that redefine the logistics landscape.

const PrimeNetwork = ({content}) => {

  const title = content[0]?.fields?.title
  const description = content[0]?.fields?.description

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Container fluid px="2%" py="70px" bg={COLORS.backgroundColor}>
      <Flex gap="md" wrap="nowrap" direction={isMobile ? 'column' : 'row'} align={"center"}>
        <Flex direction={'column'}>
          <Title
            tt="uppercase"
            tw="balance"
            fw={800}
            style={{
              fontFamily: homeTypography.headingFontFamily,
              fontSize: homeTypography.sectionTitle.fontSize,
              lineHeight: homeTypography.sectionTitle.lineHeight,
            }}
          >
          {highlightText(title)}
          </Title>
          <Text
            c={COLORS.textColor}
            maw={ isMobile ? '100%' : '80%'}
            mt={14}
            style={{
              fontFamily: homeTypography.bodyFontFamily,
              fontSize: homeTypography.sectionSub.fontSize,
              lineHeight: homeTypography.sectionSub.lineHeight,
            }}
          >
          {highlightText(description)}
          </Text>
        </Flex>
        <Box p="lg" bg="white" w={"100%"} pt={isMobile ? 70 : 0} style={{borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Image
            src={ isMobile ? Images.mob_prime_network : Images.pentagon_zig_zag}
            alt="PentagonPrime Logo"
            h={isMobile ? "auto" : "auto"}
            p="sm"
            pt="md"
            fit={'contain'}
            style={{
              position: 'relative',
              // transform: 'translateY(-50%)',
              // top: '10px',
              // height: '10%',
            }}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default PrimeNetwork;
