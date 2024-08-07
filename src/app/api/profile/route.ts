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
import { v4 as uuidv4 } from "uuid";

const generateSlug = (title: string) => {
  const cleanedTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const uniqueId = uuidv4().substring(0, 6);
  return `${cleanedTitle}-${uniqueId}`;
};


export async function GET(req: NextRequest) {
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
    const profilesRef = collection(db, "profile");
    const q = query(profilesRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No matching documents found, create a new profile
      const newProfile = {
        name: session?.user?.name,
        email: email,
        image_url: session?.user?.image,
        resume_url: null,
        title: "The Spectral Spotter",
        aboutMe: {
          email: email,
          languages: "",
          nationality: "",
          phone: "",
        },
        description: "",
        educatoinList: [],
        experienceList: [],
        skillList: [],
        facebookUrl: "",
        linkedInUrl: "",

        logoText: null,
        numberOfClientsServed: 1,
        projectsCompleted: 1,
        yearOfExperience: 1,
        slug: generateSlug(session?.user?.name || "The Spectral Spotter"),

        created_at: new Date(),
      };
      const docRef = await addDoc(profilesRef, newProfile);
      const newDocSnapshot = await getDoc(docRef);

      return NextResponse.json({ success: true, data: newDocSnapshot.data() });
    } else {
      // Return the existing profile
      const profileData = querySnapshot.docs[0].data();
      return NextResponse.json({ success: true, data: profileData });
    }
  } catch (error) {
    console.error("Error fetching or creating profile:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
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
  const { name, title, description, image_url, resume_url, facebookUrl, linkedInUrl,
    logoText, yearOfExperience,numberOfClientsServed, projectsCompleted,
    experienceList, educatoinList, skillList, aboutMe, slug} = requestData;

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
        yearOfExperience: yearOfExperience ?? profileDoc.data().yearOfExperience,
        numberOfClientsServed: numberOfClientsServed ?? profileDoc.data().numberOfClientsServed,
        projectsCompleted: projectsCompleted ?? profileDoc.data().projectsCompleted,

        experienceList:  experienceList ?? profileDoc.data().experienceList,
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
