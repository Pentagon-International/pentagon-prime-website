import Hero from "../home/Hero";
import { fetchEntries } from "../../../utils/fetchEntries";

const HeroSection = async () => {
  const heroData = await fetchEntries("hero");

  return <Hero title={heroData.title} content={heroData.content} />;
};

export default HeroSection;
