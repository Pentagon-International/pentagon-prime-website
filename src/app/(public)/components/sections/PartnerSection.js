import Partner from "../home/Partner";
import { fetchEntries } from "../../../utils/fetchEntries";

const PartnerSection = async () => {
  const partnerData = await fetchEntries("logistics_partner");

  return <Partner title={partnerData.title} content={partnerData.content} />;
};

export default PartnerSection;
