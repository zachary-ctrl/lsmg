/**
 * Netlify Image CDN helpers.
 *
 * Talent photography is served through /.netlify/images so browsers get
 * AVIF/WebP at the right size, but at portrait-grade quality (90) rather than
 * the old q=70-ish default that visibly softened skin and hair detail.
 *
 * Widths are always capped at the source image's real width so nothing is
 * ever upscaled and labelled "HD".
 */

export const TALENT_IMAGE_QUALITY = 90

export function netlifyImage(
  src: string,
  width: number,
  height?: number,
  quality = TALENT_IMAGE_QUALITY,
) {
  const params = new URLSearchParams({
    url: src,
    w: String(Math.round(width)),
    q: String(quality),
  })

  if (height) {
    params.set('h', String(Math.round(height)))
    params.set('fit', 'cover')
  }

  return `/.netlify/images?${params.toString()}`
}

type ResponsiveOptions = {
  /** Candidate output widths in CSS px multiples (1x/2x/3x are derived by the browser). */
  widths: number[]
  /** Intrinsic width of the source file — widths above this are dropped (no upscaling). */
  sourceWidth?: number
  /** Optional crop aspect ratio (width / height). Omit to keep the original ratio. */
  aspect?: number
  quality?: number
}

/**
 * Build `src` + `srcSet` for a responsive <img>. The largest allowed width is
 * used as the fallback `src` so non-srcset clients still get a sharp image.
 */
export function responsiveImage(src: string, opts: ResponsiveOptions) {
  const { widths, sourceWidth, aspect, quality = TALENT_IMAGE_QUALITY } = opts
  const cap = sourceWidth ?? Number.POSITIVE_INFINITY
  let usable = [...new Set(widths.map((w) => Math.min(w, cap)))].sort((a, b) => a - b)
  if (usable.length === 0) usable = [Math.min(800, cap)]

  const url = (w: number) => netlifyImage(src, w, aspect ? w / aspect : undefined, quality)

  return {
    src: url(usable[usable.length - 1]),
    srcSet: usable.map((w) => `${url(w)} ${w}w`).join(', '),
  }
}
