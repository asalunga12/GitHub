import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YourProduct — Build, Ship, and Scale Faster",
  description:
    "YourProduct helps teams move faster with powerful automation, real-time collaboration, and actionable analytics — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
