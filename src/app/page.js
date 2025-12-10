import News from './component/common/News';
import Certificate from './home/Certificate';
import CustomerCentric from './home/CustomerCentric';
import Hero from './home/Hero';
import HighlightContent from './home/HighlightContent';
import LogisticsServices from './home/LogisticServices';
import LogisticsTeam from './home/LogisticsTeam';
import Partner from './home/Partner';
import PentagonPrime from './home/PentagonPrime';
import PrimeNetwork from './home/PrimeNetwork';
import Vision from './home/Vision';
import { fetchEntries } from './utils/fetchEntries';
import { fetchPrimeNetwork, fetchTradecontent, fetchTradeData } from './utils/trade';

const Page = async () => {
  const [heroData, visionData, primeData, serviceData, teamData, partnerData , tradeItems , tradeContent, primeNetwork] = await Promise.all([
    fetchEntries("hero"),
    fetchEntries("vision"),
    fetchEntries("pentagon-prime"),
    fetchEntries("logistics_services"),
    fetchEntries('logistics_team'),
    fetchEntries('logistics_partner'),
    fetchTradeData(),
    fetchTradecontent(),
    fetchPrimeNetwork()
  ]);
    
  return (
    <div>
      <Hero title={heroData.title} content={heroData.content} />
      <Vision title={visionData.title} content={visionData.content} tradeItems={tradeItems} tradeContent={tradeContent} />
      <PentagonPrime title={primeData.title} content={primeData.content} title2={primeData.title2}/>
      <LogisticsServices title={serviceData.title} />
      <LogisticsTeam title={teamData.title} content={teamData.content} />
      <CustomerCentric />
      <PrimeNetwork content={primeNetwork} />
      <Certificate />
      <News />
      <Partner title={partnerData.title} content={partnerData.content} />
      <HighlightContent />
    </div>
  );
};

export default Page;
