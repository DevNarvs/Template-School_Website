import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ClayCard from "@/components/ui/ClayCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Stat from "@/components/ui/Stat";
import Icon from "@/components/ui/Icon";
import { site, stats } from "@/lib/site";
import { programs } from "@/lib/data/programs";
import { staff } from "@/lib/data/staff";

export const metadata = {
  title: "About Northwood — One community, kindergarten to college",
  description:
    "Meet Northwood Academy & College: our mission, our story since 1962, the values we live by, and the continuous K-12-to-college journey we offer every student.",
};

const head = staff[0];

const milestones = [
  {
    year: "1962",
    title: "A schoolhouse on Maple Ridge",
    body: "Northwood opens its doors with two classrooms, fourteen students, and a stubborn belief that learning should feel like an adventure.",
  },
  {
    year: "1978",
    title: "Lower & Middle School unite",
    body: "Growing demand brings a dedicated middle school, knitting the early years and adolescence into one continuous campus.",
  },
  {
    year: "1994",
    title: "High School & honors tracks",
    body: "College-prep, capstones, and our first robotics and writing programs launch — graduates begin heading to top universities.",
  },
  {
    year: "2009",
    title: "Northwood College accredited",
    body: "We become a true K-college, adding accredited undergraduate degrees so students can finish the journey they started at five.",
  },
  {
    year: "Today",
    title: "One community, every stage",
    body: "3,400+ students, a 9:1 ratio, and a 98% graduation rate — still on the same ridge, still chasing curiosity.",
  },
];

const values = [
  {
    icon: "sparkles",
    title: "Curiosity",
    body: "We protect the questions. Wonder is the engine of every classroom, lab, and studio at Northwood.",
  },
  {
    icon: "heart",
    title: "Kindness",
    body: "Character matters as much as achievement. We teach students to lead with empathy and listen well.",
  },
  {
    icon: "star",
    title: "Excellence",
    body: "High expectations, generous support. We help every learner do work they're genuinely proud of.",
  },
  {
    icon: "users",
    title: "Community",
    body: "Families, faculty, and alumni form one circle of belonging that follows students from K to college.",
  },
  {
    icon: "globe",
    title: "Belonging",
    body: "Every student should feel seen. Difference is welcomed here as a strength, not an exception.",
  },
  {
    icon: "flask",
    title: "Growth",
    body: "Mistakes are data. We celebrate the steady, brave progress that turns beginners into experts.",
  },
];

