# itinosu.com

The Itinosu landing page (Figma "10 Landing"), built as a static Astro site.
Four product animations are made with the stageshow skill and hydrate as React
islands only when scrolled into view.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

- `src/pages/index.astro`: the page (header, hero, features, devices, pricing, download, footer)
- `src/styles/tokens.css`: Figma variables, light + dark
- `src/demos/`: the stageshow animations and Itinosu's app components (see `REHEARSAL.md`)
- `src/kit/`: the stageshow kit
- `public/img/`: assets exported from Figma

Before launch: replace the App Store badge placeholders with Apple's official
artwork, set the real App Store URL (`StoreBadge.astro`, header button), swap
the device screenshots for the App Store ones, and confirm the prices.
