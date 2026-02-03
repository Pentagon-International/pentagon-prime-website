'use client';

import { COLORS } from '@/app/utils/COLORS';
import { Box, Center, Container, Grid, Image, Stack, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';

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
    const autoplay = useRef(Autoplay({ delay: 2000 }));

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.scrollWidth / 2);
        }
    }, [certificateItems]);
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Container fluid py={'70px'} bg={"#e0f1ff"}>
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
                            // <Carousel
                            //     height={120}
                            //     slideSize="20%" // 5 items per page
                            //     mt="lg"
                            //     loop
                            //     w={'95%'}
                            //     slideGap="10px"
                            //     align="start"
                            //     controlSize={40}
                            //     previousControlIcon={<IconArrowLeft size={20} />}
                            //     nextControlIcon={<IconArrowRight size={20} />}
                            //     styles={{
                            //         control: styles.carouselControls,
                            //     }}
                            //     breakpoints={[
                            //         { maxWidth: '768px', slideSize: '33.33%' }, // 3 items per page on medium screens
                            //         { maxWidth: '480px', slideSize: '50%' }, // 2 items per page on small screens
                            //     ]}
                            // >
                            //     {certificateItems.map((item, index) => (
                            //         <Carousel.Slide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  key={index}>
                            //             <img
                            //                 src={item.fields.certificateImage.fields.file.url}
                            //                 alt={item.fields.certificateName}
                            //                 style={styles.image}
                            //             />
                            //         </Carousel.Slide>
                            //     ))}
                            // </Carousel>
                            // <Box
                            //     style={{
                            //         display: "flex",
                            //         overflow: "hidden",
                            //         whiteSpace: "nowrap",
                            //         gap: "10px",
                            //         "&:hover div": { animationPlayState: "paused" }, // Pause on hover
                            //         minWidth: "200%", // Make it twice the width for smooth looping
                            //     }}
                            // >
                            //     <Box
                            //         style={{
                            //             display: "flex",
                            //             gap: "10px",
                            //             animation: "marquee 10s linear infinite",
                            //             minWidth: "100%", // Make it twice the width for smooth looping
                            //         }}
                            //     >
                            //         {[...certificateItems, ...certificateItems].map((item, index) => (
                            //             <img
                            //                 src={item.fields.certificateImage.fields.file.url}
                            //                 alt={item.fields.certificateName}
                            //                 style={styles.image}
                            //             />
                            //         ))}
                            //     </Box>
                            //     <style>
                            //         {`
                            //         @keyframes marquee {
                            //     from { transform: translateX(0%); }
                            //     to { transform: translateX(-50%); } /* Move only half to prevent gaps */
                            //         }
                            //         `}
                            //     </style>
                            // </Box>
                            //                     <div className="flex overflow-hidden whitespace-nowrap relative group">
                            //                         <div className="flex gap-65 animate-marquee">
                            //                             {[...certificateItems, ...certificateItems].map((item, i) => (
                            //                                 <Image key={i}
                            //                                     src={item.fields.certificateImage.fields.file.url}
                            //                                     alt={item.fields.certificateName}
                            //                                     width={120} height={120} className="rounded-lg" />
                            //                             ))}
                            //                         </div>

                            //                         <style>
                            //                             {`
                            //   @keyframes marquee {
                            //     from { transform: translateX(0); }
                            //     to { transform: translateX(-100%); }
                            //   }
                            //   .animate-marquee {
                            //     animation: marquee 10s linear infinite;
                            //   }
                            //   .group:hover .animate-marquee {
                            //     animation-play-state: paused; /* Pause animation on hover */
                            //   }
                            // `}
                            //                         </style>
                            //                     </div>
                            //                         <div className="flex overflow-hidden whitespace-nowrap relative group">
                            //                             <div className="flex gap-20 min-w-full animate-marquee">
                            //                                 {[...certificateItems, ...certificateItems].map((item, i) => (
                            //                                     // <Image key={i}
                            //                                     //     src={item.fields.certificateImage.fields.file.url}
                            //                                     //     alt={item.fields.certificateName}
                            //                                     //     // width={80} height={80} 
                            //                                     //     className="rounded-lg" />
                            //                                     <img
                            //                                         src={item.fields.certificateImage.fields.file.url}
                            //                                         alt={item.fields.certificateName}
                            //                                         style={styles.image}
                            //                                     />
                            //                                 ))}
                            //                             </div>

                            //                             <style>
                            //                                 {`
                            //   @keyframes marquee {
                            //     from { transform: translateX(0); }
                            //     to { transform: translateX(-50%); } /* Move only half to create loop */
                            //   }
                            //   .animate-marquee {
                            //     animation: marquee 10s linear infinite;
                            //   }
                            //   .group:hover .animate-marquee {
                            //     animation-play-state: paused;
                            //   }
                            // `}
                            //                             </style>
                            //                         </div>
                            <div
                                ref={containerRef}
                                style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    width: "95%",
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        // gap: "100px",
                                        animation: `marquee ${32}s linear infinite`,
                                        minWidth: "100%",
                                    }}
                                >
                                    {[...certificateItems, ...certificateItems].map((item, index) => (
                                        <div key={index} style={{ flexShrink: 0 }}>
                                            <img
                                                src={item.fields.certificateImage.fields.file.url}
                                                alt={item.fields.certificateName}
                                                style={{
                                                    height: "120px",
                                                    maxWidth: "200px",
                                                    objectFit: "contain",
                                                    borderRadius: "10px",
                                                    marginRight: `100px`, // Ensures spacing
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <style>
                                    {`
                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-${containerWidth}px);
                    }
                }
                `}
                                </style>
                            </div>

                    }
                </Center>
            </Stack>
        </Container>
    );
};

export default CertificateList;
