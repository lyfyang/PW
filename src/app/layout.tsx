import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Reveal } from "@/components/reveal";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Leo Yang",
  description:
    "Leo Yang studies applied math and computer science at Johns Hopkins and builds lab instruments, prediction models and web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
        <Reveal />
      </body>
    </html>
  );
}
