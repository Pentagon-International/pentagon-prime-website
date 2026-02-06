"use client";

import { Marker, Polyline, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { createSimpleMarker } from "./markerIcon";
import L from "leaflet";
import { resolvePortCoords } from "./getPortCoords";

export default function RouteLayer({ origin, destination, setLoading }) {
  const map = useMap();
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  useEffect(() => {
    if (!origin?.country || !destination?.country) {
      setOriginCoords(null);
      setDestinationCoords(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);

    async function load() {
      try {
        const originData = await resolvePortCoords(origin);
        if (cancelled) return;

        const destinationData = await resolvePortCoords(destination);
        if (cancelled) return;

        setOriginCoords(originData);
        setDestinationCoords(destinationData);
      } finally {
        if (!cancelled) {
          requestAnimationFrame(() => {
            setLoading(false);
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [origin?.country, destination?.country]);

  const originName = origin?.name || origin;
  const destinationName = destination?.name || destination;

  useEffect(() => {
    if (!map || !originCoords || !destinationCoords) return;

    const bounds = L.latLngBounds(
      [originCoords.lat, originCoords.lng],
      [destinationCoords.lat, destinationCoords.lng]
    );

    // Ensure map has layout then center on route with padding
    map.invalidateSize();
    map.fitBounds(bounds, {
      padding: [80, 80],
      maxZoom: 5,
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
          label: origin?.country
            ? `${origin.name}, ${origin.country}`
            : originName,
          country: origin?.country
        })}
      />

      {/* DESTINATION */}
      <Marker
        position={[destinationCoords.lat, destinationCoords.lng]}
        icon={createSimpleMarker({
          color: "#C40C0C",
          label: destination?.country
            ? `${destination.name}, ${destination.country}`
            : destinationName,
          country: destination?.country
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
