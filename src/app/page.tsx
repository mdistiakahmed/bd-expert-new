import Header from "@/components/header/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[90vh] relative">
      <Image src="/hero.jpg" alt="hero image" layout="fill" objectFit="cover" />
    </div>
  );
}
