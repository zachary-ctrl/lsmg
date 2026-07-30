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
    bio: 'Dallas-based Nani brings warmth, clarity, and an easy connection to commercial and print assignments. Her camera-ready range is a natural fit for lifestyle campaigns, catalogs, and polished brand storytelling.',
    featured: true,
  },
  {
    slug: 'jada',
    name: 'Jada',
    city: 'TBD',
    types: ['Editorial'],
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
]

export function getModelBySlug(slug: string) {
  return MODELS.find((model) => model.slug === slug)
}
