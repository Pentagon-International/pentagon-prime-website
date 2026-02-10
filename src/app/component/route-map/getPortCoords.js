import { fetchPortCoordinates } from "./geoapify";

export async function resolvePortCoords(port) {
  console.log("port----------------------------",port)
  // 2️⃣ Fallback to GeoApify
  return await fetchPortCoordinates({
    name: port.name,
    country: port.country,
    city: port.city,
  });
}
