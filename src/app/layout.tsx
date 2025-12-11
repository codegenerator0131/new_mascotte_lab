import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: "Mascotte.AI - Intelligent AI Avatars",
  description:
    "Deploy intelligent AI avatars across your digital and physical touchpoints.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <Layout>
          {children}
          <Toaster />
        </Layout>
      </body>
    </html>
  );
}
