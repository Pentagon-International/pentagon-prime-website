import { Box, Container, Group, Image, Text, Title } from '@mantine/core';
import Images from '../utils/image';
import { highlightText } from '../utils/highlightText';

const About = ({ title, content }) => {
  const styles = {
    heroContainer: {
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      top: 0,
      left: 0,
    },
    overlayContainer: {
      position: 'relative',
      width: '100%',
      height: 'auto',
    },
    overlayImage: {
      position: 'absolute',
      top: '-50px',
      left: '70%',
      transform: 'translateX(-50%)',
      width: '50%',
      objectFit: 'cover',
      zIndex: 1,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    textContainer: {
      width: '70%',
      textAlign: 'left',
      paddingRight: '5%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100%',
    },
    textContent: {
      maxWidth: '40vw',
      textAlign: 'left',
    },
  };

  return (
    <Box style={styles.heroContainer}>
      <Container
        fluid
        px={'7%'}
        mt={70}
        py={'70px'}
      >
        <Box style={styles.overlayContainer}>
          <Image src={Images.about_vector} style={styles.overlayImage} />
          <Image
            src={Images.container}
            style={{ ...styles.overlayImage, top: '-65px', zIndex: 2 }}
          />
        </Box>
        <Group align="center" style={styles.textContainer}>
          <Title size="40px" textWrap="balance" tt="uppercase" style={{ whiteSpace: 'pre-line' }}>
            {highlightText(title)}
          </Title>

          <Text size='sm' mt={20} ta={'left'} maw={'40vw'}>
            {highlightText(content)}
          </Text>
        </Group>
      </Container>
    </Box>
  );
};

export default About;
