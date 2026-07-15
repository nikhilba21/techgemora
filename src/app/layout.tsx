import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gemora Tech | Global Software Development & Technology Partner",
  description: "Gemora Tech, a division of Gemora Global (formerly Dexterous Softech), is a trusted technology partner providing custom software development, web applications, mobile apps, AI solutions, and dedicated development teams globally.",
  metadataBase: new URL("https://dexteroussoftech.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gemora Tech | Global Software Development & Technology Partner",
    description: "Custom software, web development, mobile apps, SaaS systems and AI solutions for global startups and enterprises.",
    url: "/",
    siteName: "Gemora Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemora Tech | Global Software Development & Technology Partner",
    description: "Custom software, web development, mobile apps, SaaS systems and AI solutions for global startups and enterprises.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
