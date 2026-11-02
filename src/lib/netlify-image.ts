export function netlifyImage(src: string, width: number, height?: number, quality = 72) {
  // Shopify CDN already serves optimized media; do not proxy externally hosted model images.
  if (src.startsWith('https://cdn.shopify.com/')) return src

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality),
  })

  if (height) {
    params.set('h', String(height))
    params.set('fit', 'cover')
  }

  return `/.netlify/images?${params.toString()}`
}
