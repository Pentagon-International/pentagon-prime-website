'use client'
import { Box, Card, Container, Grid, Group, Image, SimpleGrid, Text, Title } from "@mantine/core";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import Images from "../utils/image";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { apiCallProtected } from "../api/api";


const StaticContents = () => {


    const shipmentTermsQuery = useQuery({
        queryKey: ["shipment-te"],
        queryFn: async () => {
          const response = await apiCallProtected.get("/pentagon/incoTerms");
          return response.data;
        },
        select: ({ data }) => {
          return data?.map((item) => ({
            label: item.name,
            logo: 'https://static.vecteezy.com/system/resources/previews/043/196/158/non_2x/shipping-company-logo-template-free-vector.jpg'
          }))
        },
        onError: (error) => {
          console.log(error);
        },
      });    

      console.log("shipmentTermsQuery : ",shipmentTermsQuery?.data)

    const isMobile = useMediaQuery('(max-width:768px)');
    return (
        <Container fluid px="7%" py="70px">
            <Grid align="center" justify="space-between" >
                <Grid.Col span={isMobile ? 12 : 6} p={'xl'}>
                    <Image
                        src={Images?.incoterms_handshake}
                        alt="Incoterms"
                    // h={isMobile ? "auto" : "auto"}
                    // w={isMobile ? "100%" : "40%"}
                    // mt={isMobile ? 70 : 0}
                    // fit={'contain'}
                    // style={{
                    //     position: 'relative',
                    //     // transform: 'translateY(-50%)',
                    //     // top: '10px',
                    //     maxWidth: !isMobile && '50%',
                    //     // height: '10%',
                    // }}
                    />
                </Grid.Col>
                <Grid.Col span={isMobile ? 12 : 6} p={isMobile ? '20px' : 'xl'}>
                    <Grid>
                        <Grid.Col span={12}>
                            <Title size={isMobile ? '25px' : '20px'} tt="uppercase" className="tw-balance" fw={800}>
                                What do incoterms means?
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Text ta={isMobile ? 'justify' : 'left'} c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'} mt={14}>
                                Incoterms, created by the International Chamber of Commerce, are globally recognized rules that define the roles and responsibilities of buyers and sellers in international trade. They act as the universal language of commerce, helping businesses navigate shipping, risk, and costs with clarity and confidence.
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={12} mb={'md'} mt={'xl'}>
                    <Title size={"25px"} tt="uppercase" tw="balance" fw={800} mt={'xl'}>
                        What Incoterms do and don’t cover
                    </Title>
                    <Text c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'} mt={isMobile ? 14 : 0}>
                        Incoterms move the goods, not the deals
                    </Text>
                </Grid.Col>
                <Grid.Col span={isMobile ? 12 : 6}>
                    <Card
                        bg={'#F2F7FC'}
                        display={"flex"}
                        direction={"column"}
                        justify={"flex-start"}
                        mih={"300px"}
                        p={isMobile ? '20px' : "40px"}
                        radius={32}
                        h={"400px"}
                    >
                        <Grid>
                            <Grid.Col span={12} mb={'md'}>
                                <Text fw={800} size={'20px'} tt="uppercase" lh="sm" maw={isMobile ? '100%' : '80%'}>
                                    What Incoterms do cover
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                  <Grid.Col span={2}>
                                <Box
                                    style={{
                                        backgroundColor: '#228be6', // Mantine blue[6]
                                        borderRadius: '50%',
                                        padding: '3px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconCheck color="white" size={16} />
                                </Box>
                            </Grid.Col>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Text c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'}>
                                    They do define the obligations and costs between a buyer and seller
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                  <Grid.Col span={2}>
                                <Box
                                    style={{
                                        backgroundColor: '#228be6', // Mantine blue[6]
                                        borderRadius: '50%',
                                        padding: '3px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconCheck color="white" size={16} />
                                </Box>
                            </Grid.Col>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Text c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'}>
                                    They do define the point at which the risk for cargo passes between buyer and seller
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid.Col>
                <Grid.Col span={isMobile ? 12 : 6}>
                    <Card
                        bg={'#F2F7FC'}
                        display={"flex"}
                        direction={"column"}
                        justify={"flex-start"}
                        mih={"300px"}
                        p={isMobile ? '20px' : "40px"}
                        radius={32}
                        h={"400px"}
                    >
                        <Grid>
                            <Grid.Col span={12} mb={'md'}>
                                <Text fw={800} size={'20px'} tt="uppercase" lh="sm" maw={isMobile ? '100%' : '80%'}>
                                    What Incoterms don't cover
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Box
                                    style={{
                                        backgroundColor: '#228be6', // Mantine blue[6]
                                        borderRadius: '50%',
                                        padding: '3px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconX color="white" size={16} />
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Text c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'}>
                                    They don’t cover the passage of title or ownership
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Box
                                    style={{
                                        backgroundColor: '#228be6', // Mantine blue[6]
                                        borderRadius: '50%',
                                        padding: '3px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconX color="white" size={16} />
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Text c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'}>
                                    They don’t cover payment – this is negotiated separately.
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Box
                                    style={{
                                        backgroundColor: '#228be6', // Mantine blue[6]
                                        borderRadius: '50%',
                                        padding: '3px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconX color="white" size={16} />
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Text c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'}>
                                    They don’t cover insurance – only two Incoterms, CIF and CIP outline insurance as the seller’s responsibility.
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid.Col>
                <Grid.Col span={12} mt={'xl'}>
                    <Title size={"25px"} tt="uppercase" tw="balance" fw={800}>
                        What are the most common Incoterms?
                    </Title>
                    <Text c={COLORS.textColor} size="base" lh="sm" maw={isMobile ? '100%' : '80%'}>
                        The essentials of trade : 5 incoterms every business should know
                    </Text>
                </Grid.Col>
            </Grid>
            <SimpleGrid
                p={'md'}
                mt='40px'
                cols={{ base: 1, sm: 2, md: 3, lg: 3 }}
                spacing={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
            >
                {shipmentTermsQuery?.data?.map((item) => (
                    <Box
                        key={item.id}
                        p="md"
                        bg="#F2F7FC"
                        style={{ borderRadius: 8 }}
                    >
                        <Group align="center" justify="flex-start">
                            <Image
                                src={item.logo}
                                alt={item.name}
                                radius="md"
                                fit="contain"
                                // withPlaceholder
                                style={{
                                    height: 50,
                                    width: 50,
                                }}
                            />
                            <Text size="xs" fw={500}>
                                {item.label}
                            </Text>
                        </Group>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    )

}

export default StaticContents;