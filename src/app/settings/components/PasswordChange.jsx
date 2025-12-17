"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetPasswordChangeStatus } from "@/lib/features/auth/authSlice";

export default function PasswordChange() {
    const dispatch = useDispatch();
    const { loading, passwordChangeSuccess, passwordChangeError } = useSelector((state) => state.auth);

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        if (passwordChangeSuccess) {
            alert("Password changed successfully!");
            setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
            dispatch(resetPasswordChangeStatus());
        }
        if (passwordChangeError) {
            alert(`Error: ${passwordChangeError}`);
            dispatch(resetPasswordChangeStatus());
        }
    }, [passwordChangeSuccess, passwordChangeError, dispatch]);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setValidationError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword.length < 6) {
            setValidationError("New password must be at least 6 characters long.");
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            setValidationError("New passwords do not match.");
            return;
        }
        dispatch(changePassword({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword
        }));
    };

    return (
        <div className="w-[80%] mx-auto mt-8">
            <div className='border-[1px] border-gray-200 relative'>
                <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>পাসওয়ার্ড পরিবর্তন</h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">পুরাতন পাসওয়ার্ড</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">নতুন পাসওয়ার্ড</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {validationError && (
                    <p className="text-red-500 text-sm font-semibold">{validationError}</p>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition shadow-md px-8 py-3"
                    >
                        {loading ? "Changing..." : "Change Password"}
                    </button>
                </div>
            </form>
        </div>
    );
}
