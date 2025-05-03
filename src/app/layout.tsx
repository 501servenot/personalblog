import type { Metadata } from "next";
import "./globals.css";
import TopBar from '../components/topbar'

export const metadata: Metadata = {
  title: "My Blog",
  description: "The website about me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex  justify-center bg-background text-foreground">
        <main className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-5">
          <TopBar />
          {children}
        </main>
      </body>
    </html>
  );
}
