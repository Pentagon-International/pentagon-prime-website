import { PORT_COORDINATES } from "./portCoordinates";
import { fetchPortCoordinates } from "./geoapify";

export async function resolvePortCoords(port) {
  // 2️⃣ Fallback to GeoApify
  return await fetchPortCoordinates({
    name: port.name,
    country: port.country,
    city: port.city,
  });
}
