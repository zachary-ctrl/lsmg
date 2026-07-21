import { createFileRoute, Link } from '@tanstack/react-router'
import { getModelBySlug } from '../data/models'
import { netlifyImage } from '../lib/netlify-image'

export const Route = createFileRoute('/models_/$slug')({
  head: ({ params }) => {
    const model = getModelBySlug(params.slug)

    if (!model) {
      return { meta: [{ title: 'Model Not Found | Last Shot Media Group' }] }
    }

    const description = `${model.name} is a ${model.city}-based ${model.types.join(' and ')} model represented by Last Shot Media Group.`

    return {
      meta: [
        { title: `${model.name} | LSMG Models & Talent` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${model.name} | LSMG Models & Talent` },
        { property: 'og:description', content: description },
        { property: 'og:image', content: model.imagePaths[0] },
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
          Back to Models
        </Link>
      </section>
    )
  }

  const measurements = [
    ['Height', model.specs.height],
    ['Bust', model.specs.bust],
    ['Waist', model.specs.waist],
  ]

  return (
    <article className="models-page model-profile">
      <div className="model-profile-hero">
        <div className="model-profile-image-wrap">
          <img
            src={netlifyImage(model.imagePaths[0], 1100, 1500)}
            alt={`${model.name}, ${model.types.join(' and ')} model represented by LSMG`}
            className="model-profile-image"
          />
          <span className="model-profile-shot-count">{model.imagePaths.length} shots</span>
        </div>

        <div className="model-profile-info">
          <Link to="/models" className="model-profile-back">
            ← Back to roster
          </Link>
          <span className="mdl-eyebrow">{model.city} · LSMG Talent</span>
          <h1>{model.name}</h1>
          <div className="model-profile-types">
            {model.types.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
          <dl className="model-profile-specs">
            {measurements.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="model-profile-bio">{model.bio}</p>
          <Link to="/contact" className="mdl-btn mdl-btn-primary model-profile-book">
            Book {model.name}
          </Link>
        </div>
      </div>

      {model.imagePaths.length > 1 && (
        <section className="model-profile-gallery" aria-label={`${model.name} portfolio gallery`}>
          <div className="model-profile-gallery-head">
            <span className="mdl-eyebrow">Portfolio</span>
            <h2>Selected Work</h2>
          </div>
          <div className="model-profile-gallery-grid">
            {model.imagePaths.slice(1).map((imagePath, index) => (
              <img
                key={imagePath}
                src={netlifyImage(imagePath, 720, 960)}
                alt={`${model.name} portfolio image ${index + 2}`}
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
