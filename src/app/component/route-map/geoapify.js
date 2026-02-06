export async function fetchPortCoordinates({ city, country = "", name = "" }) {
  const locationPart = city || name || "";
  const query = encodeURIComponent(
    [locationPart, country].filter(Boolean).join(", ")
  );

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "Pentagon-Prime-Logistics-App",
      },
    }
  );

  const data = await res.json();
  if (!data.length) return null;
  
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}
