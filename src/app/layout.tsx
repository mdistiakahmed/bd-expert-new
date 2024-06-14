import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { getServerSession } from "next-auth";
import SessionProvider from "@/context/SessionProvider";
import { Inter } from "next/font/google";
import { authOptions } from "@/utils/AuthOption";
import Navbar from "@/components/navbar/Navbar";
import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "100"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "RatGeber",
  description: "Master Your Finances",
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
    </html>
  );
}
