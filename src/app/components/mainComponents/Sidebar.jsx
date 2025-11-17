"use client";
import logo from "../../../../public/Madrashalogo.png";

import {
  LayoutDashboard,
  Database,
  BarChart3,
  Zap,
  HelpCircle,
  Menu,
  GraduationCap,
  NotebookPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: GraduationCap, label: "All Students", href: "/all-students" },
    { icon: NotebookPen, label: "Accounts", href: "/accounts" },
    { icon: Zap, label: "Examinations", href: "/examinations" },
    { icon: HelpCircle, label: "Marksheets", href: "/marksheets" },
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
            <Image
              className="rounded-full"
              src={logo}
              alt="Logo"
              width={55}
              height={55}
            />
          </div>
          <div>
            <p className="text-md font-bold text-[#424D47]">
              দারুল উলুম মাইনুস সুন্নাহ
            </p>
            <p className="text-sm font-semibold text-[#424D47]">
              darululummoinussunnah...
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
      <div className="p-4 border-t border-emerald-200">
        <div className="flex items-center gap-2 text-xs text-emerald-700">
          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
          <span>Software company</span>
        </div>
      </div>
    </aside>
  );
}
