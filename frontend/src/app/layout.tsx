import type { Metadata } from "next";
import "./globals.css";
import { GraphQLProvider } from "../providers/GraphQLProvider";

export const metadata: Metadata = {
  title: "ConnectSphere - Find Your Study Partners",
  description: "Connect with fellow students, find study partners, and form study groups that match your learning style and schedule.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">
        <GraphQLProvider>
          {children}
        </GraphQLProvider>
      </body>
    </html>
  );
}
