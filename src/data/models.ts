export type Model = {
  slug: string
  name: string
  city: string
  types: string[]
  specs: {
    height: string
    bust: string
    waist: string
  }
  imagePaths: string[]
  videoPath?: string
  /** VP9/Opus copy of the reel for browsers without H.264 support. */
  videoWebmPath?: string
  /** Poster frame for the reel (should match the video's aspect ratio). */
  videoPoster?: string
  /** Talent disciplines shown on the Talent page (e.g. Model, Singer). */
  roles?: string[]
  /** Where the photography originated, if it was sourced from another LSMG property. */
  imageSource?: string
  bio: string
  featured: boolean
}

export const MODELS: Model[] = [
  {
    slug: 'amora',
    name: 'Amora',
    city: 'Atlanta',
    types: ['Editorial', 'Runway'],
    specs: { height: "5'9\"", bust: '32"', waist: '24"' },
    imagePaths: [
      '/models/amora-1.jpg',
      '/models/amora-2.jpg',
      '/models/amora-3.jpg',
      '/models/amora-4.jpg',
      '/models/amora-5.jpg',
      '/models/amora-6.jpg',
      '/models/amora-7.jpg',
      '/models/amora-8.jpg',
      '/models/amora-9.jpg',
      '/models/amora-10.jpg',
    ],
    bio: 'Based in Atlanta, Amora brings a confident editorial presence and fluid runway movement to every production. Her range suits fashion stories, designer showcases, and campaigns that call for polished, modern energy.',
    featured: true,
  },
  {
    slug: 'halie',
    name: 'Halie',
    city: 'New York',
    types: ['Editorial', 'Commercial'],
    roles: ['Model', 'Singer'],
    specs: { height: "5'10\"", bust: '33"', waist: '25"' },
    imagePaths: [
      '/models/halie-1.jpg',
      '/models/halie-2.jpg',
      '/models/halie-3.jpg',
      '/models/halie-4.jpg',
      '/models/halie-5.jpg',
    ],
    bio: 'Halie pairs New York editorial edge with an approachable commercial presence. She moves naturally between elevated fashion imagery and brand-focused work, giving creative teams a versatile and expressive collaborator.',
    featured: true,
  },
  {
    slug: 'nani',
    name: 'Nani',
    city: 'Dallas',
    types: ['Commercial', 'Print'],
    specs: { height: "5'8\"", bust: '34"', waist: '26"' },
    imagePaths: [
      '/models/nani-1.jpg',
      '/models/nani-2.jpg',
      '/models/nani-3.jpg',
      '/models/nani-4.jpg',
      '/models/nani-5.jpg',
      '/models/nani-6.jpg',
      '/models/nani-7.jpg',
    ],
    videoPath: '/models/nani-reel.mp4',
    videoWebmPath: '/models/nani-reel.webm',
    bio: 'Dallas-based Nani brings warmth, clarity, and an easy connection to commercial and print assignments. Her camera-ready range is a natural fit for lifestyle campaigns, catalogs, and polished brand storytelling.',
    featured: true,
  },
  {
    slug: 'jada',
    name: 'Jada',
    city: 'TBD',
    types: ['Editorial'],
    roles: ['Model', 'Singer'],
    specs: { height: 'TBD', bust: 'TBD', waist: 'TBD' },
    imagePaths: [
      '/models/jada-1.jpg',
      '/models/jada-2.jpg',
      '/models/jada-3.jpg',
      '/models/jada-4.jpg',
    ],
    bio: 'Profile coming soon. Jada joins the LSMG roster with a growing editorial portfolio; her full bio, city, and specialties will be added shortly.',
    featured: true,
  },
  {
    slug: 'sophia',
    name: 'Sophia',
    city: 'TBD',
    types: ['Editorial', 'Commercial'],
    roles: ['Model'],
    specs: { height: 'TBD', bust: 'TBD', waist: 'TBD' },
    // Original portfolio files copied from Sophia's LEDGERA Faces profile
    // (ledgeramagazine.com/new-faces/sophia) and served locally.
    imagePaths: [
      '/models/sophia/sophia-01.jpg',
      '/models/sophia/sophia-02.jpg',
      '/models/sophia/sophia-03.jpg',
      '/models/sophia/sophia-04.jpg',
      '/models/sophia/sophia-05.jpg',
      '/models/sophia/sophia-06.jpg',
      '/models/sophia/sophia-07.jpg',
      '/models/sophia/sophia-08.jpg',
      '/models/sophia/sophia-09.jpg',
      '/models/sophia/sophia-10.jpg',
    ],
    imageSource: 'LEDGERA Faces',
    bio: 'Sophia joins the LSMG roster with a portfolio that moves from studio streetwear to sunlit swim and lifestyle editorial. Her range suits fashion, beauty and commercial campaigns that need both edge and ease.',
    featured: true,
  },
  {
    slug: 'wovie',
    name: 'Wovie',
    city: 'TBD',
    types: ['Editorial', 'Music'],
    roles: ['Model', 'Singer'],
    specs: { height: 'TBD', bust: 'TBD', waist: 'TBD' },
    imagePaths: [
      '/models/wovie/wovie-01.jpg',
      '/models/wovie/wovie-02.jpg',
      '/models/wovie/wovie-03.jpg',
    ],
    videoPath: '/models/wovie/wovie-reel.mp4',
    videoWebmPath: '/models/wovie/wovie-reel.webm',
    videoPoster: '/models/wovie/wovie-reel-poster.jpg',
    bio: 'Wovie is represented by LSMG across modeling and music — a singer and recording artist whose visual identity carries from the camera to the stage, suited to editorial, fashion, campaign and artist opportunities.',
    featured: true,
  },
  {
    slug: 'paula-ramos',
    name: 'Paula Ramos',
    city: '',
    types: ['Sports', 'Fitness', 'Commercial'],
    roles: ['Athlete', 'Model'],
    specs: { height: '', bust: '', waist: '' },
    imagePaths: [
      '/models/paula-ramos/paula-ramos-01.jpg',
      '/models/paula-ramos/paula-ramos-02.jpg',
      '/models/paula-ramos/paula-ramos-03.jpg',
      '/models/paula-ramos/paula-ramos-04.jpg',
    ],
    bio: 'Paula Ramos joins the LSMG roster across modeling and sports. A volleyball athlete with a strong, fitness-forward presence, she brings natural energy to activewear, athletic and lifestyle campaigns, sports brand partnerships and commercial work.',
    featured: true,
  },
]

