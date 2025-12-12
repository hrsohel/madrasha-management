"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/lib/features/auth/authSlice";

export default function AuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(checkAuth());
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            // If user is NOT logged in and tries to access anything other than login page
            if (!token && pathname !== "/") {
                router.push("/");
            }

            // If user IS logged in and tries to access login page
            if (token && pathname === "/") {
                router.push("/dashboard");
            }
        }
    }, [loading, token, pathname, router]);

    if (loading) {
        // You might want a loading spinner here
        return <div>Loading...</div>;
    }

    // If not logged in and on a protected page, don't show anything (wait for redirect)
    if (!token && pathname !== "/") {
        return null;
    }

    // If logged in and on login page, don't show anything (wait for redirect)
    if (token && pathname === "/") {
        return null;
    }

    return <>{children}</>;
}
