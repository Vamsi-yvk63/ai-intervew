// app/layout.tsx
import "./globals.css";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "AI Interview Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
          <nav style={{ display: "flex", gap: 12 }}>
            <Link href="/">Home</Link>
            <Link href="/interviewee">Interviewee</Link>
            <Link href="/interviewer">Interviewer</Link>
          </nav>
        </header>
        <main style={{ padding: 20 }}>{children}</main>
      </body>
    </html>
  );
}
