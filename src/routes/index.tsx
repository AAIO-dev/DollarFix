import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Code,
  FileText,
  FileSearch,
  GraduationCap,
  ArrowRight,
  Zap,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DollarFix — One problem, one dollar. Ping it!" },
      {
        name: "description",
        content:
          "DollarFix is a micro-SaaS hub of single-purpose AI tools. Buy Universal Ping Credits once and use them across PitchPing, CodePing, ResumePing, PDF SnapClarity, and BandPing.",
      },
      { property: "og:title", content: "DollarFix — One problem, one dollar. Ping it!" },
      {
        property: "og:description",
        content:
          "A suite of powerful, single-purpose AI tools powered by universal credits. No subscriptions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://dollarfix.net" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const apps = [
  {
    icon: Briefcase,
    title: "PitchPing",
    description: "Write winning, client-ready freelance pitches in seconds.",
    href: "/app/pitchping",
  },
  {
    icon: Code,
    title: "CodePing",
    description: "Instant AI code review, debugging, and refactoring.",
    href: "/app/codeping",
  },
  {
    icon: FileText,
    title: "ResumePing",
    description: "Optimize your resume to beat ATS algorithms instantly.",
    href: "/app/resumeping",
  },
  {
    icon: FileSearch,
    title: "PDF SnapClarity",
    description: "Extract insights and summarize complex PDFs instantly.",
    href: "/app/pdf-snapclarity",
  },
  {
    icon: GraduationCap,
    title: "BandPing",
    description: "Get accurate IELTS essay band scores and feedback.",
    href: "/app/bandping",
  },
];

const tiers = [
  {
    credits: 100,
    price: "$1",
    note: "Great for quick fixes",
    featured: false,
  },
  {
    credits: 300,
    price: "$2",
    note: "Most Popular",
    featured: false,
  },
  {
    credits: 500,
    price: "$3",
    note: "Best Value",
    featured: true,
  },
];

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft transition-all duration-300 group-hover:shadow-glow">
        <Zap size={18} strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        DollarFix
      </span>
    </Link>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-200 hover:bg-primary/90 hover:shadow-glow"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl md:text-5xl lg:text-6xl">
          One problem, one dollar. Ping it!
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A suite of powerful, single-purpose AI tools. Buy credits once, use them
          universally across any app. No monthly subscriptions.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#apps"
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:bg-primary/90 hover:shadow-glow"
          >
            Explore Apps
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
    </section>
  );
}

function AppDirectory() {
  return (
    <section id="apps" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Specialized Tools
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Pick the right Ping for the job. Each tool is built to solve one thing
            exceptionally well.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {app.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {app.description}
                </p>
                <a
                  href={app.href}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  Launch App
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Universal Ping Credits
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            One wallet. Every app. Top up once and Ping away.
          </p>
        </div>

        <div className="relative mx-auto mb-12 max-w-4xl overflow-hidden rounded-3xl bg-primary p-8 text-center shadow-card sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-transparent" />
          <h3 className="relative text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl">
            🚀 Unlock Universal Credits!
          </h3>
          <p className="relative mx-auto mt-3 max-w-2xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            Create a free account to use your credit balance universally across
            ALL 5 DollarFix apps. (Without an account, credits remain locked to
            your current device).
          </p>
          <div className="relative mt-6 flex justify-center">
            <a
              href="/signup"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-background px-8 text-base font-semibold text-foreground shadow-soft transition-all duration-200 hover:bg-secondary hover:shadow-glow"
            >
              Sign Up Now
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.credits}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                tier.featured
                  ? "border-primary/30 bg-card shadow-card"
                  : "border-border bg-card/60 shadow-soft"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
                  Best Value
                </div>
              )}
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  {tier.price}
                </span>
              </div>
              <div className="mb-2 text-2xl font-bold text-primary">
                {tier.credits} Credits
              </div>
              <p className="mb-6 text-sm text-muted-foreground">{tier.note}</p>
              <ul className="mb-8 flex-1 space-y-3">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="shrink-0 text-emerald" />
                  Use across all apps
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="shrink-0 text-emerald" />
                  No expiry
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="shrink-0 text-emerald" />
                  No subscription
                </li>
              </ul>
              <button
                type="button"
                className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                  tier.featured
                    ? "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 hover:shadow-glow"
                    : "border border-border bg-background text-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                Buy Credits
              </button>
            </div>
          ))}
        </div>

        <blockquote className="mt-16 text-center">
          <p className="mx-auto max-w-2xl text-xl font-medium italic leading-relaxed text-muted-foreground sm:text-2xl">
            &ldquo;Don&apos;t overthink it.. Fix it fast.. Just Ping it!&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          &copy; 2026 DollarFix. Made for problem solvers.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <AppDirectory />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
