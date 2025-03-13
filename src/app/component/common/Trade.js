'use client';

import React, { useEffect, useState } from 'react';
import TradeCard from './TradeCard';
import { client } from '@/app/api/contentful';

const Trade = ({ background }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'logisticsTrade',
          order: 'sys.createdAt',
        });
        setItems(res.items);
      } catch (error) {
        console.error('Error fetching trade data:', error);
      }
    };

    fetchData();
  }, []);

  const title = '15+ years of commitment to the global logistics trade';

  return <TradeCard title={title} item={items} background={background || ''} />;
};

export default Trade;
