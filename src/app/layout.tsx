import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import StickyCTA from "@/components/StickyCTA";
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
  title: "Enterprise Custom Software & Game Development Company | Gemora Tech",
  description: "Gemora Tech is a global software development company specializing in custom software, AI models, web & mobile apps, SaaS, and dedicated developer teams.",
  metadataBase: new URL("https://www.dexteroussoftech.com"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/',
      'en-GB': '/',
      'en-AU': '/',
      'en-CA': '/',
      'en-AE': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: "Enterprise Custom Software & Game Development Company | Gemora Tech",
    description: "Gemora Tech is a global software development company specializing in custom software, AI models, web & mobile apps, SaaS, and dedicated developer teams.",
    url: "/",
    siteName: "Gemora Tech",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Gemora Tech - Enterprise Software Development",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Custom Software & Game Development Company | Gemora Tech",
    description: "Gemora Tech is a global software development company specializing in custom software, AI models, web & mobile apps, SaaS, and dedicated developer teams.",
    images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop"],
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
      <head>
        <meta name="msvalidate.01" content="3DAED813D3F9CC4C2BA0923034B7344C" />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-961V3G18PG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-961V3G18PG');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Gemora Tech",
              "alternateName": "Dexterous Softech",
              "url": "https://www.dexteroussoftech.com",
              "logo": "https://www.dexteroussoftech.com/images/hero-bg.jpg",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "sales",
                "areaServed": ["US", "GB", "AU", "AE", "CA", "IN"],
                "availableLanguage": ["English"]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Gemora Tech",
              "@id": "https://www.dexteroussoftech.com",
              "url": "https://www.dexteroussoftech.com",
              "priceRange": "$$$",
              "areaServed": [
                { "@type": "Country", "name": "United States" },
                { "@type": "Country", "name": "United Kingdom" },
                { "@type": "Country", "name": "Australia" },
                { "@type": "Country", "name": "United Arab Emirates" },
                { "@type": "Country", "name": "Canada" }
              ]
            })
          }}
        />
      </head>
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
        <LeadCaptureModal />
        <StickyCTA />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
