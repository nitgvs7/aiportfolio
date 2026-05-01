import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anite — AI Video Editor",
  description:
    "Cinematic AI visuals, scroll-stopping reels, product films, music visuals, and brand stories by Anite.",
  metadataBase: new URL("https://anite.me"),
  openGraph: {
    title: "Anite — AI Video Editor",
    description:
      "Cinematic AI visuals, scroll-stopping reels, product films, music visuals, and brand stories.",
    url: "https://anite.me",
    siteName: "Anite",
    images: [
      {
        url: "/hero-poster.jpg",
        width: 1664,
        height: 1248,
        alt: "Anite cinematic AI video frame",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
