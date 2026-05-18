import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://happy-birthday-babe-nu.vercel.app/'),
  title: "Happy Birthday 🎂",
  description: "A special birthday celebration for a very special person 😘",
  openGraph: {
    title: "Happy Birthday 🎂",
    description: "A special birthday celebration for a very special person 😘",
    url: 'https://happy-birthday-babe-nu.vercel.app/',
    siteName: "Happy Birthday 🎂",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Happy Birthday Jess 🎂",
    description: "A special birthday celebration for a very special person 😘",
    images: ["/images/preview.png"],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
