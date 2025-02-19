import News from './component/common/News';
import Certificate from './home/Certificate';
import Hero from './home/Hero';
import LogisticsServices from './home/LogisticServices';
import LogisticsTeam from './home/LogisticsTeam';
import Partner from './home/Partner';
import Vision from './home/Vision';

const Page = () => {
  return (
    <>
      <Hero />
      <Vision />
      <LogisticsServices />
      <LogisticsTeam />
      <Certificate />
      <News />
      <Partner />
    </>
  );
};

export default Page;
