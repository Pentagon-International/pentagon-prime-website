import {client} from '@/app/api/contentful';
import NewsList from './NewsList';

export default async function News() {
  let newsItems = [];
  try {
    const res = await client.getEntries({
      content_type: 'newsEvents',
      order: 'sys.createdAt',
    });
    newsItems = res.items || [];
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  return <NewsList newsItems={newsItems} />;
}
