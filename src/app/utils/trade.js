import { client } from "../api/contentful";

export const fetchTradeData = async () => {
    const res = await client.getEntries({
      content_type: 'logisticsTrade',
      order: 'sys.createdAt',
    });
    return res.items;
  };