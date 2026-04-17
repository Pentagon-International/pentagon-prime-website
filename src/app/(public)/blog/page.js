import { Box } from "@mantine/core";
import { client } from "@/lib/api/contentful";
import BottomCard from "@/components/common/BottomCard";
import NewsRoom from "../news/NewsRoom";
import { fetchEntries } from "@/app/utils/fetchEntries";
import FeaturedBlog from "./FeaturedBlog";
import { COLORS } from "@/app/utils/COLORS";

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

  // const currentItems = blogItems.slice(startIndex, startIndex + ITEMS_PER_VIEW);

  let blogItems = [];
  try {
    const res = await client.getEntries({
      content_type: 'newsEvents',
      order: '-sys.updatedAt',
    });
    blogItems = res.items || [];
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  return (
    <Box bg={COLORS.backgroundColor} >
      <NewsRoom title={newsData.title} content={newsData.content} />
      <FeaturedBlog res={blogItems || []} />
      <BottomCard title={title} text={text} button={button} />
    </Box>
  );
};

export default page;
