import { Container, Flex, Image, Stack, Text, Title } from '@mantine/core';
import Images from '../utils/image';
import { highlightText } from '../utils/highlightText';

const Seafright = ({ title, content }) => {
  return (
    <Container fluid px={'7%'} py={'70px'} my={40}>
      <Flex gap={40} align="center" justify="space-between">
        {/* Left section - Text content */}
        <Stack spacing={20} style={{ flex: 1 }}>
          <Title lh={'lgx2'} fw={800} tt={'uppercase'}>
            {highlightText(title)}
          </Title>
          <Text size="md" fw={500} c={'#444'}>
            Manage all your freight forwarding requirements with our strategic alliances around the globe
          </Text>
          <Text size='sm' lh={'25px'} c={'#555'} mt={20}>
            {highlightText(content)}
          </Text>
        </Stack>

        {/* Right section - Image */}
        <Image 
          p={10} 
          src={Images.pentagon} 
          w={'45%'} 
          height={'30%'}
          alt="Sea Freight Forwarding" 
          style={{ objectFit: 'contain' }}
        />
      </Flex>
    </Container>
  );
};

export default Seafright;
