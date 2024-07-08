import { NextRequest, NextResponse } from "next/server";
import { db, storage } from "@/firebaseConfig";
import { doc, updateDoc, increment, collection, where, query, getDocs, deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOption";

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

export async function DELETE(req: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json(
      { success: false, message: "No email found in session" },
      { status: 400 }
    );
  }

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
    const docData = docSnap.data();

    if(docData.author !== email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const imageUrl = docData.imageUrl;

    if (imageUrl) {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    }

    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: "Document and associated image deleted successfully" });
  } catch (error) {
    console.error("Error deleting document or image:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
