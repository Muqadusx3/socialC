"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
}

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Fetch user from backend using ID from localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not authenticated. Please log in again.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/auth/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Handle scroll lock for mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "auto";
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden text-gray-600">
      {/* Navbar */}
      <div className="flex items-center justify-between p-4 shadow-md bg-white fixed top-0 left-0 w-full z-20">
        {/* Left: Logo or Title */}
        <h1 className="text-blue-600 text-2xl font-bold" style={{ fontFamily: 'Ballet, sans-serif' }}>
          Connect
        </h1>
</div>
    </div>
  );
};

export default MobileNavbar;
