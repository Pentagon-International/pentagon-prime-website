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
      <Container fluid px={{ base: '5%', md: '7%' }} mt={140} py="60px" style={{ height: '100vh', margin: '0 auto' }}>
        <Box style={styles.overlayContainer}>
          <Image src={Images.pentagon_freight} style={{ ...styles.overlayImage, width: '60%' }} />
        </Box>

        <Stack h={'100%'} gap={0} justify="flex-start">
          <Title c={COLORS.primaryColor} style={{ zIndex: 100 }} fw={900} order={1} lh="xl" tt="uppercase" size="50px">
            {highlightText(title)}
          </Title>
          <Text lh="lgx" size="18px" maw={'40%'} fw={400} mt={15}>
            {highlightText(content)}
          </Text>

          <Stack mt={"5%"} gap={0}>
            <Flex style={{ ...styles.transportOptions, borderRadius: '12px 12px 0 0' }}>
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
                fw={500}
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
    top: '-80px',
    left: '75%',
    transform: 'translate(-50% , 10%)',
    width: '45%',
    objectFit: 'cover',
    zIndex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  transportOptions: {
    padding: '14px 16px',
    border: `1px solid ${COLORS.portColor}`,
    borderRadius: '12px',
    backgroundColor: COLORS.portColor,
    width: 'fit-content',
    borderRadius: '0 12px 12px 12px',
    gap: '12px'
  },
  groupstyle: {
    backgroundColor: COLORS.secondaryColor,
    padding: '10px 16px',
    borderRadius: '10px',
  },
};