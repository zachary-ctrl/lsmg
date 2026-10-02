import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { MODELS } from './src/data/models'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    netlify(),
    tanstackStart({
      pages: MODELS.map((model) => ({
        path: `/models/${model.slug}`,
        prerender: { enabled: true },
      })),
      prerender: {
        // The prerender crawler follows every <a href>, including the "Download reel"
        // fallback links inside <video>. It then fetches the .mp4 through the SSR server
        // and writes the response back to dist as text, corrupting the binary
        // (a 14.6 MB reel became a 26 MB unplayable file). Only crawl page routes:
        // skip anything that ends in a file extension other than .html.
        filter: (page: { path: string }) => {
          const last = page.path.split(/[?#]/)[0].split('/').pop() ?? ''
          return !/\.[a-z0-9]+$/i.test(last) || last.endsWith('.html')
        },
      },
    }),
    viteReact(),
  ],
})

export default config
