'use client';


import { COLORS } from '@/app/utils/COLORS';
import { Center, Container, Flex, Stack, Title, ActionIcon } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import React, { useState } from 'react';


const styles = {
    container: { fluid: true,  py: '70px' },
    actionIcon: {
        size: 'lg',
        variant: 'default',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    flexContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
    },
    innerContainer: {
        display: 'flex',
        gap: '1.5rem',
        transition: 'transform 0.8s ease-in-out',
    },
    image: { maxHeight: '120px', objectFit: 'contain', minWidth: '200px' },
};


const CertificateList = ({ certificateItems }) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4;
    const itemWidth = 220;


    const handleNext = () => {
        if (startIndex + itemsPerPage < certificateItems.length) {
            setStartIndex(startIndex + 1);
        }
    };


    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };


    const translateX = -startIndex * itemWidth;


    return (
        <Container {...styles.container} bg={COLORS.background}>
            <Stack spacing={'lg'}>
                <Center>
                    <Title size={'lg'} fw={800} tt={'uppercase'}>Our Certifications & Affiliations</Title>
                </Center>
                <Center>
                    <Flex mt={'xl'} align={'center'} justify={'center'} gap={'md'}>
                        <ActionIcon
                            style={styles.actionIcon}
                            onClick={handlePrev}
                            disabled={startIndex === 0}
                        >
                            <IconArrowLeft
                                size={24}
                                color={startIndex === 0 ? COLORS.textColor : COLORS.secondaryColor}
                            />
                        </ActionIcon>


                        <Flex style={{ ...styles.flexContainer, width: `${itemsPerPage * itemWidth}px` }} px={'sm'}>
                            <div
                                style={{
                                    ...styles.innerContainer,
                                    transform: `translateX(${translateX}px)`,
                                }}
                            >
                                {certificateItems.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.fields.certificateImage.fields.file.url}
                                        alt={item.fields.certificateName}
                                        style={styles.image}
                                    />
                                ))}
                            </div>
                        </Flex>


                        <ActionIcon
                            style={styles.actionIcon}
                            onClick={handleNext}
                            disabled={startIndex + itemsPerPage >= certificateItems.length}
                        >
                            <IconArrowRight
                                size={24}
                                color={
                                    startIndex + itemsPerPage >= certificateItems.length
                                        ? COLORS.textColor
                                        : COLORS.secondaryColor
                                }
                            />
                        </ActionIcon>
                    </Flex>
                </Center>
            </Stack>
        </Container>
    );
};


export default CertificateList;