"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { galleryCategories, gallery, galleryUrl } from "@/lib/data/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // The set currently shown in the grid (and cycled inside the lightbox).
  const filtered = useMemo(() => {
    if (activeCategory === "All") return gallery;
    return gallery.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const isOpen = lightboxIndex !== null;
  const current = isOpen ? filtered[lightboxIndex] : null;

  // Refs for accessible focus management in the modal.
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const openLightbox = useCallback((index) => {
    lastFocusedRef.current = document.activeElement;
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? i : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  // Changing the filter resets the grid; close any open lightbox so the
  // index never points outside the new filtered set.
  const handleFilter = useCallback(
    (category) => {
      setActiveCategory(category);
      setLightboxIndex(null);
    },
    []
  );

  // Lock body scroll, trap focus, and wire keyboard nav while the modal is open.
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog.
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "Tab") {
        // Simple focus trap within the dialog.
        const root = dialogRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, closeLightbox, showPrev, showNext]);

  // Restore focus to the trigger when the modal closes.
  useEffect(() => {
    if (!isOpen && lastFocusedRef.current) {
      lastFocusedRef.current.focus?.();
      lastFocusedRef.current = null;
    }
  }, [isOpen]);

  const total = filtered.length;

  return (
    <main className="pb-24">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden pt-16 sm:pt-24">
        {/* Decorative clay blobs */}
        <div className="blob bg-brand-300 -left-10 top-0 h-72 w-72" aria-hidden="true" />
        <div className="blob bg-accent-200 right-0 top-24 h-80 w-80" aria-hidden="true" />
        <div className="blob bg-brand-200 left-1/3 -top-10 h-64 w-64" aria-hidden="true" />

        <Container className="relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
              <Icon name="sparkles" size={16} className="text-accent-700" />
              Photo Gallery
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Life at Northwood
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-neutral-700">
              From sunrise practices to commencement on the lawn, take a look around
              the {site.shortName} community. Browse moments from campus, academics,
              athletics, the arts, and the events that bring us together.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ====================== FILTER + GRID ======================= */}
      <section className="relative mt-12 sm:mt-16">
        <Container>
          {/* Category filter chips */}
          <Reveal>
            <div
              role="group"
              aria-label="Filter gallery by category"
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {galleryCategories.map((category) => {
                const active = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleFilter(category)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none ${
                      active
                        ? "clay-btn bg-[linear-gradient(145deg,#5B52E8_0%,#4338CA_100%)] text-white"
                        : "bg-white/70 text-brand-700 border-2 border-white/80 shadow-sm hover:bg-white"
                    }`}
                  >
                    {active && <Icon name="check" size={16} aria-hidden="true" />}
                    {category}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Live result count (text, not color-only) */}
          <Reveal delay={80}>
            <p
              className="mt-6 text-center text-sm font-medium text-neutral-600"
              aria-live="polite"
            >
              Showing <span className="font-bold text-brand-700">{total}</span>{" "}
              {total === 1 ? "photo" : "photos"}
              {activeCategory !== "All" && (
                <>
                  {" "}
                  in <span className="font-semibold text-accent-700">{activeCategory}</span>
                </>
              )}
            </p>
          </Reveal>

          {/* Masonry grid via CSS columns */}
          <Reveal delay={120}>
            <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
              {filtered.map((item, index) => (
                <li key={item.id} className="break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="group block w-full overflow-hidden rounded-clay border-2 border-white/80 bg-white shadow-clay clay-lift focus-visible:outline-none"
                    aria-label={`Open larger view: ${item.alt}`}
                  >
                    <span className="relative block overflow-hidden rounded-[22px]">
                      <Image
                        src={galleryUrl(item, 800)}
                        width={item.w}
                        height={item.h}
                        alt={item.alt}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-auto w-full rounded-[22px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                      {/* Caption + zoom affordance on hover */}
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="text-left text-sm font-medium leading-snug text-white">
                          {item.alt}
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-brand-700">
                          {item.category}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* =========================== CTA ============================= */}
      <section className="relative mt-20">
        <Container>
          <Reveal>
            <div className="clay relative overflow-hidden p-8 text-center sm:p-12">
              <div className="blob bg-accent-200 -right-6 -top-6 h-48 w-48" aria-hidden="true" />
              <div className="relative z-10">
                <SectionHeading
                  align="center"
                  eyebrow="See it in person"
                  title="Come visit the campus"
                  subtitle="Photos only capture so much. Schedule a tour and experience the Northwood community for yourself."
                  className="mb-7"
                />
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button href="/contact" variant="primary" size="lg" icon="arrowRight">
                    Schedule a visit
                  </Button>
                  <Button href="/about" variant="ghost" size="lg">
                    Learn about us
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ========================= LIGHTBOX ========================= */}
      {isOpen && current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${current.alt}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop (click to close) */}
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={closeLightbox}
            className="absolute inset-0 z-0 cursor-zoom-out bg-brand-950/80 backdrop-blur-sm focus-visible:outline-none"
            tabIndex={-1}
          />

          {/* Close button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-clay-btn transition hover:bg-white focus-visible:outline-none sm:right-6 sm:top-6"
          >
            <Icon name="x" size={22} aria-hidden="true" />
          </button>

          {/* Previous button */}
          {filtered.length > 1 && (
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-clay-btn transition hover:bg-white focus-visible:outline-none sm:left-6"
            >
              <Icon name="chevronRight" size={26} className="rotate-180" aria-hidden="true" />
            </button>
          )}

          {/* Next button */}
          {filtered.length > 1 && (
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-clay-btn transition hover:bg-white focus-visible:outline-none sm:right-6"
            >
              <Icon name="chevronRight" size={26} aria-hidden="true" />
            </button>
          )}

          {/* Image stage + caption */}
          <figure className="relative z-10 flex max-h-full w-full max-w-4xl flex-col items-center">
            <div className="relative flex w-full items-center justify-center">
              <Image
                key={current.id}
                src={galleryUrl(current, 1200)}
                width={current.w}
                height={current.h}
                alt={current.alt}
                priority
                sizes="(max-width: 768px) 90vw, 768px"
                className="max-h-[72vh] w-auto rounded-clay border-2 border-white/30 object-contain shadow-clay"
              />
            </div>
            <figcaption className="mt-4 max-w-2xl rounded-full bg-white/90 px-5 py-2.5 text-center text-sm font-medium text-neutral-800 shadow-sm">
              <span className="font-bold text-brand-700">{current.category}</span>
              <span className="mx-2 text-neutral-400" aria-hidden="true">
                ·
              </span>
              {current.alt}
              <span className="mx-2 text-neutral-400" aria-hidden="true">
                ·
              </span>
              <span className="text-neutral-600">
                {lightboxIndex + 1} of {filtered.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
