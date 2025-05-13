"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
 // Assuming MobileNavbar component is available

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Check if user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Listen for changes in the localStorage (like logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Delay the visibility of the sidebar by 2 seconds
      const timer = setTimeout(() => {
        setIsSidebarVisible(true);
      }, 500);

      // Clean up the timer when authentication changes
      return () => clearTimeout(timer);
    } else {
      // If not authenticated, hide the sidebar immediately
      setIsSidebarVisible(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
    

      {/* Sidebar (only visible on Desktop/Tablet) */}
      {isSidebarVisible && isAuthenticated && (
        <div className="hidden md:block w-[23%] bg-white font-modak">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className={isAuthenticated ? "flex-1 text-white" : "w-full text-white "}>
        {children}
      </div>
    </div>
  );
}
