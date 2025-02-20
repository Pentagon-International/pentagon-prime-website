import { Flex, Text, Title, Container, Group, Box } from '@mantine/core';

const TradeItem = ({ tradeValue, tradeName }) => (
  <Flex justify="space-between" direction="column">
    <Title size="md" order={4}>
      {tradeValue}
    </Title>
    <Text size='sm' lh="27px">{tradeName}</Text>
  </Flex>
);

const getCardStyles = (background) => ({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '20px',
  color: 'white',
  padding: '25px',
});

const TradeCard = ({ title = '', item = [], background = '' }) => {
  return (
    <Container fluid px="7%" py="50px">
      <Box style={getCardStyles(background)}>
        <Flex align="center" justify="center" wrap="wrap" w="100%">
          {title && (
            <Text
              w="25%"
              size="base"
              tw='balance'
              style={{ wordBreak: 'break-word' }}
            >
              {title}
            </Text>
          )}
          <Group ml={'5%'} wrap="wrap">
            {item.map(({ sys, fields }) => (
              <TradeItem
                key={sys.id}
                tradeValue={fields.tradeValue}
                tradeName={fields.tradeName}
              />
            ))}
          </Group>
        </Flex>
      </Box>
    </Container>
  );
};

export default TradeCard;
