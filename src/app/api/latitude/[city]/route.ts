import { NextResponse } from "next/server";

export async function GET (request: Request, {params} : {params: {city: string}})  {

    const { city } =  await params;

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;

    const rest = await fetch(url)
    const data = await rest.json()

    return NextResponse.json(data);

}