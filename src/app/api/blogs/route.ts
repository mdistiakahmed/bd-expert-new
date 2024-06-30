import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  DocumentSnapshot,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOption";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0");
  const queryLimit = parseInt(searchParams.get("limit") || "10");

  try {
    const totalDocsSnapshot = await getDocs(collection(db, "test"));
    const totalDocs = totalDocsSnapshot.size;

    // If offset is 0, we start from the beginning
    if (offset === 0) {
      const q = query(
        collection(db, "test"),
        orderBy("created_at", "desc"),
        limit(queryLimit)
      );

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return NextResponse.json({ success: true, data: docs, total: totalDocs });
    }

    // Fetch the offset document to use in startAfter
    const offsetSnapshot = await getDocs(
      query(
        collection(db, "test"),
        orderBy("created_at", "desc"),
        limit(offset)
      )
    );

    const lastVisible: DocumentSnapshot<DocumentData> =
      offsetSnapshot.docs[offset - 1];

    const q = query(
      collection(db, "test"),
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(queryLimit)
    );

    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ success: true, data: docs, total: totalDocs });
  } catch (err: any) {
    console.error("Error retrieving docs:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving documents",
        error: err?.message,
      },
      { status: 500 }
    );
  }
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

  return NextResponse.json({ success: true, data: docRef.id });
}
