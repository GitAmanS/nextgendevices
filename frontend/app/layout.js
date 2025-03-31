import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextGenDevices",
  description: "NextGenDevices",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-WV7W3J2PDW`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WV7W3J2PDW', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={` font-montserrat ${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.className} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}