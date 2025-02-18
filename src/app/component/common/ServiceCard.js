import { COLORS } from '@/app/utils/COLORS';
import { Card, Flex, GridCol, Group, Image, Text, Title } from '@mantine/core';
import React from 'react';


const ServiceCard = ({ item, backgroundColor, border, anchorText }) => {
    const styles = {
        card: {
            backgroundColor,
            height: '100%',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
            fontSize: '20px',
            fontWeight: 700,
            textWrap: 'balance'
        },
        text: {
            color: COLORS.textColor,
            marginTop : 'auto'
        },
        link: {
            color: COLORS.serviceColor,
            margin: '20px 0',
            fontWeight: 500
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
                        alt={item.fields.service_title || item.fields.title}
                    />
                </Flex>
                <Group>
                    <Title tt={'uppercase'} style={styles.title} order={4}>{item.fields.service_title || item.fields.title}</Title>
                    <Text maw={'75%'} style={styles.text}>{item.fields.service_description || item.fields.description}</Text>
                </Group>
                {item.fields?.knowmore && (
                    <a style={styles.link} href={item?.fields?.knowmore}>{anchorText}</a>
                )}


            </Card>
        </GridCol>
    );
};


export default ServiceCard;