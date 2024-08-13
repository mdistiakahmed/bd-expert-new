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
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOption";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = `
    *[_type == "person"] {
      name,
      title,
      image,
      slug
    }
  `;

  const data = await client.fetch(query);

  const response = NextResponse.json({ success: true, data });

  return response;
}

export async function PUT(req: NextRequest) {
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

  const requestData = await req.json();
  const {
    name,
    title,
    description,
    image_url,
    resume_url,
    facebookUrl,
    linkedInUrl,
    logoText,
    yearOfExperience,
    numberOfClientsServed,
    projectsCompleted,
    experienceList,
    educatoinList,
    skillList,
    aboutMe,
    slug,
  } = requestData;

  try {
    const profilesRef = collection(db, "profile");
    const q = query(profilesRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    } else {
      const profileDoc = querySnapshot.docs[0];
      const profileRef = profileDoc.ref;

      // Update the profile
      const updatedProfile = {
        ...profileDoc.data(),
        name: name ?? profileDoc.data().name,
        title: title ?? profileDoc.data().title,
        description: description ?? profileDoc.data().description,
        image_url: image_url ?? profileDoc.data().image_url,
        resume_url: resume_url ?? profileDoc.data().resume_url,
        facebookUrl: facebookUrl ?? profileDoc.data().facebookUrl,
        linkedInUrl: linkedInUrl ?? profileDoc.data().linkedInUrl,
        logoText: logoText ?? profileDoc.data().logoText,
        yearOfExperience:
          yearOfExperience ?? profileDoc.data().yearOfExperience,
        numberOfClientsServed:
          numberOfClientsServed ?? profileDoc.data().numberOfClientsServed,
        projectsCompleted:
          projectsCompleted ?? profileDoc.data().projectsCompleted,

        experienceList: experienceList ?? profileDoc.data().experienceList,
        educatoinList: educatoinList ?? profileDoc.data().educatoinList,
        skillList: skillList ?? profileDoc.data().skillList,
        aboutMe: aboutMe ?? profileDoc.data().aboutMe,
        slug: slug,

        updated_at: new Date(),
      };

      await updateDoc(profileRef, updatedProfile);

      return NextResponse.json({ success: true, data: updatedProfile });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
