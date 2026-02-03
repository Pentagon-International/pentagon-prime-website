"use client";

import { Marker, Polyline, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { createSimpleMarker } from "./markerIcon";
import L from "leaflet";
import { resolvePortCoords } from "./getPortCoords";

export default function RouteLayer({ origin, destination, onLoadingChange }) {
  const map = useMap();
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  useEffect(() => {
    const hasSelection =
      (origin?.name || origin?.city || origin?.country) &&
      (destination?.name || destination?.city || destination?.country);

    if (!hasSelection) {
      setOriginCoords(null);
      setDestinationCoords(null);
      onLoadingChange?.(false);
      return;
    }

    // Show loader immediately (sync) so it appears before any async work
    onLoadingChange?.(true);
    setOriginCoords(null);
    setDestinationCoords(null);

    let cancelled = false;
    async function load() {
      try {
        const originData = await resolvePortCoords({
          name: origin?.name,
          city: origin?.city,
          country: origin?.country,
        });
        if (cancelled) return;
        const destinationData = await resolvePortCoords({
          name: destination?.name,
          city: destination?.city,
          country: destination?.country,
        });
        if (cancelled) return;

        setOriginCoords(originData);
        setDestinationCoords(destinationData);
      } finally {
        if (!cancelled) onLoadingChange?.(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [
    origin?.name,
    origin?.city,
    origin?.country,
    origin?.origin,
    origin?.code,
    destination?.name,
    destination?.city,
    destination?.country,
    destination?.destination,
    destination?.code,
  ]);

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
