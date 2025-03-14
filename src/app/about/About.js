import { Box, Container, Group, Image, Text, Title } from '@mantine/core';
import Images from '../utils/image';
import { highlightText } from '../utils/highlightText';

const About = ({ title, content }) => {
  const styles = {
    heroContainer: {
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    },
    overlayContainer: {
      position: 'absolute',
      width: '50%',
      height: '100%',
      top: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlayImage: {
      width: '90%',
      height: 'auto',
      objectFit: 'contain',
      position: 'relative',
      marginRight: '-10%',
    },
    contentWrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
    },
    textContainer: {
      width: '50%',
      paddingRight: '5%',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
  };

  return (
    <Box style={styles.heroContainer}>
      <Container
        fluid
        px={'7%'}
        h="100%"
      >
        <Box style={styles.contentWrapper}>
          <Box style={styles.textContainer}>
            <Title 
              size="40px" 
              textWrap="balance" 
              tt="uppercase" 
              style={{ 
                whiteSpace: 'pre-line',
                lineHeight: 1.2,
                color: '#000'
              }}
            >
              {highlightText(title)}
            </Title>

            <Text 
              size='sm' 
              style={{ 
                lineHeight: 1.6,
                maxWidth: '90%',
                color: '#666'
              }}
            >
              {highlightText(content)}
            </Text>
          </Box>

          <Box style={styles.overlayContainer}>
            <Image 
              src={Images.pentagon_line} 
              style={styles.overlayImage}
              fit="contain"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
