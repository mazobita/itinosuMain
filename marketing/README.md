# Marketing

Marketing images. **Not part of the website:** Netlify publishes only the Astro build (`dist`), so nothing in
`marketing/` is ever deployed.

Every image follows the app's Figma rules: colours and spacing from the Figma variables (Itinosu Colour,
Itinosu Layout; same values as `src/styles/tokens.css`), SF Pro, Light and Dark versions, real app screens from
the Figma exports in `public/img` at 1:1 (never redrawn or upscaled). Before release, no Apple App Store badge:
only the text "Coming soon to the App Store" (Apple allows its badge only on a link to a live app).

## instagram/coming-soon

- `coming-soon-light.png`, `coming-soon-dark.png`: 1080×1350 (4:5 feed post).
- Source: `coming-soon.html`. To re-render after an edit, from this folder:

  ```sh
  C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  for t in light dark; do "$C" --headless=new --hide-scrollbars --force-device-scale-factor=1 \
    --allow-file-access-from-files --virtual-time-budget=3000 --window-size=1080,1350 \
    --screenshot="$PWD/instagram/coming-soon-$t.png" "file://$PWD/instagram/coming-soon.html?theme=$t"; done
  ```

Suggested caption: "Every booking, ticket and plan, in one tidy trip. Itinosu is coming soon to iPhone, iPad
and Mac. itinosu.com"
