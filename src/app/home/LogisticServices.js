import { Button, Container, Flex, Grid, Stack, Title } from '@mantine/core';
import React from 'react';
import ServiceCard from '../component/common/ServiceCard';
import { client } from '@/app/api/contentful';


const styles = {
    container: { fluid: true, px: '7%', py: '100px' },
    flexContainer: { direction: { base: 'column', md: 'row' }, align: 'center', justify: 'space-between', gap: 'lg' },
    highlight: { color: '#0E52F2' },
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
                <Stack>
                    <Title maw={'75%'} fw={800} size={'lg'}>
                        OUR <span style={styles.highlight}>LOGISTICS SERVICES</span> DELIVER OPERATIONAL EXCELLENCE AND ENHANCE TRADE VALUE
                    </Title>
                </Stack>
                <Button w={'30%'} size="md" color={'#0E52F2'}>View All Services</Button>
            </Flex>
            <Grid columns={9} mt='lg' gutter='lg' >
                {res.items?.map((item, index) => (
                    <ServiceCard key={index} item={item} backgroundColor="#F2F7FC" anchorText={anchorText} />
                ))}
            </Grid>
        </Container>
    );
};


export default LogisticsServices;