'use client';
import { useState } from 'react';
import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconMapPin,
  IconPlaneInflight,
  IconShip,
} from '@tabler/icons-react';
import { highlightText } from '../utils/highlightText';

const TransportOption = ({ type, icon, activeTransport, onClick }) => (
  <Group
    style={type === activeTransport ? styles.groupstyle : { cursor: 'pointer' }}
    onClick={() => onClick(type)}
    gap={10}
  >
    {icon}
    <Text size="sm" lh="xs" fw={500}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
  </Group>
);

const Hero = ({ title, content }) => {
  const [activeTransport, setActiveTransport] = useState('sea');

  return (
    <Box style={styles.heroContainer}>
      <Container fluid px={{ base: '5%', md: '7%' }} mt={60} py="60px">
        <Box style={styles.overlayContainer}>
          <Image src={Images.vector_p} style={{ ...styles.overlayImage, overflowY: 'visible' }} />
          <Image src={Images.container} style={{ ...styles.overlayImage, width: '53%', top: '-50px', zIndex: 2 }} />
        </Box>

        <Stack gap={0} justify="center">
          <Title c={COLORS.primaryColor} fw={900} order={1} lh="xl" tt="uppercase" size="60px">
            {highlightText(title)}
          </Title>
          <Text lh="lgx" size="base" maw={'40%'} fw={400} mt={15}>
            {content}
          </Text>

          <Stack mt={15} gap={0}>
            <Flex style={{ ...styles.transportOptions, borderRadius: '15px 15px 0 0' }}>
              <TransportOption
                type="sea"
                icon={<IconShip size={20} color={COLORS.primaryColor} />}
                activeTransport={activeTransport}
                onClick={setActiveTransport}
              />
              <TransportOption
                type="air"
                icon={<IconPlaneInflight size={20} color={COLORS.primaryColor} />}
                activeTransport={activeTransport}
                onClick={setActiveTransport}
              />
            </Flex>

            <Group style={styles.transportOptions}>
              <TextInput
                color={COLORS.secondaryColor}
                placeholder="Select Origin"
                size="sm"
                radius="md"
                leftSection={<IconMapPin size={20} color={COLORS.secondaryColor} />}
                classNames={{ input: 'custom-placeholder' }}
              />
              <ActionIcon variant="default" size={28} radius="xl" bg={COLORS.secondaryColor} style={{ borderColor: COLORS.secondaryColor }}>
                <IconArrowsLeftRight size={18} color={COLORS.primaryColor} />
              </ActionIcon>
              <TextInput
                color={COLORS.secondaryColor}
                placeholder="Select Destination"
                size="sm"
                radius="md"
                leftSection={<IconMapPin size={20} color={COLORS.secondaryColor} />}
                classNames={{ input: 'custom-placeholder' }}
              />
            </Group>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;


const styles = {
  heroContainer: {
    backgroundImage: `url(${Images.hero})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    height: '100vh',
    position: 'relative',
    overflowY: 'hidden',
    top: 0,
    left: 0,
  },
  overlayContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayImage: {
    position: 'absolute',
    top: '-50px',
    left: '75%',
    transform: 'translateX(-50%)',
    width: '55%',
    objectFit: 'cover',
    zIndex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  transportOptions: {
    padding: '14px 16px',
    border: `1px solid ${COLORS.portColor}`,
    borderRadius: '15px',
    backgroundColor: COLORS.portColor,
    width: 'fit-content',
    borderRadius: '0 15px 15px 15px',
    gap: '12px'
  },
  groupstyle: {
    backgroundColor: COLORS.secondaryColor,
    padding: '10px 16px',
    borderRadius: '10px',
  },
};