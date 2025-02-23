'use client';

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState("f");
  const fullTitle = "fkng housing crisis";
  
  useEffect(() => {
    let currentIndex = 1;
    let isTyping = true;

    const intervalId = setInterval(() => {
      if (isTyping) {
        if (currentIndex <= fullTitle.length) {
          setTitle(fullTitle.slice(0, currentIndex));
          currentIndex++;
        } else {
          isTyping = false;
          setTimeout(() => {
            currentIndex = 1;
            isTyping = true;
            setTitle("f");
          }, 1000); // Wait 1 second before resetting
        }
      }
    }, 200); // Type each character every 200ms

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 text-white text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full hover:cursor-pointer text-center w-[280px]" onClick={() => window.open("https://x.com/dresnite/", "_blank")}>
          Made with ❤️ by dresnite+cursor
        </div>
        {children}
      </body>
    </html>
  );
}
