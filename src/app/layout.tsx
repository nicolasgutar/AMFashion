import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fashion Agency",
  description: "Explore top models, latest fashion products, and exclusive fashion events.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Navbar />
      <div className="container mx-auto p-4">
        {children}
      </div>
      </body>
      </html>
  );
}
