import React from 'react';
import TradeCard from './TradeCard';

const Trade = ({ background, items, content }) => {
  console.log("content : ",content)
  console.log("content : ",content?.[0])
  console.log("content : ",content?.[0]?.fields)
  console.log("content : ",content?.[0]?.fields?.title)
  const title = content?.[0]?.fields?.title;

  return <TradeCard title={title} item={items} background={background || ''} />;
};

export default Trade;
