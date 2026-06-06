import { Fredoka, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
};

export const viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-tooltip focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
