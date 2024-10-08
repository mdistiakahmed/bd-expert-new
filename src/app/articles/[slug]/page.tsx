import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import ShareWidget from "@/components/share/ShareWidget";
import { urlForImage } from "@/sanity/lib/image";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import { FiFile } from "react-icons/fi";

async function getPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function extractImageDimensions(ref: any) {
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) {
    throw new Error("Invalid image reference format");
  }
  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  return { width, height };
}

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  const { slug } = params;
  const post = await getPost(slug);
  const { heroImage } = post;

  return {
    title: `${post?.title || "Article"} | Ratgeber`,
    description: `${post?.excerpt}`,
    openGraph: {
      title: `${post?.title || "Article"} | Ratgeber`,
      description: `${post?.excerpt}`,
      type: "article",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`,
      siteName: "Ratgeber",
      images: [
        {
          url: urlForImage(heroImage),
          width: 1200,
          height: 630,
          alt: heroImage.alt,
        },
      ],
    },
  };
}

const SingleArticlePage = async ({ params }: any) => {
  const { slug } = params;
  const post = await getPost(slug);
  const { heroImage } = post;
  return (
    <div>
      <div className="flex items-center justify-center w-full bg-white">
        <div className=" w-[95vw] md:w-[70vw] p-[10px] text-black">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="container">
              <Breadcrumb />
            </div>
            <h1 className="text-2xl font-bold text-center leading-relaxed">
              {post?.title}
            </h1>
            {post.fileUrl ? (
              <a
                href={post.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end"
              >
                <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 p-2 rounded">
                  <FiFile className="text-gray-600" size={20} />
                  <span>Attachment</span>
                </button>
              </a>
            ) : (
              <div></div> // Placeholder if fileUrl is null
            )}

            <div className="w-full flex justify-center">
              {heroImage && heroImage.asset && (
                <Image
                  src={urlForImage(heroImage)}
                  alt={heroImage.alt || "post"}
                  width={400}
                  height={400}
                  className="text-center"
                />
              )}
            </div>
            <ShareWidget />

            <div className="prose prose-lg text-justify min-w-full">
              <PortableText
                value={post?.body}
                components={myPortableTextComponents}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticlePage;

const CodeBlock = ({ children }: any) => {
  return (
    <pre className="bg-black text-white my-4 p-4 rounded overflow-x-auto">
      <code className="bg-transparent text-white">{children}</code>
    </pre>
  );
};

const MyPortableTextImage = ({ value }: any) => {
  const { asset, alt } = value;
  const dimensions = extractImageDimensions(asset._ref);
  const h = Math.min(dimensions.height, 400);

  return (
    <div className="w-full flex  justify-center">
      <Image
        src={urlForImage(value)}
        alt={alt || "image"}
        width={dimensions.width}
        height={dimensions.height}
        className="text-center h-auto w-auto max-h-[400px]"
      />
    </div>
  );
};

const MyPortableTextVideo = ({ value }: any) => {
  const { url, title } = value;

  return (
    <div className="w-full flex justify-center my-8">
      <iframe
        width="560"
        height="315"
        src={url.replace("watch?v=", "embed/")}
        title={title || "Embedded Video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

const myPortableTextComponents = {
  types: {
    image: MyPortableTextImage,
    videoEmbed: MyPortableTextVideo,
  },
  marks: {
    code: ({ children }: any) => <CodeBlock>{children}</CodeBlock>,
    link: ({ value, children }: any) => (
      <a href={value.href} className="text-pink-600 underline">
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 my-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold text-gray-800 my-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h2 className="text-xl font-semibold text-gray-800 my-4">{children}</h2>
    ),
    h4: ({ children }: any) => (
      <h2 className="text-lg font-semibold text-gray-800 my-4">{children}</h2>
    ),
    normal: ({ children }: any) => <p className="my-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6">{children}</ul>
    ),
  },
};
