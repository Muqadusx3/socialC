"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: "active" }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Signup failed");
      }

      setSuccess("Signup successful!");
      setTimeout(() => router.push("/"), 1000);

      setFormData({ name: "", username: "", email: "", password: "" });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-xs bg-[#f0f6fb]">
      <div className="w-64 p-6 mx-auto bg-white rounded-md shadow-md text-center">
        <h1 className="text-xl font-bold text-gray-900">Create an account</h1>
        <p className="text-xs text-gray-600 my-2">Join for exclusive access!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {["name", "username", "email", "password"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              name={field}
              placeholder={`Enter ${field}`}
              value={formData[field as "name" | "username" | "email" | "password"]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-200 rounded-md outline-none text-xs"
              required
            />
          ))}

          <button
            type="submit"
            className="w-full mt-3 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center text-xs"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
       
        <p className="text-xs text-gray-700 mt-3">
          Already have an account?{" "}
          <a href="/sign-in" className="text-red-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
