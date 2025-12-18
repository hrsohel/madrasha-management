"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/features/auth/authSlice";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/SuperAdminLogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.payload?.success) {
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0F5F2] font-['Hind_Siliguri'] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#D1E7DD]">
        {/* Header/Logo Section */}
        <div className="bg-[#E7FEF2] p-8 flex flex-col items-center border-b border-[#D1E7DD]">
          <div className="w-20 h-20 bg-white rounded-full p-2 shadow-sm mb-4 flex items-center justify-center border border-[#2B7752]/20">
            <Image
              src={logo}
              alt="Madrasha Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#2B7752]">মাদ্রাসা ম্যানেজমেন্ট</h1>
          <p className="text-[#63736C] text-sm mt-1">প্রশাসক প্যানেলে লগইন করুন</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#424D47]"
              >
                ইমেইল ঠিকানা
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#92A09A]">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="block w-full pl-10 pr-3 py-3 bg-[#F7F7F7] border border-[#E7E7E7] rounded-xl text-gray-900 placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#2B7752] focus:border-transparent transition-all sm:text-sm shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#424D47]"
                >
                  পাসওয়ার্ড
                </label>
                <button type="button" className="text-xs text-[#2B7752] hover:underline font-medium">পাসওয়ার্ড ভুলে গেছেন?</button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#92A09A]">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 bg-[#F7F7F7] border border-[#E7E7E7] rounded-xl text-gray-900 placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#2B7752] focus:border-transparent transition-all sm:text-sm shadow-sm"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex justify-center w-full px-4 py-3 text-sm font-bold text-white bg-[#2B7752] border border-transparent rounded-xl shadow-lg hover:bg-[#236143] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B7752] disabled:bg-[#A2AFA8] transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      প্রবেশ করা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      লগইন করুন
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer Section */}
        <div className="bg-[#F7F7F7] px-8 py-4 border-t border-[#E7E7E7] text-center">
          <p className="text-xs text-[#92A09A] font-medium">
            © {new Date().getFullYear()} HudHudSoft | সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
