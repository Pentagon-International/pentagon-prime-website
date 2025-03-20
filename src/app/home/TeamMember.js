const { Grid, GridCol, Box, Image, Title, Text } = require("@mantine/core");
const { COLORS } = require("../utils/COLORS");
const { highlightText } = require("../utils/highlightText");

const TeamMember = ({ image, title, description, reverse }) => {
    const imageUrl = image ? `https:${image}` : '/placeholder.jpg';

    return (
        <Grid py={50} align="center" w={'100%'}>
            {!reverse && (
                <GridCol px={'xl'} span={6}>
                    <Box pos="relative" w="90%" h="280px">
                        <Box
                            w={'100%'}
                            h={'100%'}
                            style={{
                                position: 'absolute',
                                backgroundColor: COLORS.globalCardBackground,
                                borderRadius: '12px',
                                zIndex: 0,
                            }}
                        />
                        <Image
                            src={imageUrl}
                            alt={title || 'Team Member'}
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                position: 'relative',
                                top: '30px',
                                left: '36px',
                                zIndex: 1,
                            }}
                        />
                    </Box>
                </GridCol>
            )}
            <GridCol px={'xl'} span={6}>
                <Title tt="uppercase" fw={800} lh="lgx2" size="lg" style={{ color: 'black' }}>
                    {highlightText(title)}
                </Title>
                <Text mt={10} c={COLORS.textColor} maw={'80%'} size="base" lh="sm">
                    {highlightText(description)}
                </Text>
            </GridCol>
            {reverse && (
                <GridCol px={'xl'} span={6}>
                    <Box pos="relative" w="90%" h="280px">
                        <Box
                            w={'100%'}
                            h={'100%'}
                            style={{
                                position: 'absolute',
                                backgroundColor: COLORS.globalCardBackground,
                                borderRadius: '12px',
                                zIndex: 0,
                            }}
                        />
                        <Image
                            src={imageUrl}
                            alt={title || 'Team Member'}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                position: 'relative',
                                top: '31px',
                                left: '36px',
                                zIndex: 1,
                            }}
                        />
                    </Box>
                </GridCol>
            )}
        </Grid>
    );
};



export default TeamMember