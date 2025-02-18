import React from 'react';
import BottomCard from '../component/common/BottomCard';
import HelpCenter from './HelpCenter';
import Resources from './Resources';
import Toolkit from './Toolkit';

const page = () => {
  const title = 'Ready to get started?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Get Started';
  return (
    <>
      <HelpCenter />
      <Resources />
      <Toolkit />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
