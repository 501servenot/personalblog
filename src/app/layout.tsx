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
        <main className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4">
          <TopBar />
          {children}
        </main>
      </body>
    </html>
  );
}
