import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/booking')({
  beforeLoad: () => {
    throw redirect({ to: '/pr', hash: 'booking' })
  },
  component: () => null,
})
