import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Brak lat/lon' }, { status: 400 });
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric&lang=pl`;

  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.message }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}