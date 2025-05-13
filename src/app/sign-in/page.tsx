"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");

      const token = data.data;
      const { user_id } = jwtDecode<{ user_id: string }>(token);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user_id);
      
      setStatus({ loading: false, error: "", success: "Login successful! Redirecting..." });
      window.dispatchEvent(new Event("storage"));  

      router.push("/");

      setFormData({ username: "", password: "" });
    } catch (err: any) {
      setStatus({ loading: false, error: err.message || "An error occurred.", success: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-xs bg-[#f0f6fb]">
      <div className="w-64 p-6 bg-white rounded-md shadow-md text-center">
        <h1 className="text-xl font-bold text-gray-900">Sign In</h1>
        <p className="text-xs text-gray-600 my-2">Unlock your world!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-gray-500">
          {["username", "password"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={`Enter ${field}`}
              value={formData[field as "username" | "password"]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-200 rounded-md outline-none text-xs"
              required
            />
          ))}

          <a href="#" className="text-right text-xs text-blue-600 hover:underline">
            Recover Password
          </a>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full mt-3 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center text-xs"
          >
            {status.loading ? "Loading..." : "Sign in"}
          </button>
        </form>

        {status.error && <p className="text-red-500 mt-2">{status.error}</p>}
        {status.success && <p className="text-green-500 mt-2">{status.success}</p>}
        
        <p className="text-xs text-gray-700 mt-3">
          Not a member?{" "}
          <a href="/sign-up" className="text-red-500 hover:underline">
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
}
