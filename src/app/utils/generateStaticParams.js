import { client } from "../api/contentful";

export async function getStaticParams(contentType, field) {
    const entries = await client.getEntries({
        content_type: contentType,
        select: `fields.${field}`,
    });

    return entries.items.map((item) => ({
        slug: item.fields[field],
    }));
}
