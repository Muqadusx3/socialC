"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  name:string;
  email: string;
  profile_picture?: string;
  followers_count: number;
  friends: string[];
}

const ProfileCard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!id || !token) {
      alert("User not authenticated. Please log in again.");
      router.push("/sign-in");
    } else {
      setUserId(id);
      setIsSignedIn(true);
      fetchUser(id);
    }

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsSignedIn(!!token);
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [router]);

  const fetchUser = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}//auth/user/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.dispatchEvent(new Event("storage"));
    router.push("/sign-in");
  };

  if (!userId || !user) return null;

  return (
    <div className="w-full p-2 bg-white rounded-lg text-sm flex flex-col gap-6">
      {/* Background & Profile Image */}
      <div className="h-25 relative pl-4 pr-4">
        <Image
          src="/f_bg.jpg"
          alt="Background Image"
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.profile_picture || "/noAvatar.png"}
          alt="Profile Picture"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>

      {/* Username & Email */}
      <div className="h-20 flex flex-col gap-1 items-center text-center">
        <span className="font-semibold text-gray-700 mt-2 mb-6 text-base">{user.username}</span>
        <span className="text-gray-500 text-xs">{user.name}</span>
        <span className="text-gray-500 text-xs">{user.email}</span>
      </div>

      {/* Logout Button (LeftMenu logic) */}
      <div className="p-2 bg-white rounded-lg mt-2">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-1 text-xs text-white bg-gradient-to-r from-blue-600 to-purple-400 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg w-full justify-center cursor-pointer"
        >
          <Image
            src="/logout.png"
            alt="Logout Icon"
            width={16}
            height={16}
            className="group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:hue-rotate-[330deg]"
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
