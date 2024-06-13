import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const docRef = doc(db, "test", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    // Retrieve document data
    const docData = docSnap.data();

    // Update viewCount
    await updateDoc(docRef, {
      view_count: increment(1),
    });

    return NextResponse.json({ success: true, data: { ...docData, id } });
  } catch (error) {
    console.error("Error retrieving or updating document:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
