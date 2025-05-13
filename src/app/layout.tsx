import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import ProtectedLayout from "@/components/ProtectedLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&display=swap');
          `}
        </style>
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
