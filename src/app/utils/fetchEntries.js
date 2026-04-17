import { client } from "@/lib/api/contentful";

export const fetchEntries = async (reference) => {
  const res = await client.getEntries({
    content_type: 'title',
    "fields.reference": reference,
    order: 'sys.createdAt'
  });

  return res.items[0]?.fields || {};
};


export const fetchShippmententries = async (reference) => {
  try {
    const res = await client.getEntries({
      content_type: 'shipment',
      "fields.reference": reference, 
      order: 'sys.createdAt',
    });

    return res.items || [];
  } catch (error) {
    console.error("Error fetching shipment entries:", error);
    return [];
  }
};
