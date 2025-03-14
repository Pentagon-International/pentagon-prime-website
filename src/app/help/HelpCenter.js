'use client';

import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { useRouter } from 'next/navigation';



const HelpCenter = () => {

  const router = useRouter();
  return (
    <Box
      h={'100vh'}
      w={'100%'}
      style={{
        backgroundImage: 'url(./question_mark.svg)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: "overlay",
        backgroundPosition: "110% calc(100% + 70px)",
      }}
    >
      <Center w={'100%'} h={'100%'}>
        <Stack w={'50vw'} c={COLORS.primaryColor}>
          <Text size={'base'} align={'center'}>Help Center</Text>
          <Title size={'xl'} align={'center'} tt={'uppercase'}>
            How Can We Help You  ?
          </Title>
          <Flex gap={10} w={'100%'} align={'center'} dir='row'>
            <TextInput
              size="lg"
              className="input"
              w={'80%'}
              radius={'md'}
              bg={'inherit'}
              placeholder="Search by term or phrase ..."
              styles={{
                input: {
                  backgroundColor: 'transparent !important',
                  borderColor: `${COLORS.primaryColor} !important`,
                }
              }}
            />
            <Button fz={'sm'} size='lg' fw={600} bg={COLORS.serviceColor}
              onClick={() => router.push('/contact')}
            >
              Search
            </Button>
          </Flex>
          <Text size={'sm'} align={'center'}>
            Already a Pentagon Prime client? Login for assistance
          </Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default HelpCenter;
