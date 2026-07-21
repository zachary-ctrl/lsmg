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
    ],
    bio: 'Based in Atlanta, Amora brings a confident editorial presence and fluid runway movement to every production. Her range suits fashion stories, designer showcases, and campaigns that call for polished, modern energy.',
    featured: true,
  },
  {
    slug: 'haile',
    name: 'Haile',
    city: 'New York',
    types: ['Editorial', 'Commercial'],
    specs: { height: "5'10\"", bust: '33"', waist: '25"' },
    imagePaths: [
      '/models/haile-1.jpg',
      '/models/haile-2.jpg',
      '/models/haile-3.jpg',
      '/models/haile-4.jpg',
      '/models/haile-5.jpg',
    ],
    bio: 'Haile pairs New York editorial edge with an approachable commercial presence. She moves naturally between elevated fashion imagery and brand-focused work, giving creative teams a versatile and expressive collaborator.',
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
    ],
    bio: 'Dallas-based Nani brings warmth, clarity, and an easy connection to commercial and print assignments. Her camera-ready range is a natural fit for lifestyle campaigns, catalogs, and polished brand storytelling.',
    featured: true,
  },
  {
    slug: 'saanvi',
    name: 'Saanvi',
    city: 'Orlando',
    types: ['Runway', 'Beauty'],
    specs: { height: "5'11\"", bust: '32"', waist: '24"' },
    imagePaths: ['/models/saanvi-1.jpg', '/models/saanvi-2.jpg'],
    bio: 'Saanvi represents Orlando with poised runway lines and a striking beauty presence. She brings composure and precision to catwalk, cosmetics, and close-up work while keeping each frame fresh and expressive.',
    featured: true,
  },
]

export function getModelBySlug(slug: string) {
  return MODELS.find((model) => model.slug === slug)
}
