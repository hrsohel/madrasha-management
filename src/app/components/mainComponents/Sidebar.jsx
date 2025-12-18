"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMadrasaSettings } from "@/lib/features/settings/settingsSlice";
import logo from "../../../../public/SuperAdminLogo.png";
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Zap,
  HelpCircle,
  Menu,
  GraduationCap,
  NotebookPen,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function Sidebar({ isOpen }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { madrasaSettings } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchMadrasaSettings());
  }, [dispatch]);

  // Construct Logo URL
  const logoSrc = madrasaSettings?.logo
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}`
    : "/WhatsApp Image 2025-12-12 at 7.37.35 AM.jpeg";

  // Get Madrasa Name (Bangla)
  const madrasaName = madrasaSettings?.name?.bangla || "দারুল উলুম মাইনুস সুন্নাহ";
  // Get English Name for subtitle
  const madrasaSubtitle = madrasaSettings?.name?.english || "darululummoinussunnah...";
  console.log(madrasaSettings?.logo);
  const menuItems = [
    { icon: LayoutDashboard, label: "ডেশবোর্ড", href: "/dashboard" },
    { icon: GraduationCap, label: "সকল ছাত্র", href: "/all-students" },
    { icon: NotebookPen, label: "হিসাব", href: "/accounts" },
    { icon: DollarSign, label: "ফি ম্যানেজমেন্ট", href: "/FeeManagement" },
    { icon: Zap, label: "পরীক্ষা", href: "/examinations" },
    { icon: HelpCircle, label: "মার্কশীট", href: "/marksheets" },
    { icon: HelpCircle, label: "সেটিংস", href: "/settings" },
  ];
  return (
    <aside
      className={cn(
        "bg-[#F0F5F2] w-80 h-screen flex flex-col transition-all duration-300",
        !isOpen && "-ml-64"
      )}
    >
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="rounded-full">
            <img
              className="rounded-full object-cover w-[55px] h-[55px]"
              src={logoSrc}
              alt="Logo"
              width={55}
              height={55}
            />
          </div>
          <div>
            <p className="text-md font-bold text-[#424D47]">
              {madrasaName}
            </p>
            <p className="text-sm font-semibold text-[#424D47] truncate w-40">
              {madrasaSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-[#2B7752] text-white shadow-md font-semibold"
                  : "text-[#424D47] font-semibold"
              )}
            >
              <Icon className="w-5 h-5" />
              {/* Slightly smaller text */}
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 pl-6">
        <div className="flex items-center gap-2 text-xs text-emerald-700">

          <Image src={logo} alt="Logo" width={30} height={30} />
          <p className="mt-2">© {new Date().getFullYear()} HudHudSoft.com</p>
        </div>
      </div>
    </aside>
  );
}
