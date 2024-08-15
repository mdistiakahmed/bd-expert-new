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
    }
    `;

  const data = await client.fetch(query);

  const response = NextResponse.json({ success: true, data });

  return response;
}
