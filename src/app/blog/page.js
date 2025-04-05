import { client } from "../api/contentful";
import BottomCard from "../component/common/BottomCard";
import FeaturedNews from "../news/FeaturedNews";
import NewsRoom from "../news/NewsRoom";
import { fetchEntries } from "../utils/fetchEntries";

const page = async () => {
  const title = 'Ready to get started?';
  const text =
    'Talk to a supply chain solutions expert and see the Prime Platform in action.';
  const button = 'Get Started';

  const [newsData] = await Promise.all([fetchEntries('blog')]);

  const bolgs = await client.getEntries({
    content_type: 'featuredNews',
    order: 'sys.createdAt',
  });

  return (
    <>
      <NewsRoom title={newsData.title} content={newsData.content} />
      <FeaturedNews res={bolgs}/>
      <BottomCard title={title} text={text} button={button} />
    </>
  );
};

export default page;
