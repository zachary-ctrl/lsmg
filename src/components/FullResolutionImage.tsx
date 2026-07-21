import { useEffect, useState, type CSSProperties, type ImgHTMLAttributes, type ReactNode } from 'react'

type FullResolutionImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  src: string
  fullResolutionSrc?: string
  fallbackSrc?: string
  linkClassName?: string
  linkStyle?: CSSProperties
  linkAriaLabel?: string
  children?: ReactNode
}

export function FullResolutionImage({
  src,
  fullResolutionSrc,
  fallbackSrc,
  linkClassName,
  linkStyle,
  linkAriaLabel,
  children,
  alt,
  ...imageProps
}: FullResolutionImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src)

  useEffect(() => {
    setResolvedSrc(src)
  }, [src])

  const fullSizeSrc = resolvedSrc === fallbackSrc ? fallbackSrc : (fullResolutionSrc ?? resolvedSrc)

  return (
    <a
      href={fullSizeSrc}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
      style={linkStyle}
      aria-label={linkAriaLabel ?? `Open ${alt || 'image'} at full resolution in a new tab`}
      data-full-resolution-image
    >
      <img
        {...imageProps}
        src={resolvedSrc}
        alt={alt}
        onError={() => {
          if (fallbackSrc && resolvedSrc !== fallbackSrc) setResolvedSrc(fallbackSrc)
        }}
      />
      {children}
    </a>
  )
}
