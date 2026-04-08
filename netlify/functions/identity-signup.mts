import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

const ALLOWED_COMPANY_DOMAINS = ['lastshotmediagroup.com', 'lsmholdings.com'] as const

function isAllowedCompanyEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  return ALLOWED_COMPANY_DOMAINS.some((domain) => normalized.endsWith(`@${domain}`))
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { user } = JSON.parse(event.body || '{}')
  const email = user?.email ?? ''

  if (!email || !isAllowedCompanyEmail(email)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'Signup is restricted to approved company email domains.',
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        ...user.app_metadata,
        roles: ['user'],
      },
    }),
  }
}

export { handler }
