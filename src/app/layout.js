"use client"; // must be at the top

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/mainComponents/Sidebar";
import Header from "./components/mainComponents/Header";
import { ReduxProvider } from "./components/ReduxProvider"; // Import ReduxProvider

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex h-screen bg-background">
        <ReduxProvider> {/* Wrap the content with ReduxProvider */}
          <Sidebar isOpen={sidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-auto px-5  py-2  ">{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
