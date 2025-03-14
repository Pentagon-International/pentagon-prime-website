import React from 'react';
import ProductHero from './ProductHero';
import Images from '../utils/image';
import Trade from '../component/common/Trade';
import Seafright from './SeaFreight';
import ChooseUs from './ChooseUs';
import News from '../component/common/News';
import BottomCard from '../component/common/BottomCard';
import FAQ from '../component/common/FAQ';
import { client } from '../api/contentful';

const fetchEntries = async (reference) => {
  const res = await client.getEntries({
    content_type: 'title',
    "fields.reference": reference,
    order: 'sys.createdAt'
  });

  return res.items[0]?.fields || {};
};

const Product = async () => {
  const background = Images.tradeCard_background;

  const title = 'Want to GET PRIME experience?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Reach us here';

  const [heroData, SeafrightData] = await Promise.all([
    fetchEntries('product'),
    fetchEntries('sea_freight_forwarding')
  ])



  return (
    <>
      <ProductHero title={heroData.title} icon={heroData?.icon?.fields?.file?.url} iconTitle={heroData.iconTitle} />
      <Seafright title={SeafrightData.title} content={SeafrightData.content} />
      <Trade background={background} />
      <ChooseUs />
      <News />
      {/* <FAQ /> */}
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default Product;
