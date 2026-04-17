import { fetchEntries, fetchShippmententries } from "@/app/utils/fetchEntries";
import Service from "../../service/Service";
import { client } from "@/lib/api/contentful";
import Retail from "../../service/Retail";
import Ship from "../../service/Ship";
import { Box } from "@mantine/core";
import ListCard from "@/components/common/ListCard";
import { customClearanceList, exhibitionCargoList, projectCargoList, projectCargoList2, crossTradeList, crossTradeList2, odcProjectCargoList } from "@/app/utils/llistData";
import { COLORS } from "@/app/utils/COLORS";


export async function generateStaticParams() {
  const entries = await client.getEntries({
    content_type: "title",
    select: "fields.reference",
  });

  return entries.items.map((item) => ({
    slug: item.fields.reference,
  }));
}

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
        <Box style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:COLORS.backgroundColor }}>
          <ListCard listData={odcProjectCargoList} sectionTitle={"we make it possible"} />
        </Box>
      )}
      {resData?.reference === "customs-clearance" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center",backgroundColor:COLORS.backgroundColor }}>
          <ListCard listData={customClearanceList} sectionTitle={"What we do: end-to-end, shipper-first"} />
        </Box>
      )}
      {resData?.reference === "exhibition-cargo" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center",backgroundColor:COLORS.backgroundColor }}>
          <ListCard listData={exhibitionCargoList} sectionTitle={"What we handle"} />
        </Box>
      )}
      {resData?.reference === "break-bulk-cargo" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:COLORS.backgroundColor }}>
          <ListCard listData={projectCargoList} sectionTitle={"What we do"} />
        </Box>
      )}
      {resData?.reference === "cross-country-trade" && (
        <Box py={20} style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:COLORS.backgroundColor}}>
          <ListCard listData={crossTradeList} sectionTitle={"What we deliver"} />
        </Box>
      )}

      {!excludeShippingData.includes(resData?.reference) && (
        <Ship
        first_title={resData?.title3}
        first_content={resData?.content2}
        serviceData={shippingData}
        />
      )}
        {/* {resData?.reference === "exhibition-cargo" && (
        <Box py={20} mb={20} style={{display:"flex", justifyContent:"center", alignItems:"center", }}>
          <ListCard listData={exhibitionCargoList2} sectionTitle={"Sustainability - practical, measurable steps"} />
        </Box>
      )} */}
        {resData?.reference === "break-bulk-cargo" && (
        <Box py={20} pb={40} style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:COLORS.backgroundColor}}>
          <ListCard listData={projectCargoList2} sectionTitle={"Why shippers choose Pentagon Prime"} />
        </Box>
      )}
        {resData?.reference === "cross-country-trade" && (
        <Box pb={20} style={{display:"flex", justifyContent:"center", alignItems:"center",backgroundColor:COLORS.backgroundColor }}>
          <ListCard listData={crossTradeList2} sectionTitle={"Why shippers choose Pentagon Prime"} />
        </Box>
      )}
    </>
  );
};

export default ServicePage;
