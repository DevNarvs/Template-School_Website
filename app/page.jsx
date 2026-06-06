import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ClayCard from "@/components/ui/ClayCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Stat from "@/components/ui/Stat";
import Icon from "@/components/ui/Icon";
import { site, stats } from "@/lib/site";
import { programs, features } from "@/lib/data/programs";
import { staff } from "@/lib/data/staff";
import { gallery, galleryUrl } from "@/lib/data/gallery";

export const metadata = {
  title: "Home",
  description: site.description,
};

// Sample testimonials (page-local sample content).
const testimonials = [
  {
    quote:
      "Our daughter started in kindergarten and is now thriving in high school. The teachers truly know her — it feels like one big, caring family.",
    name: "Maria Alvarez",
    role: "Parent of two",
  },
  {
    quote:
      "I went from building cardboard robots in the maker lab to leading our competition team. Northwood let me chase what I love at every step.",
    name: "Jordan Pike",
    role: "Grade 11 student",
  },
  {
    quote:
      "The continuity from lower school straight through college prepared me like nowhere else. I felt ready for university on day one.",
    name: "Naomi Osei",
    role: "Class of 2018 alum",
  },
];

// Faculty featured on the home teaser.
const facultyTeaser = staff.slice(0, 5);

// Two hero collage images + a mosaic for the gallery teaser.
const heroImages = [gallery[0], gallery[3]];
const mosaic = gallery.slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* 1) HERO */}
      <Reveal as="section" className="relative overflow-hidden">
        {/* decorative blobs */}
        <div className="blob animate-blob-drift left-[-4rem] top-[-2rem] h-72 w-72 bg-brand-300" />
        <div className="blob animate-blob-drift right-[-3rem] top-24 h-80 w-80 bg-accent-300" />
        <div className="blob left-1/3 top-72 hidden h-64 w-64 bg-brand-200 lg:block" />

        <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
                <Icon name="sparkles" size={14} />
                Est. {site.founded} · K-12 + College
              </span>
              <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                Where curiosity becomes character — from kindergarten to college.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
                {site.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact" variant="accent" size="lg" icon="arrowRight">
                  Schedule a visit
                </Button>
                <Button href="/about" variant="ghost" size="lg">
                  Explore Northwood
                </Button>
              </div>
            </div>

            {/* hero visual: clay collage + floating badge */}
            <div className="relative">
              <div className="relative mx-auto max-w-md">
                <ClayCard className="rotate-[-3deg] p-3 sm:p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image
                      src={galleryUrl(heroImages[0], 800)}
                      alt={heroImages[0].alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 28rem, 90vw"
                      className="object-cover"
                    />
                  </div>
                </ClayCard>

                <ClayCard className="absolute -bottom-10 -right-4 w-44 rotate-[5deg] p-2 sm:w-52 sm:p-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={galleryUrl(heroImages[1], 600)}
                      alt={heroImages[1].alt}
                      fill
                      sizes="13rem"
                      className="object-cover"
                    />
                  </div>
                </ClayCard>

                {/* floating clay stat badge */}
                <div className="absolute -left-4 -top-6 animate-clay-breathe">
                  <ClayCard className="flex items-center gap-3 p-4 sm:p-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-100 text-accent-700">
                      <Icon name="cap" size={22} />
                    </span>
                    <div className="leading-tight">
                      <div className="font-display text-xl font-bold text-brand-700">98%</div>
                      <div className="text-xs font-medium text-neutral-600">go on to college</div>
                    </div>
                  </ClayCard>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Reveal>

      {/* 2) STATS BAND */}
      <Reveal as="section" className="py-12 sm:py-16">
        <Container>
          <ClayCard className="px-6 py-10 sm:px-10">
            <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </dl>
          </ClayCard>
        </Container>
      </Reveal>

      {/* 3) ONE CONTINUOUS JOURNEY */}
      <Reveal as="section" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The journey"
            title="One continuous journey"
            subtitle="From a child's very first day of kindergarten to a graduate's final capstone — every stage flows into the next, under one roof."
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => {
              const isAccent = p.accent === "accent";
              const badge = isAccent
                ? "bg-accent-100 text-accent-700"
                : "bg-brand-50 text-brand-700";
              return (
                <li key={p.id} className="h-full">
                  <Reveal delay={i * 90} className="h-full">
                    <ClayCard as="article" interactive className="flex h-full flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badge}`}
                        >
                          {p.division}
                        </span>
                        <span
                          className="font-display text-sm font-bold text-neutral-400"
                          aria-hidden="true"
                        >
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug">{p.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-neutral-600">{p.grades}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-700">
                        {p.blurb}
                      </p>
                      <Link
                        href="/about"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:gap-2.5 hover:text-brand-800 transition-all"
                      >
                        Learn more
                        <Icon name="arrowRight" size={16} />
                      </Link>
                    </ClayCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </Reveal>

      {/* 4) WHY NORTHWOOD */}
      <Reveal as="section" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Why Northwood"
            title="A school built around the student"
            subtitle="Four things that stay constant whether you're five or twenty-one."
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <li key={f.title} className="h-full">
                <Reveal delay={i * 90} className="h-full">
                  <ClayCard className="flex h-full flex-col items-start">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700 shadow-sm">
                      <Icon name={f.icon} size={26} />
                    </span>
                    <h3 className="mt-5 text-lg font-bold leading-snug">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{f.body}</p>
                  </ClayCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>

      {/* 5) FACULTY TEASER */}
      <Reveal as="section" className="py-16 sm:py-20">
        <Container>
          <ClayCard className="relative overflow-hidden px-6 py-12 sm:px-12">
            <div className="blob right-[-2rem] top-[-3rem] h-56 w-56 bg-accent-200" />
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                  Our people
                </span>
                <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                  Mentors who know every name
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-neutral-700">
                  With a 9:1 student-faculty ratio, our teachers and professors guide each student
                  by name, year after year.
                </p>
                <div className="mt-7">
                  <Button href="/staff" variant="primary" icon="arrowRight">
                    Meet our faculty
                  </Button>
                </div>
              </div>

              <ul className="flex flex-wrap items-center gap-5 lg:justify-end">
                {facultyTeaser.map((person) => (
                  <li key={person.id} className="text-center">
                    <div className="clay rounded-full p-1.5">
                      <Image
                        src={person.img}
                        alt={`${person.name}, ${person.role}`}
                        width={88}
                        height={88}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    </div>
                    <p className="mt-2 max-w-[6rem] text-xs font-bold leading-tight text-neutral-800">
                      {person.name}
                    </p>
                    <p className="text-[11px] leading-tight text-neutral-600">{person.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ClayCard>
        </Container>
      </Reveal>

      {/* 6) GALLERY TEASER */}
      <Reveal as="section" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Campus life"
            title="A glimpse of life at Northwood"
            subtitle="Studios, fields, labs, and quads — the everyday moments that make a community."
          />

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {mosaic.map((item, i) => {
              const tall = i === 0 || i === 5;
              return (
                <li
                  key={item.id}
                  className={tall ? "row-span-2 sm:row-span-2" : ""}
                >
                  <Link
                    href="/gallery"
                    className="clay clay-lift group block h-full overflow-hidden p-2"
                  >
                    <div
                      className={`relative h-full w-full overflow-hidden rounded-2xl ${
                        tall ? "aspect-[3/4]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={galleryUrl(item, 800)}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 640px) 30vw, 45vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 text-center">
            <Button href="/gallery" variant="ghost" icon="arrowUpRight">
              View the full gallery
            </Button>
          </div>
        </Container>
      </Reveal>

      {/* 7) TESTIMONIALS */}
      <Reveal as="section" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="In their words"
            title="Loved by families, students, and alumni"
          />

          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <li key={t.name} className="h-full">
                <Reveal delay={i * 90} className="h-full">
                  <ClayCard as="figure" className="flex h-full flex-col">
                    <div className="flex gap-1 text-accent-700" aria-label="Rated 5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((n) => (
                        <Icon key={n} name="star" size={18} aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-base leading-relaxed text-neutral-800">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t-2 border-white/70 pt-4">
                      <p className="font-bold text-neutral-900">{t.name}</p>
                      <p className="text-sm text-neutral-600">{t.role}</p>
                    </figcaption>
                  </ClayCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>

      {/* 8) CTA BAND */}
      <Reveal as="section" className="pb-24 pt-8 sm:pb-28">
        <Container>
          <ClayCard className="relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="blob animate-blob-drift left-[-3rem] top-[-2rem] h-64 w-64 bg-brand-300" />
            <div className="blob animate-blob-drift right-[-3rem] bottom-[-3rem] h-72 w-72 bg-accent-300" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
                Ready to see Northwood in person?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                Book a campus tour and meet the teachers, students, and spaces that make Northwood
                feel like home — from the first day of kindergarten to commencement.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" variant="accent" size="lg" icon="arrowRight">
                  Schedule a visit
                </Button>
                <Button href={`mailto:${site.email}`} variant="ghost" size="lg" icon="mail">
                  Email admissions
                </Button>
              </div>
            </div>
          </ClayCard>
        </Container>
      </Reveal>
    </>
  );
}
