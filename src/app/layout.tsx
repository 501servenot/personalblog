import type { Metadata } from "next";
import "./globals.css";
import TopBar from '../components/topbar'
import Footer from "@/components/footer";
import NewBlurLayer from "@/components/ui/blur";

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
      <body className="min-h-screen flex  justify-center bg-background text-foreground px-0 sm:px-4">
        <main className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-0 sm:px-5">
          <TopBar />
          {children}
          <Footer />
          <NewBlurLayer />
        </main>
      </body>
    </html>
  );
}