export default function AboutPage() {
  return (
    <main className="pb-24">
      {/* 1) Intro / mission hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="blob bg-brand-300 h-72 w-72 left-0 top-0" />
        <div className="blob bg-accent-300 h-80 w-80 right-0 top-24" />
        <Container className="relative z-10">
          <Reveal>
            <ClayCard className="relative overflow-hidden p-8 sm:p-12">
              <div className="blob bg-brand-200 h-56 w-56 -right-10 -bottom-10" />
              <div className="relative z-10 max-w-3xl">
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                  About {site.shortName}
                </span>
                <h1 className="mt-5 text-4xl font-bold leading-tight text-balance sm:text-5xl">
                  About Northwood
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-neutral-700 sm:text-xl">
                  {site.description}
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="clay-inset p-5">
                    <h2 className="flex items-center gap-2 text-lg font-bold">
                      <Icon name="sparkles" size={20} className="text-accent-700" />
                      Our mission
                    </h2>
                    <p className="mt-2 leading-relaxed text-neutral-700">
                      To unite kindergarten through college into one joyful,
                      continuous community — so that curiosity, kindness, and
                      ambition can grow without interruption.
                    </p>
                  </div>
                  <div className="clay-inset p-5">
                    <h2 className="flex items-center gap-2 text-lg font-bold">
                      <Icon name="cap" size={20} className="text-brand-600" />
                      Our vision
                    </h2>
                    <p className="mt-2 leading-relaxed text-neutral-700">
                      A school where the five-year-old asking "why?" and the
                      graduate defending a thesis are part of the same story —
                      mentored, known, and ready for the world.
                    </p>
                  </div>
                </div>
              </div>
            </ClayCard>
          </Reveal>
        </Container>
      </section>

      {/* 2) Quick facts / stats */}
      <section className="pt-14 sm:pt-20">
        <Container>
          <Reveal>
            <ClayCard className="p-8 sm:p-10">
              <p className="text-center text-sm font-bold uppercase tracking-wider text-brand-700">
                Northwood by the numbers
              </p>
              <h2 className="sr-only">Northwood at a glance</h2>
              <dl className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <Stat
                    key={s.label}
                    value={s.value}
                    suffix={s.suffix}
                    label={s.label}
                  />
                ))}
              </dl>
            </ClayCard>
          </Reveal>
        </Container>
      </section>

      {/* 3) Head of School message */}
      <section className="pt-16 sm:pt-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="A welcome"
              title="A message from our Head of School"
              align="center"
            />
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <ClayCard className="overflow-hidden p-0">
              <div className="grid gap-0 md:grid-cols-[260px_1fr]">
                <div className="relative flex items-center justify-center bg-[linear-gradient(145deg,#eef0ff_0%,#f6f7ff_100%)] p-8">
                  <div className="overflow-hidden rounded-clay border-4 border-white shadow-clay">
                    <Image
                      src={head.img}
                      alt={`Portrait of ${head.name}, ${head.role} of Northwood Academy & College`}
                      width={320}
                      height={320}
                      className="h-40 w-40 object-cover sm:h-48 sm:w-48"
                    />
                  </div>
                </div>
                <div className="p-8 sm:p-10">
                  <Icon
                    name="sparkles"
                    size={28}
                    className="text-accent-700"
                  />
                  <div className="mt-4 space-y-4 text-lg leading-relaxed text-neutral-700">
                    <p>
                      Welcome to Northwood. Whether you are meeting us for the
                      first time or returning as part of our family, I am
                      delighted you are here. What makes this place rare is
                      simple: a child can begin in our kindergarten and walk
                      across our college stage two decades later, supported the
                      entire way by people who truly know them.
                    </p>
                    <p>
                      We believe that great learning is built on relationships,
                      curiosity, and genuine care. Our faculty meet students
                      where they are and walk beside them toward where they
                      dream of going. I invite you to visit our ridge, sit in on
                      a class, and feel the warmth of one community spanning
                      every stage of growth. We would love to welcome you home.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-neutral-200 pt-5">
                    <p className="font-display text-xl font-semibold text-brand-800">
                      {head.name}
                    </p>
                    <p className="text-neutral-600">{head.role}</p>
                  </div>
                </div>
              </div>
            </ClayCard>
          </Reveal>
        </Container>
      </section>

      {/* 4) Our story timeline */}
      <section className="pt-16 sm:pt-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title={`From a small schoolhouse, since ${site.founded}`}
              subtitle="Six decades of growing alongside our students — one milestone at a time."
              align="center"
            />
          </Reveal>
          <Reveal delay={80} className="mt-12">
            <ol className="relative mx-auto max-w-3xl">
              {/* vertical line */}
              <span
                aria-hidden="true"
                className="absolute left-[19px] top-2 bottom-2 w-1 rounded-full bg-brand-200 sm:left-[27px]"
              />
              {milestones.map((m, i) => (
                <li
                  key={m.year}
                  className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <span
                      aria-hidden="true"
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white text-white shadow-clay-btn sm:h-14 sm:w-14 ${
                        i % 2 === 0 ? "bg-brand-600" : "bg-accent-700"
                      }`}
                    >
                      <Icon name="check" size={20} />
                    </span>
                  </div>
                  <ClayCard className="flex-1 p-5 sm:p-6" interactive>
                    <p className="font-display text-sm font-bold uppercase tracking-wider text-accent-700">
                      {m.year}
                    </p>
                    <h3 className="mt-1 text-xl font-bold">{m.title}</h3>
                    <p className="mt-2 leading-relaxed text-neutral-700">
                      {m.body}
                    </p>
                  </ClayCard>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* 5) Values grid */}
      <section className="pt-16 sm:pt-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we live by"
              title="Our values"
              subtitle="Six commitments that shape every classroom, hallway, and conversation at Northwood."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <ClayCard className="h-full" interactive>
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      i % 2 === 0
                        ? "bg-brand-50 text-brand-700"
                        : "bg-accent-50 text-accent-700"
                    }`}
                  >
                    <Icon name={v.icon} size={26} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-neutral-700">
                    {v.body}
                  </p>
                </ClayCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 6) The journey — divisions overview */}
      <section className="pt-16 sm:pt-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The journey"
              title="One path, kindergarten to college"
              subtitle="Four connected divisions, no jarring transitions — just steady growth from age five to a degree."
              align="center"
            />
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => {
              const isAccent = p.accent === "accent";
              return (
                <Reveal key={p.id} delay={i * 70}>
                  <ClayCard className="flex h-full flex-col" interactive>
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-clay-btn ${
                          isAccent ? "bg-accent-700" : "bg-brand-600"
                        }`}
                        aria-hidden="true"
                      >
                        <span className="font-display text-lg font-bold">
                          {i + 1}
                        </span>
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isAccent
                            ? "bg-accent-50 text-accent-700"
                            : "bg-brand-50 text-brand-700"
                        }`}
                      >
                        {p.grades}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                    <p className="text-sm font-semibold text-neutral-600">
                      {p.division}
                    </p>
                    <p className="mt-3 flex-1 leading-relaxed text-neutral-700">
                      {p.blurb}
                    </p>
                  </ClayCard>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* 7) CTA band */}
      <section className="pt-16 sm:pt-24">
        <Container>
          <Reveal>
            <ClayCard className="relative overflow-hidden p-10 text-center sm:p-14">
              <div className="blob bg-brand-300 h-64 w-64 -left-10 -top-10" />
              <div className="blob bg-accent-300 h-64 w-64 -right-10 -bottom-10" />
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold leading-tight text-balance sm:text-4xl">
                  Come visit our ridge
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                  The best way to understand Northwood is to feel it. Tour the
                  campus, meet our faculty, and see one continuous community in
                  motion.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button href="/contact" variant="primary" size="lg" icon="arrowRight">
                    Plan your visit
                  </Button>
                  <Button href="/staff" variant="ghost" size="lg">
                    Meet our faculty
                  </Button>
                </div>
              </div>
            </ClayCard>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
