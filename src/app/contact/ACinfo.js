'use client'
import {
  Box,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  List,
  ListItem,
  Title,
} from '@mantine/core';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';
import { theme } from '../utils/theme';
import { useMediaQuery } from '@mantine/hooks';

const ACinfo = () => {

  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box bg={'#E9EEF4'}>
      <Container fluid px={'7%'} pt={'70px'}>
        <Grid columns={12}>
          <GridCol span={isMobile ? 12 : 6}>
            <Group>
              <Title size={isMobile ? 'lg' : 'lgx'} fw={800} lh={'lgx2'} tt={'uppercase'} textWrap="balance">
                Additional Contact Information
              </Title>
              <List c={COLORS.textColor} p={isMobile ? '10px 20px' : '20px 50px'} style={{
                lineHeight: theme.lineHeights.lgx2,
                fontSize: theme.fontSizes.sm
              }}>
                <ListItem>
                  For media inquiries please email{' '}
                  <span style={{ textDecoration: 'underline' }}>
                    press@pentagonprime.com
                  </span>
                </ListItem>
                <ListItem>
                  Interested in becoming a partner?{' '}
                  <span style={{ textDecoration: 'underline' }}>
                    Submit an inquiry.
                  </span>
                </ListItem>
                <ListItem>
                  Have a security issue?{' '}
                  <span style={{ textDecoration: 'underline' }}>
                    Tell us about it here.
                  </span>
                </ListItem>
              </List>
            </Group>
          </GridCol>
          <GridCol span={isMobile ? 12 : 6}>
            <Image src={Images.contact} alt="contact" />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default ACinfo;
