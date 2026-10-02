export function netlifyImage(src: string, width: number, height?: number, quality = 90) {
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(Math.max(90, quality)),
  })

  if (height) {
    params.set('h', String(height))
    params.set('fit', 'cover')
  }

  return `/.netlify/images?${params.toString()}`
}
