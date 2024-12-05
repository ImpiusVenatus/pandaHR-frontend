import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const zrnic = localFont({
  src: "./fonts/zrnic.otf",
  variable: "--font-zrnic",
});

const bebasNeue = localFont({
  src: "./fonts/BebasNeue.woff",
  variable: "--font-bebas-neue",
  weight: "100 900",
});

const dmSans = localFont({
  src: "./fonts/DMSans.ttf",
  variable: "--font-dm-sans",
  weight: "100 900",
});

const dmSansBold = localFont({
  src: "./fonts/DMSans-Bold.ttf",
  variable: "--font-dm-sans-bold",
  weight: "100 900",
});

const lexend = localFont({
  src: "./fonts/Lexend.ttf",
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  title: "PandaHR",
  description: "Your AIO HR Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zrnic.variable} ${bebasNeue.variable} ${dmSans.variable} ${dmSansBold.variable} ${lexend.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
