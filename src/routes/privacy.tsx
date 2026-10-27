import { createFileRoute } from '@tanstack/react-router'
import { LegalDocument, LegalSection } from '../components/LegalDocument'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Last Shot Media Group' },
      { name: 'description', content: 'How Last Shot Media Group handles information submitted through our website, talent applications, and business inquiries.' },
    ],
    links: [{ rel: 'canonical', href: 'https://lastshotmediagroup.com/privacy' }],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      description="How we collect, use, share and protect information when you interact with our website, request services or submit materials to Last Shot Media Group."
      updated="October 27, 2026"
    >
      <LegalSection id="who-we-are" title="01 / Who We Are">
        <p>Last Shot Media Group Holdings LLC ("LSMG," "we," "us" or "our") operates the Last Shot Media Group website at <a href="https://lastshotmediagroup.com">lastshotmediagroup.com</a>. This notice applies to information handled through this website and its associated contact, booking, talent-submission and account features. Separate sites, brands or services may have their own privacy notices.</p>
      </LegalSection>
      <LegalSection id="information" title="02 / Information We Collect">
        <p>Depending on how you use our site, we may collect:</p>
        <ul>
          <li><strong>Contact and business details:</strong> your name, email address, phone number, organization, project description and messages.</li>
          <li><strong>Talent submissions:</strong> professional background, social profiles, location, measurements or sizing you choose to provide, portfolios, photographs, videos, comp cards, links and other materials submitted for consideration.</li>
          <li><strong>Booking and partnership details:</strong> proposed events, dates, venues, artist requests and related correspondence.</li>
          <li><strong>Account and site-use details:</strong> login identifiers, session information, device and browser details, IP address, referring pages, and activity logs collected by our hosting or authentication providers.</li>
          <li><strong>Files and communications:</strong> materials you upload or send through site tools or directly to our team.</li>
        </ul>
        <p>Please do not include Social Security numbers, government identification numbers, banking details, or other unnecessary sensitive information in public-facing forms.</p>
      </LegalSection>
      <LegalSection id="purposes" title="03 / How We Use Information">
        <p>We use information to respond to inquiries; review talent and creative submissions; evaluate representation, casting, booking and collaboration opportunities; communicate about requested services; administer accounts and submitted materials; maintain site security; investigate misuse; and comply with applicable law. We may contact you about a relevant inquiry or opportunity. Marketing messages, where used, are subject to applicable consent and opt-out requirements.</p>
      </LegalSection>
      <LegalSection id="sharing" title="04 / When Information Is Shared">
        <p>We may provide necessary information to service providers that support site hosting, forms, identity, storage, communications and security, including Netlify where those services are used. We may also share appropriate application or project materials with LSMG personnel and relevant production, casting, booking, editorial or business partners to evaluate the opportunity you requested, subject to applicable permissions or agreements. Information may be disclosed when required by law, to protect rights or safety, or as part of a lawful business reorganization.</p>
        <p>Submitting a portfolio is not permission for us to sell your likeness or publicly publish your work for commercial purposes. Separate permission or an agreement may be needed before publication or commercial use.</p>
      </LegalSection>
      <LegalSection id="cookies" title="05 / Cookies, Storage and External Services">
        <p>Our site and service providers may use essential cookies, local storage or similar technologies for sessions, security and site preferences. Hosting providers may also collect technical request logs. If analytics, embeds or third-party media are enabled, those providers may receive technical information under their own policies. You can manage cookies through your browser settings; disabling essential storage may affect site features.</p>
      </LegalSection>
      <LegalSection id="retention" title="06 / Retention and Security">
        <p>We keep personal information only for as long as reasonably needed for the purposes above, the duration of a business relationship, legitimate recordkeeping, dispute resolution or legal obligations. We use reasonable organizational and technical safeguards, but no online system is completely secure. Avoid sending confidential information through an unprotected public form.</p>
      </LegalSection>
      <LegalSection id="your-choices" title="07 / Your Choices and Rights">
        <p>Depending on applicable law, you may have rights to request access to, correction of, or deletion of personal information, or to object to certain uses. You may also withdraw consent where processing depends on consent. To make a privacy request, email <a href="mailto:info@lastshotmediagroup.com?subject=Privacy%20Request">info@lastshotmediagroup.com</a> with "Privacy Request" in the subject line. We may need to verify your identity and may retain information where legally required or permitted.</p>
      </LegalSection>
      <LegalSection id="minors" title="08 / Minors">
        <p>This website is not designed for children under 13, and we do not knowingly solicit their personal information. Applicants under 18 should involve a parent or legal guardian before submitting personal details, images or materials. If you believe a child has submitted information without appropriate authorization, contact us so we can review the request.</p>
      </LegalSection>
      <LegalSection id="updates" title="09 / Changes and Contact">
        <p>We may revise this notice as our services or legal obligations change. We will post the updated version here with a revised effective date. For questions or requests, contact <a href="mailto:info@lastshotmediagroup.com">info@lastshotmediagroup.com</a>.</p>
      </LegalSection>
    </LegalDocument>
  )
}
