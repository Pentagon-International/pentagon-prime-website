"use client";

import { Loader as MantineLoader } from "@mantine/core";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import RouteLayer from "./RouteLayer";
import useCustomerRequestStore from "@/app/store/customerRequestStore";
import "leaflet/dist/leaflet.css";
import "./map.css";
import L from "leaflet";
import { COLORS } from "@/app/utils/COLORS";
import { useState } from "react";

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

  const [isMapLoading, setIsMapLoading] = useState(false);

  return (
    <div style={{ backgroundColor: COLORS.backgroundColor, padding: "0" }}>
      <div style={{ position: "relative", height: "80vh", width: "100%",boxShadow:"0 0 8px rgba(0, 0, 0, 0.3)",borderRadius: "16px", }}>
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
          }}
        >
          <ZoomControl position="bottomright" />

          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 🔥 ONLY ONE LOADING CHANNEL */}
          <RouteLayer
            origin={mapOrigin}
            destination={mapDestination}
            setLoading={setIsMapLoading}
          />
        </MapContainer>

        {isMapLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.6)",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <MantineLoader size="xl" color="#0d6efd" type="dots" />
          </div>
        )}
      </div>
    </div>
  );
}

