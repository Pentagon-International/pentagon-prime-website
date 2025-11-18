import { fetchEntries, fetchShippmententries } from "@/app/utils/fetchEntries";
import Service from "../Service";
import { client } from "@/app/api/contentful";
import Retail from "../Retail";
import Ship from "../Ship";
import AutoplayCarousel from "@/app/component/common/AutoplayCarousel";
import { Box, Image, Title } from "@mantine/core";
import VideoCarousel from "@/app/component/common/VideoCarousel/VideoCarousel";
import { highlightText } from "../../utils/highlightText";

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
  { src: "/cargo-images/cargo-area.jpeg", alt: "cargo-area" },
  { src: "/cargo-images/cargo-in-ship-closeview.jpeg", alt: "cargo-in-ship-closeview" },
  { src: "/cargo-images/cargo-area-2.jpeg", alt: "cargo-area-2" },
  { src: "/cargo-images/cargo-loading-in-ship.jpeg", alt: "cargo-loading-in-ship" },
  { src: "/cargo-images/cargo-project-with-team-wideview.jpeg", alt: "cargo-project-with-team-wideview" },
  { src: "/cargo-images/container-loading-2.jpeg", alt: "container-loading-2" },
  { src: "/cargo-images/cargo-project-with-team.jpeg", alt: "cargo-project-with-team" },
  { src: "/cargo-images/cargo-movement-picture.jpg", alt: "cargo-movement-picture" },
  { src: "/cargo-images/cargo-movement-picture-1.jpg", alt: "cargo-movement-picture-1" },
  { src: "/cargo-images/cargo-movement-picture-2.jpg", alt: "cargo-movement-picture-2" },
  { src: "/cargo-images/cargo-project-picture.jpg", alt: "cargo-project-picture" },
  { src: "/cargo-images/cargo-project-picture-1.jpg", alt: "cargo-project-picture-1" },
  { src: "/cargo-images/cargo-project-picture-2.jpg", alt: "cargo-project-picture-2" },
  { src: "/cargo-images/cargo-project-picture-3.jpg", alt: "cargo-project-picture-3" },
  { src: "/cargo-images/cargo-project-picture-4.jpg", alt: "cargo-project-picture-4" },
  { src: "/cargo-images/cargo-project-picture-5.jpg", alt: "cargo-project-picture-5" },
  { src: "/cargo-images/cargo-project-picture-6.jpg", alt: "cargo-project-picture-6" },
  { src: "/cargo-images/cargo-project-picture-7.jpg", alt: "cargo-project-picture-7" },
  { src: "/cargo-images/cargo-project-picture-8.jpg", alt: "cargo-project-picture-8" },
  { src: "/cargo-images/cargo-project-picture-9.jpg", alt: "cargo-project-picture-9" },
];


const cargoVideos = [
  "/cargo-videos/cargo-video-1.mp4",
  "/cargo-videos/cargo-video-2.mp4",
  "/cargo-videos/cargo-video-3.mp4",
  "/cargo-videos/cargo-video-4.mp4",
  "/cargo-videos/cargo-video-5.mp4",
  "/cargo-videos/cargo-video-6.mp4",
  "/cargo-videos/cargo-video-7.mp4",
  "/cargo-videos/cargo-video-8.mp4"
];


const ServicePage = async ({ params }) => {
  const resolvedParams = await params;
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
        {/* #add video carousel here if resData?.reference === "odc-project-cargo" */}
        {resData?.reference === "odc-project-cargo" && (
          <Box py={20} mt={50} mb={50} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", }}>
            <Title tt="uppercase" size={'28px'} fw={800} lh={'lgx2'}>{highlightText("Our Cargo # Movement # Videos")}</Title>
            <VideoCarousel videos={cargoVideos} />
          </Box>
        )}
    </>
  );
};

export default ServicePage;
