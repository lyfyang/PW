import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Reveal } from "@/components/reveal";
import { MotionProvider } from "@/components/motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Leo Yang",
  description:
    "Leo Yang studies applied math and computer science at Johns Hopkins, is interested in startups and where hardware meets software, and builds prediction models and web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
        <Reveal />
      </body>
    </html>
  );
}
