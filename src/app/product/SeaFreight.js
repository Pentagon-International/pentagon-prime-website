import { Container, Flex, Group, Image, Stack, Text, Title } from '@mantine/core';
import Images from '../utils/image';
import { highlightText } from '../utils/highlightText';

const Seafright = ({ title, content }) => {
  return (
    <Container fluid px={'7%'} py={'70px'}>
      <Stack spacing={0} gap={0}>
        <Title lh={'lgx2'} fw={800} tt={'uppercase'} w={'70%'} size={'lg'}>
          {highlightText(title)}
        </Title>
        <Flex gap={10} justify={'space-between '}>
          <Group mt={10}>
            <Text size='sm' lh={'25px'}>
              {highlightText(content)}
            </Text>
          </Group>
          <Image p={10} src={Images.pentagon} alt="Sea Freight Forwarding" />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Seafright;
