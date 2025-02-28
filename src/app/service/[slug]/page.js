import { fetchEntries } from "@/app/utils/fetchEntries";
import Service from "../Service";

const ServicePage = async ({ params }) => {
  const resData = params.slug ? await fetchEntries(params.slug) : await fetchEntries("service");
  
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
