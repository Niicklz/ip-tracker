const API_KEY = import.meta.env.VITE_APP_GEOIPIFY_ACCESS_KEY;
async function getLocationDataBy(ipAddress = "") {
  const resp = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`
  );

  if (!resp.ok) throw Error("Fetch error");

  const { location, isp, ip } = await resp.json();

  return {
    ipAddress: ip,
    location: `${location.region}, ${location.city}`,
    timezone: `UTC ${location.timezone}`,
    ispName: isp,
    lat: location.lat,
    lng: location.lng,
  };
}

export { getLocationDataBy };
