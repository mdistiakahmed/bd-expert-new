import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req: NextRequest, { params }: any) {
  console.log("i am here.........");
  console.log(params);
  const { email } = params;

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email is empty" },
      { status: 400 }
    );
  }

  try {
    const decodedEmail = decodeURIComponent(email as string);
    const profilesRef = collection(db, "profile");
    const q = query(profilesRef, where("email", "==", decodedEmail));
    const querySnapshot = await getDocs(q);

    const profileData = querySnapshot.docs[0].data();
    const profileId = querySnapshot.docs[0].id;
    return NextResponse.json({ success: true, data: { id: profileId, ...profileData } });
  } catch (error) {
    console.error("Error fetching or creating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
