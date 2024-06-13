import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  addDoc,
  where,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "@/utils/AuthOption";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData = await req.formData();
  const imageFile: any = formData.get("imageFile");

  try {
    let imageUrl = null;

    if (imageFile) {
      const fileExtension = imageFile.name.split(".").pop();
      const imageFileName = `${uuidv4()}.${fileExtension}`;
      const storageRef = ref(storage, `images/${imageFileName}`);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error uploading image:", error);
            reject(error);
          },
          async () => {
            console.log("Upload completed");
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    return NextResponse.json({ success: true, data: imageUrl });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const requestData = await req.json();
  const { imageUrl } = requestData;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  try {
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/`;
    const filePath = imageUrl.replace(baseUrl, "").split("?")[0];
    const decodedFilePath = decodeURIComponent(filePath);
    const fileRef = ref(storage, decodedFilePath);
    await deleteObject(fileRef);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
