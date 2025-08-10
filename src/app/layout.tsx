import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Augmex - Build Elite Remote Teams Fast | Save 70-80% Costs",
  description: "Hire vetted software developers, sales, support & AI talent in days. Build elite remote teams with significant cost savings and speed.",
  keywords: ["remote teams", "software developers", "talent acquisition", "cost savings", "AI talent", "sales talent", "support talent", "remote hiring"],
  authors: [{ name: "Augmex Team" }],
  openGraph: {
    title: "Augmex - Build Elite Remote Teams Fast",
    description: "Hire vetted software developers, sales, support & AI talent in days. Save 70-80% costs.",
    url: "https://augmex.io",
    siteName: "Augmex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Augmex - Build Elite Remote Teams Fast",
    description: "Hire vetted software developers, sales, support & AI talent in days. Save 70-80% costs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
