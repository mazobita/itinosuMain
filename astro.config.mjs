import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// Static site: no server, no API. React only hydrates the stageshow demos.
export default defineConfig({
  site: 'https://itinosu.com',
  integrations: [react()],
  devToolbar: { enabled: false },
})
