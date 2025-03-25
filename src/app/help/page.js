'use client';

import React from 'react';
import BottomCard from '../component/common/BottomCard';
import HelpCenter from './HelpCenter';
import Resources from './Resources';
import Toolkit from './Toolkit';
import { fetchEntries } from '../utils/fetchEntries';

const page = async () => {
  const title = 'Ready to get started?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Get Started';

  const [toolkitData] = await Promise.all([fetchEntries('prime-toolkit')]);

  return (
    <>
      <div style={{ backgroundColor: '#111F40', height: '100vh' }}>
        <HelpCenter />
      </div>
      <Resources />
      <Toolkit title={toolkitData.title} content={toolkitData.content} />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
