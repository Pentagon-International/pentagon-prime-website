'use client';

import { COLORS } from '@/app/utils/COLORS';
import { Center, Container, Grid, Stack, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';

const styles = {
    image: {
        maxHeight: '120px',
        objectFit: 'contain',
        minWidth: '100px',
        margin: '0 auto',
    },
    carouselControls: {
        backgroundColor: COLORS.arrow_background,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
    },
};

const CertificateList = ({ certificateItems }) => {


    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Container fluid py={'70px'} bg={COLORS.background}>
            <Stack spacing="lg">
                <Center>
                    <Title size="lg" fw={800} tt="uppercase">
                        Our Certifications & Affiliations
                    </Title>
                </Center>

                <Center style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '30px',
                }}>

                    {
                        isMobile ? (
                            <Grid>
                                {certificateItems.map((item, index) => (
                                    <Grid.Col key={index} span={6}>
                                        <img
                                            src={item.fields.certificateImage.fields.file.url}
                                            alt={item.fields.certificateName}
                                            style={styles.image}
                                        />
                                    </Grid.Col>
                                ))}

                            </Grid>
                        ) :
                            <Carousel
                                height={120}
                                slideSize="16.6%" // 6 items per page
                                mt="lg"
                                loop
                                w={'90%'}
                                slideGap="md"
                                align="start"
                                controlSize={40}
                                previousControlIcon={<IconArrowLeft size={20} />}
                                nextControlIcon={<IconArrowRight size={20} />}
                                styles={{
                                    control: styles.carouselControls,
                                }}
                                breakpoints={[
                                    { maxWidth: '768px', slideSize: '33.33%' }, // 3 items per page on medium screens
                                    { maxWidth: '480px', slideSize: '50%' }, // 2 items per page on small screens
                                ]}
                            >
                                {certificateItems.map((item, index) => (
                                    <Carousel.Slide key={index}>
                                        <img
                                            src={item.fields.certificateImage.fields.file.url}
                                            alt={item.fields.certificateName}
                                            style={styles.image}
                                        />
                                    </Carousel.Slide>
                                ))}
                            </Carousel>
                    }
                </Center>
            </Stack>
        </Container>
    );
};

export default CertificateList;
