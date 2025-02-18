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
import {COLORS} from '../utils/COLORS';
import Images from '../utils/image';

const ACinfo = () => {
  return (
    <Box bg={'#E9EEF4'}>
      <Container fluid px={'7%'} pt={'70px'}>
        <Grid columns={12}>
          <GridCol span={6}>
            <Group>
              <Title tt={'uppercase'} textWrap="balance">
                Additional Contact Information
              </Title>
              <List style={{color: COLORS.textColor, padding: '20px 50px'}}>
                <ListItem>
                  For media inquiries please email{' '}
                  <span style={{textDecoration: 'underline'}}>
                    press@pentagonprime.com
                  </span>
                </ListItem>
                <ListItem>
                  Interested in becoming a partner?{' '}
                  <span style={{textDecoration: 'underline'}}>
                    Submit an inquiry.
                  </span>
                </ListItem>
                <ListItem>
                  Have a security issue?{' '}
                  <span style={{textDecoration: 'underline'}}>
                    Tell us about it here.
                  </span>
                </ListItem>
              </List>
            </Group>
          </GridCol>
          <GridCol span={6}>
            <Image src={Images.contact} alt="contact" />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default ACinfo;
