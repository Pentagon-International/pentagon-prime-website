import { Button, Container, Flex, Grid, Stack, Title } from '@mantine/core';
import React from 'react';
import ServiceCard from '../component/common/ServiceCard';
import { client } from '@/app/api/contentful';


const styles = {
    container: { fluid: true, px: '7%', py: '100px' },
    flexContainer: { direction: { base: 'column', md: 'row' }, align: 'center', justify: 'space-between', gap: 'lg' },
    title: { fontSize: '36px', lineHeight: '1.3', fontWeight: 800, maxWidth: '700px' },
    highlight: { color: '#0E52F2' },
    button: { size: 'lg', px: '28px', py: '18px', radius: 'md', bg: '#0E53F2' },
    grid: { columns: 9, mt: 'xl', gutter: 'lg' },
};


const LogisticsServices = async () => {
    const res = await client.getEntries({
        content_type: 'logisticsServices',
        order: 'sys.createdAt',
    });


    const anchorText = 'Know More';


    return (
        <Container {...styles.container}>
            <Flex {...styles.flexContainer}>
                <Stack style={styles.title}>
                    <Title style={{ fontFamily: 'inherit' }}>
                        OUR <span style={styles.highlight}>LOGISTICS SERVICES</span> DELIVER OPERATIONAL EXCELLENCE AND ENHANCE TRADE VALUE
                    </Title>
                </Stack>
                <Button {...styles.button}>View All Services</Button>
            </Flex>
            <Grid {...styles.grid}>
                {res.items?.map((item, index) => (
                    <ServiceCard key={index} item={item} backgroundColor="#F2F7FC" anchorText={anchorText} />
                ))}
            </Grid>
        </Container>
    );
};


export default LogisticsServices;