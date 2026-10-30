import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import { Reveal } from "@/components/reveal";
import "./globals.css";

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-chivo",
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
    <html lang="en" className={chivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
