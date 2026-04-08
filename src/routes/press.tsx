import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/press')({
  beforeLoad: () => {
    throw redirect({ to: '/pr' })
  },
  component: () => null,
})
