import React from 'react';
import NewsRoom from './NewsRoom';
import BottomCard from '@/components/common/BottomCard';
import FeaturedNews from './FeaturedNews';
import { fetchEntries } from '@/app/utils/fetchEntries';
import { client } from '@/lib/api/contentful';

const page = async () => {
  const title = 'Ready to get started?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Get Started';

  const [newsData] = await Promise.all([fetchEntries('newsroom-and-resources')]);

  const newsContents = await client.getEntries({
    content_type: 'featuredNews',
    order: 'sys.createdAt',
  });

  return (
    <>
      <NewsRoom title={newsData.title} content={newsData.content} />
      <FeaturedNews res={newsContents}/>
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
