"use client";

import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientOnly from "../ClientOnly";

export default function Header({ onMenuClick }) {
  const pathname = usePathname();

  // Map pathname to human-readable page names
  const pageNames = {
    "/": "Dashboard",
    "/products": "Products",
    "/products/[id]": "Product Details",
    "/settings": "Settings",
    "/messages": "Messages",
    "/how-it-works": "How It Works",
  };

  // Optional: fallback if route not in map
  const currentPage = pageNames[pathname] || "Page";

  return (
    <div className="p-5">
      <header className="bg-[#F7F7F7] rounded-lg border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Dynamic Page Name */}
          <h1 className="text-lg font-semibold text-gray-900">{currentPage}</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Language Dropdown */}
          <ClientOnly>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-gray-700 hover:bg-transparent"
                >
                  <span className="text-sm">English</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>বাংলা</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिंदी</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ClientOnly>

          {/* User Dropdown */}
          <ClientOnly>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 hover:bg-transparent"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    MH
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">
                      Mahmudul Hasan
                    </span>
                    <span className="text-xs text-gray-500">Admin</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ClientOnly>
        </div>
      </header>
    </div>
  );
}
