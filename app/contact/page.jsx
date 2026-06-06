"use client";

import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ClayCard from "@/components/ui/ClayCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";

const ROLE_OPTIONS = [
  { value: "", label: "Choose one…" },
  { value: "parent", label: "Parent / Guardian" },
  { value: "prospective", label: "Prospective student" },
  { value: "alumni", label: "Alumni" },
  { value: "other", label: "Other" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = {
  fullName: "",
  email: "",
  role: "",
  subject: "",
  message: "",
};

// Returns an error string for a single field, or "" when valid.
function validateField(name, value) {
  const v = (value || "").trim();
  switch (name) {
    case "fullName":
      if (!v) return "Please enter your full name.";
      return "";
    case "email":
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return "";
    case "role":
      if (!v) return "Please tell us who you are.";
      return "";
    case "subject":
      if (!v) return "Please add a subject.";
      return "";
    case "message":
      if (!v) return "Please write a short message.";
      if (v.length < 10) return "Your message is a little short — add a few more details.";
      return "";
    default:
      return "";
  }
}

const FIELD_ORDER = ["fullName", "email", "role", "subject", "message"];

export default function ContactPage() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success

  // Refs to focus the first invalid field on a failed submit.
  const refs = {
    fullName: useRef(null),
    email: useRef(null),
    role: useRef(null),
    subject: useRef(null),
    message: useRef(null),
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // If the field was already flagged, re-validate live so the error clears as they fix it.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    // Validate everything.
    const nextErrors = {};
    FIELD_ORDER.forEach((name) => {
      const msg = validateField(name, values[name]);
      if (msg) nextErrors[name] = msg;
    });
    setErrors(nextErrors);
    setTouched(
      FIELD_ORDER.reduce((acc, name) => ({ ...acc, [name]: true }), {})
    );

    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }

    // Valid — simulate a brief send (no backend), then show success and reset.
    setStatus("sending");
    setTimeout(() => {
      setValues(INITIAL);
      setErrors({});
      setTouched({});
      setStatus("success");
    }, 900);
  }

  const infoCards = [
    {
      icon: "mapPin",
      title: "Visit campus",
      body: <span className="text-neutral-700">{site.address}</span>,
    },
    {
      icon: "phone",
      title: "Call us",
      body: (
        <a
          href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
          className="font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          {site.phone}
        </a>
      ),
    },
    {
      icon: "mail",
      title: "Email admissions",
      body: (
        <a
          href={`mailto:${site.email}`}
          className="font-semibold text-brand-700 underline-offset-4 hover:underline break-words"
        >
          {site.email}
        </a>
      ),
    },
    {
      icon: "calendar",
      title: "Office hours",
      body: <span className="text-neutral-700">{site.hours}</span>,
    },
  ];

  return (
    <main className="relative overflow-hidden pb-24">
      {/* Decorative clay blobs */}
      <div className="blob bg-brand-300 h-72 w-72 left-[-4rem] top-[-3rem]" />
      <div className="blob bg-accent-200 h-80 w-80 right-[-5rem] top-32 animate-blob-drift" />

      <Container className="relative z-10">
        {/* ---------------- Hero / intro ---------------- */}
        <header className="pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
              <Icon name="sparkles" size={16} className="text-accent-700" />
              We&apos;d love to hear from you
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-balance sm:text-5xl">
              Get in touch
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-700">
              Questions about admissions, a campus visit, or life at{" "}
              {site.shortName}? Send us a note and a member of our team will get
              back to you — usually within two business days.
            </p>
          </Reveal>
        </header>

        {/* ---------------- Two-column layout ---------------- */}
        <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
          {/* LEFT — Form panel (spans 3 of 5 cols) */}
          <Reveal className="lg:col-span-3" delay={80}>
            <ClayCard as="section" aria-labelledby="form-heading" className="p-7 sm:p-9">
              <h2 id="form-heading" className="text-2xl font-bold">
                Send us a message
              </h2>
              <p className="mt-2 text-neutral-600">
                Fields marked with{" "}
                <span className="font-semibold text-accent-700" aria-hidden="true">
                  *
                </span>{" "}
                <span className="sr-only">an asterisk</span> are required.
              </p>

              {status === "success" ? (
                <SuccessPanel onReset={() => setStatus("idle")} />
              ) : (
                <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-6">
                  <Field
                    ref={refs.fullName}
                    id="fullName"
                    name="fullName"
                    label="Full name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Jordan Rivera"
                    value={values.fullName}
                    error={touched.fullName ? errors.fullName : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Field
                    ref={refs.email}
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    helper="We'll only use this to reply to your message."
                    value={values.email}
                    error={touched.email ? errors.email : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Field
                    ref={refs.role}
                    id="role"
                    name="role"
                    label="I am a…"
                    as="select"
                    value={values.role}
                    error={touched.role ? errors.role : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>

                  <Field
                    ref={refs.subject}
                    id="subject"
                    name="subject"
                    label="Subject"
                    type="text"
                    placeholder="What is this about?"
                    value={values.subject}
                    error={touched.subject ? errors.subject : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Field
                    ref={refs.message}
                    id="message"
                    name="message"
                    label="Message"
                    as="textarea"
                    rows={5}
                    placeholder="Tell us how we can help…"
                    helper="A sentence or two is perfect — include any dates or grade levels."
                    value={values.message}
                    error={touched.message ? errors.message : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={status === "sending" ? undefined : "send"}
                      disabled={status === "sending"}
                      aria-busy={status === "sending"}
                      className={status === "sending" ? "opacity-70 cursor-wait" : ""}
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                    </Button>
                    <p className="text-sm text-neutral-600">
                      We typically reply within 2 business days.
                    </p>
                  </div>
                </form>
              )}
            </ClayCard>
          </Reveal>

          {/* RIGHT — Info + map (spans 2 of 5 cols) */}
          <div className="space-y-6 lg:col-span-2">
            <Reveal delay={160}>
              <section aria-labelledby="info-heading">
                <h2 id="info-heading" className="sr-only">
                  Contact details
                </h2>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {infoCards.map((card) => (
                    <li key={card.title}>
                      <ClayCard interactive className="flex items-start gap-4 p-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                          <Icon name={card.icon} size={22} />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold">{card.title}</h3>
                          <div className="mt-1 text-sm leading-relaxed">{card.body}</div>
                        </div>
                      </ClayCard>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Embedded map */}
            <Reveal delay={240}>
              <ClayCard as="section" aria-labelledby="map-heading" className="p-3">
                <h2 id="map-heading" className="sr-only">
                  Campus location map
                </h2>
                <div className="overflow-hidden rounded-clay border-2 border-white/80">
                  <iframe
                    title="Campus map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      site.mapQuery
                    )}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-72 w-full rounded-clay border-0"
                  />
                </div>
                <p className="px-2 pb-1 pt-3 text-sm text-neutral-600">
                  <Icon
                    name="mapPin"
                    size={16}
                    className="mr-1 inline-block align-text-bottom text-accent-700"
                  />
                  {site.address}
                </p>
              </ClayCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </main>
  );
}

/* ============================================================
   Success state shown after a valid submission.
   ============================================================ */
function SuccessPanel({ onReset }) {
  return (
    <div role="status" aria-live="polite" className="mt-7">
      <ClayCard className="flex flex-col items-center gap-4 bg-[linear-gradient(145deg,#ffffff_0%,#eafaf0_100%)] p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-bg text-success-text">
          <Icon name="checkCircle" size={34} strokeWidth={2} />
        </span>
        <div>
          <h3 className="text-2xl font-bold">Thanks! We&apos;ll be in touch.</h3>
          <p className="mx-auto mt-2 max-w-md text-neutral-700">
            Your message is on its way. A member of our team will reply within
            2 business days.
          </p>
        </div>
        <Button type="button" variant="ghost" size="md" onClick={onReset}>
          Send another message
        </Button>
      </ClayCard>
    </div>
  );
}

/* ============================================================
   Reusable field: label + clay-inset control + inline error.
   Supports input / select / textarea via the `as` prop.
   forwardRef so the parent can focus the first invalid field.
   ============================================================ */
import { forwardRef } from "react";

const Field = forwardRef(function Field(
  {
    id,
    name,
    label,
    as = "input",
    type = "text",
    helper,
    error,
    children,
    ...rest
  },
  ref
) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const describedBy =
    [hasError ? errorId : null, helper ? helperId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const controlBase =
    "clay-inset w-full px-4 py-3 text-neutral-800 placeholder:text-neutral-400 outline-none transition";
  const errorRing = hasError ? "ring-2 ring-danger-text/70" : "";
  const controlCls = `${controlBase} ${errorRing}`;

  const sharedProps = {
    id,
    name,
    ref,
    "aria-invalid": hasError || undefined,
    "aria-describedby": describedBy,
    className: controlCls,
    ...rest,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-neutral-800">
        {label}
        <span className="text-accent-700" aria-hidden="true">
          *
        </span>
      </label>

      {as === "textarea" ? (
        <textarea {...sharedProps} />
      ) : as === "select" ? (
        <select {...sharedProps}>{children}</select>
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {helper && !hasError && (
        <p id={helperId} className="mt-1.5 text-xs text-neutral-600">
          {helper}
        </p>
      )}

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger-text"
        >
          <Icon name="alert" size={16} strokeWidth={2} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});
