import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { doc, getDoc } from 'firebase/firestore';

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Id is empty" },
      { status: 400 }
    );
  }

  try {
    const docRef = doc(db, "profile", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const profileData = docSnap.data();
      return NextResponse.json({ success: true, data: profileData });
    } else {
      return NextResponse.json(
        { success: false, message: "No such document!" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching or creating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
