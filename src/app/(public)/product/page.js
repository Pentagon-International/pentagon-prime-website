'use client';
import React from 'react';
import { client } from '@/lib/api/contentful';
import ChooseUs from './ChooseUs';
import ProductHero from './ProductHero';
import Seafright from './SeaFreight';
import Trade from '@/components/common/Trade';
import News from '@/components/common/News';
import BottomCard from '@/components/common/BottomCard';
import Images from '@/app/utils/image';
import { fetchTradeData } from '@/app/utils/trade';

const fetchEntries = async (reference) => {
  const res = await client.getEntries({
    content_type: 'title',
    'fields.reference': reference,
    order: 'sys.createdAt',
  });
  return res.items[0]?.fields || {};
};

const Product = async () => {
  const [heroData, SeafrightData, tradeItems] = await Promise.all([
    fetchEntries('product'),
    fetchEntries('sea_freight_forwarding'),
    fetchTradeData(),
  ]);

  const background = Images.tradeCard_background;
  const title = 'Want to GET PRIME experience?';
  const text = 'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Reach us here';

  return (
    <>
      <ProductHero title={heroData.title} icon={heroData?.icon?.fields?.file?.url} iconTitle={heroData.iconTitle} />
      <Seafright title={SeafrightData.title} content={SeafrightData.content} />
      <Trade background={background} items={tradeItems} />
      <ChooseUs />
      <News />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default Product;
