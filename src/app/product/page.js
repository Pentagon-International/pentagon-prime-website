import React from 'react';
import ProductHero from './ProductHero';
import Images from '../utils/image';
import Trade from '../component/common/Trade';
import Seafright from './SeaFreight';
import ChooseUs from './ChooseUs';
import News from '../component/common/News';
import BottomCard from '../component/common/BottomCard';
import FAQ from '../component/common/FAQ';

const Product = () => {
  const background = Images.tradeCard_background;

  const title = 'Want to GET PRIME experience?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Reach us here';

  return (
    <>
      <ProductHero />
      <Seafright />
      <Trade background={background} />
      <ChooseUs />
      <News />
      <FAQ />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default Product;
