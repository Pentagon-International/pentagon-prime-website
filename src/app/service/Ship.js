'use client'
import {
  Box,
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import { usePathname } from 'next/navigation';
import { IconCheck } from '@tabler/icons-react';
import { memo, useMemo } from 'react';

const Ship = ({ first_title, first_content, serviceData }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const sortedServiceData = useMemo(() => {
    return serviceData?.sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0)) || [];
  }, [serviceData]);

  const isODCProjectCargo = useMemo(() => pathname === "/service/odc-project-cargo/", [pathname]);

  return (
    <Container fluid px={'7%'} py={isMobile ? 0 : '10px'} mb={isMobile ? 20 : 30}>
      <Stack gap={isMobile ? 20 : 100}>
        <Flex direction={'column'}>
          <Title fw={800} tt={'uppercase'}>{highlightText(first_title)}</Title>
          <Text size='sm' c={COLORS.textColor} lh={isMobile ? '20px' : ''} mt={'lg'} w={isMobile ? '100%' : '100%'}>
            {highlightText(first_content)}
          </Text>
          {isODCProjectCargo && <Text size='sm' c={COLORS.textColor} lh={isMobile ? '20px' : ''} mt={'lg'} w={isMobile ? '100%' : '100%'}>
            {highlightText("Practical sustainability that is built into the operations! For many clients, ODC often includes renewable-energy equipment. We support the green economy by handling critical green-energy cargo with care and efficiency, while also:")}
          </Text>}
          {isODCProjectCargo && <Box mt={10} pl={40}>
            <List
              spacing="sm"
              size="sm"
              c={COLORS.textColor}
              icon={
                <ThemeIcon size={16} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>Optimizing routes to reduce unnecessary mileage</List.Item>
              <List.Item>Planning multimodal combinations that lower emissions per ton moved</List.Item>
              <List.Item>Improving utilisation through back-haul planning and consolidation wherever possible</List.Item>
            </List>
          </Box>}
          {isODCProjectCargo && <Text size='sm' c={COLORS.textColor} lh={isMobile ? '20px' : ''} mt={'lg'} w={isMobile ? '100%' : '100%'}>
            {highlightText("When we say engineered certainty at every stage, we mean it!")}
            </Text>}
          {isMobile ? (
            <Grid w={'100%'}>
              <Carousel slideSize="80%" w={'100%'} height={450} align={'start'} slideGap="md" loop withControls={false}>
              {sortedServiceData.map((item) => (
                  <Carousel.Slide key={item.sys.id} w={'100%'}>
                    <GridCol key={item.sys.id} span={15} mt={'md'}>
                      <Box style={{ overflow: 'hidden', transition: 'all 0.5s ease', borderRadius: '12px', width: '100%', height: '250px' }}>
                        <Image
                          h={250}
                          src={item.fields.image?.fields?.file?.url}
                          alt={item.name}
                          style={{ transition: 'all 0.5s ease', overflow: 'hidden' }}
                          onMouseEnter={(e)=>{
                            e.currentTarget.style.scale = "1.05";
                          }}
                          onMouseLeave={(e)=>{
                            e.currentTarget.style.scale = "1";
                          }}
                        />
                      </Box>
                      <Text size="sm" fw={500} mt={20}>
                        {item.fields.title}
                      </Text>
                      <Text size='smx' mt={10} c={COLORS.textColor} lh={'20px'}>
                        {item.fields.description}
                      </Text>
                    </GridCol>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Grid>
          ) : (
            <Grid columns={3} gutter={70} mt={60}>
              {sortedServiceData.map((item) => (
                  <GridCol key={item.sys.id} span={1} >
                    <Box style={{ overflow: 'hidden', transition: 'all 0.5s ease', borderRadius: '12px', width: '100%', height: '270px', border: '1px solid #E0E0E0' }}>
                      <Image
                        h={275}
                        src={item.fields.image?.fields?.file?.url}
                        alt={item.name}
                        style={{ transition: 'all 0.5s ease', overflow: 'hidden' }}
                        onMouseEnter={(e)=>{
                          e.currentTarget.style.scale = "1.05";
                        }}
                        onMouseLeave={(e)=>{
                          e.currentTarget.style.scale = "1";
                        }}
                      />
                    </Box>
                    <Text size="md" fw={500} mt={20}>
                      {item.fields.title}
                    </Text>
                    <Text size='sm' mt={10} c={COLORS.textColor}>
                      {item.fields.description}
                    </Text>
                  </GridCol>
                ))}
            </Grid>
          )}
        </Flex>
      </Stack>
    </Container>
  );
};

export default memo(Ship);
