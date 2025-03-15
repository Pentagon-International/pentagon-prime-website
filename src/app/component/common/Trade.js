import React from 'react';
import TradeCard from './TradeCard';

const Trade = ({ background, items }) => {
  const title = '15+ years of commitment to the global logistics trade';

  return <TradeCard title={title} item={items} background={background || ''} />;
};

export default Trade;
