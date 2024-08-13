import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOption";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = `
    *[_type == "post"] {
      title,
      slug,
      heroImage
    }
  `;

  const data = await client.fetch(query);

  const response = NextResponse.json({ success: true, data });

  return response;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const requestData = await request.json();
  const { title, data, tags, imageUrl, excerpt, slug } = requestData;

  if (!title || !data || !tags) {
    throw new Error("Title, data, and tags are required.");
  }

  const docRef = await addDoc(collection(db, "test"), {
    title,
    data,
    tags,
    imageUrl,
    excerpt,
    slug,
    author: session?.user?.email || "",
    created_at: new Date(),
    view_count: 0,
  });

  return NextResponse.json({ success: true, data: slug });
}
