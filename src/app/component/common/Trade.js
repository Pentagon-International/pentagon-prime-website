import React from 'react';
import TradeCard from './TradeCard';
import { client } from '@/app/api/contentful';

const Trade = async ({ background }) => {
  const res = await client.getEntries({
    content_type: 'logisticsTrade',
    order: 'sys.createdAt',
  });

  const title = '15+ Years of commitment to the global logistics trade';

  return (
    <TradeCard
      title={title}
      item={res.items}
      background={background ? background : ''}
    />
  );
};

export default Trade;
