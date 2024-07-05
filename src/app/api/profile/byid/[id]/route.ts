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
    const profilesRef = collection(db, "profile");
    const q = query(profilesRef, where("slug", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    const docSnap = querySnapshot.docs[0];
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
