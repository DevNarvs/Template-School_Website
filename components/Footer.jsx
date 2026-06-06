import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "./ui/Icon";

export default function Footer() {
  return (
    <footer className="mt-20 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="clay grid gap-10 p-8 sm:p-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-bold text-brand-900">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(145deg,#5B52E8,#4338CA)] text-white shadow-clay-btn">
                <Icon name="cap" size={22} />
              </span>
              {site.shortName}
            </Link>
            <p className="mt-4 max-w-sm text-neutral-600">{site.tagline}</p>
            <div className="mt-5 flex gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-brand-700 shadow-sm transition hover:text-accent-700"
                >
                  <Icon name={s.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-900">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-neutral-600 transition hover:text-brand-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-900">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-neutral-600">
              <li className="flex items-start gap-2">
                <Icon name="mapPin" size={18} className="mt-0.5 flex-none text-brand-600" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="phone" size={18} className="flex-none text-brand-600" />
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-brand-700">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="mail" size={18} className="flex-none text-brand-600" />
                <a href={`mailto:${site.email}`} className="hover:text-brand-700">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          © {site.founded}–present {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
