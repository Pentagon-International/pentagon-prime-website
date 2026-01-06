import React from 'react';
import BottomCard from '../component/common/BottomCard';
import About from './About';
import Mission from './Mission';
import Values from './Values';
import Milestone from './Milestone';
import Members from './Members';
import { fetchEntries } from '../utils/fetchEntries';
import CustomerBenefits from './CustomerBenefits';
import CustomerChoose from './CustomerChoose';

const page = async () => {
  const title = 'Want to GET PRIME experience?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Reach us here';

  const [aboutData] = await Promise.all([
    fetchEntries('about_hero'),
  ]);

  return (
    <div style={{
      overflowX: 'hidden',
    }}>
      {/* <About title={aboutData.title} content={aboutData.content} /> */}
      <Mission />
      {/* <Values /> */}
      {/* <CustomerBenefits /> */}
      <Milestone />
      {/* <CustomerChoose /> */}
      <Members />
      <BottomCard title={title} text={text} button={button} />
    </div>
  );
};

export default page;
