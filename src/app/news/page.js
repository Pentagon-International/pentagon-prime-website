import React from 'react';
import NewsRoom from './NewsRoom';
import BottomCard from '../component/common/BottomCard';
import FeaturedNews from './FeaturedNews';
import { fetchEntries } from '../utils/fetchEntries';

const page = async () => {
  const title = 'Ready to get started?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Get Started';

  const [newsData] = await Promise.all([fetchEntries('newsroom-and-resources')]);

  return (
    <>
      <NewsRoom title={newsData.title} content={newsData.content} />
      <FeaturedNews />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
