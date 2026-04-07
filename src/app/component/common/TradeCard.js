"use client";
import { highlightText } from '@/app/utils/highlightText';
import { TYPOGRAPHY } from '@/app/utils/TYPOGRAPHY';
import { Flex, Text, Title, Container, Group, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { memo, useMemo } from 'react';
import { homeTypography } from "@/app/home/homeTypography";

const TradeItem = memo(({ tradeValue, tradeName }) => (
  <Flex justify="space-between" direction="column" wrap={'wrap'}>
    <Title
      size="lg"
      c="rgb(0, 33, 95)"
      lh={'lgx2'}
      order={4}
      style={{ fontFamily: homeTypography.headingFontFamily }}
    >
      {tradeValue}
    </Title>
    <Text
      size='sm'
      c="rgb(54, 54, 54)"
      lh="sm"
      style={{
        fontFamily: homeTypography.bodyFontFamily,
        fontSize: homeTypography.sectionSub.fontSize,
      }}
    >
      {tradeName}
    </Text>
  </Flex>
));

const TradeCard = ({ title = '', item = [], background = '' }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const cardStyles = useMemo(() => ({
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px',
    color: 'white',
    padding: '25px',
  }), [background]);


  return (
    <Container fluid
      px={isMobile && '0'}
      py={isMobile ? "30px" : "50px"}>
      <Box style={cardStyles}>
        <Flex align="center" justify="space-between" wrap="wrap" w="100%">
          {title && (
            <Title tt={"uppercase"} c="rgb(0, 33, 95)" lh={isMobile ? "md" : "lgx2"} fw={800} size={isMobile ? TYPOGRAPHY.h4.mobile : TYPOGRAPHY.h3.desktop}>
              {highlightText(title)}
            </Title>
          )}
          <Group w={"100%"} align='center' justify='space-between' mt={20} ml={isMobile && 0} px="md" py="xl" style={{background:"linear-gradient(90deg, #9dd5fe, #e2f2ff)", borderRadius:"8px"}}>
            {item.map(({ sys, fields }) => (
              <TradeItem
                key={sys.id}
                tradeValue={fields.tradeValue}
                tradeName={fields.tradeName}
              />
            ))}
          </Group>
        </Flex>
      </Box>
    </Container>
  );
};

export default memo(TradeCard);
