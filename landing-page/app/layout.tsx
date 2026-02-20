import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YourProduct — The better way to work",
  description: "YourProduct helps teams do amazing things faster. Start for free today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
