import {Box, Container, Group, Image, Text, Title} from '@mantine/core';
import Images from '../utils/image';

const About = () => {
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
      width: '50%',
      textAlign: 'left',
      paddingRight: '5%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100%',
      marginTop: '70px',
    },
    textContent: {
      maxWidth: '30vw',
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
        style={{borderRadius: '10px'}}
      >
        <Box style={styles.overlayContainer}>
          <Image src={Images.about_vector} style={styles.overlayImage} />
          <Image
            src={Images.container}
            style={{...styles.overlayImage, top: '-65px', zIndex: 2}}
          />
        </Box>
        <Group align="center" style={styles.textContainer}>
          <Title
            size={'40px'}
            textWrap="balance"
            style={{textTransform: 'uppercase', wordBreak: 'break-word'}}
          >
            <span style={{color: '#0E53F2'}}>Our best-in-class services </span>
            take you ahead of your competition.
          </Title>
          <Text mt={20} style={styles.textContent}>
            In 2007, Pentagon Prime began its operations in India to provide the
            finest shipping and logistics solutions. Our commitment to the
            global logistics trade with a range of reliable and comprehensive
            freight forwarding services has been unwavering for 15 years.
          </Text>
          <Text mt={10} style={styles.textContent}>
            Here, we deliver scalable and adaptable logistics services to help
            you focus on expanding your company.
          </Text>
        </Group>
      </Container>
    </Box>
  );
};

export default About;
