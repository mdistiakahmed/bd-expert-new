import type { Metadata } from "next";

import UpdatedNavbar from "@/components/navbar/UpdatedNavbar";

export const metadata: Metadata = {
  title: "TDS/VDS Calculator | RatGeber - Simplify Your Tax Deductions",
  description:
    "Calculate accurate TDS (Tax Deducted at Source) and VDS (VAT Deducted at Source) for your transactions with ease on RatGeber. Our calculator provides real-time results, helping you understand your net payments and tax obligations quickly and efficiently.",
  openGraph: {
    title: "TDS/VDS Calculator | RatGeber - Simplify Your Tax Deductions",
    description:
      "Calculate accurate TDS (Tax Deducted at Source) and VDS (VAT Deducted at Source) for your transactions with ease on RatGeber. Our calculator provides real-time results, helping you understand your net payments and tax obligations quickly and efficiently.",
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/calculator`,
    siteName: "RatGeber",
    images: [
      {
        url: "payment.svg",
        width: 1200,
        height: 630,
        alt: "hands payment",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UpdatedNavbar />
      {children}
    </div>
  );
}
