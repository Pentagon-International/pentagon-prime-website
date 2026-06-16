const API_BASE =
  process.env.NEXT_PUBLIC_PULSE_BASE_URL || "http://127.0.0.1:8000";

export async function fetchSeaRoute(originCoords, destinationCoords) {
  const res = await fetch(`${API_BASE}/api/sea-route/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin_lat: originCoords.lat,
      origin_lng: originCoords.lng,
      destination_lat: destinationCoords.lat,
      destination_lng: destinationCoords.lng,
    }),
  });

  if (!res.ok) throw new Error("Sea route fetch failed");

  const data = await res.json();
  if (!Array.isArray(data.route) || data.route.length < 2) {
    throw new Error("Invalid sea route response");
  }

  const positions = data.route.map(([lng, lat]) => [lat, lng]);

  return { positions, distance: data.distance, unit: data.unit };
}