/** Intrinsic pixel widths of local talent images — used to cap responsive srcsets (never upscale). */
export const IMAGE_WIDTHS: Record<string, number> = {
  '/models/amora-1.jpg': 864,
  '/models/amora-10.jpg': 1440,
  '/models/amora-2.jpg': 864,
  '/models/amora-3.jpg': 864,
  '/models/amora-4.jpg': 961,
  '/models/amora-5.jpg': 896,
  '/models/amora-6.jpg': 1200,
  '/models/amora-7.jpg': 1440,
  '/models/amora-8.jpg': 1440,
  '/models/amora-9.jpg': 1440,
  '/models/halie-1.jpg': 1290,
  '/models/halie-2.jpg': 1290,
  '/models/halie-3.jpg': 1290,
  '/models/halie-4.jpg': 1365,
  '/models/halie-5.jpg': 853,
  '/models/hero-jada.jpg': 1080,
  '/models/jada-1.jpg': 1365,
  '/models/jada-2.jpg': 1440,
  '/models/jada-3.jpg': 1440,
  '/models/jada-4.jpg': 1440,
  '/models/nani-1.jpg': 1440,
  '/models/nani-2.jpg': 1440,
  '/models/nani-3.jpg': 1440,
  '/models/nani-4.jpg': 3072,
  '/models/nani-5.jpg': 1440,
  '/models/nani-6.jpg': 1440,
  '/models/nani-7.jpg': 3072,
  '/models/paula-ramos/paula-ramos-01.jpg': 1500,
  '/models/paula-ramos/paula-ramos-02.jpg': 1513,
  '/models/paula-ramos/paula-ramos-03.jpg': 1500,
  '/models/paula-ramos/paula-ramos-04.jpg': 1500,
  '/models/sophia/sophia-01.jpg': 1228,
  '/models/sophia/sophia-02.jpg': 1228,
  '/models/sophia/sophia-03.jpg': 1507,
  '/models/sophia/sophia-04.jpg': 1152,
  '/models/sophia/sophia-05.jpg': 1500,
  '/models/sophia/sophia-06.jpg': 1500,
  '/models/sophia/sophia-07.jpg': 1228,
  '/models/sophia/sophia-08.jpg': 1365,
  '/models/sophia/sophia-09.jpg': 1228,
  '/models/sophia/sophia-10.jpg': 1152,
  '/models/wovie/wovie-01.jpg': 1290,
  '/models/wovie/wovie-02.jpg': 1188,
  '/models/wovie/wovie-03.jpg': 1188,
  '/models/wovie/wovie-reel-poster.jpg': 720,
}

/** Sports-category order: these athletes are also listed under Models. */
export const SPORTS_TALENT_SLUGS = ['paula-ramos'] as const

/** Music-category order: these artists are also listed under Models. */
export const MUSIC_TALENT_SLUGS = ['jada', 'halie', 'wovie'] as const

export function hasKnownCity(model: Model) {
  return Boolean(model.city) && model.city !== 'TBD'
}

export function getModelBySlug(slug: string) {
  return MODELS.find((model) => model.slug === slug)
}
