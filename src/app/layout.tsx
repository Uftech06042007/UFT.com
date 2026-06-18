import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://uftech.com";
const SITE_DESCRIPTION =
  "UnitForce Technologies: software, engineering, and talent solutions for global enterprises since 2003.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UFT — Engineering, Software & Talent",
    template: "%s · UFT",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "UnitForce Technologies",
    url: SITE_URL,
    title: "UFT — Engineering, Software & Talent",
    description: SITE_DESCRIPTION,
    images: [{ url: "/assets/uft-logo.png", alt: "UnitForce Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UFT — Engineering, Software & Talent",
    description: SITE_DESCRIPTION,
    images: ["/assets/uft-logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('uft-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "UnitForce Technologies",
              alternateName: "UFT",
              url: SITE_URL,
              logo: `${SITE_URL}/assets/uft-logo.png`,
              description: SITE_DESCRIPTION,
              foundingDate: "2003",
              email: "info@uftech.com",
              sameAs: [
                "https://www.linkedin.com/company/uftjobs",
                "https://www.linkedin.com/company/uftllc",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
