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


const HelpCenter = () => {
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
        <Stack w={'40vw'} c={COLORS.primaryColor}>
          <Text align={'center'}>Help Center</Text>
          <Title size={'lg'} align={'center'} tt={'uppercase'}>
            How Can We Help You  ?
          </Title>
          <Flex gap={0} w={'100%'}>
            <TextInput
              size="md"
              className="input"
              w={'100%'}
              bg={'inherit'}
              placeholder="Search by term or phrase ..."
              rightSectionWidth={90}
              rightSection={
                <Button w={'100%'} fz={'smx'} size="sm" bg={COLORS.serviceColor}>
                  Search
                </Button>
              }
            />
          </Flex>
          <Text size={'sm'} align={'center'}>
            Already a Pentagon Prime client? Login for assistance
          </Text>
        </Stack>
      </Center>
      {/* </BackgroundImage> */}
    </Box>
  );
};

export default HelpCenter;
