# Rehearsal notes: landing-page demos

Built with the stageshow skill (`.agents/skills/stageshow`), kit copied to `src/kit/`.
Every demo is `play="once"` (plays when it scrolls into view and holds its
payoff); the reduced-motion poster is that finished frame. All four use the
Itinosu tokens from `src/styles/tokens.css`, so light and dark follow
`prefers-color-scheme`.

| Demo | Section | Gold it follows | Story |
|---|---|---|---|
| `HeroDemo` | 10.01 Hero | `subscriptions` (Fly handoff), `payout-flow` (pace) | An "Add to trip" sheet drops onto the cover; each booking's badge flies into its empty widget, which fills. Ends on the Figma hero exactly. |
| `CostsDemo` | 10.02 Costs | `table-edit` (cause, then total a beat later) | A Shinkansen expense lands at the top of the list; entries 28 → 29 and ₹ 1,57,840 → ₹ 1,60,440 roll. |
| `SummaryDemo` | 10.02 Summary | `form-error` (button confirms on itself) | Each document on the trip summary is checked off; the pointer presses Download PDF and it becomes Downloaded. |
| `WidgetsDemo` | 10.02 Widgets | `controls` (Toggle) + `choreography` | A tap turns Flights off and its chip leaves the trip strip; a tap turns Public transport on and its chip opens in. |

## Verified

`node .agents/skills/stageshow/scripts/film.mjs <url> --select <.hd|.cd|.sd|.wd> --gate`
against `astro dev`: **rehearsal passed** for all four at 1440 and 390 wide, and
in dark mode at 1440. Contact sheets were checked by eye.

## Known gate lines that are not visible faults

- `jump: span "0".."9" y +340px` (Costs): the kit's `Count` re-centres its
  digit strip after a roll (10 digits × 34px). The digit shown does not change.
- `vanishes with no exit` (Hero): the row badge and the flyer hand off at the
  same rect in the same frame, as `Fly` is designed to do.
- `kit override` lines appear only when filming the production build: the
  detector recognises kit CSS by its `/kit/` path, which bundling removes. Film
  against `npm run dev` for a clean read.
- Large `jump` lines at ~10.8s at 390 wide: the film tool resizing the page,
  which switches the stage to its `compact` design.

## Not checked

- Real devices and Safari (filmed in Chrome only); SF Pro shows only on Apple
  devices, other platforms fall back to the system sans.
- Widths between the three design sizes beyond 834, 402 and 375 spot checks.
- The 1-frame wide → compact switch when a demo hydrates on a phone (kit
  behaviour: the server renders the wide design first).
