import { Button, Container, Flex, Grid, Stack, Title } from '@mantine/core';
import React from 'react';
import ServiceCard from '../component/common/ServiceCard';
import { client } from '@/app/api/contentful';
import { highlightText } from '../utils/highlightText';


const styles = {
    container: { fluid: true, px: '7%', py: '100px' },
    flexContainer: { direction: { base: 'column', md: 'row' }, align: 'center', justify: 'space-between', gap: 'lg' },
    highlight: { color: '#0E52F2' },
};


const LogisticsServices = async ({ title }) => {
    const res = await client.getEntries({
        content_type: 'logisticsServices',
        order: 'sys.createdAt',
    });

    const anchorText = 'Know More';

    return (
        <Container {...styles.container}>
            <Flex {...styles.flexContainer}>
                <Stack>
                    <Title tt={'uppercase'} lh={'lgx2'} fw={800} size={'lgx2'}>
                        {highlightText(title)}
                    </Title>
                </Stack>
                <Button fz={'smx'} p={'23px 32px'} fw={700} size="xl" w={'12rem'} color={'#0E52F2'}>View All Services</Button>
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


//   const styles = {
//     "#": COLORS.portColor,
//     "$": COLORS.serviceColor,
//     "%": COLORS.vision,
//     "?": COLORS.questionColor,
//   };