import React from 'react';
import NewsRoom from './NewsRoom';
import BottomCard from '../component/common/BottomCard';
import FeaturedNews from './FeaturedNews';

const page = () => {
  const title = 'Ready to get started?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Get Started';

  return (
    <>
      <NewsRoom />
      <FeaturedNews />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
