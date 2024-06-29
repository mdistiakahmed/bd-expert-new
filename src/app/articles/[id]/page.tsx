import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { Timestamp } from "firebase/firestore";

import { fetchBlogById } from "@/services/blogService";
import "react-quill/dist/quill.snow.css";
import { fetchProfileByEmail } from "@/services/profileService";
import VisibilityIcon from "@mui/icons-material/Visibility";

function timestampToDateString(timestamp: Timestamp): string {
  const date = new Date(
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
  );
  return date?.toDateString();
}

const page = async ({ params }: any) => {
  const { id } = params;
  const result = await fetchBlogById(id);
  const docData = result.data;
  const authorInfo = await fetchProfileByEmail(docData?.author);
  const authorData = authorInfo.data;

  console.log(docData);

  const tags: any = (
    <div className="flex gap-1">
      {docData?.tags?.map((t: any, index: any) => (
        <Link href="/" key={index} className="text-red-500 underline">
          {t}
        </Link>
      ))}
    </div>
  );

  const blogHeader = (
    <div className="flex flex-col justify-center md:flex-row gap-10 p-5">
      <div
        className="w-[100px] h-[100px] relative"
        style={{ transform: "scale(1.2) rotateZ(calc(-11 * 1deg))" }}
      >
        <Link href={`/profile/${authorData.id}`}>
          <Image
            src={authorData.image_url}
            alt=""
            fill
            className="absolute border-4 border-accent rounded-lg"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <p>
          <Link
            href={`/profile/${authorData.id}`}
            className="font-semibold underline"
          >
            {authorData.name}
          </Link>{" "}
          wrote
        </p>
        <h2 className="text-2xl font-bold">{docData?.title}</h2>
        <p className="flex flex-wrap gap-1">
          {timestampToDateString(docData?.created_at)} in {tags}
        </p>
        <div className="flex items-center justify-center self-end gap-2">
          {docData?.view_count}
          <VisibilityIcon />
        </div>
      </div>
    </div>
  );

  const blogContent = (
    <div className="flex flex-col gap-5">
      {blogHeader}
      <hr className="border border-dotted rounded-md border-accent" />
      <div className="flex items-center justify-center">
        <Image src={docData.imageUrl} alt="" height={400} width={400} />
      </div>

      <div className="quill">
        <div className="ql-container ql-snow">
          <div
            className="ql-editor"
            style={{ fontFamily: "inherit" }}
            dangerouslySetInnerHTML={{ __html: docData?.data }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-black">
      <Head>
        <title>{docData?.title}</title>
        <meta property="og:title" content={docData?.title} />
        <meta property="og:image" content={docData?.imageUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.bdtaxexpert.com/articles/${id}`}
        />
        <meta property="og:site_name" content="RatGeber" />
      </Head>
      <div className="hidden sm:flex items-center justify-center">
        <div className="w-[70vw] m-5">{blogContent}</div>
      </div>
      <div className="flex flex-col sm:hidden">
        <div className="m-5">{blogContent}</div>
      </div>
    </div>
  );
};

export default page;
