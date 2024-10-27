import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { slug } = params;
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0] {
        title,
        heroImage,
        slug,
        publishedAt,
        excerpt,
        body,
        "fileUrl": fileUpload.asset->url,
        
    }
    `;

  const data = await client.fetch(query, undefined, { cache: "no-cache" });

  const response = NextResponse.json({ success: true, data });

  return response;
}
