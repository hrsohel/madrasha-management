"use client"; // must be at the top

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/mainComponents/Sidebar";
import Header from "./components/mainComponents/Header";
import { ReduxProvider } from "./components/ReduxProvider"; // Import ReduxProvider
import AuthGuard from "./components/auth/AuthGuard";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex h-screen bg-background">
        <ReduxProvider> {/* Wrap the content with ReduxProvider */}
          <AuthGuard>
            <Toaster position="top-center" reverseOrder={false} />
            {isLoginPage ? (
              <main className="w-full h-full">{children}</main>
            ) : (
              <>
                <Sidebar isOpen={sidebarOpen} className="no-print" />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} className="no-print" />
                  <main className="flex-1 overflow-auto px-5  py-2  ">{children}</main>
                </div>
              </>
            )}
          </AuthGuard>
        </ReduxProvider>
      </body>
    </html>
  );
}
