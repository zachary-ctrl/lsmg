import { createFileRoute, Link } from '@tanstack/react-router'
import { IMAGE_WIDTHS, getModelBySlug, hasKnownCity } from '../data/models'
import { responsiveImage } from '../lib/netlify-image'

const SITE_URL = 'https://lastshotmediagroup.com'

function absoluteUrl(path: string) {
  return /^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`
}

export const Route = createFileRoute('/models_/$slug')({
  head: ({ params }) => {
    const model = getModelBySlug(params.slug)

    if (!model) {
      return { meta: [{ title: 'Model Not Found | Last Shot Media Group' }] }
    }

    const roles = (model.roles ?? ['Model']).map((role) => role.toLowerCase()).join(' and ')
    const description = hasKnownCity(model)
      ? `${model.name} is a ${model.city}-based ${model.types.join(' and ')} ${roles} represented by Last Shot Media Group.`
      : `${model.name} is a ${model.types.join(' and ')} ${roles} represented by Last Shot Media Group.`

    return {
      meta: [
        { title: `${model.name} | LSMG Models & Talent` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${model.name} | LSMG Models & Talent` },
        { property: 'og:description', content: description },
        { property: 'og:image', content: absoluteUrl(model.imagePaths[0]) },
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

  const hero = responsiveImage(model.imagePaths[0], {
    widths: [600, 900, 1200, 1500],
    sourceWidth: IMAGE_WIDTHS[model.imagePaths[0]],
  })
  const roleLabel = (model.roles ?? ['Model']).join(' · ')

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
            src={hero.src}
            srcSet={hero.srcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={`${model.name}, ${model.types.join(' and ')} talent represented by LSMG`}
            className="model-profile-image"
            fetchPriority="high"
            decoding="async"
          />
          <span className="model-profile-shot-count">
            {model.imagePaths.length} shots{model.videoPath ? ' · 1 reel' : ''}
          </span>
        </div>

        <div className="model-profile-info">
          <Link to="/models" className="model-profile-back">
            ← Back to roster
          </Link>
          <span className="mdl-eyebrow">{hasKnownCity(model) ? `${model.city} · ` : ''}{roleLabel} · LSMG Talent</span>
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
          {model.imageSource && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Photography via {model.imageSource}
            </p>
          )}
          <Link to="/contact" className="mdl-btn mdl-btn-primary model-profile-book">
            Book {model.name}
          </Link>
        </div>
      </div>

      {model.videoPath && (
        <section className="model-profile-reel" aria-label={`${model.name} motion reel`}>
          <div className="model-profile-gallery-head">
            <span className="mdl-eyebrow">Motion</span>
            <h2>{model.name}’s Reel</h2>
          </div>
          <div className="model-profile-reel-frame">
            <video
              className="model-profile-reel-video"
              poster={model.videoPoster ?? responsiveImage(model.imagePaths[0], { widths: [1100], sourceWidth: IMAGE_WIDTHS[model.imagePaths[0]] }).src}
              controls
              playsInline
              preload="metadata"
            >
              {/* MP4 (H.264) first for Safari/iOS/Chrome/Edge; WebM fallback for browsers without H.264. */}
              <source src={model.videoPath} type="video/mp4" />
              {model.videoWebmPath && <source src={model.videoWebmPath} type="video/webm" />}
              Your browser does not support embedded video.{' '}
              <a href={model.videoPath}>Download {model.name}’s reel</a>.
            </video>
          </div>
        </section>
      )}

      {model.imagePaths.length > 1 && (
        <section className="model-profile-gallery" aria-label={`${model.name} portfolio gallery`}>
          <div className="model-profile-gallery-head">
            <span className="mdl-eyebrow">Portfolio</span>
            <h2>Selected Work</h2>
          </div>
          <div className="model-profile-gallery-grid">
            {model.imagePaths.slice(1).map((imagePath, index) => {
              const image = responsiveImage(imagePath, {
                widths: [480, 720, 960, 1200],
                sourceWidth: IMAGE_WIDTHS[imagePath],
                aspect: 3 / 4,
              })
              return (
                <img
                  key={imagePath}
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  width={720}
                  height={960}
                  alt={`${model.name} portfolio image ${index + 2}`}
                  loading="lazy"
                  decoding="async"
                />
              )
            })}
          </div>
        </section>
      )}
    </article>
  )
}
