import {
  ORG_AUTHORS,
  ORG_DESC,
  ORG_DOMAIN,
  ORG_IMAGE,
  ORG_KEYWORDS,
  ORG_LOGO,
  ORG_TITLE,
  ORG_TWITTER_CREATOR,
  ORG_TWITTER_SITE,
} from '@/config/org';
import './globals.css';

export const metadata = {
  language: 'en',
  title: ORG_TITLE,
  description: ORG_DESC,
  keywords: ORG_KEYWORDS,
  authors: ORG_AUTHORS,
  openGraph: {
    type: 'website',
    url: ORG_DOMAIN,
    title: ORG_TITLE,
    description: ORG_DESC,
    images: [ORG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: ORG_TWITTER_SITE,
    creator: ORG_TWITTER_CREATOR,
    title: ORG_TITLE,
    description: ORG_DESC,
    images: [ORG_IMAGE],
  },
  icons: { icon: ORG_LOGO },
  robots: { index: true, follow: true },
  alternates: { canonical: ORG_DOMAIN },
};

// const navItems = [
//   { name: 'Home', link: '/' },
//   { name: 'About', link: '/about' },
//   { name: 'Services', link: '/services' },
//   { name: 'Contact', link: '/contact' },
// ];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> {children} </body>
    </html>
  );
}
