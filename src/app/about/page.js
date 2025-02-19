import React from 'react';
import BottomCard from '../component/common/BottomCard';
import About from './About';
import Mission from './Mission';
import Values from './Values';
import Milestone from './Milestone';
import Members from './Members';

const page = () => {
  const title = 'Want to GET PRIME experience?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Reach us here';

  return (
    <>
      <About />
      <Mission />
      <Values />
      <Milestone />
      <Members />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
