import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
 

  
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Brak lat/lon" }, { status: 400 });
  }

  // Use the legacy One Call 2.5 endpoint, which is accessible on the free tier.
 const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric&lang=en`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.message || "Failed to fetch weather" }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}