"use client";

import { Loader as MantineLoader } from "@mantine/core";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import RouteLayer from "./RouteLayer";
import useCustomerRequestStore from "@/app/store/customerRequestStore";
import "leaflet/dist/leaflet.css";
import "./map.css";
import L from "leaflet";

/* FIX MARKER ICONS (NEXT.JS ISSUE) */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RouteMap() {
  const mapOrigin = useCustomerRequestStore((s) => s.mapOrigin);
  const mapDestination = useCustomerRequestStore((s) => s.mapDestination);
  const mapLoading = useCustomerRequestStore((s) => s.mapLoading);
  const setMapLoading = useCustomerRequestStore((s) => s.setMapLoading);

  const maxBounds = [
    [-90, 68],
    [90, 97.5],
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "80vh",
          width: "100%",
        }}
      >
        <MapContainer
          zoom={2}
          minZoom={2}
          maxZoom={8}
          zoomControl={false}
          scrollWheelZoom={false}
          maxBounds={[
            [-85, -180],
            [85, 180],
          ]}
          maxBoundsViscosity={1.0}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <ZoomControl position="bottomright" />

          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <RouteLayer
            key={`${mapOrigin?.origin ?? mapOrigin?.code ?? ""}-${
              mapDestination?.destination ?? mapDestination?.code ?? ""
            }`}
            origin={mapOrigin}
            destination={mapDestination}
            onLoadingChange={setMapLoading}
          />
        </MapContainer>

        {mapLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <MantineLoader size="xl" color="rgb(0, 33, 95)" type="dots" />
          </div>
        )}
      </div>
    </div>
  );
}
