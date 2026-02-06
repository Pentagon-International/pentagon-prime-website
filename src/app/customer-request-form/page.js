"use client";

import { Suspense } from "react";
import CustomerRequestForm from "./CustomerRequestForm";
import Loader from "../component/common/Loader";
import { Box } from "@mantine/core";
import dynamic from "next/dynamic";
const RouteMap = dynamic(() => import("../component/route-map/RouteMap"), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Box mt={60}>
        <RouteMap />
      </Box>
      <CustomerRequestForm />
    </Suspense>
  );
}
