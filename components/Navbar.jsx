"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import Icon from "./ui/Icon";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-sticky">
      <nav
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all sm:px-5 ${
          scrolled ? "clay" : "bg-white/60 border-2 border-white/70"
        }`}
        style={{ position: "relative" }}
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-2.5 pl-1 font-display text-lg font-bold text-brand-900">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(145deg,#5B52E8,#4338CA)] text-white shadow-clay-btn">
            <Icon name="cap" size={20} />
          </span>
          <span className="hidden sm:inline">{site.shortName}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-neutral-600 hover:bg-white/70 hover:text-brand-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="clay-btn hidden rounded-full bg-[linear-gradient(145deg,#C2410C_0%,#9A3412_100%)] px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex"
          >
            Apply now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-brand-800 shadow-sm md:hidden"
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-2 md:hidden">
          <ul className="clay flex flex-col gap-1 p-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    isActive(item.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-neutral-700 hover:bg-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-1">
              <Link
                href="/contact"
                className="clay-btn block rounded-2xl bg-[linear-gradient(145deg,#C2410C,#9A3412)] px-4 py-3 text-center text-base font-semibold text-white"
              >
                Apply now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
