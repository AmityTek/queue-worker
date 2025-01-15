import "../styles/globals.css";
import "../styles/animations.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Queue App",
  description: "A queue-based computation app",
};

/**
 * Root layout component for the app.
 * This wraps the app with necessary styles and metadata.
 * @param children - The content of the page to be rendered.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}