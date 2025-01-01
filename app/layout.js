import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalHeader from "@/components/ConditionalHeader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
});

export const metadata = {
  title: "Google",
  description: "google.com",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <div className="min-h-screen text-white flex flex-col relative">
          <ConditionalHeader />
          {children}
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
}
