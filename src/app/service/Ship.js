'use client'
import {
  Container,
  Flex,
  Grid,
  GridCol,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';

const Ship = ({ first_title, first_content, serviceData }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");


  return (
    <Container fluid px={'7%'} py={isMobile ? 0 : '10px'} mb={isMobile ? 20 : 160}>
      <Stack gap={isMobile ? 20 : 100}>
        <Flex direction={'column'}>
          <Title size={'lg'} tt={'uppercase'}>{highlightText(first_title)}</Title>
          <Text size='sm' c={COLORS.textColor} lh={isMobile ? '20px' : ''} mt={'xs'} w={isMobile ? '100%' : '40vw'}>
            {highlightText(first_content)}
          </Text>
          {isMobile ? (
            <Grid w={'100%'}>
              <Carousel slideSize="80%" w={'100%'} height={450} align={'start'} slideGap="md" loop withControls={false}>
              {serviceData
                ?.sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0)).map((item) => (
                  <Carousel.Slide key={item.sys.id} w={'100%'}>
                    <GridCol key={item.sys.id} span={15} mt={'md'}>
                      <Image
                        src={item.fields.image?.fields?.file?.url}
                        alt={item.name}
                      />
                      <Text size="sm" fw={500} mt={20}>
                        {item.fields.title}
                      </Text>
                      <Text size='smx' mt={10} color="dimmed" lh={isMobile ? '20px' : ''}>
                        {item.fields.description}
                      </Text>
                    </GridCol>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Grid>
          ) : (
            <Grid columns={3} gutter={70} mt={60}>
              {serviceData
                ?.sort((a, b) => (a.fields.order || 0) - (b.fields.order || 0)).map((item) => (
                  <GridCol key={item.sys.id} span={1}>
                    <Image
                      src={item.fields.image?.fields?.file?.url}
                      alt={item.name}
                    />
                    <Text size="md" fw={500} mt={20}>
                      {item.fields.title}
                    </Text>
                    <Text size='sm' mt={10} color="dimmed">
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

export default Ship;
