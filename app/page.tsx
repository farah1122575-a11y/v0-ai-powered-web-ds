import Link from "next/link"
import {
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  BarChart3,
  Timer,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const features = [
  {
    icon: BookOpen,
    title: "Structured Modules",
    description:
      "Organized by Module, Subject, and Lecture. Navigate your entire curriculum with ease.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Notes",
    description:
      "Summarize, simplify, or explain any concept with built-in AI assistance.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Flashcards",
    description:
      "Spaced repetition with confidence ratings. Focus on what you struggle with most.",
  },
  {
    icon: ClipboardCheck,
    title: "Adaptive Testing",
    description:
      "MCQs and written questions that target your weak areas. Instant AI-powered feedback.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track progress per module, identify weak topics, and monitor your study streaks.",
  },
  {
    icon: Timer,
    title: "Focus Timer",
    description:
      "Built-in Pomodoro timer with session logging to keep your study sessions productive.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">MEDLearn</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-Powered Medical Education
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Study Medicine
            <span className="text-primary"> Smarter</span>,
            <br />
            Not Harder
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            MEDLearn organizes your entire medical curriculum into structured modules
            with AI-powered notes, spaced-repetition flashcards, adaptive testing,
            and detailed performance analytics.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/auth/sign-up">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Log in to your account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t bg-muted/30 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to excel
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Built specifically for medical students who want a structured,
              data-driven approach to mastering their curriculum.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/50"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            Ready to transform your medical studies?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Join MEDLearn and start studying with the tools designed for
            medical excellence.
          </p>
          <Button size="lg" asChild className="mt-8 gap-2">
            <Link href="/auth/sign-up">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            MEDLearn
          </div>
          <p className="text-sm text-muted-foreground">
            Built for medical students, by medical students.
          </p>
        </div>
      </footer>
    </div>
  )
}
