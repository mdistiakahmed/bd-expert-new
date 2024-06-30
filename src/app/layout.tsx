import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/context/SessionProvider";
import { authOptions } from "@/utils/AuthOption";
import Navbar from "@/components/navbar/Navbar";
import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "100"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  //title: "RatGeber | Master Your Finances",
  title: {
    default: "RatGeber | Master Your Finances",
    template: "%s | RatGeber",
  },
  description:
    "Optimize your finances with expert tax management and smart investment strategies for maximum savings.",
  openGraph: {
    title: "RatGeber | Master Your Finances",
    description:
      "Optimize your finances with expert tax management and smart investment strategies for maximum savings.",
    type: "website",
    locale: "en_US",
    url: "https://www.bdtaxexpert.com/",
    siteName: "RatGeber",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={jetBrainsMono.variable}>
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
      <GoogleAnalytics gaId="G-KC3TES60D3" />
    </html>
  );
}
