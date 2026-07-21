export type Model = {
  id: string
  name: string
  location: string
  categories: string[]
  tagline: string
  bio: string
  stats: { label: string; value: string }[]
  gallery: string[]
  tall?: boolean
  featured?: boolean
}

export const MODELS: Model[] = [
  {
    id: 'amora',
    name: 'Amora',
    location: 'Atlanta',
    categories: ['Editorial', 'Runway'],
    tagline: 'Editorial presence with runway command.',
    bio: 'Amora brings a magnetic editorial range to every set — equally at home in high-fashion campaigns and on the runway. A versatile face for LSMG’s Atlanta roster, she pairs sharp angles with effortless movement, anchoring stories that demand both edge and elegance.',
    stats: [
      { label: 'Height', value: "5'9\"" },
      { label: 'Bust', value: '32"' },
      { label: 'Waist', value: '24"' },
      { label: 'Hips', value: '35"' },
      { label: 'Hair', value: 'Black' },
      { label: 'Eyes', value: 'Brown' },
    ],
    gallery: ['/models/amora-1.jpg', '/models/amora-2.jpg', '/models/amora-3.jpg', '/models/amora-4.jpg', '/models/amora-5.jpg', '/models/amora-6.jpg'],
    tall: true,
    featured: true,
  },
  {
    id: 'haile',
    name: 'Haile',
    location: 'New York',
    categories: ['Editorial', 'Commercial'],
    tagline: 'A New York editorial talent with commercial warmth.',
    bio: 'Haile moves between the editorial and commercial worlds with rare ease. Her New York-honed presence reads as both aspirational and approachable — the kind of face that carries a cover and a campaign with the same conviction. A cornerstone of the LSMG roster.',
    stats: [
      { label: 'Height', value: "5'10\"" },
      { label: 'Bust', value: '33"' },
      { label: 'Waist', value: '25"' },
      { label: 'Hips', value: '35"' },
      { label: 'Hair', value: 'Dark Brown' },
      { label: 'Eyes', value: 'Hazel' },
    ],
    gallery: ['/models/haile-1.jpg', '/models/haile-2.jpg', '/models/haile-3.jpg', '/models/haile-4.jpg', '/models/haile-5.jpg'],
    featured: true,
  },
  {
    id: 'nani',
    name: 'Nani',
    location: 'Dallas',
    categories: ['Commercial', 'Print'],
    tagline: 'Commercial range built for print and brand.',
    bio: 'Nani is a commercial and print specialist with an instinct for connection. Based out of Dallas, she delivers the kind of relatable, camera-ready energy brands build campaigns around — clean, confident, and consistently on-brief.',
    stats: [
      { label: 'Height', value: "5'8\"" },
      { label: 'Bust', value: '34"' },
      { label: 'Waist', value: '26"' },
      { label: 'Hips', value: '36"' },
      { label: 'Hair', value: 'Black' },
      { label: 'Eyes', value: 'Dark Brown' },
    ],
    gallery: ['/models/nani-1.jpg', '/models/nani-2.jpg', '/models/nani-3.jpg'],
    tall: true,
    featured: true,
  },
  {
    id: 'nicole',
    name: 'Nicole',
    location: 'LSMG Roster',
    categories: ['Editorial', 'Beauty'],
    tagline: 'Polished editorial energy with beauty versatility.',
    bio: 'Nicole brings a refined, expressive presence to editorial and beauty work. Her poised movement and clean, camera-ready range give creative teams a versatile foundation for portraiture, campaigns and elevated brand storytelling.',
    stats: [
      { label: 'Height', value: 'On request' },
      { label: 'Bust', value: 'On request' },
      { label: 'Waist', value: 'On request' },
      { label: 'Hips', value: 'On request' },
      { label: 'Hair', value: 'On request' },
      { label: 'Eyes', value: 'On request' },
    ],
    gallery: ['/models/nicole-1.jpg', '/models/nicole-2.jpg', '/models/nicole-3.jpg', '/models/nicole-4.jpg', '/models/nicole-5.jpg'],
    tall: true,
    featured: true,
  },
  {
    id: 'saanvi',
    name: 'Saanvi',
    location: 'Orlando',
    categories: ['Runway', 'Beauty'],
    tagline: 'Runway lines and beauty-campaign poise.',
    bio: 'Saanvi blends runway discipline with a beauty-campaign sensibility. Representing LSMG’s Orlando roster, she brings clean lines and a striking, editorial-beauty quality that translates from catwalk to close-up without losing a single degree of composure.',
    stats: [
      { label: 'Height', value: "5'11\"" },
      { label: 'Bust', value: '32"' },
      { label: 'Waist', value: '24"' },
      { label: 'Hips', value: '34"' },
      { label: 'Hair', value: 'Black' },
      { label: 'Eyes', value: 'Brown' },
    ],
    gallery: ['/models/saanvi-1.jpg', '/models/saanvi-2.jpg'],
    featured: true,
  },
]
