import { COLORS } from '@/app/utils/COLORS';
import { Anchor, Card, Flex, GridCol, Group, Image, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import React from 'react';


const ServiceCard = ({ item, backgroundColor, border, anchorText }) => {
    return (
        <GridCol span={{ base: 12, md: 3 }} key={item.sys.id}>
            <Card bg={backgroundColor} display={'flex'} direction={'column'} justify={'flex-start'} mih={'250px'} p={'20px'} radius="xl">
                <Flex alignitems={'center'} display={'flex'} mb={'10px'} w={'fit-content'}
                    style={{ border: border || "none", borderRadius: '12px' }}>
                    <Image
                        src={item.fields.service_icon?.fields?.file?.url || item.fields.image?.fields?.file?.url}
                        width={45}
                        height={45}
                        mah={45}
                        alt={item.fields.service_title || item.fields.title}
                    />
                </Flex>
                <Group>
                    <Title lh={'lgx'} tw='balance' mih={'40px'} display={'flex'} alignitems={'center'} fw={700} size={'sm'} order={4}>{item.fields.service_title || item.fields.title}</Title>
                    <Text tw='balance' c={COLORS.textColor} lh={'sm'} size='smx' style={{ flexGrow: 1 }}>{item.fields.service_description || item.fields.description}</Text>
                </Group>
                {item.fields?.knowmore && (
                    <Flex align="center" gap={4} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Anchor href={item.fields.knowmore} target="_blank" c={COLORS.serviceColor} fw={500}
                            pt={"10px"} mt={"auto"} display={'flex'} alignitems={'center'} size="xs" underline="hover">
                            {anchorText}
                        </Anchor>
                        <IconArrowRight
                            stroke={2}
                            color={COLORS.serviceColor}
                            size={16}
                            style={{ transform: 'translateY(5px)' }}
                        />
                    </Flex>
                )}
            </Card>
        </GridCol>
    );
};


export default ServiceCard;