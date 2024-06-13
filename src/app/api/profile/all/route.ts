import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  DocumentSnapshot,
  DocumentData,
  startAfter,
} from "firebase/firestore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0");
  const queryLimit = parseInt(searchParams.get("limit") || "10");

  try {
    const totalDocsSnapshot = await getDocs(collection(db, "profile"));
    const totalDocs = totalDocsSnapshot.size;

    // If offset is 0, we start from the beginning
    if (offset === 0) {
      const q = query(
        collection(db, "profile"),
        orderBy("created_at", "desc"),
        limit(queryLimit)
      );

      const snapshot = await getDocs(q);
      const accounts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({
        success: true,
        data: accounts,
        total: totalDocs,
      });
    }

    // Fetch the offset document to use in startAfter
    const offsetSnapshot = await getDocs(
      query(
        collection(db, "profile"),
        orderBy("created_at", "desc"),
        limit(offset)
      )
    );

    const lastVisible: DocumentSnapshot<DocumentData> =
      offsetSnapshot.docs[offset - 1];

    const q = query(
      collection(db, "profile"),
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(queryLimit)
    );

    const snapshot = await getDocs(q);
    const accounts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: accounts,
      total: totalDocs,
    });
  } catch (error) {
    console.error("Error fetching or creating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
