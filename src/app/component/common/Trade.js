import React from 'react';
import TradeCard from './TradeCard';

const Trade = ({ background, items, content }) => {
  const title = content?.[0]?.fields?.title;

  return <TradeCard title={title} item={items} background={background || ''} />;
};

export default Trade;
