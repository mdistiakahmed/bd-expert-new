import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import UpdatedNavbar from "@/components/navbar/UpdatedNavbar";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "100"],
  variable: "--font-jetbrainsMono",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "RatGeber | Master Your Finances",
    template: "%s | RatGeber",
  },
  description:
    "Optimize your finances with expert tax management and smart investment strategies for maximum savings.",
  verification: {
    google: "9MGaioG0rXp5fn3LfxB-Pe90sm7_jB3QPBuJ3Oh7HRg",
  },
  openGraph: {
    title: "RatGeber | Master Your Finances",
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
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-4L8FMMC3QY" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
