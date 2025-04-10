import { Box, Container, Grid, GridCol, Text, Title } from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import { highlightText } from '../utils/highlightText';

const Header = ({ title, content, top }) => {
  return (
    <Box
      mt={60}
      style={{
        height: '80vh',
        backgroundColor: '#111F40',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container fluid px="7%" style={{ color: COLORS.primaryColor, width: '100%' }}>
        <Grid
          columns={1}
          justify="center"
          align="center"
          style={{ height: '100%' }}
        >
          <GridCol
            span={1}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <Text size="sm" mb={10}>
              {highlightText(top)}
            </Text>
            <Title tt="uppercase" size="39px" fw={800} lh="lgx2">
              {highlightText(title)}
            </Title>
            <Text mt={20} size="base">
              {highlightText(content)}
            </Text>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
