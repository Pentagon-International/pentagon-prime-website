import { fetchEntries, fetchShippmententries } from "@/app/utils/fetchEntries";
import Service from "../Service";
import { client } from "@/app/api/contentful";
import Retail from "../Retail";
import Ship from "../Ship";
import AutoplayCarousel from "@/app/component/common/AutoplayCarousel";
import { Box, Image, Title } from "@mantine/core";
import MediaCarousel from "@/app/component/common/MediaCarousel/MediaCarousel";
import { highlightText } from "../../utils/highlightText";
import { TYPOGRAPHY } from "../../utils/TYPOGRAPHY";
import ListCard from "@/app/component/common/ListCard";
import { customClearanceList, exhibitionCargoList, exhibitionCargoList2, projectCargoList, projectCargoList2, crossTradeList, crossTradeList2, odcProjectCargoList } from "@/app/utils/llistData";


export async function generateStaticParams() {
  const entries = await client.getEntries({
    content_type: "title",
    select: "fields.reference",
  });

  return entries.items.map((item) => ({
    slug: item.fields.reference,
  }));
}

const breakBulkCargoSlides = [
  { src: "/break-bulk-images/break-bulk-cargo-1.jpeg", alt: "break-bulk-cargo-1" },
  { src: "/break-bulk-images/break-bulk-cargo-2.jpeg", alt: "break-bulk-cargo-2" },
  { src: "/break-bulk-images/break-bulk-cargo-3.jpeg", alt: "break-bulk-cargo-3" },
  { src: "/break-bulk-images/break-bulk-cargo-4.jpeg", alt: "break-bulk-cargo-4" },
  { src: "/break-bulk-images/break-bulk-cargo-5.jpeg", alt: "break-bulk-cargo-5" },
  { src: "/break-bulk-images/break-bulk-cargo-6.jpeg", alt: "break-bulk-cargo-6" },
  { src: "/break-bulk-images/break-bulk-cargo-7.jpeg", alt: "break-bulk-cargo-7" },
];


const cargoSlides = [
  { src: "/cargo-images/cargo-truck.jpeg", alt: "cargo-truck" },
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
  { src: "/cargo-images/cargo-project-picture-3.jpg", alt: "cargo-project-picture-3" },
  { src: "/cargo-images/cargo-project-picture-4.jpg", alt: "cargo-project-picture-4" },
  // { src: "/cargo-images/cargo-project-picture-5.jpg", alt: "cargo-project-picture-5" },
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
  "/cargo-videos/cargo-video-8.mp4"
];

const charteringSlides = [
  { src: "/chartering-coastal-movements/cargo-project-picture-1.jpg", alt: "cargo-project-picture-1" },
  { src: "/chartering-coastal-movements/cargo-project-picture-2.jpg", alt: "cargo-project-picture-2" },
  { src: "/chartering-coastal-movements/cargo-project-picture-5.jpg", alt: "cargo-project-picture-2" },
];

const charteringVideos = [
  "/chartering-coastal-movements/cargo-video-7.mp4"
];

const charteringMedia = (() => {
  const imageItems = charteringSlides.map(slide => ({ type: 'image', src: slide.src, alt: slide.alt }));
  const videoItems = charteringVideos.map(video => ({ type: 'video', src: video }));
  
  // Interleave images and videos (mix them)
  const mixed = [];
  const maxLength = Math.max(imageItems.length, videoItems.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < imageItems.length) {
      mixed.push(imageItems[i]);
    }
    if (i < videoItems.length) {
      mixed.push(videoItems[i]);
    }
  }
  
  return mixed;
})();

// Combined media array for unified carousel (images + videos) - mixed order
const cargoMedia = (() => {
  const imageItems = cargoSlides.map(slide => ({ type: 'image', src: slide.src, alt: slide.alt }));
  const videoItems = cargoVideos.map(video => ({ type: 'video', src: video }));
  
  // Interleave images and videos (mix them)
  const mixed = [];
  const maxLength = Math.max(imageItems.length, videoItems.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < imageItems.length) {
      mixed.push(imageItems[i]);
    }
    if (i < videoItems.length) {
      mixed.push(videoItems[i]);
    }
  }
  
  return mixed;
})();

const excludeShippingData = ["exhibition-cargo", "break-bulk-cargo", "cross-country-trade"];


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
        <Box style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={odcProjectCargoList} sectionTitle={"we make it possible"} />
        </Box>
      )}
      {resData?.reference === "customs-clearance" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={customClearanceList} sectionTitle={"What we do: end-to-end, shipper-first"} />
        </Box>
      )}
      {resData?.reference === "exhibition-cargo" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={exhibitionCargoList} sectionTitle={"What we handle"} />
        </Box>
      )}
      {resData?.reference === "break-bulk-cargo" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={projectCargoList} sectionTitle={"What we do"} />
        </Box>
      )}
      {resData?.reference === "break-bulk-cargo" && (
        <Box py={20} mb={50} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <AutoplayCarousel slides={breakBulkCargoSlides} interval={4000} height={450} />
        </Box>
      )}
      {resData?.reference === "cross-country-trade" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={crossTradeList} sectionTitle={"What we deliver"} />
        </Box>
      )}

      {resData?.reference === "chartering-and-coastal-movements" && (
        <Box py={20} mt={20} mb={20} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", }}>
          <MediaCarousel items={charteringMedia} interval={4000} height={550} />
        </Box>
      )}
      {!excludeShippingData.includes(resData?.reference) && (
        <Ship
        first_title={resData?.title3}
        first_content={resData?.content2}
        serviceData={shippingData}
        />
      )}
        {/* Unified media carousel (images + videos) for odc-project-cargo */}
        {resData?.reference === "odc-project-cargo" && (
          <Box py={20} mt={50} mb={20} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", }}>
            <Title tt="uppercase" size={TYPOGRAPHY.h4.desktop} fw={800} lh={'lgx2'} mb={20}>{highlightText("Our Cargo # Movements #")}</Title>
            <MediaCarousel items={cargoMedia} interval={4000} height={550} />
          </Box>
        )}
        {/* {resData?.reference === "exhibition-cargo" && (
        <Box py={20} mb={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={exhibitionCargoList2} sectionTitle={"Sustainability - practical, measurable steps"} />
        </Box>
      )} */}
        {resData?.reference === "break-bulk-cargo" && (
        <Box py={20} mb={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={projectCargoList2} sectionTitle={"Why shippers choose Pentagon Prime"} />
        </Box>
      )}
        {resData?.reference === "cross-country-trade" && (
        <Box mb={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={crossTradeList2} sectionTitle={"Why shippers choose Pentagon Prime"} />
        </Box>
      )}
    </>
  );
};

export default ServicePage;
