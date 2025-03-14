import { client } from "../api/contentful";

export const fetchEntries = async (reference) => {
  const res = await client.getEntries({
    content_type: 'title',
    "fields.reference": reference,
    order: 'sys.createdAt'
  });

  return res.items[0]?.fields || {};
};