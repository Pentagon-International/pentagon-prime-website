import { COLORS } from '@/app/utils/COLORS';
import { Card, Flex, GridCol, Group, Image, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import React from 'react';


const ServiceCard = ({ item, backgroundColor, border, anchorText }) => {
    const styles = {
        card: {
            backgroundColor,
            height: '100%',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            borderRadius: '20px',
            minheight: '400px'
        },
        imageContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            width: 'fit-content',
            borderRadius: '15px',
        },
        title: {
            fontWeight: 700,
            textWrap: "balance",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
        },
        text: {
            color: COLORS.textColor,
            flexGrow: 1,
            maxWidth: "75%",
        },
        link: {
            color: COLORS.serviceColor,
            marginTop: "auto",
            fontWeight: 500,
            paddingTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
            cursor: "pointer",
            transition: "color 0.3s ease",
        }
    };


    return (
        <GridCol span={{ base: 12, md: 3 }} key={item.sys.id}>
            <Card style={styles.card} radius="xl">
                <Flex style={{ ...styles.imageContainer, border: border ? `5px solid #D2E8FF` : 'none' }}>
                    <Image
                        src={item.fields.service_icon?.fields?.file?.url || item.fields.image?.fields?.file?.url}
                        width={45}
                        height={45}
                        mah={45}
                        alt={item.fields.service_title || item.fields.title}
                    />
                </Flex>
                <Group>
                    <Title size={'sm'} tt={'uppercase'} style={styles.title} order={4}>{item.fields.service_title || item.fields.title}</Title>
                    <Text maw={'75%'} size='xs' style={styles.text}>{item.fields.service_description || item.fields.description}</Text>
                </Group>
                {item.fields?.knowmore && (
                    <Flex align="center" gap={4} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <a style={styles.link} href={item?.fields?.knowmore}>
                            <Text size='xs'>
                                {anchorText}
                            </Text>
                        </a>
                        {/* <IconArrowRight
                            stroke={2}
                            color={COLORS.serviceColor}
                            size={16}
                            style={{ transform: 'translateY(5px)' }}
                        /> */}
                    </Flex>
                )}
            </Card>
        </GridCol>
    );
};


export default ServiceCard;