'use client';
import { styles } from './Hero.styles';
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
import { useState } from 'react';

const Hero = () => {
  const [activeTransport, setActiveTransport] = useState('sea');

  const handleTransportClick = (type) => {
    setActiveTransport(type);
  };

  return (
    <Box style={styles.heroContainer}>
      <Container
        fluid
        px={{ base: '5%', md: '7%' }}
        mt={70}
        py={'70px'}
      >
          <Box style={styles.overlayContainer}>
            <Image src={Images.vector_p} style={styles.overlayImage} />
            <Image
              src={Images.container}
              style={{ ...styles.overlayImage, top: '-70px', zIndex: 2 }}
            />
          </Box>

        <Stack gap={0} justify="center" h={'65vh'}>
          <Title order={1} size={'lg'} style={styles.title}>
            Your end-to-end <span className="span-color"> supply chain,</span> all
            in ONE PRIME platform
          </Title>
          <Text lh="33.6px" size="sm" mt={20} style={styles.text}>
            We deliver operational excellence with enhanced trade value.
          </Text>

          <Stack mt={30} gap={0} style={{ position: 'relative', zIndex: 3 }}>
            <Flex
              style={{ ...styles.transportOptions, borderRadius: '15px 15px 0 0 ' }}
            >
              <Group
                style={
                  activeTransport === 'sea'
                    ? { ...styles.groupstyle, cursor: 'pointer' }
                    : { cursor: 'pointer' }
                }
                onClick={() => handleTransportClick('sea')}
              >
                <IconShip size={18} color={COLORS.primaryColor} />
                <Text size={'sm'}>Sea</Text>
              </Group>
              <Group
                ml={20}
                style={
                  activeTransport === 'air'
                    ? { ...styles.groupstyle, cursor: 'pointer' }
                    : { cursor: 'pointer' }
                }
                onClick={() => handleTransportClick('air')}
              >
                <IconPlaneInflight size={18} color={COLORS.primaryColor} />
                <Text size={'sm'}>Air</Text>
              </Group>
            </Flex>
            <Group style={styles.transportOptions}>
              <TextInput
                color={COLORS.secondaryColor}
                placeholder="Select Origin"
                size="sm"
                radius={'md'}
                leftSection={<IconMapPin size={18} color={COLORS.secondaryColor} />}
                styles={{
                  '::placeholder': { color: `${COLORS.secondaryColor} !important` },
                }}
              />
              <ActionIcon
                variant="default"
                size={28}
                radius={'xl'}
                style={styles.actionButton}
              >
                <IconArrowsLeftRight size={18} color={COLORS.primaryColor} />
              </ActionIcon>
              <TextInput
                color={COLORS.secondaryColor}
                placeholder="Select Destination"
                size="sm"
                radius={'md'}
                leftSection={<IconMapPin size={18} color={COLORS.secondaryColor} />}
              />
            </Group>
          </Stack>
        </Stack>

      </Container>
    </Box>
  );
};

export default Hero;
