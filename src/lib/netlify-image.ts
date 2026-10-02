export function netlifyImage(src: string, width: number, height?: number, quality = 72) {
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
