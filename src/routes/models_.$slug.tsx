import { createFileRoute, Link } from '@tanstack/react-router'
import { getModelBySlug } from '../data/models'

export const Route = createFileRoute('/models_/$slug')({
  head: ({ params }) => {
    const model = getModelBySlug(params.slug)

    if (!model) {
      return { meta: [{ title: 'Model Not Found | Last Shot Media Group' }] }
    }

    const description = model.tagline
      ? `${model.tagline} ${model.name} — ${model.types.join(', ')} talent represented by Last Shot Media Group.`
      : `${model.name} is a ${model.types.join(' and ')} model represented by Last Shot Media Group.`

    return {
      meta: [
        { title: `${model.name} | LSMG Talent` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${model.name} | LSMG Talent` },
        { property: 'og:description', content: description },
      ],
    }
  },
  component: ModelProfilePage,
})

function ModelProfilePage() {
  const { slug } = Route.useParams()
  const model = getModelBySlug(slug)

  if (!model) {
    return (
      <section className="models-page model-profile model-profile-missing">
        <span className="mdl-eyebrow">LSMG Talent Division</span>
        <h1>Profile Not Found</h1>
        <p>This model is not currently listed on the LSMG roster.</p>
        <Link to="/models" className="mdl-btn mdl-btn-primary">
          Back to Talent
        </Link>
      </section>
    )
  }

  return (
    <article className="models-page model-profile">
      <div className="model-profile-hero">
        <div className="model-profile-info">
          <Link to="/models" className="model-profile-back">
            ← Back to roster
          </Link>
          <span className="mdl-eyebrow">LSMG Talent</span>
          <h1>{model.name}</h1>
          {model.tagline && <p className="model-profile-tagline">{model.tagline}</p>}
          <div className="model-profile-types">
            {model.types.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
          {model.measurements && (
            <dl className="model-profile-specs">
              <div>
                <dt>Bust</dt>
                <dd>{model.measurements.bust}</dd>
              </div>
              <div>
                <dt>Waist</dt>
                <dd>{model.measurements.waist}</dd>
              </div>
              <div>
                <dt>Hips</dt>
                <dd>{model.measurements.hips}</dd>
              </div>
            </dl>
          )}
          <p className="model-profile-bio">{model.bio}</p>
          <Link to="/contact" className="mdl-btn mdl-btn-primary model-profile-book">
            Book {model.name}
          </Link>
        </div>
      </div>

    </article>
  )
}
