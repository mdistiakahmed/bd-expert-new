import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, updateDoc, increment, collection, where, query, getDocs } from "firebase/firestore";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const profilesRef = collection(db, "test");
    const q = query(profilesRef, where("slug", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    const docSnap = querySnapshot.docs[0];

    const docRef = doc(db, "test", docSnap.id);
    await updateDoc(docRef, {
      view_count: increment(1),
    });

    const docData = docSnap.data();

    return NextResponse.json({ success: true, data: { ...docData, id } });
  } catch (error) {
    console.error("Error retrieving or updating document:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
