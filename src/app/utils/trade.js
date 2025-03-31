import { client } from "../api/contentful";

export const fetchTradeData = async () => {
    const res = await client.getEntries({
      content_type: 'logisticsTrade',
      order: 'sys.createdAt',
    });
    return res.items;
};

export const fetchTradecontent = async () => {
  const res = await client.getEntries({
    content_type: 'trade',
    order: 'sys.createdAt',
  });
  return res.items;
}

export const fetchPrimeNetwork = async () => {
  const res = await client.getEntries({
    content_type: 'primeNetwork',
    order: 'sys.createdAt',
  });
  return res.items;
}