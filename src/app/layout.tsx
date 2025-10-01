import "./globals.css"; // Assuming your global styles (e.g., Tailwind CSS setup) are here
import React from "react";
import Link from "next/link";
import { Metadata } from "next"; // Import Metadata type for better TypeScript support

export const metadata: Metadata = {
  title: "AI Interview Assistant",
  description: "Your AI-powered tool for interview practice and management.", // Added a description for better SEO
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
            <div className="text-xl font-bold text-gray-800">
              AI Interview Assistant
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Home
              </Link>
              <Link
                href="/interviewee"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Interviewee
              </Link>
              <Link
                href="/interviewer"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Interviewer
              </Link>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
