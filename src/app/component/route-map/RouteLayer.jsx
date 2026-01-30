"use client";

import { Marker, Polyline, Tooltip, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { PORT_COORDINATES } from "./portCoordinates";
import { createSimpleMarker } from "./markerIcon";
import L from "leaflet"
import { resolvePortCoords } from "./getPortCoords";

export default function RouteLayer({ origin, destination }) {
  const map = useMap();
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  useEffect(() => {
    async function load() {
      const originData = await resolvePortCoords({
        code: origin.code,
        name: origin.name,
        country: origin.country,
      });

      const destinationData = await resolvePortCoords({
        code: destination.code,
        name: destination.name,
        country: destination.country,
      });

      setOriginCoords(originData);
      setDestinationCoords(destinationData);
    }

    load();
  }, []);
  console.log("coordinates", originCoords, destinationCoords)
  const originName = origin?.name || origin;
  const destinationName = destination?.name || destination;

    useEffect(() => {
    if (!map || !originCoords || !destinationCoords) return;

    const bounds = L.latLngBounds(
        [originCoords.lat, originCoords.lng],
        [destinationCoords.lat, destinationCoords.lng]
    );

    map.fitBounds(bounds, {
        padding: [120, 120],  // 👈 space around markers
        maxZoom: 5,           // 👈 prevent over-zoom
        animate: true,
    });
    }, [
    map,
    originCoords?.lat,
    originCoords?.lng,
    destinationCoords?.lat,
    destinationCoords?.lng,
    ]);


  if (!originCoords || !destinationCoords) return null;

  return (
    <>
      {/* ORIGIN */}
      <Marker 
        position={[originCoords.lat, originCoords.lng]} 
        icon={createSimpleMarker({
            color: "#2e7d32",
            label: origin?.country ? `${origin.name}, ${origin.country}` : originName
        })}
        />

      {/* DESTINATION */}
      <Marker 
        position={[destinationCoords.lat, destinationCoords.lng]}
        icon={createSimpleMarker({
            color: "#C40C0C",
            label: destination?.country ? `${destination.name}, ${destination.country}` : destinationName
        })}
      />

      {/* ROUTE LINE */}
      <Polyline
        positions={[
          [originCoords.lat, originCoords.lng],
          [destinationCoords.lat, destinationCoords.lng],
        ]}
        pathOptions={{
          color: "#0d6efd",
          weight: 3,
          dashArray: "10 14",
          className: "animated-route",
        }}
      />
    </>
  );
}
