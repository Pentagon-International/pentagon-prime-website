import { fetchEntries } from "@/app/utils/fetchEntries";
import Service from "../Service";
import { client } from "@/app/api/contentful";

export async function generateStaticParams() {
  const entries = await client.getEntries({
    content_type: "title",
    select: "fields.reference", 
  });

  return entries.items.map((item) => ({
    slug: item.fields.reference,
  }));
}

const ServicePage = async ({ params }) => {
  const resData = await fetchEntries(params.slug);

  return (
    <Service
      title={resData.title}
      icon={resData?.icon?.fields?.file?.url}
      iconTitle={resData.iconTitle}
      content={resData.content}
      backgroundImage={resData?.backgroundImageUrl}
    />
  );
};

export default ServicePage;