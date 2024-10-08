import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = `
     *[_type == "post"] | order(publishedAt desc) [0...4] {
        title,
        "heroImage": heroImage.asset->url,
        slug,
        publishedAt
      }
  `;

  const data = await client.fetch(query, undefined, { cache: "no-cache" });

  const response = NextResponse.json({ data });

  return response;
}
