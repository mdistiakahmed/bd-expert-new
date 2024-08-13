import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

async function getPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == "${slug}"][0] {
        title,
        heroImage,
        slug,
        publishedAt,
        excerpt,
        body,
    }
    `;

  const post = await client.fetch(query);
  return post;
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
      url: `http://ratgeberltd.com/articles/${slug}`,
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

  const dimensions = extractImageDimensions(heroImage.asset._ref);
  return (
    <div>
      <div className="flex items-center justify-center w-full bg-white">
        <div className=" w-[95vw] md:w-[70vw] p-[10px] text-black">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-2xl font-bold text-center leading-relaxed">
              {post?.title}
            </h1>

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

const myPortableTextComponents = {
  types: {
    image: MyPortableTextImage,
  },
  marks: {
    code: ({ children }: any) => <CodeBlock>{children}</CodeBlock>,
  },
};
