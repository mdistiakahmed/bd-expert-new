import React from "react";
import Card from "@/components/blog/Card";
import { db } from "@/firebaseConfig";
import { compile, convert } from "html-to-text";

import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  Timestamp,
} from "firebase/firestore";

async function retrieveDocs(offset: number, limit1: number) {
  try {
    const q = query(
      collection(db, "test"),
      orderBy("created_at", "desc"),
      startAfter(offset || []),
      limit(limit1)
    );

    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return docs;
  } catch (error) {
    console.error("Error retrieving docs:", error);
  }
}

function timestampToDateString(timestamp: Timestamp): string {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return date.toDateString(); // Get only the date string
}

const page = async () => {
  const data: any = await retrieveDocs(0, 10);
  const cards = data?.map((d: any) => {
    const options = {
      wordwrap: 130,
    };
    const html = convert(d.data, options);

    return (
      <Card
        key={d.id}
        title={d.title}
        content={html.trim().substring(0, 100)}
        author={d.author}
        publishedDate={timestampToDateString(d.created_at)}
        tags={d.tags}
        id={d.id}
      />
    );
  });

  return (
    <>
      <div className="hidden sm:flex">
        <div className="w-[60vw] flex flex-col gap-5 m-5">{cards}</div>;
        <div className="w-[30vw]"></div>
      </div>
      <div className="flex sm:hidden">
        <div className="w-full flex flex-col gap-5 m-5">{cards}</div>;
      </div>
    </>
  );
};

export default page;
