import type { Metadata } from "next";

import UpdatedNavbar from "@/components/navbar/UpdatedNavbar";

export const metadata: Metadata = {
  title: {
    default: "Services",
    template: "%s | RatGeber",
  },
  description:
    "Optimize your finances with expert tax management and smart investment strategies for maximum savings.",

  openGraph: {
    title: "Articles",
    description:
      "Optimize your finances with expert tax management and smart investment strategies for maximum savings.",
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "RatGeber",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
