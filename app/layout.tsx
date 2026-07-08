import type { Metadata } from "next";
import "./globals.css";
import { churchContent } from "@/content/church";
import { churchIdentity } from "@/content/shared/churchIdentity";
import { isPlaceholder } from "@/lib/placeholders";

export const metadata: Metadata = {
  ...(isPlaceholder(churchIdentity.siteUrl)
    ? {}
    : { metadataBase: new URL(churchIdentity.siteUrl) }),
  title: churchContent.seo.title,
  description: churchContent.seo.description,
  openGraph: {
    title: churchContent.seo.title,
    description: churchContent.seo.description,
    type: "website",
    locale: "ru_RU",
    ...(isPlaceholder(churchIdentity.siteUrl) ? {} : { url: churchIdentity.siteUrl }),
    siteName: churchIdentity.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
