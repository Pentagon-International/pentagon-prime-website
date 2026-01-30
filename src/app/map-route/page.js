"use client";

import { useSearchParams } from "next/navigation";
import RouteMap from "@/app/component/route-map";
import { Box } from "@mantine/core";

export default function MapRoutePage() {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");

  if (!origin || !destination) {
    return <div>Invalid route</div>;
  }

  return (
    <Box mt={30} style={{width:"100%", height:"100%"}}>
        <RouteMap
          origin={origin}
          destination={destination}
        />
    </Box>
  );
}
