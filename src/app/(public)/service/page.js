import React from "react";
import Service from "./Service";
import { fetchEntries } from "@/app/utils/fetchEntries";

const page = async () => {
  const [serviceData] = await Promise.all([fetchEntries("service")]);
  return (
    <>
      <Service
        title={serviceData.title}
        icon={serviceData?.icon?.fields?.file?.url}
        iconTitle={serviceData.iconTitle}
        content={serviceData.content}
        backgroundImage={serviceData?.backgroundImage?.fields?.file?.url}
      />
    </>
  );
};

export default page;