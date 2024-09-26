import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/Providers/theme-provider"
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const font = Montserrat({ weight: "400", subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `$s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "NCS",
    "CAG",
    "Airport",
    "Predict Waiting Time"
  ],
  authors: [
    {
      name: "Harsha",
      url: "https://google.com",
    },
  ],
  creator: "Harsha",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          font.className,
          font.variable
        )}
      >
        <NextTopLoader color="#2299DD" easing="ease" height={5} showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Toaster position="bottom-center" reverseOrder={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
