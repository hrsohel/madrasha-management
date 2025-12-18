"use client";

import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientOnly from "../ClientOnly";

export default function Header({ onMenuClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  // Function to get dynamic page names based on pathname
  const getPageName = (path) => {
    // Exact matches
    const exactMatches = {
      "/": "ডেশবোর্ড",
      "/dashboard": "ডেশবোর্ড",
      "/all-students": "সকল ছাত্র",
      "/accounts": "হিসাব",
      "/FeeManagement": "ফি ম্যানেজমেন্ট",
      "/examinations": "পরীক্ষা",
      "/marksheets": "মার্কশীট",
      "/settings": "সেটিংস",
      "/add-student": "নতুন ছাত্র যোগ করুন",
      "/drafts": "ড্রাফট লিস্ট",
    };

    if (exactMatches[path]) return exactMatches[path];

    // Dynamic matches
    if (path.startsWith("/drafts/")) return "ড্রাফট শিক্ষার্থীর তথ্য";
    if (path.startsWith("/students/")) return "শিক্ষার্থীর পূর্ণ তথ্য";
    if (path.includes("/edit")) return "তথ্য সম্পাদনা";

    return "মাদ্রাসা ম্যানেজমেন্ট";
  };

  const currentPage = getPageName(pathname);

  return (
    <div className="p-5">
      <header className="bg-[#F7F7F7] rounded-md px-6 py-4 flex items-center justify-between">
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
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-semibold">
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
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ClientOnly>
        </div>
      </header>
    </div>
  );
}
