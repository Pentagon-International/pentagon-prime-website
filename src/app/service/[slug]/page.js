import { fetchEntries, fetchShippmententries } from "@/app/utils/fetchEntries";
import Service from "../Service";
import { client } from "@/app/api/contentful";
import Retail from "../Retail";
import Ship from "../Ship";
import AutoplayCarousel from "@/app/component/common/AutoplayCarousel";
import { Box, Image } from "@mantine/core";

export async function generateStaticParams() {
  const entries = await client.getEntries({
    content_type: "title",
    select: "fields.reference",
  });

  return entries.items.map((item) => ({
    slug: item.fields.reference,
  }));
}
const cargoSlides = [
  { src:"/cargo-images/container-loading.jpeg", alt:"container-loading" },
  { src:"/cargo-images/cargo-area.jpeg", alt:"cargo-area" },
  { src:"/cargo-images/cargo-in-ship-closeview.jpeg", alt:"cargo-in-ship-closeview" },
  { src:"/cargo-images/cargo-area-2.jpeg", alt:"cargo-area-2" },
  { src:"/cargo-images/cargo-loading-in-ship.jpeg", alt:"cargo-loading-in-ship" },
  { src:"/cargo-images/cargo-project-with-team-wideview.jpeg", alt:"cargo-project-with-team-wideview" },
  { src:"/cargo-images/container-loading-2.jpeg", alt:"container-loading-2" },
  { src:"/cargo-images/cargo-project-with-team.jpeg", alt:"cargo-project-with-team" },
  { src:"/cargo-images/container-loading-3.jpeg", alt:"container-loading-3" },
];

const ServicePage = async ({ params }) => {
  const resolvedParams = await params;
  console.log('resolved params ----------------------',resolvedParams.slug)
  const resData = await fetchEntries(resolvedParams.slug);
  // const [retailData, shipAnywhereData] = await Promise.all([
  //   fetchEntries("retail_store"),
  //   // fetchEntries("how-it-works"),
  //   fetchEntries("ship-anywhere"),
  // ]);

  const shippingData = await fetchShippmententries(resolvedParams.slug);

  return (
    <>
      <Service
        title={resData.title}
        icon={resData?.icon?.fields?.file?.url}
        iconTitle={resData.iconTitle}
        content={resData.content}
        backgroundImage={
          resData?.backgroundImage?.fields?.file?.url ||
          resData?.backgroundImageUrl
        }
      />

      <Retail
        first_title={resData.title2}
        first_content={resData.subTitle}
        illustration={
          resData.illustration?.fields?.file?.url || resData.illustration
        }
      />
      {resData?.reference === "odc-project-cargo" && (
        <Box py={20} mb={50} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <AutoplayCarousel slides={cargoSlides} interval={4000} height={450} />
        </Box>
      )}
      <Ship
        first_title={resData?.title3}
        first_content={resData?.content2}
        serviceData={shippingData}
      />
    </>
  );
};

export default ServicePage;
