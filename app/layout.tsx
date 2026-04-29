import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DiscountPopup } from "@/components/ui/DiscountPopup";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ок Про Продакшн",
      url: SITE_URL,
      logo: `${SITE_URL}/images/olesya.jpg`,
      email: "info@okpro.ru",
      sameAs: [
        "https://instagram.com/okpro",
        "https://t.me/okpro",
      ],
      founder: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Олеся Константинова",
      jobTitle: "Основатель OK Pro",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "ru",
    },
    {
      "@type": "ItemList",
      name: "Услуги OK Pro",
      itemListElement: [
        { "@type": "Service", position: 1, name: "Личный бренд и стратегия", provider: { "@id": `${SITE_URL}/#organization` } },
        { "@type": "Service", position: 2, name: "PR и медиапродвижение", provider: { "@id": `${SITE_URL}/#organization` } },
        { "@type": "Service", position: 3, name: "Beauty-преображение", provider: { "@id": `${SITE_URL}/#organization` } },
        { "@type": "Service", position: 4, name: "Видеопродакшн", provider: { "@id": `${SITE_URL}/#organization` } },
        { "@type": "Service", position: 5, name: "Полное продюсирование", provider: { "@id": `${SITE_URL}/#organization` } },
      ],
    },
  ],
};

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Продюсерский центр Олеси Константиновой`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["личный бренд", "продюсерский центр", "марафон преображения", "видеопродакшн", "PR"],
  authors: [{ name: "Олеся Константинова", url: SITE_URL }],
  creator: "OK Pro",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Продюсерский центр Олеси Константиновой`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/olesya.jpg", width: 480, height: 640, alt: "OK Pro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Продюсерский центр Олеси Константиновой`,
    description: SITE_DESCRIPTION,
    images: ["/images/olesya.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(108980267,'init',{webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});`,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <DiscountPopup />
      </body>
    </html>
  );
}
