"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ClayCard from "@/components/ui/ClayCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { divisions, staff } from "@/lib/data/staff";

export default function StaffPage() {
  const [query, setQuery] = useState("");
  const [activeDivision, setActiveDivision] = useState("All");
  const [selected, setSelected] = useState(null);

  const total = staff.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staff.filter((person) => {
      const inDivision =
        activeDivision === "All" || person.division === activeDivision;
      if (!inDivision) return false;
      if (!q) return true;
      return (
        person.name.toLowerCase().includes(q) ||
        person.subject.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q)
      );
    });
  }, [query, activeDivision]);

  const isFiltering = query.trim() !== "" || activeDivision !== "All";

  function clearFilters() {
    setQuery("");
    setActiveDivision("All");
  }

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
        <div className="blob bg-brand-300 left-[-4rem] top-0 h-72 w-72 animate-blob-drift" />
        <div className="blob bg-accent-200 right-[-3rem] top-24 h-64 w-64 animate-blob-drift" />
        <div className="blob bg-brand-200 bottom-[-4rem] left-1/3 h-72 w-72" />

        <Container className="relative z-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
              <Icon name="users" size={16} />
              Meet the team
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Our Faculty &amp; Staff
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              The people who make Northwood feel like home — from our youngest
              learners&rsquo; first teachers to the professors guiding capstone
              research. Search by name, subject, or role, or filter by division.
            </p>
          </Reveal>

          {/* ---- Search + Filters control panel ---- */}
          <Reveal delay={120} className="mx-auto mt-10 max-w-3xl">
            <ClayCard className="!p-5 sm:!p-6">
              <SearchField value={query} onChange={setQuery} />

              <div className="mt-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-700">
                  <Icon name="filter" size={16} className="text-brand-600" />
                  Filter by division
                </p>
                <div
                  role="group"
                  aria-label="Filter faculty by division"
                  className="flex flex-wrap gap-2.5"
                >
                  {divisions.map((division) => {
                    const active = activeDivision === division;
                    return (
                      <button
                        key={division}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveDivision(division)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none ${
                          active
                            ? "bg-brand-600 text-white shadow-clay-btn"
                            : "border-2 border-white/80 bg-white/70 text-brand-700 shadow-sm hover:bg-white"
                        }`}
                      >
                        {active && (
                          <Icon name="check" size={15} aria-hidden="true" />
                        )}
                        {division}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ClayCard>
          </Reveal>
        </Container>
      </section>

      {/* ===================== DIRECTORY GRID ===================== */}
      <section className="relative overflow-hidden pb-24 pt-4">
        <Container className="relative z-10">
          {/* Live result count */}
          <div
            className="mb-8 flex items-center justify-between gap-4"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-neutral-700">
              Showing{" "}
              <span className="text-brand-700">{filtered.length}</span> of{" "}
              <span className="text-brand-700">{total}</span>{" "}
              {total === 1 ? "person" : "people"}
            </p>
            {isFiltering && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-brand-700 transition hover:bg-white/70 focus-visible:outline-none"
              >
                <Icon name="x" size={15} />
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <ul
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {filtered.map((person, i) => (
                <Reveal
                  as="li"
                  key={person.id}
                  delay={Math.min(i, 5) * 70}
                >
                  <StaffCard
                    person={person}
                    onOpen={() => setSelected(person)}
                  />
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <EmptyState onClear={clearFilters} />
            </Reveal>
          )}
        </Container>
      </section>

      {/* ===================== DETAIL MODAL ===================== */}
      {selected && (
        <StaffModal person={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Search field                                                          */
/* --------------------------------------------------------------------- */
function SearchField({ value, onChange }) {
  const inputId = useId();
  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        Search faculty by name, subject, or role
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-500">
          <Icon name="search" size={20} />
        </span>
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name, subject, or role…"
          autoComplete="off"
          className="clay-inset w-full bg-transparent py-3.5 pl-12 pr-12 text-base text-neutral-800 placeholder:text-neutral-500 focus-visible:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-600 transition hover:bg-white/70 hover:text-brand-700 focus-visible:outline-none"
          >
            <Icon name="x" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Staff card (button -> opens modal)                                    */
/* --------------------------------------------------------------------- */
function StaffCard({ person, onOpen }) {
  return (
    <ClayCard
      as="button"
      interactive
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex h-full w-full flex-col items-center text-center focus-visible:outline-none"
    >
      <div className="relative">
        <span className="blob bg-accent-200 left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-40 transition group-hover:opacity-70" />
        <Image
          src={person.img}
          alt={`Portrait of ${person.name}, ${person.role}`}
          width={140}
          height={140}
          className="relative z-10 h-32 w-32 rounded-full border-4 border-white object-cover shadow-clay-btn"
        />
      </div>

      <h3 className="mt-5 text-xl font-bold leading-snug">{person.name}</h3>
      <p className="mt-1 text-sm font-semibold text-accent-700">
        {person.role}
      </p>

      <span className="mt-4 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
        {person.division}
      </span>

      <p className="mt-3 flex items-center gap-1.5 text-sm text-neutral-600">
        <Icon name="sparkles" size={15} className="text-brand-500" />
        {person.subject}
      </p>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        View profile
        <Icon
          name="arrowRight"
          size={16}
          className="transition group-hover:translate-x-0.5"
        />
      </span>
    </ClayCard>
  );
}

/* --------------------------------------------------------------------- */
/* Empty state                                                           */
/* --------------------------------------------------------------------- */
function EmptyState({ onClear }) {
  return (
    <ClayCard className="mx-auto flex max-w-lg flex-col items-center py-12 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon name="search" size={28} />
      </span>
      <h3 className="mt-5 text-2xl font-bold">No matches</h3>
      <p className="mt-2 max-w-sm text-neutral-600">
        We couldn&rsquo;t find anyone for that search. Try another name,
        subject, or division.
      </p>
      <Button variant="primary" size="md" onClick={onClear} className="mt-6">
        Clear filters
      </Button>
    </ClayCard>
  );
}

/* --------------------------------------------------------------------- */
/* Accessible detail modal                                               */
/* --------------------------------------------------------------------- */
function StaffModal({ person, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Move focus into the dialog on open; restore on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, []);

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-modal flex items-end justify-center p-4 sm:items-center"
      onMouseDown={(e) => {
        // Backdrop click (only when the press starts on the scrim itself).
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 z-overlay bg-brand-950/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="clay relative z-modal w-full max-w-md animate-[fade-up_0.32s_cubic-bezier(0.16,1,0.3,1)] p-7 focus-visible:outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm transition hover:bg-white hover:text-brand-700 focus-visible:outline-none"
        >
          <Icon name="x" size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <span className="blob bg-brand-300 left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <Image
              src={person.img}
              alt={`Portrait of ${person.name}, ${person.role}`}
              width={160}
              height={160}
              className="relative z-10 h-36 w-36 rounded-full border-4 border-white object-cover shadow-clay-btn"
            />
          </div>

          <h2 id={titleId} className="mt-5 text-2xl font-bold leading-snug">
            {person.name}
          </h2>
          <p className="mt-1 text-base font-semibold text-accent-700">
            {person.role}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
              {person.division}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
              <Icon name="sparkles" size={14} className="text-brand-500" />
              {person.subject}
            </span>
          </div>
        </div>

        <div className="clay-inset mt-6 rounded-2xl p-5">
          <p id={descId} className="text-base leading-relaxed text-neutral-800">
            {person.bio}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="primary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
