import { fetchEntries, fetchShippmententries } from "@/app/utils/fetchEntries";
import Service from "../Service";
import { client } from "@/app/api/contentful";
import Retail from "../Retail";
import Ship from "../Ship";

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


  const [retailData, shipAnywhereData,] = await Promise.all([
    fetchEntries("retail_store"),
    // fetchEntries("how-it-works"),
    fetchEntries("ship-anywhere"),
  ]);

  const shippingData = await fetchShippmententries(params.slug);

  return (
    <>

      <Service
        title={resData.title}
        icon={resData?.icon?.fields?.file?.url}
        iconTitle={resData.iconTitle}
        content={resData.content}
        backgroundImage={resData?.backgroundImage?.fields?.file?.url || resData?.backgroundImageUrl}
      />

      <Retail first_title={resData.title2} first_content={resData.subTitle} />
      <Ship first_title={shipAnywhereData.title} first_content={shipAnywhereData.content} serviceData={shippingData} />
    </>
  );
};

export default ServicePage;