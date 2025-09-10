import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConnectSphere",
  description: "Connect with study partners and enhance your learning experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
