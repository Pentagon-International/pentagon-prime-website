import React from 'react';
import Service from './Service';
import Retail from './Retail';
import Ship from './Ship';
import QuoteCard from './QuoteCard';
import BottomCard from '../component/common/BottomCard';
import FAQ from '../component/common/FAQ';
import { fetchEntries } from '../utils/fetchEntries';

const page = async () => {
  const title = 'Want to GET PRIME experience?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Reach us here';

  const [serviceData, retailData, itData, shipAnywhereData, shipEverywhereData] = await Promise.all([
    fetchEntries('service'),
    fetchEntries('retail_store'),
    fetchEntries('how-it-works'),
    fetchEntries('ship-anywhere'),
    fetchEntries('ship-everywhere'),
  ]);

  return (
    <>
      <Service title={serviceData.title} icon={serviceData?.icon?.fields?.file?.url} iconTitle={serviceData.iconTitle} content={serviceData.content} />
      <Retail first_title={retailData.title} first_content={retailData.content} second_title={itData.title} second_content={itData.content} />
      <Ship first_title={shipAnywhereData.title} first_content={shipAnywhereData.content} second_title={shipEverywhereData.title} second_content={shipEverywhereData.content} />
      <QuoteCard />
      <FAQ />
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
