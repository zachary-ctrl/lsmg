import type { ReactNode } from 'react'

type LegalDocumentProps = {
  title: string
  description: string
  updated: string
  children: ReactNode
}

export function LegalDocument({ title, description, updated, children }: LegalDocumentProps) {
  return (
    <article className="min-h-screen bg-[#060606] text-white">
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-36 sm:px-10 sm:pt-44">
        <a href="/" className="mb-12 inline-block text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white">← Back to LSMG</a>
        <div className="border-b border-white/20 pb-12">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--red)]" style={{ fontFamily: "'DM Mono', monospace" }}>
            Last Shot Media Group / Legal
          </p>
          <h1 className="max-w-4xl text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70">{description}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/50" style={{ fontFamily: "'DM Mono', monospace" }}>Effective / Last updated: {updated}</p>
        </div>
        <div className="max-w-3xl py-6">{children}</div>
        <div className="mt-8 border-t border-white/20 pt-8 text-sm leading-relaxed text-white/60">
          <p>
            Questions about these policies?{' '}
            <a className="underline decoration-[var(--red)] underline-offset-4 hover:text-white" href="mailto:info@lastshotmediagroup.com">info@lastshotmediagroup.com</a>
          </p>
          <nav aria-label="Legal links" className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="/privacy">Privacy Policy</a>
            <a className="underline decoration-white/40 underline-offset-4 hover:text-white" href="/terms">Terms of Use</a>
          </nav>
        </div>
      </div>
    </article>
  )
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-b border-white/10 py-9">
      <h2 className="mb-5 text-3xl uppercase tracking-wide text-white sm:text-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{title}</h2>
      <div className="space-y-4 text-base leading-8 text-white/70 [&_a]:underline [&_a]:decoration-[var(--red)] [&_a]:underline-offset-4 [&_a:hover]:text-white [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  )
}
