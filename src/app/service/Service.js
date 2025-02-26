
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
import { theme } from '../utils/theme';
import { highlightText } from '../utils/highlightText';

export default function Service({ title, icon, iconTitle, content }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '60px',
        backgroundColor: '#111F40',
        color: '#FFF',
      }}
    >
      <div style={{ width: '50%' }}>
        <Stack px={'20%'} py={'70px'}>
          <Group>
            <Image radius={25} src={icon} w={40} h={40} alt="sea freight" />
            <Text size="sm">{highlightText(iconTitle)}</Text>
          </Group>
          <Title
            style={{ overflowY: 'visible', zIndex: 10, fontSize: theme.fontSizes.xxl }}
            w={'55vw'}
            lh={theme.lineHeights.xxl}
            tt={'uppercase'}
            textWrap="balance"
          >
            {highlightText(title)}
          </Title>
          <Text tw='balance' size="sm" w={'40vw'} lh={'sm'}>
            {highlightText(content)}
          </Text>
          <Button p={'18px 32px'} size="xl" fz={'sm'} bg={COLORS.serviceColor} w={'fit-content'}>
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
