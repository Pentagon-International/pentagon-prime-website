
import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Images from '../utils/image';
import { COLORS } from '../utils/COLORS';

export default function Service() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '70px',
        backgroundColor: '#111F40',
        color: '#FFF',
      }}
    >
      <div style={{ width: '50%' }}>
        <Stack px={'20%'} py={'100px'}>
          <Group>
            <Image src={Images.sea_freight} alt="sea freight" />
            <Text size="sm">Omnichannel & Fulfillment Solutions</Text>
          </Group>
          <Title
            style={{ overflowY: 'visible', zIndex: 10 }}
            w={'55vw'}
            size={'lg'}
            tt={'uppercase'}
            textWrap="balance"
          >
            End-to-End Supply Chain Automation
          </Title>
          <Text size="smx" w={'30vw'} lh={'28px'}>
            Connect and automate your supply chain from international freight
            all the way through fulfillment. In the Prime Seller Portal, you can
            instantly book your freight services and ship to the Prime network
            or anywhere in the continental US.
          </Text>
          <Button size="sm" bg={COLORS.serviceColor} w={'fit-content'}>
            Join Now
          </Button>
        </Stack>
      </div>
      <div
        style={{
          width: '50%',
          overflowX: 'hidden',
          backgroundImage: `url(${Images.service})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );
}
