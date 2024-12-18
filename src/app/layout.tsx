import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "League of Legends 정보 앱",
  description: "Riot Games API를 활용한 LoL 정보 앱",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white py-4 fixed top-0 w-full z-10">
          <nav className="container mx-auto flex justify-around">
            <Link href="/">홈</Link>
            <Link href="/champions">챔피언 목록</Link>
            <Link href="/items">아이템 목록</Link>
            <Link href="/rotation">챔피언 로테이션</Link>
          </nav>
        </header>
        <main className="flex min-h-screen flex-col items-center p-24">
          <Providers> {children} </Providers>
        </main>
      </body>
    </html>
  );
}
