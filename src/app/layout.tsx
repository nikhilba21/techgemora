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
  title: "Software Development Company | AI, Web & Mobile Apps | Gemora Tech",
  description: "Gemora Tech is a global software development company specializing in custom software, AI solutions, web development, mobile app development, SaaS and dedicated developers.",
  metadataBase: new URL("https://dexteroussoftech.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Software Development Company | AI, Web & Mobile Apps | Gemora Tech",
    description: "Gemora Tech is a global software development company specializing in custom software, AI solutions, web development, mobile app development, SaaS and dedicated developers.",
    url: "/",
    siteName: "Gemora Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company | AI, Web & Mobile Apps | Gemora Tech",
    description: "Gemora Tech is a global software development company specializing in custom software, AI solutions, web development, mobile app development, SaaS and dedicated developers.",
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
