import { createFileRoute } from '@tanstack/react-router'
import { LegalDocument, LegalSection } from '../components/LegalDocument'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Use | Last Shot Media Group' },
      { name: 'description', content: 'Terms governing use of Last Shot Media Group’s website, inquiries, talent submissions and creative materials.' },
    ],
    links: [{ rel: 'canonical', href: 'https://lastshotmediagroup.com/terms' }],
  }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Use"
      description="The terms that apply when you browse our website, contact LSMG, submit a portfolio, or request information about creative and business services."
      updated="October 27, 2026"
    >
      <LegalSection id="acceptance" title="01 / Scope and Acceptance">
        <p>These Terms of Use apply to <a href="https://lastshotmediagroup.com">lastshotmediagroup.com</a>, operated by Last Shot Media Group Holdings LLC ("LSMG," "we," "us" or "our"). By using the website, you agree to these terms to the extent permitted by applicable law. If you do not agree, do not submit information or use interactive features. Separate signed agreements govern paid projects, representation, licensing and services when applicable.</p>
      </LegalSection>
      <LegalSection id="site-use" title="02 / Appropriate Website Use">
        <p>You may browse the website for lawful informational and business purposes. Do not misuse the forms, impersonate another person, submit misleading or unlawful materials, interfere with security, scrape restricted content, or attempt unauthorized access. We may limit access or review submissions to protect the site, other users and our team.</p>
      </LegalSection>
      <LegalSection id="ip" title="03 / Brand, Content and Intellectual Property">
        <p>Except for materials clearly credited to third parties, the website's layout, text, original graphics, brand identifiers and other original content belong to LSMG or its licensors and are protected by applicable intellectual-property law. You may view and share links to our publicly available pages. You may not reproduce, republish, commercially exploit or suggest endorsement by LSMG without permission. Third-party marks and content remain the property of their respective owners.</p>
      </LegalSection>
      <LegalSection id="submissions" title="04 / Talent and Creative Submissions">
        <p>When you submit applications, photographs, reels, scripts, concepts, portfolios or other materials, you represent that you have the authority to submit them and that doing so does not infringe another party's rights or confidentiality. You retain ownership of the materials you own.</p>
        <p>You grant LSMG a limited, non-exclusive permission to receive, store, reproduce internally and share the materials with personnel or relevant evaluators solely to review and respond to your submission or requested opportunity. This permission does not grant unrestricted public publication, advertising or commercial exploitation rights. Any broader usage, representation, licensing, compensation or exclusivity requires a separate agreement or authorization.</p>
        <p>Do not submit confidential, embargoed or unreleased materials unless LSMG has expressly agreed to receive them under appropriate confidentiality terms.</p>
      </LegalSection>
      <LegalSection id="no-agency" title="05 / No Automatic Representation or Engagement">
        <p>Submitting an application, requesting a booking, sending a proposal or communicating with LSMG does not establish an agency, management, employment, partnership, client, fiduciary or representation relationship. No casting, booking, publication, placement, payment or response is guaranteed. A binding business relationship is formed only through an appropriate agreement with authorized representatives.</p>
      </LegalSection>
      <LegalSection id="service-terms" title="06 / Services and Commercial Arrangements">
        <p>Website descriptions, availability, proposed offerings and examples are for general information; they are not binding offers. Prices, deliverables, schedules, licensing rights, expenses, approvals and cancellation terms must be confirmed in an applicable written proposal, agreement or checkout when available. Any signed agreement controls if it conflicts with these website terms regarding the contracted services.</p>
      </LegalSection>
      <LegalSection id="third-party" title="07 / Third-Party Content and Links">
        <p>Links, embedded media and third-party services may be operated by separate providers. LSMG does not control their policies, availability or content. Your use of those services is subject to their own terms and privacy practices.</p>
      </LegalSection>
      <LegalSection id="disclaimers" title="08 / Disclaimers and Liability">
        <p>To the fullest extent permitted by applicable law, the website and its informational content are provided "as is" and "as available," without warranties of uninterrupted operation, accuracy or suitability for a particular purpose. LSMG is not responsible for indirect or consequential losses caused by use of the public website to the extent such exclusions are lawful. Nothing here excludes liability or rights that cannot legally be excluded.</p>
      </LegalSection>
      <LegalSection id="governing-law" title="09 / Applicable Law and Disputes">
        <p>These website terms are governed by the laws of the State of Florida, United States, without overriding mandatory consumer or privacy protections that apply to you. Before bringing a dispute related to website use, you may contact us at <a href="mailto:info@lastshotmediagroup.com?subject=Terms%20Inquiry">info@lastshotmediagroup.com</a> so we can try to resolve the concern informally. Nothing here requires arbitration or waives rights that cannot be waived by law.</p>
      </LegalSection>
      <LegalSection id="changes" title="10 / Changes and Contact">
        <p>We may update these terms from time to time. Updates are effective when posted with a new date, unless applicable law requires otherwise. Continued website use after an update is subject to applicable law. For questions, contact <a href="mailto:info@lastshotmediagroup.com">info@lastshotmediagroup.com</a>. Read our <a href="/privacy">Privacy Policy</a> to learn how we handle personal information.</p>
      </LegalSection>
    </LegalDocument>
  )
}
