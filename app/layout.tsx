import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Your Name",
  description: "Welcome to my personal portfolio showcasing my projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={
          `${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 relative`
        }
        style={{
          minHeight: '100vh',
          backgroundImage: `
            linear-gradient(135deg, rgba(186,230,253,0.5) 0%, rgba(221,214,254,0.5) 100%),
            url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="900" cy="200" r="200" fill="%23a5b4fc" fill-opacity="0.15"/><circle cx="300" cy="700" r="300" fill="%236ee7b7" fill-opacity="0.12"/><circle cx="100" cy="100" r="100" fill="%23f472b6" fill-opacity="0.10"/></svg>')
          `,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {children}
      </body>
    </html>
  );
}
