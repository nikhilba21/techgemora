import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import WhatsAppWidget from "@/components/WhatsAppWidget";

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
        {/* Tawk.to Live Chat Script */}
        <Script id="tawk-to-integration" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a573a494d0b791d472ffc90/1jtibnckv';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
