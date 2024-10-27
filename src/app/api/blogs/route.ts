import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = `
    *[_type == "post"] {
      title,
      slug,
      heroImage
    }
  `;

  const data = await client.fetch(query, undefined, { cache: "no-cache" });

  const response = NextResponse.json({ success: true, data });

  return response;
}
