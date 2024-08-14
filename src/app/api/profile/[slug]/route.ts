import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest, { params }: any) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json(
      { success: false, message: "Slug is empty" },
      { status: 400 }
    );
  }

  const query = `
  *[_type == "person" && slug.current == "${slug}"][0] {
    name,
    title,
    image,
    description,
    resume{
        asset->{
          url
        }
      },
    facebookUrl,
    linkedInUrl,
    yearsOfExperience,
    projectsCompleted,
    clientsServed,
    experiences,
    education,
    skills,
    phone,
    nationality,
    email,
    languages
  }
`;

  try {
    const data = await client.fetch(query, params);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Person not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching or creating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
