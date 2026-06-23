import { NextRequest } from 'next/server';
import { NextResponse } from "next/server";


export async function GET (request: NextRequest, {params} : {params: Promise<{city: string}> })  {
  const { city } = await params;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  // Expect an array; return first result's lat/lon
  if (!Array.isArray(data) || data.length === 0) {
    return NextResponse.json({ error: 'Location not found' }, { status: 404 });
  }
  const loc = data[0];
  return NextResponse.json({ lat: loc.lat, lon: loc.lon });
}