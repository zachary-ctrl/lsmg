export type Model = {
  slug: string
  name: string
  types: string[]
  imagePaths: string[]
  bio: string
  featured: boolean
}

export const MODELS: Model[] = [
  {
    slug: 'amora',
    name: 'Amora',
    types: ['Editorial', 'Runway'],
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
    slug: 'halie',
    name: 'Halie',
    types: ['Editorial', 'Commercial'],
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
    types: ['Commercial', 'Print'],
    imagePaths: [
      '/models/nani-1.jpg',
      '/models/nani-2.jpg',
      '/models/nani-3.jpg',
      '/models/nani-4.jpg',
      '/models/nani-5.jpg',
      '/models/nani-6.jpg',
    ],
    bio: 'Dallas-based Nani brings warmth, clarity, and an easy connection to commercial and print assignments. Her camera-ready range is a natural fit for lifestyle campaigns, catalogs, and polished brand storytelling.',
    featured: true,
  },
  {
    slug: 'saanvi',
    name: 'Saanvi',
    types: ['Runway', 'Beauty'],
    imagePaths: ['/models/saanvi-1.jpg', '/models/saanvi-2.jpg'],
    bio: 'Saanvi represents Orlando with poised runway lines and a striking beauty presence. She brings composure and precision to catwalk, cosmetics, and close-up work while keeping each frame fresh and expressive.',
    featured: true,
  },
  {
    slug: 'nicole',
    name: 'Nicole',
    types: ['Editorial'],
    imagePaths: [
      '/models/nicole-1.jpg',
      '/models/nicole-2.jpg',
      '/models/nicole-3.jpg',
      '/models/nicole-4.jpg',
      '/models/nicole-5.jpg',
    ],
    bio: 'Profile coming soon. Nicole joins the LSMG roster with a growing portfolio; her full bio, city, and specialties will be added shortly.',
    featured: true,
  },
  {
    slug: 'jada',
    name: 'Jada',
    types: ['Editorial'],
    imagePaths: [
      '/models/jada-1.jpg',
      '/models/jada-2.jpg',
      '/models/jada-3.jpg',
      '/models/jada-4.jpg',
      '/models/jada-5.jpg',
    ],
    bio: 'Profile coming soon. Jada joins the LSMG roster with a growing portfolio; her full bio and specialties will be added shortly.',
    featured: true,
  },
  {
    slug: 'lailah',
    name: 'Lailah',
    types: ['Editorial'],
    imagePaths: [
      '/models/lailah-1.jpg',
      '/models/lailah-2.jpg',
      '/models/lailah-3.jpg',
    ],
    bio: 'Profile coming soon. Lailah joins the LSMG roster with a growing portfolio; her full bio and specialties will be added shortly.',
    featured: true,
  },
]

export function getModelBySlug(slug: string) {
  return MODELS.find((model) => model.slug === slug)
}
