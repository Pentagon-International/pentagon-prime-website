import News from './component/common/News';
import Certificate from './home/Certificate';
import Hero from './home/Hero';
import LogisticsServices from './home/LogisticServices';
import LogisticsTeam from './home/LogisticsTeam';
import Partner from './home/Partner';
import PrimeNetwork from './home/PrimeNetwork';
import Vision from './home/Vision';
import { fetchEntries } from './utils/fetchEntries';
import { fetchTradeData } from './utils/trade';


const Page = async () => {
  const [heroData, visionData, serviceData, teamData, partnerData , tradeItems] = await Promise.all([
    fetchEntries("hero"),
    fetchEntries("vision"),
    fetchEntries("logistics_services"),
    fetchEntries('logistics_team'),
    fetchEntries('logistics_partner'),
    fetchTradeData(),
  ]);

  return (
    <>
      <Hero title={heroData.title} content={heroData.content} />
      <Vision title={visionData.title} content={visionData.content} tradeItems={tradeItems} />
      <LogisticsServices title={serviceData.title} />
      <LogisticsTeam title={teamData.title} content={teamData.content} />
      <Certificate />
      <PrimeNetwork />
      <News />
      <Partner title={partnerData.title} content={partnerData.content} />
    </>
  );
};

export default Page;
