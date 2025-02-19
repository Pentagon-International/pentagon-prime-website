import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { COLORS } from '../utils/COLORS';

const HelpCenter = () => {
  return (
    <Box h={'100vh'} bg={'#111F40'}>
      <Center w={'100%'} h={'100%'}>
        <Stack w={'45vw'} c={COLORS.primaryColor}>
          <Text align={'center'}>Help Center</Text>
          <Title size={'lg'} align={'center'} tt={'uppercase'}>
            How Can We Help You?
          </Title>
          <Flex gap={'lg'}>
            <TextInput
              size="md"
              className="input"
              w={'70%'}
              bg={'inherit'}
              placeholder="Search by term or phase ..."
            />
            <Button size="md" bg={COLORS.serviceColor}>
              Search
            </Button>
          </Flex>
          <Text size={'sm'} align={'center'}>
            Already a pentagon prime client? Login for assistance
          </Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default HelpCenter;
