import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinalytics - Track Your Vinyl Listening Habits",
  description: "A plug-and-play device that identifies your vinyl records and tracks your listening habits. Pre-order now.",
  openGraph: {
    title: "Vinalytics - Track Your Vinyl Listening Habits",
    description: "A plug-and-play device that identifies your vinyl records and tracks your listening habits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
