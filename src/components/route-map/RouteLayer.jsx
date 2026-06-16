"use client";

import { Marker, Polyline, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { createSimpleMarker } from "./markerIcon";
import L from "leaflet";
import { resolvePortCoords } from "./getPortCoords";
import { fetchSeaRoute } from "./fetchSeaRoute";
import { airRoutePositions } from "./airRoutePositions";

function straightLinePositions(originCoords, destinationCoords) {
  return [
    [originCoords.lat, originCoords.lng],
    [destinationCoords.lat, destinationCoords.lng],
  ];
}

export default function RouteLayer({
  origin,
  destination,
  isAirRoute = false,
  setLoading,
}) {
  const map = useMap();
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routePositions, setRoutePositions] = useState(null);

  useEffect(() => {
    if (!origin?.country || !destination?.country) {
      setOriginCoords(null);
      setDestinationCoords(null);
      setRoutePositions(null);
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

        if (!originData || !destinationData) {
          setOriginCoords(null);
          setDestinationCoords(null);
          setRoutePositions(null);
          return;
        }

        setOriginCoords(originData);
        setDestinationCoords(destinationData);

        if (isAirRoute) {
          if (!cancelled) {
            setRoutePositions(airRoutePositions(originData, destinationData));
          }
        } else {
          try {
            const { positions } = await fetchSeaRoute(
              originData,
              destinationData
            );
            if (!cancelled) setRoutePositions(positions);
          } catch {
            if (!cancelled) {
              setRoutePositions(
                straightLinePositions(originData, destinationData)
              );
            }
          }
        }
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
  }, [origin?.country, destination?.country, isAirRoute]);

  const originName = origin?.name || origin;
  const destinationName = destination?.name || destination;

  useEffect(() => {
    if (!map || !originCoords || !destinationCoords) return;

    const points =
      routePositions ??
      straightLinePositions(originCoords, destinationCoords);

    const bounds = L.latLngBounds(points);

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
    routePositions,
  ]);

  if (!originCoords || !destinationCoords) return null;

  const linePositions =
    routePositions ?? straightLinePositions(originCoords, destinationCoords);

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
        positions={linePositions}
        pathOptions={{
          color: isAirRoute ? "#C40C0C" : "#0d6efd",
          weight: 3,
          dashArray: "10 14",
          className: "animated-route",
        }}
      />
    </>
  );
}
