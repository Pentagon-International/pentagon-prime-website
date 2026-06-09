import { Box } from '@mantine/core';
import AIProofSection from '@/app/(public)/components/home/AIProofSection';
import News from '@/components/common/News';
import Certificate from '@/app/(public)/components/home/Certificate';
import FreightLanesMarquee from '@/app/(public)/components/home/FreightLanesMarquee';
import HighlightContent from '@/app/(public)/components/home/HighlightContent';
import PrimeAIDemoSection from '@/app/(public)/components/home/PrimeAIDemoSection';
import PrimePlatformSection from '@/app/(public)/components/home/PrimePlatformSection';
import PentagonPrimeImageSection from '@/app/(public)/components/home/PentagonPrimeImageSection';
import HeroSection from './components/sections/HeroSection';
import VisionSection from './components/sections/VisionSection';
import PartnerSection from './components/sections/PartnerSection';

const Page = async () => {
  return (
    <Box>
      <HeroSection />
      <FreightLanesMarquee />
      <VisionSection mode="top" />
      <PentagonPrimeImageSection />
      <PrimeAIDemoSection />
      <PrimePlatformSection />
      <AIProofSection />
      <PartnerSection />
      <Certificate />
      <VisionSection mode="details" />
      <News />
      <HighlightContent />
    </Box>
  );
};

export default Page;
