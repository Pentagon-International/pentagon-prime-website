import { PORT_COORDINATES } from "./portCoordinates";
import { fetchPortCoordinates } from "./geoapify";

export async function resolvePortCoords(port) {
  // 1️⃣ Try hardcoded (accurate)
  if (PORT_COORDINATES[port.code]) {
    return PORT_COORDINATES[port.code];
  }

  // 2️⃣ Fallback to GeoApify
  return await fetchPortCoordinates({
    name: port.name,
    country: port.country,
    code: port.code.slice(0,2)
  });
}
