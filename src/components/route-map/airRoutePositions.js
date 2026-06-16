export function airRoutePositions(originCoords, destinationCoords, segments = 48) {
  const { lat: lat1, lng: lng1 } = originCoords;
  const { lat: lat2, lng: lng2 } = destinationCoords;

  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const dist = Math.sqrt(dLat * dLat + dLng * dLng);

  const bulge = dist * 0.22;
  const controlLat = midLat + bulge;
  const controlLng = midLng;

  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lat =
      (1 - t) * (1 - t) * lat1 +
      2 * (1 - t) * t * controlLat +
      t * t * lat2;
    const lng =
      (1 - t) * (1 - t) * lng1 +
      2 * (1 - t) * t * controlLng +
      t * t * lng2;
    points.push([lat, lng]);
  }

  return points;
}
