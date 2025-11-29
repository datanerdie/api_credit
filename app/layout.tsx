import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI API Credit Checker",
  description: "Check remaining API credits for major AI providers",
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
