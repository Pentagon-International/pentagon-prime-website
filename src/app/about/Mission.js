import {Box, Container, Flex, Text, Title} from '@mantine/core';
import Images from '../utils/image';
import { COLORS } from '../utils/COLORS';

const Mission = () => {
  const styles = {
    boxContainer: {
      width: '100%',
      backgroundImage: `url(${Images.flight_blue})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '350px',
      borderRadius: '30px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    testimonialBox: {
      padding: '20px 30px',
      borderRadius: '10px',
      color: 'white',
      maxWidth: '50%',
      marginLeft: 'auto',
      backdropFilter: 'blur(5px)',
    },
  };
  return (
    <Container fluid px={'7%'} py={'50px'}>
      <Flex direction={'column'} gap={'xl'}>
        <Box style={styles.boxContainer}>
          <Box style={styles.testimonialBox}>
            <Title fw={800} size={'32px'} tt={'uppercase'} c={COLORS.portColor}>
              Our Mission
            </Title>
            <Text lh={'30px'} fw={400} tw="balance" w={'70%'} mt={20}>
              To provide professionally managed one-stop true global logistics
              solutions with reliability, transparency, and dedication to
              maintain and enhance the quality of services at reasonable and
              realistic costs under one roof with a prime focus on satisfied
              customers.
            </Text>
          </Box>
        </Box>
        <Box
          style={{
            ...styles.boxContainer,
            backgroundImage: `url(${Images.flight_black})`,
          }}
        >
          <Box style={styles.testimonialBox}>
            <Title fw={800} size={'32px'} tt={'uppercase'} c={COLORS.portColor}>
              {' '}
              Our Vision
            </Title>
            <Text lh={'30px'} fw={400} tw="balance" w={'70%'} mt={20}>
              To build a strong global footprint and productive international
              partnerships to provide the best end-to-end freight forwarding and
              logistics solutions, extending our expertise as a global company.
              As a collective, our primary mission is to innovate in the
              logistics arena.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Mission;
