import { Box, Container, Flex, Text, Title } from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { client } from '../api/contentful';

const Mission = async () => {
  const styles = {
    boxContainer: {
      width: '100%',
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

  const res = await client.getEntries({
    content_type: 'visionMission',
  });

  return (
    <Container fluid px={'7%'} py={'50px'}>
      <Flex direction={'column'} gap={'xl'}>
        {res.items.map((item, index) => (
          <Box
            key={index}
            style={{
              ...styles.boxContainer,
              backgroundImage: `url(${item.fields.image.fields.file.url})`,
            }}
          >
            <Box style={styles.testimonialBox}>
              <Title fw={800} size={'lg'} tt={'uppercase'} c={COLORS.portColor}>
                {item.fields.title}
              </Title>
              <Text size='base' lh={'30px'} fw={400} tw="balance" w={'80%'} mt={20}>
                {item.fields.content}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default Mission;
