import React from 'react';
import Service from './Service';
import Retail from './Retail';
import Ship from './Ship';
import QuoteCard from './QuoteCard';
import BottomCard from '../component/common/BottomCard';
import FAQ from '../component/common/FAQ';

const page = () => {
  const title = 'Want to GET PRIME experience?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Reach us here';
  return (
    <>
      <Service />
      <Retail />
      <Ship />
      <QuoteCard />
      <FAQ />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
