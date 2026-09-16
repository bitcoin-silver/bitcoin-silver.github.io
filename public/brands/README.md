# Exchange and tracker logos

Drop brand logos here to replace the monogram tiles in the Markets section.

- Prefer **SVG**; PNG with transparency works too.
- The tile renders the file at 48×48 with padding, so a square-ish mark
  reads best — full wordmarks get squashed.
- Light marks: the background is dark (`--surface-2`), so white or light
  logos work as-is. Dark-on-transparent logos will disappear.

Then reference the filename in `src/lib/markets.ts`:

```ts
{
  name: "CoinGecko",
  meta: "Price & volume",
  mark: "CG",          // fallback if the file is missing
  logo: "coingecko.svg",
  url: "https://…",
}
```

Until a `logo` is set, `BrandMark` renders the `mark` monogram. Third-party
logos are deliberately not hotlinked from their own CDNs — that breaks over
time and sends every visitor to a third party.
