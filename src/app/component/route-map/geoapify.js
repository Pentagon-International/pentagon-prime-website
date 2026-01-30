const GEOAPIFY_KEY = '12b6a6c3fbc5430f81447de300d4c563';

export async function fetchPortCoordinates({name, country = ""}) {
  const query = encodeURIComponent(`${name} Port ${country}`);

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "Pentagon-Prime-Logistics-App"
      }
    }
  );

  const data = await res.json();
  if (!data.length) return null;
  console.log("data------------",data)
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}


