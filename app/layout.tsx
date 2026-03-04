import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Simon Ryu",
    template: "%s | Simon Ryu",
  },
  description:
    "AI Engineer writing about production ML systems, LLM infrastructure, and building AI companions.",
  openGraph: {
    title: "Simon Ryu",
    description:
      "AI Engineer writing about production ML systems, LLM infrastructure, and building AI companions.",
    url: "https://simonryu328.github.io",
    siteName: "Simon Ryu",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://simonryu328.github.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen flex flex-col`}
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
