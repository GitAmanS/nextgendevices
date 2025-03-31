import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";

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
        <GoogleAnalytics gaId="G-WV7W3J2PDW" trackPageViews />
      </head>
      <body
        className={` font-montserrat ${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.className} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
