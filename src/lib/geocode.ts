/**
 * Geocode a place name using the free OpenStreetMap Nominatim API.
 * Returns [latitude, longitude] or null if lookup fails.
 */
export async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?` +
      new URLSearchParams({
        q: query,
        format: 'json',
        limit: '1',
      });

    const res = await fetch(url, {
      headers: { 'User-Agent': 'TripNest/1.0 (tripnest@example.com)' },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch {
    return null;
  }
}
