import { createFileRoute, redirect } from '@tanstack/react-router'

// The standalone Tribeca 2026 tab has been merged into the LSMG Ledger.
// All Tribeca coverage now lives on the Ledger; this route preserves any
// existing links and redirects them to the unified publication.
export const Route = createFileRoute('/tribeca/')({
  beforeLoad: () => {
    throw redirect({ to: '/culture-ledger' })
  },
  component: () => null,
})
