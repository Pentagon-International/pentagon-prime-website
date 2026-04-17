import Vision from "../home/Vision";
import { fetchEntries } from "../../../utils/fetchEntries";
import { fetchTradecontent, fetchTradeData } from "../../../utils/trade";

const VisionSection = async () => {
  const [visionData, tradeItems, tradeContent] = await Promise.all([
    fetchEntries("vision"),
    fetchTradeData(),
    fetchTradecontent(),
  ]);

  return (
    <>
      <Vision
        title={visionData.title}
        content={visionData.content}
        tradeItems={tradeItems}
        tradeContent={tradeContent}
        mode="top"
      />
      <Vision title={visionData.title} content={visionData.content} mode="details" />
    </>
  );
};

export default VisionSection;
