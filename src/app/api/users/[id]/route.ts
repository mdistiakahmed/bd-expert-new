import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  return NextResponse.json({ hello: params });
}

export async function POST(request: Request) {
  const data = await request.json();

  return NextResponse.json({ data });
}
